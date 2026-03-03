import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const lines = [
  "Africa runs on conversation.",
  "Money systems don't.",
  "Stablecoins move fast — local rails don't speak crypto.",
  "Apps are optional — WhatsApp is universal.",
  "VIXA makes chat become execution.",
  "And every movement is PIN-confirmed.",
];

/* ── Scene A: Disconnected blocks ── */
const SceneA = () => {
  const blocks = [
    { label: "Bank", x: 8, y: 12 },
    { label: "Mobile Money", x: 55, y: 8 },
    { label: "Stablecoin", x: 10, y: 62 },
    { label: "Chat", x: 58, y: 58 },
  ];
  return (
    <div className="relative w-full aspect-square">
      {blocks.map((b, i) => (
        <div key={i} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          <div className="px-4 py-3 rounded-xl border-2 border-foreground/10 bg-card text-sm font-heading font-bold text-foreground/60">
            {b.label}
          </div>
        </div>
      ))}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {[[25, 20, 60, 16], [18, 28, 16, 62], [65, 22, 66, 58]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--foreground))" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.08">
            <animate attributeName="opacity" values="0.12;0.02;0.12" dur="6s" repeatCount="indefinite" begin={`${i}s`} />
          </line>
        ))}
      </svg>
    </div>
  );
};

/* ── Scene B: Connected pipeline ── */
const SceneB = () => {
  const nodes = ["Bank", "Mobile Money", "Stablecoin", "Chat"];
  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-xs mx-auto">
      {nodes.map((n, i) => (
        <div key={i}>
          <div className="px-6 py-3 rounded-xl border-2 border-primary/30 bg-card text-sm font-heading font-bold text-foreground text-center">
            {n}
          </div>
          {i < nodes.length - 1 && (
            <div className="flex justify-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.2, duration: 0.4 }}
                className="w-px h-6 bg-primary/40 origin-top"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Scene C: Execution flow ── */
const SceneC = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % 6), 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { text: '"Send 200 USDT to Ghana"', active: step >= 0 },
    { text: "Intent recognized", active: step >= 1 },
    { text: "USDT → 2,940 GHS", active: step >= 2 },
    { text: "PIN required", active: step >= 3 },
    { text: "✓ Success", active: step >= 4 },
  ];

  return (
    <div className="w-full max-w-xs mx-auto space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          animate={{ opacity: item.active ? 1 : 0.15, x: item.active ? 0 : 8 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.active ? "bg-primary" : "bg-foreground/10"}`} />
          <span className={`text-sm font-heading font-semibold ${item.active ? "text-foreground" : "text-foreground/30"}`}>
            {item.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const scenes = [SceneA, SceneB, SceneC];

const WhyVixa = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeScene = Math.min(2, Math.floor(scrollProgress * 3));
  const ActiveSceneComponent = scenes[activeScene];
  const visibleLines = Math.min(lines.length, Math.floor(scrollProgress * (lines.length + 1)));

  return (
    <section ref={sectionRef} className="relative" style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.015) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text reveals */}
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.9] mb-10">
                Why VIXA.
              </h2>
              <div className="space-y-3">
                {lines.map((line, i) => (
                  <motion.p
                    key={i}
                    animate={{
                      opacity: i < visibleLines ? 1 : 0.08,
                      y: i < visibleLines ? 0 : 12,
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-lg sm:text-xl font-heading font-semibold text-foreground/80 leading-snug"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Right — Animated visual scenes */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                key={activeScene}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="w-full"
              >
                <ActiveSceneComponent />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVixa;
