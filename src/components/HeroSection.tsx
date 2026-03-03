import { motion } from 'framer-motion';
import NeuralBackground from './NeuralBackground';
import HeroPhone from './HeroPhone';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <NeuralBackground />
      
      {/* Faint Africa silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 400 500" className="w-[600px] h-[750px]" fill="hsl(var(--primary))">
          <path d="M200 10c-20 5-40 15-55 30-15 20-25 40-35 65-5 15-15 30-30 40-20 15-35 35-40 60-5 25 0 50 5 75 5 20 10 40 20 55 10 20 25 35 35 50 15 20 25 45 30 70 5 20 15 35 30 45 15 10 30 15 50 15 15 0 30-5 45-15 10-10 20-25 25-40 10-20 15-45 15-70 0-20-5-40-15-55-10-20-15-40-10-60 5-15 15-30 30-40 15-10 25-25 30-45 5-15 5-35 0-50-5-20-15-35-30-45-15-15-35-25-55-30-10-3-20-5-30-5z"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-bold leading-[0.95] tracking-[-0.02em]"
            >
              <span className="text-gradient-emerald">Intelligence</span>
              <br />
              <span className="text-foreground">for African</span>
              <br />
              <span className="text-foreground">Money Movement.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg"
            >
              VIXA AI transforms WhatsApp conversations into real financial infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base glow-emerald-sm hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 transition-all duration-500">
                Launch VIXA on WhatsApp
              </button>
              <button className="px-8 py-3.5 rounded-lg border border-primary/40 text-primary font-semibold text-base hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-500">
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Right — Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HeroPhone />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-2 h-2 rounded-full bg-primary animate-scroll-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
