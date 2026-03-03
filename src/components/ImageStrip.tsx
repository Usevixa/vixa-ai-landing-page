import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const images = [
  "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80",
];

const ImageStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((src, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? 8 : -8, i % 2 === 0 ? -8 : 8]);
            return (
              <motion.div
                key={i}
                style={{ y }}
                className="overflow-hidden rounded-[18px] shadow-sm"
              >
                <img
                  src={src}
                  alt="African fintech"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
        <AnimatedSection animation="fade-up" delay={100}>
          <p className="text-center text-xl sm:text-2xl font-heading font-bold text-foreground mt-8">
            Built for real life — not demos.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ImageStrip;
