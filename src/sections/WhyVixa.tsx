// §6.4 — 4 use-case cards, perspective scatter (M3), M5 header.
const CARDS = [
  { h: 'Send money home', b: 'Support family across borders in seconds.' },
  { h: 'Pay freelancers', b: 'Work with anyone across Africa without bank delays.' },
  { h: 'Run your business', b: 'Send and receive payments across countries easily.' },
  { h: 'Move crypto to cash', b: 'Convert USDT to local currency instantly.' },
];

export default function WhyVixa() {
  return (
    <section id="why" className="section-pad gutter" aria-labelledby="why-h">
      <div className="content-col">
        <div data-reveal-group>
          <h2 id="why-h" data-reveal className="font-display text-display-lg font-bold">
            Why people use VIXA
          </h2>
        </div>
        <div data-scatter-group className="mt-14 grid gap-6 md:grid-cols-2">
          {CARDS.map((c) => (
            <article
              key={c.h}
              data-scatter
              className="group rounded-card border border-vx-slate bg-vx-char p-8 transition-[border-color,transform] duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-vx-olive"
            >
              <h3 className="font-display text-title font-medium">{c.h}</h3>
              <p className="mt-2.5 text-vx-ash">{c.b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
