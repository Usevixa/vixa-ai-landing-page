import { motion } from "framer-motion";

const StatementBlock = () => {
  return (
    <section className="py-[120px] sm:py-[160px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Radial glow behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-primary/[0.06] blur-[100px] animate-pulse" style={{ animationDuration: "6s" }} />
      </div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto w-[120px] h-px bg-primary/20 mb-16 origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.95] tracking-[-0.03em] text-foreground"
        >
          Africa doesn't need
          <br />
          another app.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mt-4 tracking-tight"
        >
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            It needs execution.
          </span>
        </motion.p>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mx-auto w-[120px] h-px bg-primary/20 mt-16 origin-center"
        />
      </div>
    </section>
  );
};

export default StatementBlock;
