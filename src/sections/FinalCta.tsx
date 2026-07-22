// §6.12 — the one place to spend brightness: the olive glow at higher
// intensity than the hero. Largest button on the page.
import { WA_LINK } from './Hero';

export default function FinalCta() {
  return (
    <section className="section-pad gutter relative overflow-hidden" aria-labelledby="cta-h">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(closest-side, rgba(126,139,61,0.28), rgba(126,139,61,0.08) 55%, transparent 75%)',
        }}
      />
      <div data-reveal-group className="content-col relative text-center">
        <h2 id="cta-h" data-reveal className="font-display text-display-lg mx-auto max-w-[20ch] font-bold">
          Talk to your wallet. <span className="text-vx-lime">Move money instantly.</span>
        </h2>
        <p data-reveal className="text-body-lg mx-auto mt-5 max-w-[46ch] text-vx-ash">
          Join thousands already sending money across Africa with VIXA.
        </p>
        <div data-reveal className="mt-10">
          <a
            href={WA_LINK}
            className="inline-block rounded-pill bg-vx-olive px-10 py-4.5 text-[17px] font-semibold text-vx-void transition-colors hover:bg-vx-olive-lo"
            style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          >
            Start on WhatsApp
          </a>
        </div>
        <p data-reveal className="text-mono-meta mt-5 text-vx-ash">
          Takes less than 2 minutes to get started.
        </p>
      </div>
    </section>
  );
}
