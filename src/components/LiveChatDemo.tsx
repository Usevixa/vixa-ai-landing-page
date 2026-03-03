import { useEffect, useState, useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";

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
    <div ref={ref} className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-border flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-[7px]">VA</span>
        </div>
        <span className="text-[11px] font-bold text-foreground">VIXA AI</span>
        <span className="text-[9px] text-muted-foreground ml-auto">#{index + 1}</span>
      </div>
      <div className="p-3 space-y-2 min-h-[100px]">
        {showUser && (
          <div className="flex justify-end animate-fade-in">
            <div className="bg-primary text-primary-foreground px-2.5 py-1.5 rounded-lg rounded-br-sm max-w-[85%]">
              <p className="text-xs">{scenario.user}</p>
            </div>
          </div>
        )}
        {showTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-muted px-2.5 py-2 rounded-lg rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1 h-1 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1 h-1 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        {showAi && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-muted px-2.5 py-1.5 rounded-lg rounded-bl-sm max-w-[85%]">
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
    <section className="py-[60px] sm:py-[80px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-up">
          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] xl:text-[72px] font-heading font-bold tracking-[-0.025em] text-foreground leading-[0.92] mb-10">
            Built for real life — not demos.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-4">
          {scenarios.map((s, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
              <ChatBubble scenario={s} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveChatDemo;
