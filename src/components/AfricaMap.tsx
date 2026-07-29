// Coverage map: real Africa geometry with VIXA's live markets picked out.
// Replaces the old scattered flag cluster — a map reads as coverage instantly,
// a pile of flags doesn't.
import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { MAP_W, MAP_H, COUNTRY_PATHS, ACTIVE_MARKERS } from '../data/africaMap';

const ACTIVE_IDS = new Set(ACTIVE_MARKERS.map((m) => m.id));

// Labelling all 19 collides badly in the West-African cluster; these seven are
// spatially separated and carry the story. The marquee underneath names them all.
const LABELLED: Record<string, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
  MAR: { dx: -14, dy: -14, anchor: 'end' },
  EGY: { dx: 16, dy: -14, anchor: 'start' },
  SEN: { dx: -14, dy: 2, anchor: 'end' },
  NGA: { dx: 0, dy: -20, anchor: 'middle' },
  ETH: { dx: 16, dy: -12, anchor: 'start' },
  KEN: { dx: 18, dy: 6, anchor: 'start' },
  ZAF: { dx: 0, dy: 30, anchor: 'middle' },
};

export default function AfricaMap() {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const markers = gsap.utils.toArray<SVGGElement>('.map-marker');
      gsap.set(markers, { opacity: 0, scale: 0.4, transformOrigin: 'center' });
      gsap.to(markers, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: { each: 0.055, from: 'random' },
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[620px]">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`Map of Africa showing the ${ACTIVE_MARKERS.length} countries where VIXA is live`}
      >
        {/* landmass */}
        <g>
          {COUNTRY_PATHS.map((c) => {
            const live = ACTIVE_IDS.has(c.id);
            return (
              <path
                key={c.id}
                d={c.d}
                fill={live ? 'rgba(31,107,63,0.16)' : '#E9EEEA'}
                stroke={live ? '#1F6B3F' : '#FFFFFF'}
                strokeWidth={live ? 2 : 1.6}
                strokeLinejoin="round"
              />
            );
          })}
        </g>

        {/* live-market markers */}
        <g>
          {ACTIVE_MARKERS.map((m) => {
            const label = LABELLED[m.id];
            return (
              <g key={m.id} className="map-marker">
                <circle
                  className="map-pulse"
                  cx={m.x}
                  cy={m.y}
                  r={13}
                  fill="#1F6B3F"
                  opacity={0.22}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
                <circle cx={m.x} cy={m.y} r={8.5} fill="#FFFFFF" />
                <circle cx={m.x} cy={m.y} r={6} fill="#1F6B3F" />
                {label && (
                  <text
                    x={m.x + label.dx}
                    y={m.y + label.dy}
                    textAnchor={label.anchor}
                    className="font-body"
                    fontSize="25"
                    fontWeight="600"
                    fill="#0F1912"
                    stroke="#FFFFFF"
                    strokeWidth="5"
                    paintOrder="stroke"
                    strokeLinejoin="round"
                  >
                    {m.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
