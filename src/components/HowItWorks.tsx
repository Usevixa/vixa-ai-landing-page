import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  { num: "01", title: "You send a message.", desc: "Plain text, voice note, pidgin — VIXA understands it all." },
  { num: "02", title: "VIXA AI understands intent.", desc: "Parses currency, destination, and compliance in real-time." },
  { num: "03", title: "You confirm with PIN.", desc: "Nothing executes without your explicit approval." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground mb-16 lg:mb-20 leading-[0.95]">
            How your words
            <br />
            become money.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 120}>
              <div className="relative border-t-2 border-foreground/10 pt-8">
                <span className="text-[100px] sm:text-[140px] font-heading font-bold leading-none text-foreground/[0.04] absolute -top-6 -left-2 select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative">
                  <p className="text-sm font-bold text-primary tracking-wider uppercase mb-3">{step.num}</p>
                  <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-tight mb-3">
                    {step.title}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.desc}
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
