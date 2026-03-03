import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const countries = [
  { label: "Nigeria", x: 38, y: 44, bank: true, mobile: false, currency: "NGN" },
  { label: "Kenya", x: 68, y: 52, bank: true, mobile: false, currency: "KES" },
  { label: "South Africa", x: 52, y: 82, bank: true, mobile: false, currency: "ZAR" },
  { label: "Senegal", x: 22, y: 38, bank: false, mobile: false, currency: "XOF", comingSoon: true },
  { label: "Mali", x: 30, y: 35, bank: false, mobile: false, currency: "XOF" },
  { label: "Burkina Faso", x: 32, y: 40, bank: false, mobile: false, currency: "XOF" },
  { label: "Ivory Coast", x: 27, y: 45, bank: true, mobile: false, currency: "XOF" },
  { label: "Togo", x: 34, y: 46, bank: true, mobile: false, currency: "XOF" },
  { label: "Benin", x: 36, y: 46, bank: true, mobile: false, currency: "XOF" },
  { label: "Cameroon", x: 42, y: 50, bank: true, mobile: false, currency: "XAF" },
  { label: "Gabon", x: 42, y: 56, bank: true, mobile: false, currency: "XAF" },
  { label: "Congo Brazzaville", x: 46, y: 58, bank: true, mobile: false, currency: "XAF" },
  { label: "Uganda", x: 62, y: 52, bank: true, mobile: true, currency: "UGX" },
  { label: "Rwanda", x: 60, y: 56, bank: true, mobile: true, currency: "RWF" },
  { label: "Tanzania", x: 64, y: 60, bank: true, mobile: true, currency: "TZS" },
  { label: "Malawi", x: 62, y: 66, bank: true, mobile: true, currency: "MWK" },
  { label: "Zambia", x: 56, y: 68, bank: false, mobile: false, currency: "ZMW" },
  { label: "Botswana", x: 52, y: 76, bank: true, mobile: true, currency: "BWP" },
];

const connections = [
  // West Africa chain
  [22, 38, 30, 35], [30, 35, 32, 40], [32, 40, 27, 45], [27, 45, 34, 46],
  [34, 46, 36, 46], [36, 46, 38, 44], [38, 44, 42, 50],
  // Central
  [42, 50, 42, 56], [42, 56, 46, 58],
  // East Africa chain
  [62, 52, 68, 52], [62, 52, 60, 56], [60, 56, 64, 60], [64, 60, 62, 66],
  // Southern chain
  [62, 66, 56, 68], [56, 68, 52, 82], [52, 82, 52, 76],
  // Cross-continental links
  [38, 44, 68, 52], [46, 58, 62, 52], [56, 68, 46, 58],
];

const AfricaNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const buildTooltipLines = (c: typeof countries[0]) => {
    const lines: string[] = [c.label];
    const rails: string[] = [];
    if (c.bank) rails.push("Bank");
    if (c.mobile) rails.push("Mobile Money");
    if (c.comingSoon) rails.push("Coming Soon");
    if (rails.length) lines.push(rails.join(" • "));
    if (c.currency) lines.push(c.currency);
    return lines;
  };

  return (
    <section className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-3 text-center">
            Local rails. Intelligent execution.
          </h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-2">
            Real coverage across Africa — bank transfers, mobile money, and stablecoin settlement where it matters.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={80}>
          <div className="relative w-full max-w-5xl mx-auto aspect-[4/4] sm:aspect-[4/3.5] mt-6">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Africa silhouette — bold filled */}
              <path
                d="M30 12 C26 14 23 18 21 23 C19 28 18 33 17 38 C16 43 15 48 16 53 C17 58 19 63 22 68 C25 73 28 77 32 81 C36 85 40 88 45 89 C50 90 55 88 59 84 C63 80 66 75 68 69 C70 63 71 57 70 51 C69 45 67 39 64 34 C61 29 57 24 52 20 C47 16 42 13 37 12 C34 11 32 11 30 12Z"
                fill="hsl(var(--primary))"
                fillOpacity="0.06"
                stroke="hsl(var(--primary))"
                strokeWidth="0.8"
                opacity="0.35"
              />

              {/* Connection lines + traveling dots */}
              {connections.map(([x1, y1, x2, y2], i) => (
                <g key={`conn-${i}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth="0.22" opacity="0.18" />
                  <circle r="0.45" fill="hsl(var(--primary))" opacity="0.5">
                    <animateMotion dur={`${6 + (i % 3) * 2}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                      <mpath xlinkHref={`#path-${i}`} />
                    </animateMotion>
                  </circle>
                  <path id={`path-${i}`} d={`M${x1},${y1} L${x2},${y2}`} fill="none" />
                </g>
              ))}

              {/* Country nodes */}
              {countries.map((c, i) => {
                const isHovered = hoveredNode === i;
                const tooltipLines = buildTooltipLines(c);
                const hasBank = c.bank;
                const hasMobile = c.mobile;

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredNode(i)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulse ring */}
                    <circle cx={c.x} cy={c.y} r={isHovered ? 3 : 2.2} fill="hsl(var(--primary))" opacity="0.10">
                      <animate attributeName="opacity" values="0.06;0.25;0.06" dur="3s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                      <animate attributeName="r" values={isHovered ? "3;3.8;3" : "2.2;2.8;2.2"} dur="3s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                    </circle>

                    {/* Core dot */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={hasBank && hasMobile ? 1.2 : hasBank ? 0.9 : 0.65}
                      fill={c.comingSoon ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))"}
                      opacity={c.comingSoon ? 0.5 : 1}
                    />

                    {/* Always-visible country label */}
                    <text
                      x={c.x}
                      y={c.y - 3}
                      textAnchor="middle"
                      fontSize="1.8"
                      fontWeight="800"
                      fill="hsl(var(--foreground))"
                      opacity={isHovered ? 1 : 0.6}
                      style={{ transition: "opacity 0.2s" }}
                    >
                      {c.label}
                    </text>

                    {/* Hover tooltip card */}
                    {isHovered && (
                      <g>
                        <rect
                          x={c.x - 14}
                          y={c.y + 2.5}
                          width="28"
                          height={3 + tooltipLines.length * 2.8}
                          rx="1.5"
                          fill="hsl(var(--card))"
                          stroke="hsl(var(--border))"
                          strokeWidth="0.2"
                          filter="url(#tooltip-shadow)"
                        />
                        {tooltipLines.map((line, li) => (
                          <text
                            key={li}
                            x={c.x}
                            y={c.y + 5.3 + li * 2.8}
                            textAnchor="middle"
                            fontSize={li === 0 ? "2.2" : "1.7"}
                            fontWeight={li === 0 ? "800" : "600"}
                            fill={li === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Shadow filter for tooltips */}
              <defs>
                <filter id="tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="0.6" floodOpacity="0.10" />
                </filter>
              </defs>
            </svg>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={160}>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 text-xs sm:text-sm font-heading font-bold text-foreground/50">
            {["18-country coverage", "Stablecoin core", "Instant where available", "PIN-gated"].map((t, i) => (
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
