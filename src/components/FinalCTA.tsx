import { motion } from "framer-motion";

const heading = "Talk To Your Wallet.";
const chars = heading.split("");

const FinalCTA = () => {
  return (
    <section className="py-[100px] sm:py-[140px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Rotating radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary/[0.05] blur-[120px] animate-float" />
      </div>

      {/* Floating dots */}
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-primary/30 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-primary/15 animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <div className="text-[42px] sm:text-[56px] lg:text-[72px] xl:text-[88px] font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.88] mb-4 uppercase">
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground font-heading font-semibold mb-12"
        >
          Let intelligence handle execution.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-2 px-10 py-4.5 rounded-full bg-primary text-primary-foreground font-bold text-base uppercase tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_0_30px_hsl(75,85%,55%,0.3)] hover:scale-[1.03] transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" style={{
              backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }} />
            <span className="relative z-10">Enter the VIXA Network</span>
            <svg className="relative z-10" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
