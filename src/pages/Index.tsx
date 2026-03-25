import HeroSection from "@/components/HeroSection";
import StatementBlock from "@/components/StatementBlock";
import WhyVixa from "@/components/WhyVixa";
import AfricaNetwork from "@/components/AfricaNetwork";
import HowItWorks from "@/components/HowItWorks";
import SafetyEngine from "@/components/SafetyEngine";
import IntelligenceStack from "@/components/IntelligenceStack";
import LiveChatDemo from "@/components/LiveChatDemo";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <a href="/" className="font-heading font-bold text-lg tracking-tight text-foreground uppercase">
              VIXA
            </a>
            <div className="hidden md:flex items-center gap-6">
              {[["Why VIXA", "#whyvixa"], ["How It Works", "#howitworks"], ["Coverage", "#coverage"]].map(([label, href]) => (
                <a key={label} href={href} className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-wide">
                  {label}
                </a>
              ))}
            </div>
            <a href="#cta" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide hover:scale-[1.03] hover:shadow-[0_0_20px_hsl(75,85%,55%,0.2)] transition-all duration-200">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <HeroSection />

      <div className="border-t border-border">
        <StatementBlock />
      </div>

      <div id="whyvixa" className="border-t border-border">
        <WhyVixa />
      </div>

      <div id="coverage" className="border-t border-border bg-card">
        <AfricaNetwork />
      </div>

      <div id="howitworks" className="border-t border-border">
        <HowItWorks />
      </div>

      <div className="border-t border-border bg-card">
        <SafetyEngine />
      </div>

      <div className="border-t border-border">
        <IntelligenceStack />
      </div>

      <div className="border-t border-border bg-card">
        <LiveChatDemo />
      </div>

      <div id="cta" className="border-t border-border">
        <FinalCTA />
      </div>

      <footer className="py-6 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-xs">
          <p>© 2025 VIXA. Intelligence for African money movement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
