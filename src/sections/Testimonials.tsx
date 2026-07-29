// §6.9 — testimonials as WhatsApp incoming bubbles (the one sanctioned use of
// WA colours outside a phone). Full-width three-up; perspective scatter (M3).
//
// NOTE for the client: still the three §6.9 quotes as styled DOM. If you have
// real screenshots they'll outperform these — and confirm Tunde, Ada and David
// consent to public use of their names and cities (§12.4).
const QUOTES = [
  { q: 'Sent money to Ghana in 2 minutes. No stress.', a: 'Tunde', city: 'Lagos', t: '11:24' },
  { q: 'Best way to pay my Kenyan team.', a: 'Ada', city: 'Abuja', t: '14:07' },
  { q: 'Way easier than my bank.', a: 'David', city: 'Nairobi', t: '17:52' },
];

export default function Testimonials() {
  return (
    <section className="section-pad gutter relative overflow-hidden bg-vx-void" aria-labelledby="testi-h">
      <span className="split-watermark font-display" data-text="REAL" aria-hidden="true" />
      <div className="content-col relative">
        <div data-reveal-group className="max-w-[46ch]">
          <p data-reveal className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-vx-olive">
            Social proof
          </p>
          <h2 id="testi-h" data-reveal className="font-display text-display-lg mt-5 font-bold text-vx-bone">
            People are already using <span className="text-vx-olive">VIXA</span>
          </h2>
        </div>

        <div data-scatter-group className="mt-14 grid gap-7 md:grid-cols-3">
          {QUOTES.map((item) => (
            <figure key={item.a} data-scatter>
              <blockquote className="relative rounded-[16px] rounded-bl-[5px] bg-wa-in px-4 pb-4 pt-3 text-[15.5px] leading-relaxed text-wa-text shadow-[0_14px_36px_-18px_rgba(15,25,18,0.45)]">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] bottom-0 h-0 w-0 border-b-[9px] border-r-[9px] border-b-wa-in border-r-transparent"
                />
                “{item.q}”
                <span
                  aria-hidden="true"
                  className="mt-2 flex items-center justify-end gap-1 text-[11px] leading-none text-wa-meta"
                >
                  {item.t}
                  <svg viewBox="0 0 18 11" width="16" height="10" fill="none" className="text-wa-tick">
                    <path d="M1.5 6l3 3L10 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 6.7L9.8 9 16.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </blockquote>
              <figcaption className="mt-3.5 text-[14px] text-vx-ash">
                <strong className="font-semibold text-vx-bone">{item.a}</strong> · {item.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
