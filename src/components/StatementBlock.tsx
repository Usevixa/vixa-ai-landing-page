import { motion } from "framer-motion";

const words = ["Africa", "doesn't", "need", "another", "app."];

const StatementBlock = () => {
  return (
    <section className="py-[100px] sm:py-[120px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      
      {/* Pulsing radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px] animate-hero-breathe pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-20 h-px bg-primary/20 mx-auto mb-12 origin-center"
        />

        <div className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.95] tracking-[-0.03em] text-foreground">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mt-4 tracking-tight animate-shimmer bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5), hsl(var(--primary)))",
            backgroundSize: "200% 100%",
          }}
        >
          It needs execution.
        </motion.p>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-20 h-px bg-primary/20 mx-auto mt-12 origin-center"
        />
      </div>
    </section>
  );
};

export default StatementBlock;
