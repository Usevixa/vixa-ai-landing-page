import { useState, useMemo, useEffect, useRef } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import { motion } from "framer-motion";

const AFRICA_GEOJSON: GeoPermissibleObjects = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [[
      [-17.5, 37.1], [-5, 36], [10, 37], [11.5, 33], [25, 32], [32, 31.5],
      [34, 27], [37, 24], [38, 20], [43, 12], [51, 12], [51, 8],
      [49, 7], [44, 2], [42, -1], [41, -2], [40.5, -5], [40, -11],
      [36, -18], [35, -22], [33, -26], [30, -30], [28, -33],
      [25, -34], [20, -35], [18, -34], [16, -29], [14, -24],
      [12, -18], [10, -12], [8, -5], [6, 0], [5, 4],
      [1, 5], [-1, 5], [-5, 5], [-8, 4], [-13, 5],
      [-17, 5], [-17, 11], [-16, 13], [-17, 15], [-16.5, 19],
      [-17, 21], [-13, 24], [-13, 28], [-10, 30], [-6, 32],
      [-2, 35], [-5, 36], [-17.5, 37.1]
    ]]
  }
};

interface Country {
  name: string;
  code: string;
  lat: number;
  lon: number;
  bank: boolean;
  mobile: boolean;
  currency: string;
  comingSoon?: boolean;
  networkName?: string;
}

const countries: Country[] = [
  { name: "Senegal", code: "SN", lat: 14.7167, lon: -17.4677, bank: false, mobile: false, currency: "XOF", comingSoon: true },
  { name: "Mali", code: "ML", lat: 12.6392, lon: -8.0029, bank: false, mobile: false, currency: "XOF", comingSoon: true },
  { name: "Burkina Faso", code: "BF", lat: 12.3714, lon: -1.5197, bank: false, mobile: false, currency: "XOF", comingSoon: true },
  { name: "Côte d'Ivoire", code: "CI", lat: 6.8276, lon: -5.2893, bank: false, mobile: true, currency: "XOF", networkName: "Mobile Money" },
  { name: "Togo", code: "TG", lat: 6.1725, lon: 1.2314, bank: false, mobile: true, currency: "XOF", networkName: "Mobile Money" },
  { name: "Benin", code: "BJ", lat: 6.4969, lon: 2.6289, bank: false, mobile: true, currency: "XOF", networkName: "Mobile Money" },
  { name: "Nigeria", code: "NG", lat: 9.0765, lon: 7.3986, bank: true, mobile: false, currency: "NGN" },
  { name: "Cameroon", code: "CM", lat: 3.848, lon: 11.5021, bank: false, mobile: true, currency: "XAF", networkName: "Mobile Money" },
  { name: "Gabon", code: "GA", lat: 0.4162, lon: 9.4673, bank: true, mobile: false, currency: "XAF", comingSoon: true },
  { name: "Congo Brazzaville", code: "CG", lat: -4.2634, lon: 15.2429, bank: false, mobile: true, currency: "XAF", networkName: "Mobile Money" },
  { name: "Ethiopia", code: "ET", lat: 9.0249, lon: 38.7469, bank: true, mobile: false, currency: "USD" },
  { name: "Rwanda", code: "RW", lat: -1.9706, lon: 30.1044, bank: true, mobile: true, currency: "RWF", networkName: "Mobile Money" },
  { name: "Uganda", code: "UG", lat: 0.3476, lon: 32.5825, bank: true, mobile: true, currency: "UGX", networkName: "Mobile Money" },
  { name: "Kenya", code: "KE", lat: -1.2921, lon: 36.8219, bank: true, mobile: true, currency: "KES", networkName: "M-Pesa" },
  { name: "Tanzania", code: "TZ", lat: -6.163, lon: 35.7516, bank: true, mobile: true, currency: "TZS", networkName: "Mobile Money" },
  { name: "Malawi", code: "MW", lat: -13.9626, lon: 33.7741, bank: true, mobile: true, currency: "MWK", networkName: "Mobile Money" },
  { name: "Zambia", code: "ZM", lat: -15.3875, lon: 28.3228, bank: false, mobile: true, currency: "ZMW", networkName: "Mobile Money" },
  { name: "Botswana", code: "BW", lat: -24.6282, lon: 25.9231, bank: true, mobile: true, currency: "BWP", networkName: "Mobile Money" },
  { name: "South Africa", code: "ZA", lat: -25.7479, lon: 28.2293, bank: true, mobile: false, currency: "ZAR" },
];

