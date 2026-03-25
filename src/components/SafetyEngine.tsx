import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
      const timers: ReturnType<typeof setTimeout>[] = [];
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-8 uppercase"
            >
              Money Doesn't
              <br />
              Move Without You.
            </motion.h2>

            <div className="border-t border-border">
              {rows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="py-5 border-b border-border group"
                >
                  <p className="text-lg sm:text-xl font-heading font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">{row.title}</p>
                  <p className="text-sm text-muted-foreground">{row.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="bg-card border border-border rounded-2xl p-10 w-full max-w-[280px] flex flex-col items-center gap-6">
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: i < filledDots ? "hsl(75, 85%, 55%)" : "transparent",
                      boxShadow: i < filledDots ? "0 0 16px hsl(75, 85%, 55%, 0.4)" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 rounded-full border-2 border-primary/30"
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase font-bold">
                {filledDots >= 4 ? "✓ Verified & Secured" : "Enter PIN to confirm"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyEngine;
