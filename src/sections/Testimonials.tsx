// §6.9 — testimonials styled as WhatsApp incoming bubbles (the sole sanctioned
// use of WA colors outside the phone). Perspective scatter (M3).
// NOTE for client: built as styled DOM from the three §6.9 quotes. If real
// WhatsApp screenshots exist, swap them in — and confirm Tunde, Ada and David
// consent to public use of their names and cities (§12.4).
const QUOTES = [
  { q: 'Sent money to Ghana in 2 minutes. No stress.', a: 'Tunde, Lagos', t: '11:24' },
  { q: 'Best way to pay my Kenyan team.', a: 'Ada, Abuja', t: '14:07' },
  { q: 'Way easier than my bank.', a: 'David, Nairobi', t: '17:52' },
];

export default function Testimonials() {
  return (
    <section className="section-pad gutter" aria-labelledby="testi-h">
      <div className="content-col">
        <div data-reveal-group>
          <h2 id="testi-h" data-reveal className="font-display text-display-lg font-bold">
            People are already using <span className="text-vx-lime">VIXA</span>
          </h2>
        </div>
        <div data-scatter-group className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((item) => (
            <figure key={item.a} data-scatter className="relative">
              <blockquote className="relative max-w-full rounded-[7.5px] rounded-tl-none bg-wa-in px-4 pb-4 pt-3 text-[15px] leading-relaxed text-wa-text shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                <span
                  aria-hidden="true"
                  className="absolute -left-2 top-0 h-0 w-0 border-r-8 border-t-8 border-r-transparent border-t-wa-in"
                />
                “{item.q}”
                <span aria-hidden="true" className="mt-2 flex items-center justify-end gap-1 text-[11px] leading-none text-wa-meta">
                  {item.t}
                  <svg viewBox="0 0 18 11" width="16" height="10" fill="none" className="text-wa-tick" aria-hidden="true">
                    <path d="M1.5 6l3 3L10 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 6.7L9.8 9 16.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </blockquote>
              <figcaption className="mt-3 text-[14px] font-medium text-vx-ash">— {item.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
