import { MessageCircle, Shield, MapPin, Coins } from "lucide-react";

const PhoneMockup = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Floating Icons */}
      <div className="absolute -left-8 top-12 animate-float opacity-60">
        <div className="p-3 bg-primary/20 rounded-xl glow-primary">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="absolute -right-8 top-24 animate-float opacity-60" style={{ animationDelay: "1s" }}>
        <div className="p-3 bg-secondary/20 rounded-xl glow-secondary">
          <Coins className="w-5 h-5 text-secondary" />
        </div>
      </div>
      <div className="absolute -left-6 bottom-32 animate-float opacity-60" style={{ animationDelay: "2s" }}>
        <div className="p-3 bg-primary/20 rounded-xl">
          <Shield className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="absolute -right-6 bottom-16 animate-float opacity-60" style={{ animationDelay: "1.5s" }}>
        <div className="p-3 bg-secondary/20 rounded-xl">
          <MapPin className="w-5 h-5 text-secondary" />
        </div>
      </div>

      {/* Phone Frame */}
      <div className="relative glass-card rounded-[2.5rem] p-3 glow-primary">
        <div className="bg-background rounded-[2rem] overflow-hidden">
          {/* Phone Status Bar */}
          <div className="bg-muted px-6 py-2 flex items-center justify-between text-xs">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-3 border border-foreground rounded-sm" />
              <div className="w-1 h-1 bg-foreground rounded-full" />
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-primary/10 px-4 py-3 flex items-center space-x-3 border-b border-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">VA</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">VIXA AI</h4>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 min-h-[400px] bg-background/50">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm max-w-[75%]">
                <p className="text-sm">VIXA, send 150 USDT to South Africa — Capitec Bank.</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%]">
                <p className="text-xs text-primary font-semibold mb-1">VIXA AI</p>
                <p className="text-sm">Sure Victor. 150 USDT ≈ 2,780 ZAR. Reply with your PIN to confirm.</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm max-w-[75%]">
                <p className="text-sm">Also create a receipt for my landlord.</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%]">
                <p className="text-xs text-primary font-semibold mb-1">VIXA AI</p>
                <p className="text-sm">Done. I'll generate it automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
