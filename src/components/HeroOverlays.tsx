/**
 * Subtle animated overlay elements for the hero background:
 * ghost chat bubbles, money flow lines, and pulsing activity nodes.
 */
const ghostBubbles = [
  { top: "15%", left: "65%", w: 120, h: 40, delay: "0s" },
  { top: "35%", left: "75%", w: 100, h: 32, delay: "6s" },
  { top: "55%", left: "60%", w: 140, h: 36, delay: "12s" },
  { top: "25%", left: "85%", w: 90, h: 28, delay: "4s" },
];

const activityNodes = [
  { top: "20%", left: "70%", delay: "0s" },
  { top: "40%", left: "80%", delay: "1s" },
  { top: "60%", left: "55%", delay: "2s" },
  { top: "30%", left: "90%", delay: "1.5s" },
  { top: "70%", left: "75%", delay: "3s" },
  { top: "50%", left: "65%", delay: "0.5s" },
];

const HeroOverlays = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Ghost chat bubbles */}
      {ghostBubbles.map((b, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute rounded-2xl bg-white/[0.08] dark:bg-white/[0.06] border border-white/[0.04] animate-hero-drift"
          style={{
            top: b.top,
            left: b.left,
            width: b.w,
            height: b.h,
            animationDelay: b.delay,
            animationDuration: `${18 + i * 3}s`,
          }}
        />
      ))}

      {/* Money flow lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
        <path
          d="M200 800 Q600 400 1000 500 Q1400 600 1700 300"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeDasharray="200"
          className="animate-hero-flow opacity-[0.08]"
          fill="none"
        />
        <path
          d="M100 600 Q500 300 900 450 Q1300 600 1800 200"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="200"
          className="animate-hero-flow opacity-[0.06]"
          style={{ animationDelay: "3s" }}
          fill="none"
        />
        <path
          d="M300 900 Q700 500 1100 600 Q1500 700 1900 400"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="200"
          className="animate-hero-flow opacity-[0.05]"
          style={{ animationDelay: "5s" }}
          fill="none"
        />
      </svg>

      {/* Pulsing activity nodes */}
      {activityNodes.map((n, i) => (
        <div
          key={`node-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary/20 animate-hero-node"
          style={{
            top: n.top,
            left: n.left,
            animationDelay: n.delay,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroOverlays;
