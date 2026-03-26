import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const text =
  "Africa runs on conversation. Money systems don't. Stablecoins move fast — local rails don't speak crypto. Apps are optional — WhatsApp is everywhere. VIXA turns chat into execution. And every move is PIN-confirmed.";

const words = text.split(" ");

const WhyVixa = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));
      const normalized = Math.min(1, progress / 0.85);
      setActiveWordIndex(Math.floor(normalized * words.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getWordStyle = useCallback(
    (i: number) => {
      const isActive = i === activeWordIndex;
      const isPast = i < activeWordIndex;
      const isHovered = i === hoveredWord;

      const weight = isActive || isHovered ? 700 : isPast ? 600 : 300;
      const opacity = isActive || isHovered ? 1 : isPast ? 0.6 : 0.2;

      return {
        fontVariationSettings: `"wght" ${weight}`,
        opacity,
        transition: "font-variation-settings 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, color 0.3s ease",
      } as React.CSSProperties;
    },
    [activeWordIndex, hoveredWord]
  );

  return (
    <section ref={sectionRef} className="relative lg:h-[220vh]">
      {/* Desktop: sticky scroll-driven */}
      <div className="hidden lg:flex sticky top-0 h-screen items-center overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[42px] sm:text-[56px] lg:text-[68px] xl:text-[80px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-12 uppercase"
          >
            Why VIXA.
          </motion.h2>

          <div className="leading-[1.6] text-2xl sm:text-3xl lg:text-[2.5rem] font-heading tracking-[-0.01em]">
            {words.map((word, i) => (
              <span
                key={i}
                className={`inline-block mr-[0.35em] cursor-default ${
                  i === activeWordIndex || i === hoveredWord
                    ? "text-foreground"
                    : i < activeWordIndex
                    ? "text-foreground/60"
                    : "text-muted-foreground/30"
                }`}
                style={getWordStyle(i)}
                onMouseEnter={() => setHoveredWord(i)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Accent dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-2 h-2 rounded-full bg-primary mt-12 animate-pulse-dot"
          />
        </div>
      </div>

      {/* Mobile: static layout */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-[36px] sm:text-[48px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-8 uppercase">
            Why VIXA.
          </h2>
          <p className="text-lg sm:text-xl font-heading font-medium text-foreground/70 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyVixa;
