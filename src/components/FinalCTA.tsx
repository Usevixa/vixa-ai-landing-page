import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[42px] sm:text-[56px] lg:text-[72px] xl:text-[88px] font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.88] mb-4 uppercase"
        >
          Talk To
          <br />
          Your Wallet.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg sm:text-xl text-muted-foreground font-heading font-semibold mb-12"
        >
          Let intelligence handle execution.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-10 py-4.5 rounded-full bg-primary text-primary-foreground font-bold text-base uppercase tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_0_30px_hsl(75,85%,55%,0.3)] hover:scale-[1.03] transition-all duration-300"
          >
            Enter the VIXA Network
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
