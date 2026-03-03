import { useEffect, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const HeroPhone = () => {
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResponse(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[300px] mx-auto animate-hero-float">
      {/* Phone frame — slight tilt */}
      <div
        className="bg-foreground rounded-[2.5rem] p-2"
        style={{
          transform: "rotate(3deg)",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.18), 0 16px 40px -10px rgba(0,0,0,0.10)",
        }}
      >
        <div className="bg-background rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="px-6 py-2 flex justify-between items-center text-[10px] text-muted-foreground font-medium">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-foreground/20" />
              <div className="w-3 h-1.5 rounded-sm bg-foreground/40" />
              <div className="w-3 h-1.5 rounded-sm bg-foreground/80" />
            </div>
          </div>

          {/* Chat header */}
          <div className="px-4 py-2.5 border-b border-border flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-[10px]">VA</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">VIXA AI</p>
              <p className="text-[10px] text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-3 space-y-2.5 min-h-[280px]">
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

/* ---------- Floating system widgets ---------- */

const ConversionCard = () => (
  <div
    className="absolute -left-16 top-[15%] bg-card border border-border rounded-2xl px-4 py-3 shadow-lg animate-fade-in z-10"
    style={{ animationDelay: "600ms", minWidth: 150 }}
  >
    <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase mb-1">Live Rate</p>
    <p className="text-sm font-heading font-bold text-foreground">USDT → GHS</p>
    <p className="text-xs text-primary font-semibold mt-0.5">1 USDT = 14.70 GHS</p>
  </div>
);

const SecurityPill = () => (
  <div
    className="absolute -right-10 top-[10%] bg-card border border-border rounded-full px-4 py-2 shadow-md flex items-center gap-2 animate-fade-in z-10"
    style={{ animationDelay: "900ms" }}
  >
    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
    <span className="text-[11px] font-semibold text-foreground">PIN Required</span>
  </div>
);

const IntentBadge = () => (
  <div
    className="absolute -right-14 bottom-[22%] bg-card border border-border rounded-2xl px-4 py-2.5 shadow-md animate-fade-in z-10"
    style={{ animationDelay: "1200ms" }}
  >
    <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase mb-0.5">Status</p>
    <p className="text-xs font-semibold text-foreground">Intent Recognized <span className="text-primary">✓</span></p>
  </div>
);

const MiniMap = () => (
  <div
    className="absolute -left-12 bottom-[18%] bg-card border border-border rounded-2xl p-3 shadow-md animate-fade-in z-10"
    style={{ animationDelay: "1500ms", width: 80, height: 80 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        d="M35 12 C28 14 22 20 20 28 C18 35 16 42 18 48 C20 55 22 60 25 65 C28 72 32 78 38 82 C42 85 48 86 52 84 C56 82 58 78 60 73 C62 68 64 62 63 56 C62 50 60 44 58 38 C56 32 54 26 50 22 C46 17 40 13 35 12Z"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.2"
        opacity="0.15"
      />
      {/* Ghana node */}
      <circle cx="28" cy="46" r="3" fill="hsl(var(--primary))" className="animate-pulse-dot" />
    </svg>
  </div>
);

/* ---------- Main Hero ---------- */

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-[140px] pb-[140px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow behind right side */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="space-y-8">
            {/* Micro label */}
            <AnimatedSection animation="fade-up">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                VIXA AI &bull; Financial Intelligence Layer
              </p>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] xl:text-[100px] font-heading font-bold leading-[0.95] tracking-[-0.02em] text-foreground">
                AI for
                <br />
                African
                <br />
                Money.
              </h1>
            </AnimatedSection>

            {/* Subhead */}
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-[520px] leading-relaxed">
                Turn WhatsApp conversations into real financial execution.
              </p>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 rounded-[14px] bg-primary text-primary-foreground font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15 transition-all duration-500"
                >
                  Launch VIXA on WhatsApp
                </a>
                <a
                  href="#howitworks"
                  className="inline-flex items-center px-8 py-4 rounded-[14px] border-2 border-foreground/15 text-foreground font-semibold text-base hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg transition-all duration-500"
                >
                  See How It Works
                </a>
              </div>
            </AnimatedSection>

            {/* Trust bar */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground font-medium">
                <span>Stablecoin Core</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>PIN-Gated Execution</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>Africa-First Rails</span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — Visual cluster */}
          <AnimatedSection animation="fade-up" delay={350}>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <HeroPhone />
                <ConversionCard />
                <SecurityPill />
                <IntentBadge />
                <MiniMap />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-foreground/10 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
