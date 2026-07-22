// §6.5 — the "break the perfection" section. A second pinned phone (~180vh),
// pidgin + voice note, NO header by design: it should read like a real
// conversation someone screenshotted and dropped into the page.
import { useRef } from 'react';
import ChatThread from '../components/ChatThread';
import { demoThread } from '../data/threads';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { buildThreadTimeline, applyDiscreteStates } from '../lib/threadChoreo';

const THREAD_START = 0.06;
const THREAD_SPAN = 0.9;

export default function LiveDemo() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = section.current!.querySelector<HTMLElement>('.screen-rect')!;

      if (prefersReducedMotion() && !new URLSearchParams(window.location.search).has('motion')) {
        buildThreadTimeline(root, demoThread).progress(1).kill();
        applyDiscreteStates(root, 1, demoThread);
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 1.8,
          pin: '.demo-pin',
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = gsap.utils.clamp(0, 1, (self.progress - THREAD_START) / THREAD_SPAN);
            applyDiscreteStates(root, p, demoThread);
          },
        },
      });
      tl.set({}, {}, 1);
      const threadTl = buildThreadTimeline(root, demoThread);
      threadTl.paused(false);
      tl.add(threadTl, THREAD_START);
      threadTl.duration(THREAD_SPAN);
    },
    { scope: section },
  );

  return (
    <section ref={section} id="demo" aria-label="A real VIXA conversation">
      <div className="demo-pin flex h-screen items-center justify-center overflow-hidden">
        <div className="h-[min(86vh,760px)] w-[min(88vw,380px)]">
          <div className="h-full w-full rounded-[40px] border border-vx-slate bg-black p-[8px] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
            <div className="screen-rect h-full w-full overflow-hidden rounded-[32px]">
              <ChatThread messages={demoThread} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
