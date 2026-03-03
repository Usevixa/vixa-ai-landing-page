import { useState, useMemo, useEffect, useRef } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import AnimatedSection from "@/components/AnimatedSection";

// Real Africa outline (simplified GeoJSON polygon)
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
}

const countries: Country[] = [
  { name: "Senegal", code: "SN", lat: 14.7167, lon: -17.4677, bank: false, mobile: false, currency: "XOF", comingSoon: true },
  { name: "Mali", code: "ML", lat: 12.6392, lon: -8.0029, bank: false, mobile: false, currency: "XOF" },
  { name: "Burkina Faso", code: "BF", lat: 12.3714, lon: -1.5197, bank: false, mobile: false, currency: "XOF" },
  { name: "Côte d'Ivoire", code: "CI", lat: 6.8276, lon: -5.2893, bank: true, mobile: false, currency: "XOF" },
  { name: "Ghana", code: "GH", lat: 5.6037, lon: -0.187, bank: false, mobile: false, currency: "GHS" },
  { name: "Togo", code: "TG", lat: 6.1725, lon: 1.2314, bank: true, mobile: false, currency: "XOF" },
  { name: "Benin", code: "BJ", lat: 6.4969, lon: 2.6289, bank: true, mobile: false, currency: "XOF" },
  { name: "Nigeria", code: "NG", lat: 9.0765, lon: 7.3986, bank: true, mobile: false, currency: "NGN" },
  { name: "Cameroon", code: "CM", lat: 3.848, lon: 11.5021, bank: true, mobile: false, currency: "XAF" },
  { name: "Gabon", code: "GA", lat: 0.4162, lon: 9.4673, bank: true, mobile: false, currency: "XAF" },
  { name: "Congo Brazzaville", code: "CG", lat: -4.2634, lon: 15.2429, bank: true, mobile: false, currency: "XAF" },
  { name: "DR Congo", code: "CD", lat: -4.4419, lon: 15.2663, bank: false, mobile: false, currency: "CDF" },
  { name: "Rwanda", code: "RW", lat: -1.9706, lon: 30.1044, bank: true, mobile: true, currency: "RWF" },
  { name: "Uganda", code: "UG", lat: 0.3476, lon: 32.5825, bank: true, mobile: true, currency: "UGX" },
  { name: "Kenya", code: "KE", lat: -1.2921, lon: 36.8219, bank: true, mobile: false, currency: "KES" },
  { name: "Tanzania", code: "TZ", lat: -6.163, lon: 35.7516, bank: true, mobile: true, currency: "TZS" },
  { name: "Malawi", code: "MW", lat: -13.9626, lon: 33.7741, bank: true, mobile: true, currency: "MWK" },
  { name: "Zambia", code: "ZM", lat: -15.3875, lon: 28.3228, bank: false, mobile: false, currency: "ZMW" },
  { name: "Botswana", code: "BW", lat: -24.6282, lon: 25.9231, bank: true, mobile: true, currency: "BWP" },
  { name: "South Africa", code: "ZA", lat: -25.7479, lon: 28.2293, bank: true, mobile: false, currency: "ZAR" },
];

// Connection pairs by country code
const connectionPairs: [string, string][] = [
  ["SN", "ML"], ["ML", "BF"], ["BF", "CI"], ["CI", "GH"], ["GH", "TG"],
  ["TG", "BJ"], ["BJ", "NG"], ["NG", "CM"], ["CM", "GA"], ["GA", "CG"],
  ["CG", "CD"], ["CD", "RW"], ["RW", "UG"], ["UG", "KE"], ["KE", "TZ"],
  ["TZ", "MW"], ["MW", "ZM"], ["ZM", "BW"], ["BW", "ZA"],
  // Cross links
  ["NG", "KE"], ["CG", "TZ"], ["ZM", "TZ"],
];

