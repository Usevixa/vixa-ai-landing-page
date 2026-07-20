// §6.8 — centered copy, 19 flag discs parallaxing at explicit depths (M4),
// country-name marquee below (CSS animation only, paused on reduced motion).
const COUNTRIES: Array<{ cc: string; name: string; x: number; y: number; depth: number; mob?: boolean }> = [
  { cc: 'ng', name: 'Nigeria', x: 6, y: 18, depth: 0.9, mob: true },
  { cc: 'ke', name: 'Kenya', x: 14, y: 62, depth: 0.4, mob: true },
  { cc: 'gh', name: 'Ghana', x: 9, y: 40, depth: 0.7 },
  { cc: 'za', name: 'South Africa', x: 88, y: 24, depth: 0.8, mob: true },
  { cc: 'tz', name: 'Tanzania', x: 93, y: 55, depth: 0.35, mob: true },
  { cc: 'ug', name: 'Uganda', x: 82, y: 74, depth: 0.6 },
  { cc: 'rw', name: 'Rwanda', x: 22, y: 84, depth: 0.5 },
  { cc: 'et', name: 'Ethiopia', x: 76, y: 8, depth: 0.55, mob: true },
  { cc: 'sn', name: 'Senegal', x: 30, y: 10, depth: 0.3 },
  { cc: 'ci', name: "Côte d'Ivoire", x: 4, y: 78, depth: 0.85 },
  { cc: 'cm', name: 'Cameroon', x: 68, y: 88, depth: 0.75, mob: true },
  { cc: 'bj', name: 'Benin', x: 38, y: 90, depth: 0.25 },
  { cc: 'tg', name: 'Togo', x: 60, y: 4, depth: 0.45 },
  { cc: 'zm', name: 'Zambia', x: 95, y: 38, depth: 0.65 },
  { cc: 'zw', name: 'Zimbabwe', x: 87, y: 90, depth: 0.2 },
  { cc: 'mw', name: 'Malawi', x: 18, y: 28, depth: 0.15 },
  { cc: 'bw', name: 'Botswana', x: 46, y: 6, depth: 0.6 },
  { cc: 'eg', name: 'Egypt', x: 70, y: 30, depth: 0.15 },
  { cc: 'ma', name: 'Morocco', x: 26, y: 52, depth: 0.95, mob: true },
];

export default function Coverage() {
  return (
    <section id="coverage" className="section-pad gutter overflow-x-clip" aria-labelledby="cov-h">
      <div className="content-col">
        <div data-parallax-field className="relative py-24 md:py-32">
          {/* flag field */}
          <div aria-hidden="true" className="absolute inset-0">
            {COUNTRIES.map((c) => (
              <img
                key={c.cc}
                src={`/flags/${c.cc}.svg`}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                data-depth={c.depth}
                className={`absolute h-9 w-9 rounded-full saturate-[0.4] transition-[filter] duration-300 hover:saturate-100 ${c.mob ? '' : 'hidden md:block'}`}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
              />
            ))}
          </div>

          <div data-reveal-group className="relative text-center">
            <h2 id="cov-h" data-reveal className="font-display text-display-lg font-bold">
              Across <span className="text-vx-lime" data-counter="19">19</span> African countries
            </h2>
            <p data-reveal className="text-body-lg mx-auto mt-5 max-w-[44ch] text-vx-ash">
              Send and receive money seamlessly across borders.
            </p>
          </div>
        </div>

        {/* marquee of country names */}
        <div
          className="relative mt-6 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <ul className="marquee-track flex w-max gap-10 whitespace-nowrap py-2" aria-label="Countries">
            {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <li
                key={`${c.cc}-${i}`}
                aria-hidden={i >= COUNTRIES.length || undefined}
                className="text-eyebrow font-medium uppercase tracking-[0.14em] text-vx-ash"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
