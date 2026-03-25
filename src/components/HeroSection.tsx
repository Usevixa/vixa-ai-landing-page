import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const notifications = [
  { icon: "🟢", title: "Transfer complete", detail: "+200 USDT", time: "12m ago" },
  { icon: "🔄", title: "Converting USDT → KES", detail: "Processing", time: "Just now" },
];

const marqueeItems = [
  "STABLECOIN CORE", "MOBILE MONEY", "BANK TRANSFERS", "PIN-GATED",
  "19 COUNTRIES", "INSTANT SETTLEMENT", "WHATSAPP NATIVE", "AI-POWERED",
];

const HeroSection = () => {
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowNotifs(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute inset-0 grid-overlay" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Left */}
            <div className="space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground"
              >
                Africa's Financial Intelligence Layer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[52px] sm:text-[72px] lg:text-[88px] xl:text-[104px] font-heading font-bold leading-[0.88] tracking-[-0.03em] text-foreground uppercase"
              >
                AI For
                <br />
                African
                <br />
                Money.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-muted-foreground max-w-[480px] leading-relaxed"
              >
                Send money like you send a message.
                <br />
                VIXA understands you — and moves it securely across Africa.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(75,85%,55%,0.25)] transition-all duration-300"
                >
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </a>
              </motion.div>
            </div>

            {/* Right — floating notification cards */}
            <div className="hidden lg:flex flex-col gap-3 w-[320px]">
              {notifications.map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: showNotifs ? 1 : 0, x: showNotifs ? 0 : 30 }}
                  transition={{ delay: 0.2 + i * 0.3, duration: 0.5, ease: "easeOut" }}
                  className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-3 animate-hero-float"
                  style={{ animationDelay: `${i * 1.5}s` }}
                >
                  <span className="text-xl">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                  <span className="text-sm font-bold text-primary whitespace-nowrap">{n.detail}</span>
                </motion.div>
              ))}

              {/* Phone mockup hint */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: showNotifs ? 1 : 0, scale: showNotifs ? 1 : 0.95 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-card border border-border rounded-2xl p-4 mt-2"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-vixa-green/20 flex items-center justify-center">
                    <span className="text-vixa-green font-bold text-[8px]">VA</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">VIXA AI</span>
                  <span className="text-[9px] text-muted-foreground ml-auto">Online</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-vixa-green text-primary-foreground px-3 py-1.5 rounded-xl rounded-br-sm text-xs">
                      Send 50 USDT to Kenya
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary px-3 py-1.5 rounded-xl rounded-bl-sm text-xs text-foreground/80">
                      50 USDT ≈ 6,450 KES. Reply PIN to confirm.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative z-10 border-t border-border overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 text-xs font-bold tracking-[0.15em] text-muted-foreground flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
