import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "You send a message.", desc: "Plain text, voice note, pidgin — VIXA understands it all." },
  { num: "02", title: "VIXA AI understands intent.", desc: "Parses currency, destination, and compliance in real-time." },
  { num: "03", title: "You confirm with PIN.", desc: "Nothing executes without your explicit approval." },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground mb-16 leading-[0.92] uppercase"
        >
          How Your Words
          <br />
          Become Money.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-primary/10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full bg-primary/30 origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative border-t border-border pt-8 group cursor-default"
            >
              <span className="text-[100px] sm:text-[120px] font-heading font-bold leading-none text-foreground/[0.03] absolute -top-6 -left-1 select-none pointer-events-none">
                {step.num}
              </span>
              <div className="relative">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-primary-foreground bg-primary tracking-widest uppercase mb-4 group-hover:scale-110 group-hover:shadow-[0_0_16px_hsl(var(--primary)/0.3)] transition-all duration-300">
                  {step.num}
                </span>
                <p className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
              {/* Hover left accent */}
              <div className="absolute left-0 top-0 w-[2px] h-0 group-hover:h-full bg-primary transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
