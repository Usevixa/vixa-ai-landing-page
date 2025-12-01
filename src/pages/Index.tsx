import Navigation from "@/components/Navigation";
import PhoneMockup from "@/components/PhoneMockup";
import FeatureCard from "@/components/FeatureCard";
import ChatDemo from "@/components/ChatDemo";
import FAQAccordion from "@/components/FAQAccordion";
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden mesh-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none animate-gradient-shift" />
        
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
                VIXA AI — Your Financial{" "}
                <span className="text-gradient-primary">Co-Pilot</span> on WhatsApp
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground animate-glow-pulse text-base px-8 font-semibold">
                  Try VIXA on WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-base px-8 font-medium transition-all duration-300">
                  View AI Demo
                </Button>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* What is VIXA AI? */}
      <section id="overview" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
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

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-semibold tracking-wide mb-4">
              HOW IT WORKS
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              How VIXA AI turns your <span className="text-gradient-gold">words into actions</span>
            </h2>
          </div>

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
              <div key={index} className="relative">
                <div className="glass-card p-6 rounded-2xl text-center hover:glow-primary transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 mesh-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Ready to talk to <span className="text-gradient-primary">your wallet</span>?
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join early users already using VIXA AI to move money smarter, safer, and faster across Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground animate-glow-pulse text-lg px-12 font-semibold">
              Get VIXA on WhatsApp
            </Button>
            <Button size="lg" variant="ghost" className="text-primary hover:text-primary-glow hover:bg-primary/10 text-lg font-medium transition-all duration-300">
              Return to main VIXA site →
            </Button>
          </div>
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
