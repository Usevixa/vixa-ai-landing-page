// §6.7 — quieter than 6.4: smaller cards, no hover lift. Trust sits still.
// Icons: single-weight 1.5px stroke, olive, inline SVG (§6.7).
const ICONS: Record<string, React.ReactNode> = {
  pin: (
    <>
      <rect x="4" y="9" width="16" height="12" rx="2.5" />
      <path d="M8 9V6.5a4 4 0 0 1 8 0V9" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  identity: (
    <>
      <circle cx="9.5" cy="9" r="3.2" />
      <path d="M4 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M15.5 9.5l2 2 3.5-4" />
    </>
  ),
  risk: (
    <>
      <path d="M12 3.5l7.5 3.5v5c0 4.5-3.2 7.6-7.5 8.5-4.3-.9-7.5-4-7.5-8.5v-5z" />
      <path d="M12 8.5v4.5" />
      <circle cx="12" cy="16" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  audit: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
    </>
  ),
};

const ITEMS = [
  { icon: 'pin', h: 'PIN Required', b: 'Every transaction needs your confirmation.' },
  { icon: 'identity', h: 'Identity Verified', b: 'Only real users. Full compliance.' },
  { icon: 'risk', h: 'Risk Monitoring', b: 'Suspicious activity is automatically flagged.' },
  { icon: 'audit', h: 'Audit Trail', b: 'Every transaction is recorded and traceable.' },
];

export default function TrustSecurity() {
  return (
    <section className="section-pad gutter" aria-labelledby="trust-h">
      <div className="content-col">
        <div data-reveal-group>
          <h2 id="trust-h" data-reveal className="font-display text-display-lg font-bold">
            Money doesn't move <span className="text-vx-lime">without you</span>
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {ITEMS.map((it) => (
              <article
                key={it.h}
                data-reveal
                className="flex items-start gap-4 rounded-card border border-vx-slate bg-vx-char/60 p-6"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#7E8B3D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                >
                  {ICONS[it.icon]}
                </svg>
                <div>
                  <h3 className="text-[17px] font-semibold">{it.h}</h3>
                  <p className="mt-1.5 text-[15px] text-vx-ash">{it.b}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
