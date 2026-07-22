// The §5 mechanic vocabulary, applied via data attributes so sections stay
// declarative. All initial hidden states are set from JS (never in CSS, §1.6);
// every helper is a no-op under prefers-reduced-motion (§9).
import { gsap, prefersReducedMotion } from './gsap';

/** M5 — Reveal. <el data-reveal-group> containing [data-reveal] children. */
export function setupReveals(root: HTMLElement) {
  if (prefersReducedMotion()) return;
  root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!items.length) return;
    gsap.set(items, { y: 28, opacity: 0 });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

/** M6 — Counter. <span data-counter="9760">0</span>; ticks once, snap 1. */
export function setupCounters(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const target = parseInt(el.dataset.counter ?? '0', 10);
    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }
    el.textContent = '0';
    const state = { v: 0 };
    gsap.to(state, {
      v: target,
      duration: 1.6,
      ease: 'power1.out',
      snap: { v: 1 },
      onUpdate: () => {
        el.textContent = String(Math.round(state.v));
      },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/** M3 — Perspective Card Scatter. <el data-scatter-group> with [data-scatter]
 * children. Desktop only; below 768px it degrades to the M5 stack (§5). */
export function setupScatter(root: HTMLElement) {
  if (prefersReducedMotion()) return;
  const mm = gsap.matchMedia();
  root.querySelectorAll<HTMLElement>('[data-scatter-group]').forEach((group) => {
    const cards = group.querySelectorAll<HTMLElement>('[data-scatter]');
    if (!cards.length) return;

    mm.add('(min-width: 768px)', () => {
      gsap.set(group, { perspective: 1400 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: group, start: 'top 88%', end: 'top 30%', scrub: 0.6 },
      });
      cards.forEach((card, i) => {
        gsap.set(card, {
          rotateY: i % 2 === 0 ? -14 : 14,
          rotateX: 6,
          z: -120,
          y: 60,
          opacity: 0,
          transformOrigin: '50% 50%',
        });
        tl.to(
          card,
          { rotateY: 0.01, rotateX: 0.01, z: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          i * 0.08,
        );
      });
    });

    mm.add('(max-width: 767.98px)', () => {
      gsap.set(cards, { y: 28, opacity: 0, rotateX: 0, rotateY: 0, z: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    });
  });
  return mm;
}

/** M4 — Parallax Field. [data-depth="0..1"] elements inside [data-parallax-field].
 * Explicit depth tokens, never random (§5): y drifts -30px..-140px. */
export function setupParallax(root: HTMLElement) {
  if (prefersReducedMotion()) return;
  root.querySelectorAll<HTMLElement>('[data-parallax-field]').forEach((field) => {
    field.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => {
      const depth = parseFloat(el.dataset.depth ?? '0.5');
      gsap.to(el, {
        y: -(30 + depth * 110),
        ease: 'none',
        scrollTrigger: { trigger: field, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
}
