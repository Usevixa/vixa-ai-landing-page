import { motion } from 'framer-motion';
import { Brain, Calculator, Shield, Zap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const layers = [
  {
    icon: Brain,
    title: 'Intent Recognition Engine',
    description: 'Understands natural language, voice notes, Pidgin, and contextual financial intent from WhatsApp messages.',
  },
  {
    icon: Calculator,
    title: 'Financial Logic Engine',
    description: 'Handles currency conversion, fee calculations, routing, and multi-corridor payment logic in real-time.',
  },
  {
    icon: Shield,
    title: 'Security & Risk Engine',
    description: 'Fraud detection, PIN gating, transaction limits, and anomaly detection before any money moves.',
  },
  {
    icon: Zap,
    title: 'Execution Layer',
    description: 'Connects to local bank rails, mobile money APIs, and stablecoin networks to settle transactions instantly.',
  },
];

const IntelligenceStack = () => {
  return (
    <section className="relative py-[120px] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-center mb-20">
            The AI Behind the <span className="text-gradient-emerald">Chat</span>.
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {layers.map((layer, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 120}>
              <div className="group relative">
                <div className="glass-panel rounded-xl p-6 sm:p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:bg-[hsl(0,0%,7%)]">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:glow-emerald-sm transition-all duration-500">
                      <layer.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1 tracking-tight">{layer.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                {index < layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-gradient-to-b from-primary/30 to-transparent" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceStack;
