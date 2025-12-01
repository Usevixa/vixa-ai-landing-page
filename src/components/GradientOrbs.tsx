const GradientOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Green Orb - Top Left */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(150 100% 45% / 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orb-float-1 20s ease-in-out infinite',
        }}
      />
      
      {/* Secondary Gold Orb - Bottom Right */}
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(45 95% 58% / 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orb-float-2 22s ease-in-out infinite',
        }}
      />
      
      {/* Tertiary Green Orb - Center Right */}
      <div 
        className="absolute top-1/2 -right-32 w-80 h-80 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(150 100% 55% / 0.3) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'orb-float-3 18s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
        
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -20px) scale(0.85); }
        }
        
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -30px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default GradientOrbs;
