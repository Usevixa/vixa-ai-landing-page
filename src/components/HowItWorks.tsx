import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  { num: "01", title: "You send a message.", desc: "Plain text, voice note, pidgin — VIXA understands it all." },
  { num: "02", title: "VIXA AI understands intent.", desc: "Parses currency, destination, and compliance in real-time." },
  { num: "03", title: "You confirm with PIN.", desc: "Nothing executes without your explicit approval." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground mb-12 lg:mb-16 leading-[0.92]">
            How your words
            <br />
            become money.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <div className="relative border-t border-foreground/8 pt-6">
                <span className="text-[80px] sm:text-[110px] font-heading font-bold leading-none text-foreground/[0.03] absolute -top-4 -left-1 select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative">
                  <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-2">{step.num}</p>
                  <p className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight mb-2">
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
