import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const countries = [
  { label: "Nigeria", x: 33, y: 42, bank: true, mobile: false, currency: "NGN" },
  { label: "Ghana", x: 27, y: 44, bank: true, mobile: false, currency: "GHS" },
  { label: "Kenya", x: 60, y: 50, bank: true, mobile: false, currency: "KES" },
  { label: "South Africa", x: 48, y: 80, bank: true, mobile: false, currency: "ZAR" },
  { label: "Senegal", x: 18, y: 36, bank: false, mobile: false, currency: "XOF", comingSoon: true },
  { label: "Mali", x: 26, y: 34, bank: false, mobile: false, currency: "XOF" },
  { label: "Burkina Faso", x: 28, y: 38, bank: false, mobile: false, currency: "XOF" },
  { label: "Ivory Coast", x: 24, y: 42, bank: true, mobile: false, currency: "XOF" },
  { label: "Togo", x: 30, y: 43, bank: true, mobile: false, currency: "XOF" },
  { label: "Benin", x: 31, y: 43, bank: true, mobile: false, currency: "XOF" },
  { label: "Cameroon", x: 36, y: 46, bank: true, mobile: false, currency: "XAF" },
  { label: "Gabon", x: 36, y: 52, bank: true, mobile: false, currency: "XAF" },
  { label: "Congo Brazzaville", x: 40, y: 54, bank: true, mobile: false, currency: "XAF" },
  { label: "DR Congo", x: 44, y: 56, bank: false, mobile: false, currency: "" },
  { label: "Uganda", x: 56, y: 50, bank: true, mobile: true, currency: "UGX" },
  { label: "Rwanda", x: 54, y: 54, bank: true, mobile: true, currency: "RWF" },
  { label: "Tanzania", x: 58, y: 58, bank: true, mobile: true, currency: "TZS" },
  { label: "Malawi", x: 56, y: 64, bank: true, mobile: true, currency: "MWK" },
  { label: "Zambia", x: 50, y: 66, bank: false, mobile: false, currency: "ZMW" },
  { label: "Botswana", x: 46, y: 74, bank: true, mobile: true, currency: "BWP" },
];

const connections = [
  [18, 36, 26, 34], [26, 34, 28, 38], [28, 38, 27, 44], [27, 44, 30, 43],
  [30, 43, 31, 43], [31, 43, 33, 42], [33, 42, 36, 46],
  [36, 46, 36, 52], [36, 52, 40, 54], [40, 54, 44, 56],
  [56, 50, 60, 50], [56, 50, 54, 54], [54, 54, 58, 58], [58, 58, 56, 64],
  [56, 64, 50, 66], [50, 66, 48, 80], [48, 80, 46, 74],
  [33, 42, 60, 50], [44, 56, 56, 50], [50, 66, 44, 56],
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
          <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] mt-6">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Africa silhouette */}
              <path
                d="M28 18 C22 20 18 26 16 32 C14 38 13 44 15 50 C17 56 19 62 22 67 C25 73 30 78 36 82 C40 85 46 87 50 86 C54 85 58 82 61 77 C63 72 65 66 64 60 C63 54 62 48 60 42 C58 36 56 30 52 25 C48 20 42 17 36 16 C32 15 30 17 28 18Z"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.4"
                opacity="0.08"
              />

              {/* Connection lines + traveling dots */}
              {connections.map(([x1, y1, x2, y2], i) => (
                <g key={`conn-${i}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth="0.18" opacity="0.13" />
                  <circle r="0.4" fill="hsl(var(--primary))" opacity="0.4">
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
                    <circle cx={c.x} cy={c.y} r={isHovered ? 2.8 : 2} fill="hsl(var(--primary))" opacity="0.10">
                      <animate attributeName="opacity" values="0.06;0.22;0.06" dur="3s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                      <animate attributeName="r" values={isHovered ? "2.8;3.4;2.8" : "2;2.6;2"} dur="3s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                    </circle>

                    {/* Core dot — larger for bank+mobile, medium for bank, smaller otherwise */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={hasBank && hasMobile ? 1.0 : hasBank ? 0.8 : 0.55}
                      fill={c.comingSoon ? "hsl(var(--muted-foreground))" : "hsl(var(--primary))"}
                      opacity={c.comingSoon ? 0.5 : 1}
                    />

                    {/* Always-visible country label */}
                    <text
                      x={c.x}
                      y={c.y - 2.6}
                      textAnchor="middle"
                      fontSize="1.6"
                      fontWeight="700"
                      fill="hsl(var(--foreground))"
                      opacity={isHovered ? 1 : 0.55}
                      style={{ transition: "opacity 0.2s" }}
                    >
                      {c.label}
                    </text>

                    {/* Hover tooltip card */}
                    {isHovered && (
                      <g>
                        <rect
                          x={c.x - 14}
                          y={c.y + 2}
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
                            y={c.y + 4.8 + li * 2.8}
                            textAnchor="middle"
                            fontSize={li === 0 ? "2" : "1.6"}
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
