// Choreography for ChatThread (§5 M1). Two layers, per spec:
//  1. a scrubbed timeline — bubble pop-ins + inner thread scroll (reversible)
//  2. discrete one-way states — typing dots + tick transitions (never scrub
//     backwards; ticks latch forward)
import { gsap } from './gsap';
import type { ChatMessage } from '../components/ChatThread';

export type BeatWindow = { start: number; end: number };

/** breathing room kept between the newest bubble and the composer */
const BOTTOM_GAP = 12;

/**
 * Layout offset of `el` from `ancestor`, accumulated up the offsetParent
 * chain. Plain `el.offsetTop` measures from the nearest POSITIONED ancestor —
 * messages that follow a typing indicator sit inside a `relative` wrapper, so
 * their raw offsetTop reads ~0 and the thread under-scrolls, hiding the last
 * bubble behind the composer. Everything here stays in unscaled layout px, so
 * it composes correctly with clientHeight/offsetHeight.
 */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/** Normalized [0..1] windows, one per message; the last beat breathes 1.4x (§6.2). */
export function beatWindows(messages: ChatMessage[]): BeatWindow[] {
  const weights = messages.map((_, i) => (i === messages.length - 1 ? 1.4 : 1));
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return weights.map((w) => {
    const start = acc / total;
    acc += w;
    return { start, end: acc / total };
  });
}

/**
 * Scrubbed layer. Returns a paused timeline normalized to duration 1 —
 * drive it with .progress(p) (playground) or a ScrollTrigger scrub (hero).
 * Typing bubbles are excluded here; they are discrete (visibility layer).
 */
export function buildThreadTimeline(root: HTMLElement, messages: ChatMessage[]) {
  const q = gsap.utils.selector(root);
  const windows = beatWindows(messages);
  const msgs = q<HTMLElement>('.wa-msg');
  const scroller = q<HTMLElement>('.wa-scroll')[0];
  const viewport = scroller?.parentElement;

  const tl = gsap.timeline({ paused: true });
  // anchor: force intrinsic duration to exactly 1 so tl.progress(p) and
  // beatWindows (both normalized 0..1) stay in perfect sync
  tl.set({}, {}, 1);

  messages.forEach((m, i) => {
    const el = msgs[i];
    if (!el) return;
    const { start, end } = windows[i];
    const span = end - start;

    if (m.type === 'typing') {
      // visibility handled discretely; keep it out of the scrub
      gsap.set(el, { opacity: 0 });
      return;
    }

    gsap.set(el, {
      opacity: 0,
      y: 8,
      scale: 0.92,
      transformOrigin: m.side === 'out' ? '100% 100%' : '0% 100%',
    });
    tl.to(
      el,
      { opacity: 1, y: 0, scale: 1, duration: span * 0.4, ease: 'back.out(1.7)' },
      start,
    );

    // keep the newest message in view: translate the inner scroller so this
    // message's bottom edge sits inside the visible rect (§5 M1 pinned
    // outside, scrolling inside)
    if (scroller && viewport) {
      // Function-based so GSAP re-reads layout on invalidate. The screen is
      // fit-scaled by ChatThread one frame AFTER this timeline is built, so a
      // value measured now would be stale and the last bubble would sit
      // behind the composer.
      tl.to(
        scroller,
        {
          y: () =>
            -Math.max(
              0,
              offsetWithin(el, viewport) + el.offsetHeight - (viewport.clientHeight - BOTTOM_GAP),
            ),
          duration: span * 0.35,
          ease: 'power2.out',
        },
        start,
      );
    }
  });

  return tl;
}

/**
 * Discrete layer. Call with current progress from either the slider or a
 * ScrollTrigger onUpdate. Typing dots show only within their window; tick
 * states only ever advance (latched), so scrubbing back never "un-delivers".
 */
export function applyDiscreteStates(root: HTMLElement, p: number, messages: ChatMessage[]) {
  const windows = beatWindows(messages);
  const msgs = Array.from(root.querySelectorAll<HTMLElement>('.wa-msg'));

  const TICK_ORDER = ['none', 'one', 'two', 'blue'] as const;

  messages.forEach((m, i) => {
    const el = msgs[i];
    if (!el) return;
    const { start, end } = windows[i];
    const span = end - start;

    if (m.type === 'typing') {
      const visible = p >= start && p < end;
      el.style.opacity = visible ? '1' : '0';
      return;
    }

    if (m.side === 'out') {
      const ticks = el.querySelector<HTMLElement>('.wa-ticks');
      if (!ticks) return;
      const final = (ticks.dataset.final ?? 'blue') as 'one' | 'two' | 'blue';
      let target: (typeof TICK_ORDER)[number] = 'none';
      if (p >= start + span * 0.45) target = 'one';
      if (p >= start + span * 0.68 && final !== 'one') target = 'two';
      if (p >= start + span * 0.88 && final === 'blue') target = 'blue';
      const current = (ticks.dataset.tick ?? 'none') as (typeof TICK_ORDER)[number];
      // latch: only advance
      if (TICK_ORDER.indexOf(target) > TICK_ORDER.indexOf(current)) {
        ticks.dataset.tick = target;
      }
    }

    if (m.type === 'voice') {
      // lime fill sweeps once the message has landed
      const fill = el.querySelector<HTMLElement>('.wa-voice-fill');
      if (fill) {
        const t = gsap.utils.clamp(0, 1, (p - (start + span * 0.4)) / (span * 0.55));
        fill.style.width = `${Math.round(t * 100)}%`;
      }
    }
  });
}

/** Reset latched states (playground scrub-to-zero convenience). */
export function resetDiscreteStates(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.wa-ticks').forEach((t) => {
    t.dataset.tick = 'none';
  });
}
