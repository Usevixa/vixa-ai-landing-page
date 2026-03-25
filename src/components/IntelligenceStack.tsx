import { motion } from "framer-motion";

const layers = [
  { num: "01", title: "Intent Recognition", desc: "Understands voice, pidgin, and informal typing across African languages and dialects." },
  { num: "02", title: "Financial Logic", desc: "Handles multi-currency conversion, live rates, and compliance rules automatically." },
  { num: "03", title: "Security Engine", desc: "PIN-gated execution with anomaly detection and real-time risk scoring." },
  { num: "04", title: "Settlement Rails", desc: "Stablecoin core connected to local banks and mobile money." },
];

const IntelligenceStack = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] uppercase"
          >
            The Intelligence
            <br />
            Layer.
          </motion.h2>
          <div className="flex items-end">
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Four layers working quietly behind every message.
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid md:grid-cols-[60px_1fr_1.2fr] gap-3 md:gap-6 py-7 md:py-9 items-baseline border-b border-border group hover:bg-card/50 transition-colors duration-300 -mx-4 px-4 rounded-lg"
            >
              <span className="text-[10px] font-bold text-primary tracking-widest font-heading">{layer.num}</span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                {layer.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {layer.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceStack;
