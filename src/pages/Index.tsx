import HeroSection from "@/components/HeroSection";
import LiveSimulation from "@/components/LiveSimulation";
import IntelligenceStack from "@/components/IntelligenceStack";
import AfricaNetwork from "@/components/AfricaNetwork";
import SafetyEngine from "@/components/SafetyEngine";
import ForBuilders from "@/components/ForBuilders";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="font-heading font-bold text-lg tracking-tight">
              <span className="text-gradient-emerald">VIXA</span>
              <span className="text-muted-foreground text-sm font-normal ml-2 hidden sm:inline">
                Virtual Interaction & eXchange Assistant
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {['Overview', 'Stack', 'Network', 'Security', 'API'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
            <a href="#cta" className="px-5 py-2 rounded-md bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 transition-all duration-300">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <div id="overview">
        <HeroSection />
      </div>
      <LiveSimulation />
      <div id="stack">
        <IntelligenceStack />
      </div>
      <div id="network">
        <AfricaNetwork />
      </div>
      <div id="security">
        <SafetyEngine />
      </div>
      <div id="api">
        <ForBuilders />
      </div>
      <div id="cta">
        <FinalCTA />
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/20">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 VIXA AI. Intelligence for African money movement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
