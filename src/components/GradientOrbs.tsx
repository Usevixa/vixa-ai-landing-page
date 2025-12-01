const GradientOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Teal Orb - Top Left */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(160 85% 75% / 0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orb-float-1 20s ease-in-out infinite',
        }}
      />
      
      {/* Secondary Purple Orb - Bottom Right */}
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(265 85% 80% / 0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orb-float-2 22s ease-in-out infinite',
        }}
      />
      
      {/* Tertiary Sky Blue Orb - Center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(200 95% 80% / 0.5) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'orb-float-3 18s ease-in-out infinite',
        }}
      />

      {/* Coral Accent Orb - Top Right */}
      <div 
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(15 90% 75% / 0.5) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'orb-float-1 25s ease-in-out infinite reverse',
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
