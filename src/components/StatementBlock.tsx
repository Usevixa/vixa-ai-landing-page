import { motion } from "framer-motion";

const StatementBlock = () => {
  return (
    <section className="py-[100px] sm:py-[120px] px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container mx-auto max-w-5xl text-center relative z-10">
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
          className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-primary mt-4 tracking-tight"
        >
          It needs execution.
        </motion.p>
      </div>
    </section>
  );
};

export default StatementBlock;
