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
      { threshold: 0.4 }
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
    <section ref={ref} className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <AnimatedSection animation="fade-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-6">
                Money doesn't move
                <br />
                without you.
              </h2>
            </AnimatedSection>

            <div className="border-t-2 border-foreground/10 mt-8">
              {rows.map((row, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 120}>
                  <div className="py-5 border-b-2 border-foreground/10">
                    <p className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-1">{row.title}</p>
                    <p className="text-base text-muted-foreground">{row.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Right — PIN animation */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-5">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: i < filledDots ? "hsl(157, 82%, 31%)" : "transparent",
                      boxShadow: i < filledDots ? "0 0 16px hsl(157, 82%, 31%, 0.4)" : "none",
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-5 h-5 rounded-full border-2 border-primary/30"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">
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
