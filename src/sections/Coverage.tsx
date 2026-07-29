// §6.8 — coverage. Copy left, a real map of Africa on the right with VIXA's
// live markets picked out. (The earlier flag scatter read as decoration; a map
// reads as coverage.) The marquee underneath still names all 19.
import SplitSection from '../components/SplitSection';
import AfricaMap from '../components/AfricaMap';
import { ACTIVE_MARKERS } from '../data/africaMap';

const NAMES = ACTIVE_MARKERS.map((m) => m.name);

export default function Coverage() {
  return (
    <SplitSection
      id="coverage"
      labelledBy="cov-h"
      tone="sky"
      watermark="REACH"
      eyebrow="Coverage"
      heading={
        <>
          Across <span className="text-vx-olive">{ACTIVE_MARKERS.length}</span> African countries
        </>
      }
      body={
        <>
          <p>Send and receive money seamlessly across borders — bank, mobile money, or wallet.</p>

          {/* country marquee — names every market the map only dots */}
          <div
            className="relative mt-8 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, black 78%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, black 78%, transparent)',
            }}
          >
            <ul
              className="marquee-track flex w-max gap-7 whitespace-nowrap py-1"
              aria-label="Countries served"
            >
              {[...NAMES, ...NAMES].map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  aria-hidden={i >= NAMES.length || undefined}
                  className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-vx-ash"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </>
      }
      visual={<AfricaMap />}
    />
  );
}
