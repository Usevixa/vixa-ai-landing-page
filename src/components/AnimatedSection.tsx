import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in';
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  className,
  animation = 'fade-up',
  delay = 0
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-in': 'opacity-0',
    'scale-in': 'opacity-0 scale-95',
  };

  const visibleClasses = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    'scale-in': 'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
