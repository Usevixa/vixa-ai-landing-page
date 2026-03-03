import { useEffect, useState, useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const scenarios = [
  {
    user: "Send 50 USDT to Kenya bank.",
    ai: "Converted. PIN to confirm.",
  },
  {
    user: "Why is my transfer pending?",
    ai: "Awaiting bank confirmation. I'll notify you if it exceeds 15 minutes.",
  },
  {
    user: "Give me my weekly summary.",
    ai: "Done. Want it as PDF?",
  },
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
          setTimeout(() => setShowTyping(true), 600);
          setTimeout(() => { setShowTyping(false); setShowAi(true); }, 1400);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-[8px]">VA</span>
        </div>
        <span className="text-xs font-semibold text-foreground">VIXA AI</span>
        <span className="text-[10px] text-muted-foreground ml-auto">Scenario {index + 1}</span>
      </div>
      <div className="p-4 space-y-3 min-h-[120px]">
        {showUser && (
          <div className="flex justify-end animate-fade-in">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-xl rounded-br-sm max-w-[85%]">
              <p className="text-sm">{scenario.user}</p>
            </div>
          </div>
        )}
        {showTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-muted px-3 py-2.5 rounded-xl rounded-bl-sm">
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
            <div className="bg-muted px-3 py-2 rounded-xl rounded-bl-sm max-w-[85%]">
              <p className="text-[10px] text-primary font-semibold mb-0.5">VIXA AI</p>
              <p className="text-sm text-foreground/80">{scenario.ai}</p>
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
        <AnimatedSection animation="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-[-0.03em] text-foreground leading-[0.95] mb-12">
            See it in action.
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
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
