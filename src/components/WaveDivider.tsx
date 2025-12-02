interface WaveDividerProps {
  variant?: 'top' | 'bottom';
  className?: string;
}

const WaveDivider = ({ variant = 'bottom', className = '' }: WaveDividerProps) => {
  const isTop = variant === 'top';
  
  return (
    <div className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 w-full overflow-hidden leading-none ${className}`}>
      <svg
        className={`relative block w-full h-12 md:h-20 ${isTop ? 'rotate-180' : ''}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          animation: 'wave 8s ease-in-out infinite',
        }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="url(#waveGradient)"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
