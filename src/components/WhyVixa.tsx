import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const lines = [
  "Africa runs on conversation.",
  "Money systems don't.",
  "Stablecoins move fast — local rails don't speak crypto.",
  "Apps are optional — WhatsApp is everywhere.",
  "VIXA turns chat into execution.",
  "And every move is PIN-confirmed.",
];

/* ── Scene A: Disconnected blocks ── */
const SceneA = () => {
  const blocks = [
    { label: "Bank", x: 8, y: 10 },
    { label: "Mobile Money", x: 55, y: 6 },
    { label: "Stablecoin", x: 10, y: 60 },
    { label: "Chat", x: 58, y: 56 },
  ];
  return (
    <div className="relative w-full aspect-square">
      {blocks.map((b, i) => (
        <div key={i} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          <div className="px-3 py-2 rounded-lg border border-foreground/10 bg-card text-xs font-heading font-bold text-foreground/50">
            {b.label}
          </div>
        </div>
      ))}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {[[22, 18, 60, 14], [16, 26, 16, 60], [64, 20, 66, 56]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--foreground))" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.06">
            <animate attributeName="opacity" values="0.1;0.01;0.1" dur="6s" repeatCount="indefinite" begin={`${i}s`} />
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
    <div className="flex flex-col items-center gap-0 w-full max-w-[200px] mx-auto">
      {nodes.map((n, i) => (
        <div key={i}>
          <div className="px-5 py-2 rounded-lg border border-primary/20 bg-card text-xs font-heading font-bold text-foreground text-center">
            {n}
          </div>
          {i < nodes.length - 1 && (
            <div className="flex justify-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.2, duration: 0.4 }}
                className="w-px h-5 bg-primary/30 origin-top"
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
    <div className="w-full max-w-[220px] mx-auto space-y-2.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          animate={{ opacity: item.active ? 1 : 0.15, x: item.active ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2.5"
        >
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.active ? "bg-primary" : "bg-foreground/10"}`} />
          <span className={`text-xs font-heading font-bold ${item.active ? "text-foreground" : "text-foreground/25"}`}>
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

  // Which line is "active" — the one currently in focus
  const activeLine = Math.min(lines.length - 1, Math.floor(scrollProgress * lines.length));
  const activeScene = Math.min(2, Math.floor(scrollProgress * 3));
  const ActiveSceneComponent = scenes[activeScene];

  return (
    <section ref={sectionRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — Text with Onboard-style active line emphasis */}
            <div>
              <AnimatedSection animation="fade-up">
                <h2 className="text-[42px] sm:text-[56px] lg:text-[68px] xl:text-[80px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-8">
                  Why VIXA.
                </h2>
              </AnimatedSection>
              <div className="space-y-2">
                {lines.map((line, i) => {
                  const isActive = i === activeLine;
                  const isPast = i < activeLine;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.7 : 0.35,
                        scale: isActive ? 1.01 : 1,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative"
                    >
                      <p
                        className={`text-base sm:text-lg lg:text-xl font-heading leading-snug transition-all duration-300 ${
                          isActive ? "font-bold text-foreground" : isPast ? "font-semibold text-foreground/70" : "font-medium text-foreground/40"
                        }`}
                      >
                        {line}
                      </p>
                      {/* Active underline bar */}
                      <motion.div
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-[2px] bg-primary mt-1 origin-left"
                        style={{ maxWidth: "80px" }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right — Animated visual scenes */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                key={activeScene}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
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