const connectionPairs: [string, string][] = [
  ["SN", "ML"], ["ML", "BF"], ["BF", "CI"], ["CI", "TG"],
  ["TG", "BJ"], ["BJ", "NG"], ["NG", "CM"], ["CM", "GA"], ["GA", "CG"],
  ["RW", "UG"], ["UG", "KE"], ["UG", "ET"], ["KE", "ET"], ["KE", "TZ"],
  ["TZ", "MW"], ["MW", "ZM"], ["ZM", "BW"], ["BW", "ZA"],
  ["NG", "KE"], ["CG", "TZ"], ["ZM", "TZ"], ["CG", "RW"],
];

const labelOffsets: Record<string, [number, number]> = {
  SN: [-8, -6], ML: [0, -7], BF: [6, -6], CI: [-10, 4],
  TG: [5, 6], BJ: [6, -5], NG: [6, -5],
  CM: [6, 5], GA: [-8, 4], CG: [-6, 6],
  ET: [7, -5], RW: [7, -3], UG: [6, -5], KE: [7, 3], TZ: [8, 4],
  MW: [7, -3], ZM: [-8, 4], BW: [-9, 3], ZA: [7, 4],
};

const SVG_W = 500;
const SVG_H = 600;

const AfricaNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { africaPath, projected, centroid } = useMemo(() => {
    const proj = geoMercator().fitSize([SVG_W, SVG_H], AFRICA_GEOJSON as any);
    const pathGen = geoPath(proj);
    const d = pathGen(AFRICA_GEOJSON) || "";
    const c = pathGen.centroid(AFRICA_GEOJSON as any);
    const pts = countries.map((country) => {
      const [x, y] = proj([country.lon, country.lat]) || [0, 0];
      return { ...country, x, y };
    });
    return { africaPath: d, projected: pts, centroid: c };
  }, []);

  const countryMap = useMemo(() => {
    const m: Record<string, { x: number; y: number }> = {};
    projected.forEach((p) => { m[p.code] = { x: p.x, y: p.y }; });
    return m;
  }, [projected]);

  const getCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const offset = len * 0.15;
    const nx = -dy / len * offset;
    const ny = dx / len * offset;
    return `M${x1},${y1} Q${mx + nx},${my + ny} ${x2},${y2}`;
  };

  return (
    <section ref={sectionRef} className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground leading-[0.92] mb-3 uppercase">
            Local Rails.<br />Intelligent Execution.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Powered across 19 African countries.
          </p>
        </motion.div>

        <div className="relative w-full max-w-3xl mx-auto mt-4">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-auto"
            style={{ overflow: "visible" }}
          >
            <defs>
              <clipPath id="africa-clip">
                <path d={africaPath} />
              </clipPath>
              <radialGradient id="africa-gradient" cx={centroid[0] / SVG_W} cy={centroid[1] / SVG_H} r="0.5">
                <stop offset="0%" stopColor="hsl(75, 85%, 55%)" stopOpacity="0.08" />
                <stop offset="60%" stopColor="hsl(75, 85%, 55%)" stopOpacity="0.02" />
                <stop offset="100%" stopColor="hsl(75, 85%, 55%)" stopOpacity="0" />
              </radialGradient>
              <pattern id="dot-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="0.5" fill="hsl(75, 85%, 55%)" opacity="0.06" />
              </pattern>
              <filter id="africa-inner-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
                <feFlood floodColor="hsl(75, 85%, 55%)" floodOpacity="0.06" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                <feOffset dy="2" result="offset" />
                <feFlood floodColor="#000" floodOpacity="0.3" result="color" />
                <feComposite in="color" in2="offset" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Africa silhouette */}
            <g filter="url(#africa-inner-glow)">
              <path d={africaPath} fill="url(#africa-gradient)" stroke="hsl(75, 85%, 55%)" strokeWidth="1" strokeOpacity="0.15" />
              <path d={africaPath} fill="url(#dot-grid)" clipPath="url(#africa-clip)" />
            </g>

            {/* Curved connections */}
            <g clipPath="url(#africa-clip)">
              {connectionPairs.map(([a, b], i) => {
                const from = countryMap[a];
                const to = countryMap[b];
                if (!from || !to) return null;
                const pathD = getCurvedPath(from.x, from.y, to.x, to.y);
                const length = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2) * 1.2;
                return (
                  <g key={`line-${i}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke="hsl(75, 85%, 55%)"
                      strokeWidth="0.6"
                      strokeOpacity="0.12"
                      strokeDasharray={length}
                      strokeDashoffset={isVisible ? 0 : length}
                      style={{ transition: `stroke-dashoffset 1.5s ease-out ${0.3 + i * 0.08}s` }}
                    />
                    {isVisible && (
                      <circle r="1.5" fill="hsl(75, 85%, 55%)" opacity="0.3">
                        <animateMotion dur={`${5 + (i % 3) * 2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} path={pathD} />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Country nodes */}
            {projected.map((c, i) => {
              const isHovered = hoveredNode === c.code;
              const offset = labelOffsets[c.code] || [0, -7];
              const r = c.bank && c.mobile ? 6 : c.bank || c.mobile ? 5 : 4;
              const dotColor = c.comingSoon ? "hsl(40, 90%, 55%)" : "hsl(75, 85%, 55%)";

              return (
                <g
                  key={c.code}
                  onMouseEnter={() => setHoveredNode(c.code)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.5)",
                    transformOrigin: `${c.x}px ${c.y}px`,
                    transition: `opacity 0.5s ease-out ${0.2 + i * 0.06}s, transform 0.5s ease-out ${0.2 + i * 0.06}s`,
                  }}
                >
                  {!c.comingSoon && (
                    <circle cx={c.x} cy={c.y} r={r + 4} fill={dotColor} opacity="0">
                      <animate attributeName="r" values={`${r};${r + 8};${r}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                      <animate attributeName="opacity" values="0.1;0;0.1" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    </circle>
                  )}
                  <circle cx={c.x} cy={c.y} r={r + 2} fill={dotColor} fillOpacity="0.06" stroke={dotColor} strokeWidth="0.5" strokeOpacity="0.15" />
                  <circle cx={c.x} cy={c.y} r={r} fill={dotColor} opacity={c.comingSoon ? 0.5 : 0.85} />

                  <text
                    x={c.x + offset[0]}
                    y={c.y + offset[1]}
                    textAnchor={offset[0] < 0 ? "end" : offset[0] > 0 ? "start" : "middle"}
                    fontSize="10"
                    fontWeight="700"
                    fill="hsl(var(--foreground))"
                    opacity={isHovered ? 1 : 0.5}
                    style={{ transition: "opacity 0.2s", fontFamily: "inherit" }}
                  >
                    {c.name}
                  </text>

                  {isHovered && (
                    <g>
                      <rect
                        x={c.x - 68} y={c.y + 14}
                        width="136" height={c.comingSoon ? 38 : 48}
                        rx="8"
                        fill="hsl(var(--card))"
                        fillOpacity="0.95"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        filter="url(#card-shadow)"
                      />
                      <text x={c.x} y={c.y + 29} textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
                        {c.name} ({c.currency})
                      </text>
                      <text x={c.x} y={c.y + 43} textAnchor="middle" fontSize="9.5" fontWeight="600"
                        fill={c.comingSoon ? "hsl(40, 90%, 55%)" : "hsl(var(--muted-foreground))"}
                      >
                        {c.comingSoon ? "Coming Soon" : [c.bank && "Bank", c.mobile && (c.networkName || "Mobile Money")].filter(Boolean).join(" · ") || "—"}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 mb-3">
          {[
            { color: "hsl(75, 85%, 55%)", label: "Active" },
            { color: "hsl(40, 90%, 55%)", label: "Coming Soon", dim: true },
          ].map(({ color, label, dim }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs font-heading font-semibold text-muted-foreground">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, opacity: dim ? 0.55 : 0.85 }} />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm font-heading font-bold text-muted-foreground/60">
          {["19-country coverage", "Stablecoin core", "Instant where available", "PIN-gated"].map((t, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-border">•</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AfricaNetwork;
