// §6.6 — three numbered steps revealed in sequence within a pin; a 1px slate
// rule carries an olive fill that scrubs downward — the message travelling
// the pipeline. Fill animates scaleY only (§5 perf rules).
import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';

const STEPS = [
  { n: '01', h: 'You send a message', b: 'Text, voice note, or pidgin — VIXA understands you.' },
  { n: '02', h: 'VIXA understands instantly', b: 'It processes amount, destination, and rates in real time.' },
  { n: '03', h: 'You confirm with PIN', b: 'Nothing moves without your approval.' },
];

export default function HowItWorks() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // inactive steps stay WCAG-compliant: headings sit at ash (5.6:1) and
      // brighten to bone as the fill passes — never sub-4.5:1 dimming
      const steps = gsap.utils.toArray<HTMLElement>('.how-step');
      steps.forEach((step) => {
        gsap.set(step, { y: 16 });
        gsap.set(step.querySelector('h3'), { color: '#9A9A8C' });
      });
      gsap.set('.how-fill', { scaleY: 0, transformOrigin: '50% 0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 1.6,
          pin: '.how-pin',
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.set({}, {}, 1);
      tl.to('.how-fill', { scaleY: 1, duration: 0.85, ease: 'none' }, 0.05);
      steps.forEach((step, i) => {
        const at = 0.08 + i * 0.28;
        tl.to(step, { y: 0, duration: 0.16, ease: 'power2.out' }, at);
        tl.to(step.querySelector('h3'), { color: '#EDEDE4', duration: 0.14 }, at);
        tl.to(step.querySelector('.how-dot'), { borderColor: '#C3E043', duration: 0.1 }, at);
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} id="how" aria-labelledby="how-h">
      <div className="how-pin gutter flex h-screen items-center overflow-hidden">
        <div className="content-col grid w-full gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <h2 id="how-h" className="font-display text-display-lg font-bold md:sticky">
            How your message becomes <span className="text-vx-lime">money</span>
          </h2>

          <div className="relative pl-10">
            {/* the pipeline rule + olive fill */}
            <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-vx-slate" />
            <div aria-hidden="true" className="how-fill absolute bottom-2 left-[7px] top-2 w-px bg-vx-olive" />
            <ol className="flex flex-col gap-12">
              {STEPS.map((s) => (
                <li key={s.n} className="how-step relative">
                  <span
                    aria-hidden="true"
                    className="how-dot absolute -left-10 top-1.5 h-[15px] w-[15px] rounded-full border border-vx-olive bg-vx-void"
                  />
                  <p className="text-mono-meta font-medium text-vx-ash">{s.n}</p>
                  <h3 className="font-display text-title mt-1.5 font-medium">{s.h}</h3>
                  <p className="mt-2 max-w-[44ch] text-vx-ash">{s.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
