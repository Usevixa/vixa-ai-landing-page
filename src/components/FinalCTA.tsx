import AnimatedSection from "@/components/AnimatedSection";

const FinalCTA = () => {
  return (
    <section className="py-[120px] sm:py-[160px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.02em] text-foreground leading-[1.05] mb-5">
            Talk to your wallet.
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12">
            Let intelligence handle the rest.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <a href="#" className="inline-flex items-center px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500">
            Get Early Access
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
