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
      className="glass-card gradient-border hover-lift p-6 rounded-2xl hover:glow-primary transition-all duration-500 group animate-fade-in h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-start space-y-4 h-full">
        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground tracking-tight">
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
