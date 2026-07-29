// §6.11 — M2 Word Fill, the second signature moment. Full viewport, pinned,
// nothing else on screen. Split on words (never characters, §5); source text
// preserved in a visually-hidden sibling for AT and SEO. The "👉 WhatsApp."
// line gets its own scroll beat with real distance in front of it — the pause
// is the point.
import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';

const BIG = "Africa doesn't need another app.";
const SMALL = 'It needs something that works where people already are.';

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="m2-word inline-block">
          {w}
          {' '}
        </span>
      ))}
    </span>
  );
}

export default function CoreMessage() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.m2-big .m2-word', { color: '#0F1912' });
        gsap.set('.m2-small .m2-word', { color: '#55635A' });
        gsap.set('.m2-punch', { color: '#1F6B3F', opacity: 1, y: 0 });
        return;
      }

      gsap.set('.m2-punch', { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 2.2,
          pin: '.m2-pin',
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.set({}, {}, 1);

      // words fill left to right — big line to bone, small line to ash
      tl.to('.m2-big .m2-word', { color: '#0F1912', stagger: 0.35 / 5, duration: 0.06, ease: 'none' }, 0.06);
      tl.to('.m2-small .m2-word', { color: '#55635A', stagger: 0.28 / 9, duration: 0.05, ease: 'none' }, 0.45);
      // …then the silence (0.73 → 0.86), then the payoff
      tl.to('.m2-punch', { opacity: 1, y: 0, color: '#1F6B3F', duration: 0.12, ease: 'power2.out' }, 0.86);
    },
    { scope: section },
  );

  return (
    <section ref={section} aria-label="Core message">
      <div className="m2-pin gutter flex h-screen items-center justify-center overflow-hidden bg-vx-void text-center">
        <div className="content-col">
          {/* real text for AT/SEO; the split spans are presentation-only (§9) */}
          <p className="sr-only">
            {BIG} {SMALL} 👉 WhatsApp.
          </p>
          <p className="m2-big font-display text-display-xl mx-auto max-w-[16ch] font-bold text-[#6A776F]">
            <Words text={BIG} />
          </p>
          <p className="m2-small text-body-lg mx-auto mt-8 max-w-[52ch] text-[#6A776F]">
            <Words text={SMALL} />
          </p>
          <p className="m2-punch font-display text-display-lg mt-14 font-bold text-vx-olive" aria-hidden="true">
            <span role="img" aria-label="pointing right">👉</span> WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