// Label offset directions to avoid overlaps
const labelOffsets: Record<string, [number, number]> = {
  SN: [-8, -6], ML: [0, -7], BF: [6, -6], CI: [-10, 4],
  GH: [-6, 6], TG: [5, 6], BJ: [6, -5], NG: [6, -5],
  CM: [6, 5], GA: [-8, 4], CG: [-6, 6], CD: [7, 6],
  RW: [7, -3], UG: [6, -5], KE: [7, 3], TZ: [8, 4],
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

  const { projection, africaPath, projected } = useMemo(() => {
    const proj = geoMercator().fitSize([SVG_W, SVG_H], AFRICA_GEOJSON as any);
    const pathGen = geoPath(proj);
    const d = pathGen(AFRICA_GEOJSON) || "";

    const pts = countries.map((c) => {
      const [x, y] = proj([c.lon, c.lat]) || [0, 0];
      return { ...c, x, y };
    });

    return { projection: proj, africaPath: d, projected: pts };
  }, []);

  const countryMap = useMemo(() => {
    const m: Record<string, { x: number; y: number }> = {};
    projected.forEach((p) => { m[p.code] = { x: p.x, y: p.y }; });
    return m;
  }, [projected]);

  return (
    <section ref={sectionRef} className="pt-0 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground leading-[0.92] mb-3 text-center">
            Local rails. Intelligent execution.
          </h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-2">
            Powered across Africa.
          </p>
        </AnimatedSection>

        <div className="relative w-full max-w-3xl mx-auto mt-8">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-auto"
            style={{ overflow: "visible" }}
          >
            <defs>
              <clipPath id="africa-clip">
                <path d={africaPath} />
              </clipPath>
              <filter id="node-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Africa silhouette */}
            <path
              d={africaPath}
              fill="#0E8F6A"
              fillOpacity="0.06"
              stroke="#0E8F6A"
              strokeWidth="1.5"
              strokeOpacity="0.15"
            />

            {/* Connection lines — clipped inside Africa */}
            <g clipPath="url(#africa-clip)">
              {connectionPairs.map(([a, b], i) => {
                const from = countryMap[a];
                const to = countryMap[b];
                if (!from || !to) return null;
                const length = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
                return (
                  <g key={`line-${i}`}>
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="#0E8F6A"
                      strokeWidth="0.8"
                      strokeOpacity="0.12"
                      strokeDasharray={length}
                      strokeDashoffset={isVisible ? 0 : length}
                      style={{
                        transition: `stroke-dashoffset 1.5s ease-out ${0.3 + i * 0.08}s`,
                      }}
                    />
                    {/* Traveling light */}
                    {isVisible && (
                      <circle r="2" fill="#0E8F6A" opacity="0.4">
                        <animateMotion
                          dur={`${4 + (i % 3) * 2}s`}
                          repeatCount="indefinite"
                          begin={`${i * 0.4}s`}
                          path={`M${from.x},${from.y} L${to.x},${to.y}`}
                        />
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
              const hasBank = c.bank;
              const hasMobile = c.mobile;
              const r = hasBank && hasMobile ? 6 : hasBank ? 5 : 4;

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
                  {/* Pulse ring */}
                  <circle cx={c.x} cy={c.y} r={r + 4} fill="#0E8F6A" opacity="0">
                    <animate attributeName="r" values={`${r};${r + 8};${r}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>

                  {/* Outer ring */}
                  <circle
                    cx={c.x} cy={c.y} r={r + 2}
                    fill="#0E8F6A" fillOpacity="0.1"
                    stroke="#0E8F6A" strokeWidth="0.5" strokeOpacity="0.2"
                  />

                  {/* Core dot */}
                  <circle
                    cx={c.x} cy={c.y} r={r}
                    fill={c.comingSoon ? "#9CA3AF" : "#0E8F6A"}
                    opacity={c.comingSoon ? 0.6 : 0.9}
                    style={{
                      transition: "r 0.2s, opacity 0.2s",
                    }}
                  />

                  {/* Label */}
                  <text
                    x={c.x + offset[0]}
                    y={c.y + offset[1]}
                    textAnchor={offset[0] < 0 ? "end" : offset[0] > 0 ? "start" : "middle"}
                    fontSize="10"
                    fontWeight="700"
                    fill="hsl(var(--foreground))"
                    opacity={isHovered ? 1 : 0.7}
                    style={{ transition: "opacity 0.2s", fontFamily: "inherit" }}
                  >
                    {c.name}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={c.x - 60}
                        y={c.y + 14}
                        width="120"
                        height={40}
                        rx="6"
                        fill="hsl(var(--card))"
                        stroke="hsl(var(--border))"
                        strokeWidth="1"
                        filter="url(#card-shadow)"
                      />
                      <text
                        x={c.x}
                        y={c.y + 30}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill="hsl(var(--foreground))"
                      >
                        {c.name} ({c.currency})
                      </text>
                      <text
                        x={c.x}
                        y={c.y + 44}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="600"
                        fill="hsl(var(--muted-foreground))"
                      >
                        {c.comingSoon
                          ? "Coming Soon"
                          : [c.bank && "Bank", c.mobile && "Mobile Money"].filter(Boolean).join(" • ") || "—"}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <AnimatedSection animation="fade-up" delay={160}>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-8 text-xs sm:text-sm font-heading font-bold text-foreground/50">
            {["20-country coverage", "Stablecoin core", "Instant where available", "PIN-gated"].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-border">•</span>}
                {t}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AfricaNetwork;
