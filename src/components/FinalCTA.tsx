import AnimatedSection from "@/components/AnimatedSection";

const FinalCTA = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="text-[42px] sm:text-[56px] lg:text-[68px] xl:text-[80px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-3">
            Talk to your wallet.
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={100}>
          <p className="text-lg sm:text-xl text-muted-foreground font-heading font-semibold mb-10">
            Let intelligence handle execution.
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={200}>
          <a
            href="#"
            className="inline-flex items-center px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15 transition-all duration-300"
          >
            Launch VIXA on WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
