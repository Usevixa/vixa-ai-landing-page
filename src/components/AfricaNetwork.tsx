import AnimatedSection from "@/components/AnimatedSection";

const nodes = [
  { label: "Nigeria", x: 34, y: 44 },
  { label: "Ghana", x: 28, y: 46 },
  { label: "Kenya", x: 60, y: 52 },
  { label: "South Africa", x: 46, y: 78 },
];

const stats = [
  { label: "Local Bank Rails", value: "4 markets" },
  { label: "Stablecoin Core", value: "USDT / USDC" },
  { label: "Cross-Border Payout", value: "Instant settlement" },
];

const AfricaMap = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground mb-16 leading-[0.95]">
            Built across
            <br />
            Africa.
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <path
                  d="M35 12 C28 14 22 20 20 28 C18 35 16 42 18 48 C20 55 22 60 25 65 C28 72 32 78 38 82 C42 85 48 86 52 84 C56 82 58 78 60 73 C62 68 64 62 63 56 C62 50 60 44 58 38 C56 32 54 26 50 22 C46 17 40 13 35 12Z"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="0.8"
                  opacity="0.12"
                />
              </svg>
              {nodes.map((node, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: `${i * 700}ms` }} />
                  </div>
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-foreground font-semibold whitespace-nowrap">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="space-y-0 border-t-2 border-foreground/10">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-baseline justify-between py-6 border-b-2 border-foreground/10">
                  <span className="text-lg sm:text-xl font-heading font-bold text-foreground">{stat.label}</span>
                  <span className="text-base text-muted-foreground font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AfricaMap;
