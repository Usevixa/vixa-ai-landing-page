import AnimatedSection from "@/components/AnimatedSection";

const layers = [
  { num: "01", title: "Intent Recognition", desc: "Understands voice, pidgin, and informal typing across African languages and dialects." },
  { num: "02", title: "Financial Logic", desc: "Handles multi-currency conversion, live rates, and compliance rules automatically." },
  { num: "03", title: "Security Engine", desc: "PIN-gated execution with anomaly detection and real-time risk scoring." },
  { num: "04", title: "Execution Layer", desc: "Triggers stablecoin conversion and routes through local payout rails instantly." },
];

const IntelligenceStack = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="grid md:grid-cols-2 gap-4 mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95]">
              The intelligence
              <br />
              layer.
            </h2>
            <div className="flex items-end">
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Four architectural layers that turn natural language into secure financial execution.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t-2 border-foreground/10">
          {layers.map((layer, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <div className="grid md:grid-cols-[80px_1fr_1.2fr] gap-4 md:gap-8 py-8 md:py-10 items-baseline border-b-2 border-foreground/10">
                <span className="text-sm font-bold text-primary tracking-wider font-heading">{layer.num}</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight leading-tight">
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
