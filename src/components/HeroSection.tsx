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
    <div className="relative w-full max-w-[260px] mx-auto animate-hero-float">
      <div
        className="bg-foreground rounded-[2.5rem] p-2"
        style={{
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.15), 0 16px 40px -10px rgba(0,0,0,0.08)",
        }}
      >
        <div className="bg-background rounded-[2rem] overflow-hidden">
          <div className="px-5 py-1.5 flex justify-between items-center text-[9px] text-muted-foreground font-medium">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-2.5 h-1 rounded-sm bg-foreground/20" />
              <div className="w-2.5 h-1 rounded-sm bg-foreground/40" />
              <div className="w-2.5 h-1 rounded-sm bg-foreground/80" />
            </div>
          </div>
          <div className="px-3 py-2 border-b border-border flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-[9px]">VA</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-foreground leading-tight">VIXA AI</p>
              <p className="text-[9px] text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="p-3 space-y-2 min-h-[200px]">
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-xl rounded-br-sm max-w-[82%]">
                <p className="text-[11px]">Send 200 USDT to Ghana</p>
              </div>
            </div>
            {showResponse ? (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted px-3 py-1.5 rounded-xl rounded-bl-sm max-w-[82%]">
                  <p className="text-[9px] text-primary font-bold mb-0.5">VIXA AI</p>
                  <p className="text-[11px] text-foreground/80">200 USDT ≈ 2,940 GHS.</p>
                  <p className="text-[11px] text-foreground/80">Reply with PIN to confirm.</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-muted px-3 py-2 rounded-xl rounded-bl-sm">
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
  { label: "Intent recognized ✓", position: "-left-24 top-[10%]", delay: 0.6 },
  { label: "Convert: USDT → GHS", position: "-right-20 top-[38%]", delay: 0.9 },
  { label: "Security: PIN required", position: "-left-16 bottom-[22%]", delay: 1.2 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-[100px] pb-[60px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-10 lg:gap-6 items-center">
          {/* Left */}
          <div className="space-y-6">
            <AnimatedSection animation="fade-up">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground">
                VIXA AI &bull; Financial Intelligence for Africa
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={60}>
              <h1 className="text-[42px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-heading font-bold leading-[0.92] tracking-[-0.025em] text-foreground">
                AI for
                <br />
                African
                <br />
                Money.
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={120}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-[500px] leading-relaxed">
                Move value across Africa from WhatsApp — stablecoin core, local rails, PIN-gated execution.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={160}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-foreground/50">
                {["Stablecoin Core", "PIN Required", "Audit Trail", "Fast Settlement"].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-border">•</span>}
                    {t}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#"
                  className="inline-flex items-center px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
                >
                  Launch VIXA on WhatsApp
                </a>
                <a
                  href="#whyvixa"
                  className="inline-flex items-center px-7 py-3.5 rounded-xl border-2 border-foreground/15 text-foreground font-bold text-sm hover:-translate-y-0.5 hover:border-foreground/30 transition-all duration-300"
                >
                  Why VIXA
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right */}
          <AnimatedSection animation="fade-up" delay={250}>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <HeroPhone />
                {systemWidgets.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: w.delay, duration: 0.5, ease: "easeOut" }}
                    className={`absolute ${w.position} bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm z-10 hidden sm:block`}
                  >
                    <span className="text-[10px] font-bold text-foreground whitespace-nowrap">{w.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-px h-8 bg-foreground/10 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
