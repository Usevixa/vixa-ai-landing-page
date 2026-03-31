import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Globe } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const steps = [
  { type: 'user', text: 'Send 150 USDT to Kenya — M-Pesa.' },
  { type: 'processing', text: '' },
  { type: 'ai', text: '150 USDT ≈ 19,350 KES' },
  { type: 'node', text: 'Kenya' },
  { type: 'lock', text: '' },
  { type: 'success', text: '' },
];

const LiveSimulation = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [typedText, setTypedText] = useState('');
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Start on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Step through sequence
  useEffect(() => {
    if (!started) return;
    
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrentStep(i), (i + 1) * 800));
    });

    return () => timers.forEach(clearTimeout);
  }, [started]);

  // Typing effect for user message
  useEffect(() => {
    if (currentStep !== 0) return;
    const text = steps[0].text;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <section ref={sectionRef} className="relative py-[120px] sm:py-[100px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(0,0%,3%)] to-background" />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-center mb-16">
            Watch your words become <span className="text-gradient-emerald">money</span>.
          </h2>
        </AnimatedSection>

        {/* Simulated chat window */}
        <div className="glass-panel rounded-2xl border border-border/40 p-6 sm:p-8 max-w-xl mx-auto">
          <div className="space-y-4 min-h-[280px]">
            {/* User typing */}
            {currentStep >= 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <div className="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]">
                  <p className="text-sm text-foreground">{typedText}<span className="animate-typing-cursor">|</span></p>
                </div>
              </motion.div>
            )}

            {/* Processing pulse */}
            {currentStep >= 1 && currentStep < 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                <div className="flex items-center gap-2 text-xs text-primary/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>AI processing…</span>
                </div>
              </motion.div>
            )}

            {/* Conversion value */}
            {currentStep >= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-start">
                <div className="bg-accent border border-border/40 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <p className="text-[10px] text-primary font-semibold mb-1 tracking-wider">VIXA AI</p>
                  <p className="text-sm text-foreground/80">{steps[2].text}</p>
                </div>
              </motion.div>
            )}

            {/* Country node */}
            {currentStep >= 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-primary">Kenya connected</span>
                </div>
              </motion.div>
            )}

            {/* Lock */}
            {currentStep >= 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
                <Lock className="w-5 h-5 text-secondary" />
              </motion.div>
            )}

            {/* Success */}
            {currentStep >= 5 && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 glow-emerald-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Transaction Complete</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveSimulation;
