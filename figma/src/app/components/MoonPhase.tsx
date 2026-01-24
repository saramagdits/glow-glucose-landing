import { motion } from "motion/react";

interface MoonPhaseProps {
  progress: number; // 0 to 100
}

export function MoonPhase({ progress }: MoonPhaseProps) {
  // Calculate moon phase based on progress (0-100)
  // 0-25: New Moon, 25-50: Crescent, 50-75: Half, 75-100: Full/Glow
  const getPhaseStyle = () => {
    if (progress < 25) {
      return { opacity: 0.3 };
    } else if (progress < 50) {
      return { opacity: 0.5 };
    } else if (progress < 75) {
      return { opacity: 0.75 };
    } else {
      return { opacity: 1 };
    }
  };

  const isGlowing = progress >= 100;

  return (
    <div className="flex justify-center items-center py-6">
      <div className="relative">
        {/* Outer glow effect when complete */}
        {isGlowing && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F4C542] via-[#B4A7D6] to-[#E89C8C] blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        {/* Moon base */}
        <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#F5E6D3] to-[#E8DFD4] shadow-lg overflow-hidden">
          {/* Moon craters/texture */}
          <div className="absolute top-4 right-6 w-6 h-6 rounded-full bg-[#E8DFD4] opacity-40" />
          <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full bg-[#E8DFD4] opacity-40" />
          <div className="absolute top-12 left-4 w-3 h-3 rounded-full bg-[#E8DFD4] opacity-40" />
          
          {/* Phase overlay - shows progression */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#B4A7D6]/20 to-[#F4C542]/20"
            style={getPhaseStyle()}
            animate={isGlowing ? {
              opacity: [0.8, 1, 0.8],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Stars around the moon */}
          <div className="absolute -top-2 -right-2 text-[#F4C542] text-xs">★</div>
          <div className="absolute -bottom-1 -left-3 text-[#B4A7D6] text-xs">★</div>
          <div className="absolute top-1/2 -right-4 text-[#E89C8C] text-xs">★</div>
          <div className="absolute top-1/4 -left-3 text-[#F4C542] text-xs opacity-70">★</div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute mt-40">
        <div className="text-xs text-muted-foreground text-center">
          {progress}% Complete
        </div>
      </div>
    </div>
  );
}
