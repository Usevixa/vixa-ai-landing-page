import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const countries = [
  { label: "Nigeria", x: 33, y: 42 },
  { label: "Ghana", x: 27, y: 44 },
  { label: "Kenya", x: 60, y: 50 },
  { label: "South Africa", x: 48, y: 80 },
  { label: "Senegal", x: 18, y: 36 },
  { label: "Mali", x: 26, y: 34 },
  { label: "Burkina Faso", x: 28, y: 38 },
  { label: "Ivory Coast", x: 24, y: 42 },
  { label: "Togo", x: 30, y: 43 },
  { label: "Benin", x: 31, y: 43 },
  { label: "Cameroon", x: 36, y: 46 },
  { label: "Gabon", x: 36, y: 52 },
  { label: "Congo", x: 40, y: 54 },
  { label: "DR Congo", x: 44, y: 56 },
  { label: "Uganda", x: 56, y: 50 },
  { label: "Rwanda", x: 54, y: 54 },
  { label: "Tanzania", x: 58, y: 58 },
  { label: "Malawi", x: 56, y: 64 },
  { label: "Zambia", x: 50, y: 66 },
  { label: "Botswana", x: 46, y: 74 },
];

// Regional connection clusters
const connections = [
  // West Africa
  [18, 36, 26, 34], [26, 34, 28, 38], [28, 38, 27, 44], [27, 44, 30, 43],
  [30, 43, 31, 43], [31, 43, 33, 42], [33, 42, 36, 46],
  // Central
  [36, 46, 36, 52], [36, 52, 40, 54], [40, 54, 44, 56],
  // East Africa
  [56, 50, 60, 50], [56, 50, 54, 54], [54, 54, 58, 58], [58, 58, 56, 64],
  // South
  [56, 64, 50, 66], [50, 66, 48, 80], [48, 80, 46, 74],
  // Cross-region
  [33, 42, 60, 50], [44, 56, 56, 50], [50, 66, 44, 56],
];

const AfricaNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-4 text-center">
            Local rails. Intelligent execution.
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] mt-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Africa silhouette */}
              <path
                d="M28 18 C22 20 18 26 16 32 C14 38 13 44 15 50 C17 56 19 62 22 67 C25 73 30 78 36 82 C40 85 46 87 50 86 C54 85 58 82 61 77 C63 72 65 66 64 60 C63 54 62 48 60 42 C58 36 56 30 52 25 C48 20 42 17 36 16 C32 15 30 17 28 18Z"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.4"
                opacity="0.08"
              />

              {/* Connection lines with traveling light */}
              {connections.map(([x1, y1, x2, y2], i) => (
                <g key={`conn-${i}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.12" />
                  <circle r="0.4" fill="hsl(var(--primary))" opacity="0.4">
                    <animateMotion dur={`${6 + (i % 3) * 2}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                      <mpath xlinkHref={`#path-${i}`} />
                    </animateMotion>
                  </circle>
                  <path id={`path-${i}`} d={`M${x1},${y1} L${x2},${y2}`} fill="none" />
                </g>
              ))}

              {/* Country nodes */}
              {countries.map((c, i) => (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  <circle cx={c.x} cy={c.y} r="1.8" fill="hsl(var(--primary))" opacity="0.15">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                  </circle>
                  <circle cx={c.x} cy={c.y} r="0.7" fill="hsl(var(--primary))" />
                  {hoveredNode === i && (
                    <>
                      <rect
                        x={c.x - 12}
                        y={c.y - 7}
                        width="24"
                        height="5"
                        rx="1"
                        fill="hsl(var(--card))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.2"
                      />
                      <text x={c.x} y={c.y - 3.5} textAnchor="middle" fontSize="2.2" fontWeight="600" fill="hsl(var(--foreground))">
                        {c.label}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <p className="text-center text-lg sm:text-xl font-heading font-bold text-foreground/70 mt-8">
            20-country coverage &bull; fast settlement &bull; PIN-gated confirmations
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AfricaNetwork;
