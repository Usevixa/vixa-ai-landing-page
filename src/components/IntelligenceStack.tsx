import AnimatedSection from "@/components/AnimatedSection";

const layers = [
  { title: "Intent Recognition", desc: "Understands voice, pidgin, informal typing." },
  { title: "Financial Logic", desc: "Handles currencies, rates, compliance rules." },
  { title: "Security Engine", desc: "PIN-gated execution and anomaly detection." },
  { title: "Execution Layer", desc: "Triggers stablecoin conversion and payout rails." },
];

const IntelligenceStack = () => {
  return (
    <section className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-foreground mb-16">
            The intelligence layer.
          </h2>
        </AnimatedSection>

        <div className="divide-y divide-border">
          {layers.map((layer, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <div className="grid md:grid-cols-2 gap-4 py-8 md:py-10 items-baseline">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-tight">
                  {layer.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceStack;
