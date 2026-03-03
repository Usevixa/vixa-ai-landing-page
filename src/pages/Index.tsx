import HeroSection from "@/components/HeroSection";
import WhyVixa from "@/components/WhyVixa";
import HowItWorks from "@/components/HowItWorks";
import IntelligenceStack from "@/components/IntelligenceStack";
import AfricaNetwork from "@/components/AfricaNetwork";
import ImageStrip from "@/components/ImageStrip";
import SafetyEngine from "@/components/SafetyEngine";
import LiveChatDemo from "@/components/LiveChatDemo";
import FinalCTA from "@/components/FinalCTA";

const SectionDivider = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-px bg-border" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="font-heading font-bold text-xl tracking-tight text-foreground">
              VIXA
            </a>
            <div className="hidden md:flex items-center gap-8">
              {["Why VIXA", "How It Works", "Coverage"].map((item, i) => (
                <a
                  key={item}
                  href={["#whyvixa", "#howitworks", "#coverage"][i]}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
            <a href="#cta" className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <HeroSection />
      <SectionDivider />

      <div id="whyvixa">
        <WhyVixa />
      </div>
      <SectionDivider />

      <div id="howitworks">
        <HowItWorks />
      </div>
      <SectionDivider />

      <div className="bg-muted/40">
        <IntelligenceStack />
      </div>
      <SectionDivider />

      <div id="coverage">
        <AfricaNetwork />
      </div>
      <SectionDivider />

      <ImageStrip />
      <SectionDivider />

      <SafetyEngine />
      <SectionDivider />

      <LiveChatDemo />
      <SectionDivider />

      <div id="cta">
        <FinalCTA />
      </div>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 VIXA. Intelligence for African money movement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
