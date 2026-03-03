import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const nodes = [
  { id: 'ng', label: 'Nigeria', x: 32, y: 42, details: ['Bank transfers (NGN)', 'Mobile money', 'USDT → NGN'] },
  { id: 'gh', label: 'Ghana', x: 28, y: 44, details: ['Mobile Money (MoMo)', 'Bank rails', 'USDT → GHS'] },
  { id: 'ke', label: 'Kenya', x: 58, y: 50, details: ['M-Pesa', 'Bank transfers', 'USDT → KES'] },
  { id: 'za', label: 'South Africa', x: 45, y: 75, details: ['Capitec / FNB / Standard', 'EFT transfers', 'USDT → ZAR'] },
];

const connections = [
  { from: 'ng', to: 'gh' },
  { from: 'ng', to: 'ke' },
  { from: 'ke', to: 'za' },
  { from: 'ng', to: 'za' },
];

const AfricaNetwork = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="relative py-[120px] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] text-center mb-4">
            Built for Africa. <span className="text-gradient-emerald">Not adapted</span> for Africa.
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">
            Real-time corridors connecting the continent's financial systems.
          </p>
        </AnimatedSection>

        {/* Map area */}
        <div className="relative max-w-2xl mx-auto aspect-[4/3]">
          {/* SVG Africa silhouette */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-[0.06]" fill="hsl(var(--primary))">
            <ellipse cx="42" cy="48" rx="25" ry="35" />
            <ellipse cx="52" cy="55" rx="18" ry="28" />
          </svg>

          {/* Connection lines */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {connections.map((conn, i) => {
              const from = nodes.find(n => n.id === conn.from)!;
              const to = nodes.find(n => n.id === conn.to)!;
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="hsl(160, 100%, 48%)"
                  strokeWidth="0.3"
                  strokeOpacity="0.2"
                  strokeDasharray="2 2"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Pulse ring */}
              <div className="absolute inset-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-node" />
              </div>
              
              {/* Dot */}
              <div className="w-3 h-3 rounded-full bg-primary glow-emerald-sm relative z-10 group-hover:scale-150 transition-transform duration-300" />
              
              {/* Label */}
              <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap font-medium">
                {node.label}
              </span>

              {/* Tooltip */}
              <AnimatePresence>
                {activeNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 glass-panel rounded-lg p-3 border border-primary/20 min-w-[180px]"
                  >
                    <p className="text-xs font-semibold text-primary mb-2">{node.label}</p>
                    <ul className="space-y-1">
                      {node.details.map((d, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-primary/60" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AfricaNetwork;
