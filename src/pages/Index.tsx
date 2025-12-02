import Navigation from "@/components/Navigation";
import PhoneMockup from "@/components/PhoneMockup";
import FeatureCard from "@/components/FeatureCard";
import ChatDemo from "@/components/ChatDemo";
import FAQAccordion from "@/components/FAQAccordion";
import GradientOrbs from "@/components/GradientOrbs";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingParticles from "@/components/FloatingParticles";
import AnimatedCounter from "@/components/AnimatedCounter";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Brain,
  Shield,
  FileText,
  Globe,
  MessageSquare,
  Zap,
  Target,
  Lock,
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  Gift,
  Code,
  Webhook,
  Database,
  Clock,
  Eye,
  Languages,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <GradientOrbs />
        <FloatingParticles count={20} />
        <div className="animated-grid absolute inset-0 opacity-50" />
        
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-blur-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-tight">
                <span className="text-gradient-vibrant stagger-text" style={{ animationDelay: '0ms' }}>Your Financial Co-Pilot</span>
                <br />
                <span className="text-foreground stagger-text" style={{ animationDelay: '200ms' }}>on WhatsApp</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                A smart assistant built for Africa's unique payments, currencies, and everyday money flows — available 24/7 inside your WhatsApp chats.
              </p>

              <ul className="space-y-3">
                {[
                  "Understands voice notes, Pidgin, and casual typing",
                  "Executes payments, withdrawals, and conversions",
                  "Explains transactions clearly",
                  "Works instantly inside WhatsApp",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="pulse-glow-button bg-primary hover:bg-primary-glow text-primary-foreground text-base px-8 font-semibold relative overflow-hidden group">
                <span className="relative z-10">Try VIXA on WhatsApp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] group-hover:animate-[gradient-shift_2s_ease_infinite]" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </Button>
            </div>

            {/* Right - Phone Mockup */}
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* What is VIXA AI? */}
      <section id="overview" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <WaveDivider variant="top" />
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection animation="fade-up">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold tracking-wide mb-4">
              OVERVIEW
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              What exactly is <span className="text-gradient-primary">VIXA AI</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              VIXA AI is the intelligence layer behind the VIXA wallet. It listens to your messages and voice notes on WhatsApp, understands your intent, and turns it into real, secure financial actions.
            </p>
          </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="WhatsApp-native"
              description="No app downloads. No new platforms. Just WhatsApp — where you already are."
              delay={0}
            />
            <FeatureCard
              icon={Globe}
              title="Africa-first"
              description="Built for African languages, currencies, payment systems, and real-world money flows."
              delay={100}
            />
            <FeatureCard
              icon={Clock}
              title="Always on"
              description="24/7 availability. Instant responses. Your money never sleeps, and neither does VIXA AI."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <AnimatedCounter end={10000} suffix="+" label="Active Users" />
            <AnimatedCounter end={500000} suffix="+" label="Transactions Completed" />
            <AnimatedCounter end={15} suffix="+" label="Countries Supported" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <WaveDivider variant="top" />
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-semibold tracking-wide mb-4">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              How VIXA AI turns your <span className="text-gradient-gold">words into actions</span>
            </h2>
          </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "You chat or send a voice note",
                description: "Talk naturally in your language. No commands to memorize.",
              },
              {
                icon: Brain,
                title: "VIXA AI understands your intent",
                description: "Our AI parses context, amount, recipient, and action needed.",
              },
              {
                icon: Shield,
                title: "Security checks & PIN confirmation",
                description: "We verify identity and get your explicit confirmation.",
              },
              {
                icon: Zap,
                title: "Execution & receipt",
                description: "Money moves instantly. Receipts generated automatically.",
              },
            ].map((step, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="relative">
                <div className="glass-card shimmer-card p-6 rounded-2xl text-center hover:glow-primary transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 relative">
                    <step.icon className="w-8 h-8 text-primary" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
        <WaveDivider variant="top" />
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold tracking-wide mb-4">
              CAPABILITIES
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              What VIXA AI <span className="text-gradient-primary">can do</span> for you
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Voice-to-Command Intelligence",
                description: "Send voice notes in any language. VIXA AI transcribes, understands context, and acts.",
              },
              {
                icon: Brain,
                title: "Transaction Reasoning Engine",
                description: "Understands complex requests like 'split the bill' or 'pay my landlord monthly'.",
              },
              {
                icon: Target,
                title: "Smart Error Detection",
                description: "Catches mistakes before they happen. Warns you about unusual patterns or typos.",
              },
              {
                icon: FileText,
                title: "Automatic Receipts & Summaries",
                description: "Generates PDFs, spending reports, and transaction history on demand.",
              },
              {
                icon: Globe,
                title: "Multi-Country Payment Intelligence",
                description: "Knows exchange rates, bank codes, and local payment methods across Africa.",
              },
              {
                icon: MessageSquare,
                title: "Conversational Support",
                description: "Explains fees, answers questions, and teaches you as you use the wallet.",
              },
            ].map((capability, index) => (
              <FeatureCard
                key={index}
                icon={capability.icon}
                title={capability.title}
                description={capability.description}
                delay={index * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Demo */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-semibold tracking-wide mb-4">
              AI DEMO
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              See VIXA AI <span className="text-gradient-gold">in action</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Talk to your wallet like you talk to a friend.
            </p>
          </div>

          <div className="space-y-12">
            <ChatDemo
              title="Example 1 — Payment"
              messages={[
                { sender: "user", text: "Pay my designer 50 USDT in Lagos." },
                { sender: "ai", text: "50 USDT ≈ 82,500 NGN.\nRecipient: Lagos, Nigeria\nReply with PIN to confirm." },
              ]}
            />

            <ChatDemo
              title="Example 2 — Explanation"
              messages={[
                { sender: "user", text: "Why is this transaction pending?" },
                { sender: "ai", text: "It's awaiting confirmation from the receiving bank. Typical wait time is 5-10 minutes.\n\nI'll notify you if it exceeds 15 minutes." },
              ]}
            />

            <ChatDemo
              title="Example 3 — Spending Summary"
              messages={[
                { sender: "user", text: "How much did I withdraw this month?" },
                { sender: "ai", text: "You've withdrawn 320 USDT this month.\n\nBreakdown:\n• 150 USDT to South Africa\n• 100 USDT to Nigeria\n• 70 USDT to Kenya\n\nWant a detailed PDF?" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* For Users */}
      <section id="users" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold tracking-wide mb-4">
              FOR USERS
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              How everyday people <span className="text-gradient-primary">use VIXA AI</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Send money home",
                description: "Support family across borders. VIXA AI handles conversions and local bank details.",
              },
              {
                icon: GraduationCap,
                title: "Pay school fees, rent, and bills",
                description: "Set up recurring payments. Get reminders. Never miss a due date.",
              },
              {
                icon: Briefcase,
                title: "Freelancers & side hustlers",
                description: "Get paid internationally. Convert to local currency. Track income effortlessly.",
              },
              {
                icon: Gift,
                title: "Gift card cashout",
                description: "Convert gift cards to cash. VIXA AI finds the best rates and handles verification.",
              },
            ].map((useCase, index) => (
              <FeatureCard
                key={index}
                icon={useCase.icon}
                title={useCase.title}
                description={useCase.description}
                delay={index * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold tracking-wide mb-4">
              SECURITY
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              Safe by design, <span className="text-gradient-primary">not by accident</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lock,
                title: "PIN-gated actions",
                description: "Every financial action requires your explicit PIN confirmation.",
              },
              {
                icon: Eye,
                title: "Identity verification",
                description: "NIN verification and KYC checks protect your account.",
              },
              {
                icon: Shield,
                title: "Human-in-the-loop safety",
                description: "High-value or unusual transactions get extra review layers.",
              },
              {
                icon: FileText,
                title: "Audit trails",
                description: "Every action is logged, traceable, and reversible where applicable.",
              },
            ].map((security, index) => (
              <FeatureCard
                key={index}
                icon={security.icon}
                title={security.title}
                description={security.description}
                delay={index * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-semibold tracking-wide mb-4">
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <GradientOrbs />
        <div className="animated-grid absolute inset-0 opacity-40" />
        <div className="container mx-auto max-w-4xl text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Ready to talk to <span className="text-gradient-primary">your wallet</span>?
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join early users already using VIXA AI to move money smarter, safer, and faster across Africa.
          </p>

          <Button size="lg" className="pulse-glow-button bg-primary hover:bg-primary-glow text-primary-foreground text-lg px-12 font-semibold relative overflow-hidden group">
            <span className="relative z-10">Try VIXA on WhatsApp</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] group-hover:animate-[gradient-shift_2s_ease_infinite]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 VIXA AI. Powering the future of African financial intelligence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
