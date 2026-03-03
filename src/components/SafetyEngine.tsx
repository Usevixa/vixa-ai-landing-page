import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const rows = [
  { title: "PIN Required", desc: "Every payout needs your confirmation." },
  { title: "Identity Verified", desc: "Real users only. Clean compliance." },
  { title: "Risk Signals", desc: "Suspicious patterns trigger checks." },
  { title: "Audit Trail", desc: "Every action leaves a receipt." },
];

const SafetyEngine = () => {
  const [filledDots, setFilledDots] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const loop = () => {
      setFilledDots(0);
      const timers: NodeJS.Timeout[] = [];
      for (let i = 0; i < 4; i++) {
        timers.push(setTimeout(() => setFilledDots(i + 1), (i + 1) * 400));
      }
      timers.push(setTimeout(() => setFilledDots(0), 3000));
      return timers;
    };
    let timers = loop();
    const interval = setInterval(() => { timers = loop(); }, 4000);
    return () => { clearInterval(interval); timers.forEach(clearTimeout); };
  }, [started]);

  return (
    <section ref={ref} className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <AnimatedSection animation="fade-up">
              <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-6">
                Money doesn't move
                <br />
                without you.
              </h2>
            </AnimatedSection>

            <div className="border-t border-foreground/8 mt-6">
              {rows.map((row, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                  <div className="py-4 border-b border-foreground/8">
                    <p className="text-lg sm:text-xl font-heading font-bold text-foreground mb-0.5">{row.title}</p>
                    <p className="text-sm text-muted-foreground">{row.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: i < filledDots ? "hsl(157, 82%, 31%)" : "transparent",
                      boxShadow: i < filledDots ? "0 0 12px hsl(157, 82%, 31%, 0.35)" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 rounded-full border-2 border-primary/25"
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase font-bold">
                {filledDots >= 4 ? "Verified & Secured" : "Enter PIN to confirm"}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default SafetyEngine;
