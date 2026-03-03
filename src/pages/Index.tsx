import HeroSection from "@/components/HeroSection";
import WhyVixa from "@/components/WhyVixa";
import HowItWorks from "@/components/HowItWorks";
import IntelligenceStack from "@/components/IntelligenceStack";
import AfricaNetwork from "@/components/AfricaNetwork";
import ImageStrip from "@/components/ImageStrip";
import SafetyEngine from "@/components/SafetyEngine";
import LiveChatDemo from "@/components/LiveChatDemo";
import FinalCTA from "@/components/FinalCTA";

const Divider = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-px bg-border" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <a href="/" className="font-heading font-bold text-lg tracking-tight text-foreground">
              VIXA
            </a>
            <div className="hidden md:flex items-center gap-6">
              {[["Why VIXA", "#whyvixa"], ["How It Works", "#howitworks"], ["Coverage", "#coverage"]].map(([label, href]) => (
                <a key={label} href={href} className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {label}
                </a>
              ))}
            </div>
            <a href="#cta" className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <HeroSection />
      <Divider />

      <div id="whyvixa">
        <WhyVixa />
      </div>
      <Divider />

      <div id="howitworks">
        <HowItWorks />
      </div>
      <Divider />

      <div className="section-alt">
        <IntelligenceStack />
      </div>
      <Divider />

      <div id="coverage">
        <AfricaNetwork />
      </div>
      <Divider />

      <ImageStrip />
      <Divider />

      <SafetyEngine />
      <Divider />

      <LiveChatDemo />
      <Divider />

      <div id="cta">
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
