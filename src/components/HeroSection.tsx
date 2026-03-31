import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import HeroOverlays from "@/components/HeroOverlays";

const marqueeItems = [
  "STABLECOIN CORE", "MOBILE MONEY", "BANK TRANSFERS", "PIN-GATED",
  "19 COUNTRIES", "INSTANT SETTLEMENT", "WHATSAPP NATIVE", "AI-POWERED",
];

interface ChatMessage {
  from: "user" | "ai";
  text: string;
}

const chatSequence: ChatMessage[] = [
  { from: "user", text: "Send 50 USDT to Kenya" },
  { from: "ai", text: "50 USDT ≈ 6,450 KES via M-Pesa. Reply PIN to confirm." },
  { from: "user", text: "1234" },
  { from: "ai", text: "✅ Done! Sent to +254****. Ref: VX-8291" },
];

const HeroSection = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const addNextMessage = useCallback(() => {
    if (currentIndex >= chatSequence.length) return;
    const msg = chatSequence[currentIndex];
    if (msg.from === "ai") {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, msg]);
        setCurrentIndex((i) => i + 1);
      }, 1000);
    } else {
      setMessages((prev) => [...prev, msg]);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= chatSequence.length) {
      const t = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 4000);
      return () => clearTimeout(t);
    }
    const delay = currentIndex === 0 ? 1500 : 800;
    const t = setTimeout(addNextMessage, delay);
    return () => clearTimeout(t);
  }, [currentIndex, addNextMessage]);

  // Parallax scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setParallaxY(Math.min(scrollY * 0.08, 10));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background image with parallax + breathing */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover animate-hero-breathe"
          loading="eager"
          width={1920}
          height={1080}
          style={{
            filter: "saturate(0.85)",
            opacity: 0.9,
            transform: `translateY(${parallaxY}px)`,
          }}
        />

        {/* Warm gradient overlay — adapts to theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F6F2]/90 via-[#F7F6F2]/40 to-transparent dark:from-black/80 dark:via-black/50 dark:to-transparent" />

        {/* Subtle dark unifier */}
        <div className="absolute inset-0 bg-black/[0.06]" />

        {/* Local grain boost */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }} />
      </div>

      {/* Animated overlay elements (ghost bubbles, flow lines, nodes) */}
      <HeroOverlays />

      {/* Main content */}
      <div className="flex-1 flex items-center pt-16 pb-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            {/* Left — Text with backdrop blur */}
            <div className="space-y-5 backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-3xl p-6 sm:p-8 -m-6 sm:-m-8">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[11px] font-bold tracking-[0.25em] uppercase text-foreground/50"
              >
                Africa's Financial Intelligence Layer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[48px] sm:text-[68px] lg:text-[84px] xl:text-[100px] font-heading font-bold leading-[0.88] tracking-[-0.03em] text-foreground uppercase"
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
                Buy, sell, swap, or move crypto across Africa — VIXA handles the execution securely.
              </motion.p>


              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide hover:scale-[1.03] hover:shadow-[0_0_30px_hsl(75,85%,55%,0.3)] transition-all duration-300"
                >
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </a>
              </motion.div>
            </div>

            {/* Right — Interactive Chat Demo with glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="w-full max-w-[340px] mx-auto lg:mx-0 relative"
            >
              {/* Radial glow behind phone */}
              <div className="absolute -inset-12 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative rounded-[2rem] border border-white/10 dark:border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Status bar */}
                <div className="px-6 py-2.5 flex justify-between items-center text-[11px] text-white/40">
                  <span className="font-medium">9:41</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-white/20" />
                    <div className="w-3 h-3 rounded-full border border-white/30 bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                  </div>
                </div>

                {/* Chat header */}
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="text-primary font-bold text-xs">VA</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">VIXA AI</h4>
                    <p className="text-[10px] text-primary/70">Online</p>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Chat messages */}
                <div className="p-4 space-y-3 min-h-[280px] max-h-[320px] flex flex-col justify-end">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`${i}-${msg.text}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.from === "user" ? (
                        <div className="bg-primary/20 border border-primary/20 text-white px-3.5 py-2 rounded-2xl rounded-br-sm max-w-[85%]">
                          <p className="text-[13px]">{msg.text}</p>
                        </div>
                      ) : (
                        <div className="bg-white/10 border border-white/10 px-3.5 py-2 rounded-2xl rounded-bl-sm max-w-[85%]">
                          <p className="text-[9px] text-primary font-bold mb-0.5 tracking-wider">VIXA AI</p>
                          <p className="text-[13px] text-white/80">{msg.text}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input bar */}
                <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
                  <div className="flex-1 bg-white/5 rounded-full px-4 py-2 text-[12px] text-white/30">
                    Type a message...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
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
