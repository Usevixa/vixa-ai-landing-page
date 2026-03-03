import AnimatedSection from "@/components/AnimatedSection";

const FinalCTA = () => {
  return (
    <section className="py-[100px] sm:py-[120px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-5">
            Talk to your wallet.
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12">
            Let intelligence handle the rest.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <a href="#" className="inline-flex items-center px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500">
            Get Early Access
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
