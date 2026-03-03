import AnimatedSection from "@/components/AnimatedSection";

const StatementBlock = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1] tracking-[-0.03em] text-foreground">
            Africa doesn't need another app.
            <br />
            It needs execution.
          </h2>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default StatementBlock;
