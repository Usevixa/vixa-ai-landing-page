import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const points = [
  'Every transaction requires PIN approval',
  'AI suggests. You approve.',
  'Suspicious activity escalates to review',
  'Full audit logs on every action',
];

const SafetyEngine = () => {
  const [filledDots, setFilledDots] = useState(0);
  const [locked, setLocked] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i < 4; i++) {
      timers.push(setTimeout(() => setFilledDots(i + 1), (i + 1) * 400));
    }
    timers.push(setTimeout(() => setLocked(true), 2200));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section ref={ref} className="relative py-[120px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-center mb-16">
            Security is <span className="text-gradient-emerald">engineered in</span>.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — PIN animation */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="flex flex-col items-center gap-8">
              {/* PIN dots */}
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-primary/40 transition-all duration-400"
                    style={{
                      backgroundColor: i < filledDots ? 'hsl(160, 100%, 48%)' : 'transparent',
                      boxShadow: i < filledDots ? '0 0 12px hsl(160, 100%, 48%, 0.5)' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Lock */}
              <motion.div
                animate={locked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <Lock className={`w-12 h-12 transition-colors duration-500 ${locked ? 'text-primary' : 'text-muted-foreground/30'}`} />
                {locked && <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />}
              </motion.div>

              <p className="text-xs text-muted-foreground tracking-wider uppercase">
                {locked ? 'Verified & Secured' : 'Enter PIN to confirm'}
              </p>
            </div>
          </AnimatedSection>

          {/* Right — Bullet points */}
          <div className="space-y-5">
            {points.map((point, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 150 + 200}>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-foreground/70 leading-relaxed">{point}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyEngine;
