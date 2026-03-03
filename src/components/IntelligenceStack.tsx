import AnimatedSection from "@/components/AnimatedSection";

const layers = [
  { num: "01", title: "Intent Recognition", desc: "Understands voice, pidgin, and informal typing across African languages and dialects." },
  { num: "02", title: "Financial Logic", desc: "Handles multi-currency conversion, live rates, and compliance rules automatically." },
  { num: "03", title: "Security Engine", desc: "PIN-gated execution with anomaly detection and real-time risk scoring." },
  { num: "04", title: "Settlement Rails", desc: "Stablecoin core connected to local banks and mobile money." },
];

const IntelligenceStack = () => {
  return (
    <section className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="grid md:grid-cols-2 gap-4 mb-12 lg:mb-16">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92]">
              The intelligence
              <br />
              layer.
            </h2>
            <div className="flex items-end">
              <p className="text-base text-muted-foreground max-w-md leading-relaxed">
                Four layers working quietly behind every message.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t border-foreground/8">
          {layers.map((layer, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 80}>
              <div className="grid md:grid-cols-[60px_1fr_1.2fr] gap-3 md:gap-6 py-6 md:py-8 items-baseline border-b border-foreground/8">
                <span className="text-[10px] font-bold text-primary tracking-widest font-heading">{layer.num}</span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-tight leading-tight">
                  {layer.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
