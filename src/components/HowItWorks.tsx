import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  { num: "01", text: "You send a message." },
  { num: "02", text: "VIXA AI understands intent." },
  { num: "03", text: "You confirm with PIN." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-foreground mb-20">
            How your words
            <br />
            become money.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 120}>
              <div className="relative">
                <span className="text-[120px] sm:text-[160px] font-heading font-bold leading-none text-foreground/[0.04] absolute -top-10 -left-2 select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative pt-8">
                  <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">{step.num}</p>
                  <p className="text-xl sm:text-2xl font-heading font-semibold text-foreground leading-snug">
                    {step.text}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
