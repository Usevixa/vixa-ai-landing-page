import AnimatedSection from "@/components/AnimatedSection";

const StatementBlock = () => {
  return (
    <section className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
            Built for Africa.
            <br />
            <span className="text-primary">Not adapted</span> for Africa.
          </h2>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default StatementBlock;
