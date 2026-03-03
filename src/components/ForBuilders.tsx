import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const ForBuilders = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-[-0.03em] text-foreground mb-6 leading-[0.95]">
              AI-powered
              <br />
              payment intent
              <br />
              parsing.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              Integrate VIXA's intelligence layer into your own product. Parse financial intent from natural language with a single API call.
            </p>
            <a href="#" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-foreground/15 text-foreground font-semibold text-base hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg transition-all duration-500">
              Request API Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </AnimatedSection>

          {/* Right — Terminal */}
          <AnimatedSection animation="fade-up" delay={150}>
            <div className="bg-foreground rounded-2xl p-6 sm:p-8 font-mono text-sm space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary-foreground/20" />
                <div className="w-3 h-3 rounded-full bg-primary-foreground/20" />
                <div className="w-3 h-3 rounded-full bg-primary-foreground/20" />
              </div>
              <div className="space-y-1">
                <p className="text-primary-foreground/40 text-xs">// Request</p>
                <p className="text-primary-foreground/60">POST /vixa/execute</p>
                <p className="text-primary-foreground/80">intent: send_money</p>
                <p className="text-primary-foreground/80">amount: 150 USDT</p>
                <p className="text-primary-foreground/80">destination: Kenya</p>
              </div>
              <div className="border-t border-primary-foreground/10 pt-4 space-y-1">
                <p className="text-primary-foreground/40 text-xs">// Response</p>
                <p className="text-green-400">status: success</p>
                <p className="text-primary-foreground/60">transaction_id: VX93839</p>
                <p className="text-primary-foreground/60">settlement: 0.8s</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ForBuilders;
