import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div
      className="glass-card rainbow-border shimmer-card hover-lift tilt-card p-6 rounded-2xl hover:glow-primary transition-all duration-500 group animate-fade-in h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-start space-y-4 h-full">
        <div className="p-3 rounded-xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-primary/20 via-sky/15 to-secondary/20">
          <Icon className="w-6 h-6 text-primary relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="text-xl font-heading hover-bold-smooth-medium text-foreground tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
