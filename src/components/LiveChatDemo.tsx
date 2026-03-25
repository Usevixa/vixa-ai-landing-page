import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const scenarios = [
  { user: "Send 50 USDT to Kenya.", ai: "Converted. Reply with PIN to confirm." },
  { user: "Why pending?", ai: "Awaiting bank confirmation. I'll notify you if it exceeds 15 minutes." },
  { user: "Weekly summary.", ai: "Done. Want it as PDF?" },
];

const ChatBubble = ({ scenario, index }: { scenario: typeof scenarios[0]; index: number }) => {
  const [showUser, setShowUser] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowUser(true);
          setTimeout(() => setShowTyping(true), 500);
          setTimeout(() => { setShowTyping(false); setShowAi(true); }, 1200);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors duration-300">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-vixa-green/20 flex items-center justify-center">
          <span className="text-vixa-green font-bold text-[7px]">VA</span>
        </div>
        <span className="text-xs font-bold text-foreground">VIXA AI</span>
        <span className="text-[9px] text-muted-foreground ml-auto">#{index + 1}</span>
      </div>
      <div className="p-4 space-y-3 min-h-[110px]">
        {showUser && (
          <div className="flex justify-end animate-fade-in">
            <div className="bg-vixa-green text-primary-foreground px-3 py-2 rounded-xl rounded-br-sm max-w-[85%]">
              <p className="text-xs font-medium">{scenario.user}</p>
            </div>
          </div>
        )}
        {showTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-secondary px-3 py-2.5 rounded-xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        {showAi && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-secondary px-3 py-2 rounded-xl rounded-bl-sm max-w-[85%]">
              <p className="text-[9px] text-primary font-bold mb-0.5">VIXA AI</p>
              <p className="text-xs text-foreground/80">{scenario.ai}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LiveChatDemo = () => {
  return (
    <section className="py-[80px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-12 uppercase"
        >
          Built For Real Life —
          <br />
          Not Demos.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4">
          {scenarios.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ChatBubble scenario={s} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveChatDemo;
