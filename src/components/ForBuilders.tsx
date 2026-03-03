import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const ForBuilders = () => {
  return (
    <section className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-foreground mb-12">
            AI-powered payment
            <br />
            intent parsing.
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={150}>
          <div className="bg-foreground rounded-2xl p-6 sm:p-8 font-mono text-sm space-y-4">
            <div className="space-y-1">
              <p className="text-primary-foreground/50">POST /vixa/execute</p>
              <p className="text-primary-foreground/70">intent: send_money</p>
              <p className="text-primary-foreground/70">amount: 150 USDT</p>
              <p className="text-primary-foreground/70">destination: Kenya</p>
            </div>
            <div className="border-t border-primary-foreground/10 pt-4 space-y-1">
              <p className="text-green-400">status: success</p>
              <p className="text-primary-foreground/50">transaction_id: VX93839</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <div className="mt-10">
            <a href="#" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-foreground/15 text-foreground font-semibold hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg transition-all duration-500">
              Request API Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ForBuilders;
