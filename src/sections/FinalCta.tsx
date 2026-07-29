// §6.12 — the one place to spend brightness. On a light page that inverts:
// a deep green band is the loudest thing on the scroll.
import { WA_LINK } from '../lib/site';

export default function FinalCta() {
  return (
    <section className="gutter relative overflow-hidden bg-vx-olive" aria-labelledby="cta-h">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(closest-side, rgba(195,224,67,0.20), rgba(195,224,67,0.06) 55%, transparent 76%)',
        }}
      />
      <div data-reveal-group className="content-col relative py-section text-center">
        <h2
          id="cta-h"
          data-reveal
          className="font-display text-display-lg mx-auto max-w-[20ch] font-bold text-white"
        >
          Talk to your wallet. <span className="text-vx-lime">Move money instantly.</span>
        </h2>
        <p data-reveal className="text-body-lg mx-auto mt-5 max-w-[46ch] text-white/80">
          Join thousands already sending money across Africa with VIXA.
        </p>
        <div data-reveal className="mt-10">
          <a
            href={WA_LINK}
            className="inline-flex items-center gap-2.5 rounded-pill bg-white px-10 py-[1.125rem] text-[17px] font-semibold text-vx-olive transition-transform hover:scale-[1.02]"
          >
            <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.5-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2.2 1.1c.2.1.4.2.5.3.1.2.1.7-.1 1.4z" />
            </svg>
            Start on WhatsApp
          </a>
        </div>
        <p data-reveal className="text-mono-meta mt-5 text-white/80">
          Takes less than 2 minutes to get started.
        </p>
      </div>
    </section>
  );
}
