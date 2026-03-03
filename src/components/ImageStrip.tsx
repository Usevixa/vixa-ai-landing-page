import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const images = [
  { src: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1600&q=80", large: true },
  { src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80", large: false },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80", large: false },
  { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80", large: true },
];

const ImageStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="py-[50px] sm:py-[70px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {images.map((img, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? 10 : -10, i % 2 === 0 ? -10 : 10]);
            return (
              <motion.div
                key={i}
                style={{ y }}
                className={`overflow-hidden rounded-2xl shadow-sm ${img.large ? "lg:col-span-1" : ""}`}
              >
                <img
                  src={img.src}
                  alt="African fintech in action"
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
        <AnimatedSection animation="fade-up" delay={80}>
          <p className="text-center text-lg sm:text-xl font-heading font-bold text-foreground mt-6">
            Built for real life — not demos.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ImageStrip;
