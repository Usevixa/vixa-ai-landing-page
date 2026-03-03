import AnimatedSection from "@/components/AnimatedSection";

const nodes = [
  { label: "Nigeria", x: 34, y: 44 },
  { label: "Ghana", x: 28, y: 46 },
  { label: "Kenya", x: 60, y: 52 },
  { label: "South Africa", x: 46, y: 78 },
];

const AfricaMap = () => {
  return (
    <section className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection animation="fade-up">
          {/* Minimal Africa outline + dots */}
          <div className="relative w-full max-w-md mx-auto aspect-[3/4] mb-12">
            {/* Simplified Africa outline */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path
                d="M35 12 C28 14 22 20 20 28 C18 35 16 42 18 48 C20 55 22 60 25 65 C28 72 32 78 38 82 C42 85 48 86 52 84 C56 82 58 78 60 73 C62 68 64 62 63 56 C62 50 60 44 58 38 C56 32 54 26 50 22 C46 17 40 13 35 12Z"
                fill="none"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.6"
                opacity="0.15"
              />
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: `${i * 700}ms` }} />
                <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground whitespace-nowrap font-medium">
                  {node.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-lg text-muted-foreground font-medium">
            Local rails. Stablecoin core.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AfricaMap;
