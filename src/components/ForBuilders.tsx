import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const requestLines = [
  '> POST /vixa/execute',
  '> intent: send_money',
  '> amount: 150 USDT',
  '> destination: Kenya',
];

const responseLines = [
  '> status: success',
  '> transaction_id: VX93839',
  '> settled_in: 2.4s',
];

const ForBuilders = () => {
  const [visibleReq, setVisibleReq] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers: NodeJS.Timeout[] = [];
    requestLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleReq(i + 1), (i + 1) * 500));
    });
    timers.push(setTimeout(() => setShowResponse(true), requestLines.length * 500 + 800));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section ref={ref} className="relative py-[120px] px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(0,0%,3%)] to-background" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-12">
            <p className="text-xs text-primary tracking-[0.2em] uppercase mb-3 font-medium">For Builders</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em]">
              Plug into <span className="text-gradient-emerald">VIXA</span>.
            </h2>
          </div>
        </AnimatedSection>

        {/* Terminal */}
        <AnimatedSection animation="fade-up" delay={150}>
          <div className="glass-panel rounded-xl border border-border/30 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
              <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,50%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(45,80%,50%)]" />
              <div className="w-3 h-3 rounded-full bg-[hsl(120,60%,45%)]" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">vixa-api</span>
            </div>

            {/* Terminal body */}
            <div className="p-6 font-mono text-sm space-y-1 min-h-[240px]">
              {requestLines.slice(0, visibleReq).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-foreground/70"
                >
                  {line}
                </motion.div>
              ))}

              {visibleReq >= requestLines.length && !showResponse && (
                <div className="text-primary/60 mt-3">
                  <span className="animate-typing-cursor">_</span>
                </div>
              )}

              {showResponse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 pt-4 border-t border-border/20 space-y-1"
                >
                  {responseLines.map((line, i) => (
                    <div key={i} className="text-primary">{line}</div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection animation="fade-up" delay={300}>
          <div className="text-center mt-10">
            <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-primary/40 text-primary font-semibold hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-500">
              Request API Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ForBuilders;
