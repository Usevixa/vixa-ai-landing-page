import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const paragraph =
  "Africa runs on conversation. Money systems don't. Stablecoins move fast — local rails don't speak crypto. Apps are optional — WhatsApp is everywhere. VIXA turns chat into execution. And every move is PIN-confirmed.";

const words = paragraph.split(" ");

const WhyVixa = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalized = Math.min(1, scrollProgress / 0.85);
  const activeWordIndex = Math.floor(normalized * words.length);

  return (
    <section ref={sectionRef} className="relative lg:h-[200vh]">
      {/* Desktop: sticky scroll */}
      <div className="hidden lg:flex sticky top-0 h-screen items-center overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[42px] sm:text-[56px] lg:text-[68px] xl:text-[80px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-12 uppercase"
          >
            Why VIXA.
          </motion.h2>

          <div className="max-w-4xl">
            <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-heading leading-[1.3] tracking-[-0.01em]">
              {words.map((word, i) => {
                const isActive = i <= activeWordIndex;
                const isHovered = hoveredWord === i;
                const weight = isActive || isHovered ? 700 : 400;
                const opacity = isActive || isHovered ? 1 : 0.25;

                return (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredWord(i)}
                    onMouseLeave={() => setHoveredWord(null)}
                    className="inline-block mr-[0.28em] cursor-default"
                    style={{
                      fontVariationSettings: `"wght" ${weight}`,
                      opacity,
                      color: isActive || isHovered ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                      transition: "font-variation-settings 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: static */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-[36px] sm:text-[48px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-8 uppercase">
            Why VIXA.
          </h2>
          <p className="text-xl sm:text-2xl font-heading font-medium text-foreground/70 leading-[1.4]">
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyVixa;
