import AnimatedSection from "@/components/AnimatedSection";

const HeroPhone = () => {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Phone frame */}
      <div className="bg-foreground rounded-[2.5rem] p-2 shadow-2xl">
        <div className="bg-background rounded-[2rem] overflow-hidden">
          {/* Status bar */}
          <div className="px-6 py-2 flex justify-between items-center text-[10px] text-muted-foreground font-medium">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-foreground/20" />
              <div className="w-3 h-1.5 rounded-sm bg-foreground/40" />
              <div className="w-3 h-1.5 rounded-sm bg-foreground/80" />
            </div>
          </div>

          {/* Chat header */}
          <div className="px-4 py-2.5 border-b border-border flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-[10px]">VA</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">VIXA AI</p>
              <p className="text-[10px] text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-3 space-y-2.5 min-h-[300px]">
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
                <p className="text-xs">Send 200 USDT to Ghana</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-muted px-3 py-2 rounded-xl rounded-bl-sm max-w-[80%]">
                <p className="text-[10px] text-primary font-semibold mb-0.5">VIXA AI</p>
                <p className="text-xs text-foreground/80">200 USDT ≈ 2,940 GHS.</p>
                <p className="text-xs text-foreground/80">Enter PIN to confirm.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-8">
            <AnimatedSection animation="fade-up">
              <h1 className="text-[42px] sm:text-[64px] lg:text-[80px] xl:text-[96px] font-heading font-bold leading-[0.95] tracking-[-0.02em] text-foreground">
                AI for
                <br />
                African
                <br />
                Money.
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={150}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed">
                Turn WhatsApp messages into real financial execution.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-flex items-center px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-500">
                  Launch VIXA on WhatsApp
                </a>
                <a href="#how" className="inline-flex items-center px-8 py-4 rounded-2xl border-2 border-foreground/15 text-foreground font-semibold text-base hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg transition-all duration-500">
                  See How It Works
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <HeroPhone />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
