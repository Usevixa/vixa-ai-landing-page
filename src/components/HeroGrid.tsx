// §3 background grid: one inline SVG — 72px hairline cells at 0.10, plus
// hand-placed olive cells stepping 0.04/0.07/0.12. Irregular by design;
// concentrated in the lower 60%, fading to nothing by the fold (mask).
const CELLS: Array<[col: number, row: number, o: 0.04 | 0.07 | 0.12]> = [
  [2, 8, 0.07], [4, 11, 0.04], [1, 12, 0.12], [6, 9, 0.04], [3, 6, 0.04],
  [7, 12, 0.07], [5, 13, 0.12], [9, 10, 0.04], [11, 13, 0.07], [8, 7, 0.04],
  [13, 9, 0.12], [15, 11, 0.04], [12, 12, 0.04], [17, 13, 0.07], [16, 8, 0.04],
  [18, 10, 0.12], [14, 6, 0.04], [19, 12, 0.04], [10, 5, 0.04], [0, 10, 0.04],
];

export default function HeroGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 2%, rgba(0,0,0,0.85) 42%, black 72%, transparent 99%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 2%, rgba(0,0,0,0.85) 42%, black 72%, transparent 99%)',
      }}
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full"
        viewBox="0 0 1440 1008"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <pattern id="vx-grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M72 0H0v72" fill="none" stroke="#2E2E27" strokeOpacity="0.55" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="1008" fill="url(#vx-grid)" opacity="0.18" />
        {CELLS.map(([c, r, o], i) => (
          <rect key={i} x={c * 72} y={r * 72} width="72" height="72" fill="#7E8B3D" fillOpacity={o} />
        ))}
      </svg>
    </div>
  );
}
