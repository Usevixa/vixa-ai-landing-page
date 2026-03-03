import { useEffect, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

/* ── Block 1: Fragmented infrastructure visual ── */
const FragmentedBlocks = () => {
  const blocks = [
    { label: "Bank", x: 10, y: 15 },
    { label: "Mobile Money", x: 55, y: 10 },
    { label: "Stablecoin", x: 15, y: 65 },
    { label: "Messaging", x: 60, y: 60 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      {blocks.map((block, i) => (
        <div
          key={i}
          className="absolute animate-fade-in"
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            animationDelay: `${i * 200}ms`,
          }}
        >
          <div className="px-4 py-3 rounded-xl border-2 border-foreground/10 bg-card text-sm font-heading font-bold text-foreground/70">
            {block.label}
          </div>
        </div>
      ))}
      {/* Failing connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <line x1="28" y1="22" x2="58" y2="18" stroke="hsl(var(--foreground))" strokeWidth="0.3" opacity="0.1" strokeDasharray="2 2">
          <animate attributeName="opacity" values="0.15;0.03;0.15" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="22" y1="30" x2="20" y2="65" stroke="hsl(var(--foreground))" strokeWidth="0.3" opacity="0.1" strokeDasharray="2 2">
          <animate attributeName="opacity" values="0.12;0.02;0.12" dur="6s" repeatCount="indefinite" begin="1s" />
        </line>
        <line x1="65" y1="25" x2="68" y2="60" stroke="hsl(var(--foreground))" strokeWidth="0.3" opacity="0.1" strokeDasharray="2 2">
          <animate attributeName="opacity" values="0.1;0.02;0.1" dur="6s" repeatCount="indefinite" begin="2s" />
        </line>
      </svg>
    </div>
  );
};

/* ── Block 2: Animated chat sequence ── */
const ChatSequence = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-[9px]">VA</span>
        </div>
        <span className="text-xs font-semibold text-foreground">VIXA AI</span>
      </div>

      <div className="p-4 space-y-3 min-h-[220px]">
        {/* User message */}
        {step >= 0 && (
          <div className="flex justify-end animate-fade-in">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-xl rounded-br-sm">
              <p className="text-xs">Send 200 USDT to Ghana</p>
            </div>
          </div>
        )}

        {/* Processing indicators */}
        <div className="space-y-2">
          {step >= 1 && (
            <div className="animate-fade-in flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] text-foreground/60 font-medium">Intent recognized</span>
            </div>
          )}
          {step >= 2 && (
            <div className="animate-fade-in flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] text-foreground/60 font-medium">200 USDT → 2,940 GHS</span>
            </div>
          )}
          {step >= 3 && (
            <div className="animate-fade-in flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] text-foreground/60 font-medium">Ghana node active</span>
            </div>
          )}
          {step >= 4 && (
            <div className="animate-fade-in flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] text-foreground/60 font-medium">PIN required</span>
            </div>
          )}
          {step >= 5 && (
            <div className="animate-fade-in flex items-center gap-2">
              <span className="text-primary text-sm">✓</span>
              <span className="text-[11px] text-primary font-bold">Transaction complete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Block 5: Africa map with connections ── */
const AfricaMapVisual = () => {
  const nodes = [
    { label: "Nigeria", cx: 34, cy: 44 },
    { label: "Ghana", cx: 28, cy: 46 },
    { label: "Kenya", cx: 60, cy: 52 },
    { label: "South Africa", cx: 46, cy: 78 },
  ];

  const connections = [
    [34, 44, 28, 46],
    [34, 44, 60, 52],
    [60, 52, 46, 78],
    [28, 46, 46, 78],
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[4/3]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Africa outline */}
        <path
          d="M35 12 C28 14 22 20 20 28 C18 35 16 42 18 48 C20 55 22 60 25 65 C28 72 32 78 38 82 C42 85 48 86 52 84 C56 82 58 78 60 73 C62 68 64 62 63 56 C62 50 60 44 58 38 C56 32 54 26 50 22 C46 17 40 13 35 12Z"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="0.6"
          opacity="0.1"
        />
        {/* Connection lines */}
        {connections.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.2">
            <animate attributeName="opacity" values="0.08;0.25;0.08" dur="4s" repeatCount="indefinite" begin={`${i * 0.8}s`} />
          </line>
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r="1.8" fill="hsl(var(--primary))" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" begin={`${i * 0.7}s`} />
            </circle>
            <circle cx={node.cx} cy={node.cy} r="0.8" fill="hsl(var(--primary))" />
            <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="2.5" fontWeight="600" opacity="0.5">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ── Main Section ── */
const WhyVixa = () => {
  const advantages = [
    { num: "01", text: "WhatsApp-native by design." },
    { num: "02", text: "Stablecoin core with local execution." },
    { num: "03", text: "PIN-gated intelligence for safety." },
  ];

  return (
    <section className="relative">
      {/* Faint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.02) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Section Header ── */}
      <div className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.9] mb-6">
              Why VIXA.
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={150}>
            <p className="text-xl sm:text-2xl font-heading font-semibold text-muted-foreground max-w-2xl leading-snug">
              Because Africa deserves financial intelligence — not patched systems.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* ── Block 1: The Problem ── */}
      <div className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fade-up">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-6">
                Money moves.
                <br />
                Infrastructure doesn't.
              </h3>
              <div className="space-y-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                <p>Cross-border transfers are slow.</p>
                <p>Stablecoins exist, but local rails don't speak crypto.</p>
                <p>WhatsApp is everywhere — but it isn't intelligent.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <FragmentedBlocks />
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* ── Block 2: The Shift ── */}
      <div className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fade-up">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-6">
                Conversation becomes
                <br />
                execution.
              </h3>
              <div className="space-y-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                <p>With VIXA AI, your words aren't instructions.</p>
                <p>They're infrastructure triggers.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <ChatSequence />
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* ── Block 3: The Belief ── */}
      <div className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Slow gradient background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 12s ease-in-out infinite",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-up">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95]">
              Financial infrastructure
              <br />
              should feel <span className="text-primary">human</span>.
            </h3>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* ── Block 4: The Advantage ── */}
      <div className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedSection animation="fade-up">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95]">
                Built for Africa.
                <br />
                Not adapted
                <br />
                for Africa.
              </h3>
            </AnimatedSection>
            <div className="border-t-2 border-foreground/10">
              {advantages.map((row, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 150}>
                  <div className="flex items-baseline gap-6 py-6 border-b-2 border-foreground/10">
                    <span className="text-sm font-bold text-primary tracking-wider font-heading">{row.num}</span>
                    <p className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight">
                      {row.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* ── Block 5: Impact Visual ── */}
      <div className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <AfricaMapVisual />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl sm:text-2xl font-heading font-bold text-foreground mt-10">
              Local rails. Intelligent execution.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* ── Final Declaration ── */}
      <div className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedSection animation="fade-up">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-3">
              This is not another wallet.
            </h3>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={150}>
            <p className="text-xl sm:text-2xl text-muted-foreground font-heading font-semibold mb-12">
              It's financial intelligence for a continent.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={300}>
            <a
              href="#"
              className="inline-flex items-center px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500"
            >
              Launch VIXA on WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default WhyVixa;
