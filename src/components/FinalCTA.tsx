import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const FinalCTA = () => {
  return (
    <section className="relative py-[140px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-[-0.02em] leading-[1.1] mb-6">
            Talk to your wallet
            <br />
            <span className="text-gradient-emerald">like you talk to a friend.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <p className="text-lg text-muted-foreground mb-12">
            And let intelligence handle the rest.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <button className="px-10 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg glow-emerald hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 transition-all duration-500">
            Launch VIXA on WhatsApp
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
