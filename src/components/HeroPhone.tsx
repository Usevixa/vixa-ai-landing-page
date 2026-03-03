import { useState, useEffect } from 'react';
import { Shield, Globe, Mic } from 'lucide-react';

const HeroPhone = () => {
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResponse(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Floating elements */}
      <div className="absolute -left-12 top-1/4 animate-float-idle" style={{ animationDelay: '0s' }}>
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center glow-emerald-sm">
          <span className="text-sm">₮</span>
        </div>
      </div>
      <div className="absolute -right-10 top-1/3 animate-float-idle" style={{ animationDelay: '1s' }}>
        <Shield className="w-5 h-5 text-primary/40 animate-pulse-node" />
      </div>
      <div className="absolute -left-8 bottom-1/3 animate-float-idle" style={{ animationDelay: '2s' }}>
        <Mic className="w-5 h-5 text-primary/30" />
      </div>
      <div className="absolute -right-12 bottom-1/4 animate-float-idle" style={{ animationDelay: '1.5s' }}>
        <Globe className="w-5 h-5 text-primary/30" />
      </div>

      {/* Phone glow */}
      <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full opacity-40" />

      {/* Phone frame */}
      <div className="relative bg-gradient-to-b from-[hsl(0,0%,12%)] to-[hsl(0,0%,8%)] rounded-[2.5rem] p-2 border border-[hsl(0,0%,18%)]" style={{
        boxShadow: '0 25px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset'
      }}>
        {/* Screen */}
        <div className="bg-[hsl(0,0%,4%)] rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="px-6 py-2.5 flex justify-between items-center text-xs text-muted-foreground">
            <span className="font-medium">9:41</span>
            <div className="flex gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full border border-primary/30" />
              <div className="w-3.5 h-3.5 rounded-full border border-primary/50 bg-primary/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-primary/60" />
            </div>
          </div>

          {/* Chat header */}
          <div className="px-4 py-3 border-b border-border/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-bold text-xs">VA</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">VIXA AI</h4>
              <p className="text-xs text-primary/60">Online</p>
            </div>
          </div>

          {/* Chat */}
          <div className="p-4 space-y-3 min-h-[380px]">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-primary/15 border border-primary/20 text-foreground px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                <p className="text-sm">Send 200 USDT to Ghana.</p>
              </div>
            </div>

            {/* AI Response */}
            {showResponse ? (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-accent border border-border/40 px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[80%]">
                  <p className="text-[10px] text-primary font-semibold mb-1 tracking-wider">VIXA AI</p>
                  <p className="text-sm text-foreground/80">200 USDT ≈ 2,940 GHS. Reply with PIN to confirm.</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="bg-accent border border-border/40 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPhone;
