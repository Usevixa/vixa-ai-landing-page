import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const HeroPhone = () => {
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResponse(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[280px] mx-auto animate-hero-float">
      <div
        className="bg-foreground rounded-[2.5rem] p-2"
        style={{
          transform: "rotate(3deg)",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.18), 0 16px 40px -10px rgba(0,0,0,0.10)",
        }}
      >
        <div className="bg-background rounded-[2rem] overflow-hidden">
          <div className="px-6 py-2 flex justify-between items-center text-[10px] text-muted-foreground font-medium">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-foreground/20" />
              <div className="w-3 h-1.5 rounded-sm bg-foreground/40" />
              <div className="w-3 h-1.5 rounded-sm bg-foreground/80" />
            </div>
          </div>
          <div className="px-4 py-2.5 border-b border-border flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-[10px]">VA</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">VIXA AI</p>
              <p className="text-[10px] text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="p-3 space-y-2.5 min-h-[240px]">
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
                <p className="text-xs">Send 200 USDT to Ghana</p>
              </div>
            </div>
            {showResponse ? (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted px-3 py-2 rounded-xl rounded-bl-sm max-w-[80%]">
                  <p className="text-[10px] text-primary font-semibold mb-0.5">VIXA AI</p>
                  <p className="text-xs text-foreground/80">200 USDT ≈ 2,940 GHS.</p>
                  <p className="text-xs text-foreground/80">Reply with PIN to confirm.</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-muted px-3 py-2.5 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const systemWidgets = [
  { label: "Intent: Send Money ✓", position: "-left-20 top-[12%]", delay: 0.6 },
  { label: "Convert: USDT → GHS", position: "-right-16 top-[35%]", delay: 0.9 },
  { label: "Security: PIN Required", position: "-left-14 bottom-[25%]", delay: 1.2 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-[120px] pb-[80px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.02) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="space-y-5">
            <AnimatedSection animation="fade-up">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                VIXA AI &bull; Financial Intelligence for Africa
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={80}>
              <h1 className="text-[52px] sm:text-[80px] lg:text-[100px] xl:text-[120px] font-heading font-bold leading-[0.9] tracking-[-0.03em] text-foreground">
                AI for
                <br />
                African
                <br />
                Money.
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={160}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-[520px] leading-relaxed">
                Move value across Africa from WhatsApp — stablecoin core, local rails, PIN-gated execution.
              </p>
            </AnimatedSection>

            {/* 3-point strip */}
            <AnimatedSection animation="fade-up" delay={220}>
              <div className="space-y-2 max-w-[480px]">
                {[
                  "Talk like a human.",
                  "Execute like infrastructure.",
                  "Secure like a bank.",
                ].map((line, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground/70">{line}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={280}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 rounded-[14px] bg-primary text-primary-foreground font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15 transition-all duration-500"
                >
                  Launch VIXA on WhatsApp
                </a>
                <a
                  href="#whyvixa"
                  className="inline-flex items-center px-8 py-4 rounded-[14px] border-2 border-foreground/15 text-foreground font-semibold text-base hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg transition-all duration-500"
                >
                  See Why VIXA
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={340}>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground font-semibold">
                <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/60">Stablecoin Core</span>
                <span className="text-foreground/20">•</span>
                <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/60">PIN Required</span>
                <span className="text-foreground/20">•</span>
                <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/60">Audit Trail</span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — Visual cluster */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <HeroPhone />
                {systemWidgets.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: w.delay, duration: 0.55, ease: "easeOut" }}
                    className={`absolute ${w.position} bg-card border border-border rounded-xl px-3 py-2 shadow-md z-10 hidden sm:block`}
                  >
                    <span className="text-[11px] font-semibold text-foreground whitespace-nowrap">{w.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-foreground/10 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
