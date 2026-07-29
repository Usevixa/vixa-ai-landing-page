// §6.10 — comparison table. VIXA column: olive 0.14 bg, olive border, and
// translateZ(40px) forward in the parent's perspective. Desktop = real table;
// below 768px it transposes to stacked per-feature cards (never h-scroll).
const ROWS = [
  { f: 'Speed', banks: 'Slow', apps: 'Medium', vixa: '⚡ Instant' },
  { f: 'Ease', banks: 'Complex', apps: 'Technical', vixa: '✅ Just chat' },
  { f: 'Accessibility', banks: 'Limited', apps: 'App needed', vixa: '✅ WhatsApp' },
  { f: 'Control', banks: 'Medium', apps: 'Medium', vixa: '🔒 PIN-based' },
];

const EMOJI_LABELS: Record<string, string> = { '⚡': 'instant', '✅': 'yes', '🔒': 'secure' };

function Cell({ text }: { text: string }) {
  const m = text.match(/^(⚡|✅|🔒)\s*(.*)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      <span role="img" aria-label={EMOJI_LABELS[m[1]]}>
        {m[1]}
      </span>{' '}
      {m[2]}
    </>
  );
}

export default function Comparison() {
  return (
    <section className="section-pad gutter relative overflow-hidden bg-vx-mint" aria-labelledby="cmp-h">
      <div className="content-col">
        <div data-reveal-group>
          <h2 id="cmp-h" data-reveal className="font-display text-display-lg font-bold">
            Why VIXA beats banks &amp; apps
          </h2>

          {/* desktop table */}
          <div className="mt-14 hidden md:block" style={{ perspective: '1400px' }}>
            <table className="w-full border-separate border-spacing-0 text-left">
              <thead>
                <tr data-reveal className="text-[14px] uppercase tracking-[0.14em] text-vx-ash">
                  <th scope="col" className="border-b border-vx-slate px-5 py-4 font-medium">Feature</th>
                  <th scope="col" className="border-b border-vx-slate px-5 py-4 font-medium">Banks</th>
                  <th scope="col" className="border-b border-vx-slate px-5 py-4 font-medium">Crypto Apps</th>
                  <th
                    scope="col"
                    className="cmp-vixa border border-b-vx-olive border-l-vx-olive border-r-vx-olive border-t-vx-olive bg-vx-olive/[0.09] px-5 py-4 font-semibold text-vx-bone"
                    style={{ transform: 'translateZ(40px)', borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
                  >
                    VIXA
                  </th>
                </tr>
              </thead>
              <tbody className="text-[15.5px]">
                {ROWS.map((r, i) => (
                  <tr data-reveal key={r.f}>
                    <th scope="row" className="border-b border-vx-slate px-5 py-4 font-medium text-vx-bone">{r.f}</th>
                    <td className="border-b border-vx-slate px-5 py-4 text-vx-ash">{r.banks}</td>
                    <td className="border-b border-vx-slate px-5 py-4 text-vx-ash">{r.apps}</td>
                    <td
                      className="border-b border-l border-r border-vx-olive bg-vx-olive/[0.09] px-5 py-4 font-medium"
                      style={{
                        transform: 'translateZ(40px)',
                        ...(i === ROWS.length - 1
                          ? { borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }
                          : {}),
                      }}
                    >
                      <Cell text={r.vixa} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile: transposed per-feature cards (§6.10) */}
          <div className="mt-12 flex flex-col gap-5 md:hidden">
            {ROWS.map((r) => (
              <article key={r.f} data-reveal className="rounded-card border border-vx-slate bg-white p-5">
                <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-vx-ash">{r.f}</h3>
                <dl className="mt-3 flex flex-col gap-2 text-[15px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-vx-ash">Banks</dt>
                    <dd>{r.banks}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-vx-ash">Crypto Apps</dt>
                    <dd>{r.apps}</dd>
                  </div>
                  <div className="-mx-2 flex justify-between gap-4 rounded-[8px] border border-vx-olive bg-vx-olive/[0.09] px-2 py-1.5 font-medium">
                    <dt>VIXA</dt>
                    <dd>
                      <Cell text={r.vixa} />
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
