const PhoneMockup = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto animate-fade-in" style={{ animationDelay: "300ms" }}>
      {/* Floating Icons */}
      <div className="absolute -left-8 top-1/4 text-4xl opacity-30 animate-float-gentle" style={{ animationDelay: "0s" }}>
        💰
      </div>
      <div className="absolute -right-8 top-1/3 text-4xl opacity-30 animate-float-gentle" style={{ animationDelay: "1s" }}>
        📊
      </div>
      <div className="absolute -left-12 bottom-1/4 text-4xl opacity-30 animate-float-gentle" style={{ animationDelay: "2s" }}>
        🔒
      </div>
      
      {/* Phone Container with Enhanced Glow */}
      <div className="relative">
        {/* Multi-layer Colorful Glow Effect */}
        <div className="absolute -inset-4 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent blur-3xl rounded-[3rem]" />
          <div className="absolute inset-0 bg-gradient-to-tl from-secondary/40 to-transparent blur-3xl rounded-[3rem] animate-pulse-soft" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky/30 to-transparent blur-2xl rounded-[3rem]" style={{ animationDelay: "1s" }} />
        </div>
        
        {/* Phone Frame - Light Silver/White */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-[3rem] p-3 shadow-2xl border-4 border-white/50" style={{ 
          boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.5) inset'
        }}>
          {/* Screen */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
            {/* Status Bar */}
            <div className="bg-muted px-6 py-2 flex justify-between items-center text-xs text-foreground">
              <span className="font-semibold">9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-primary/30 rounded-full" />
                <div className="w-4 h-4 bg-primary/60 rounded-full" />
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse-soft" />
              </div>
            </div>

            {/* WhatsApp Header */}
            <div className="bg-primary/5 px-4 py-3 flex items-center space-x-3 border-b border-border/30">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">VA</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">VIXA AI</h4>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 min-h-[400px] bg-gradient-to-b from-muted/30 to-background">
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
    </div>
  );
};

export default PhoneMockup;
