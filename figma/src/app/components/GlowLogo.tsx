import { motion } from "motion/react";

interface GlowLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function GlowLogo({ size = "md", animated = false }: GlowLogoProps) {
  const sizes = {
    sm: { container: 48, moon: 32, text: "text-xl" },
    md: { container: 80, moon: 56, text: "text-3xl" },
    lg: { container: 120, moon: 80, text: "text-5xl" },
  };

  const config = sizes[size];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Logo Icon - Moon with glow */}
      <motion.div
        className="relative"
        animate={
          animated
            ? {
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: config.container, height: config.container }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F4C542] via-[#B4A7D6] to-[#E89C8C] blur-xl opacity-40"
          style={{ width: config.container, height: config.container }}
        />

        {/* Moon */}
        <div
          className="relative z-10 rounded-full bg-gradient-to-br from-[#F5E6D3] to-[#E8DFD4] flex items-center justify-center shadow-2xl"
          style={{
            width: config.moon,
            height: config.moon,
            margin: (config.container - config.moon) / 2,
          }}
        >
          {/* Moon craters */}
          <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-[#E8DFD4] opacity-40" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#E8DFD4] opacity-40" />
          
          {/* Sparkle overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F4C542]/10 to-transparent" />
        </div>

        {/* Stars */}
        {size !== "sm" && (
          <>
            <div className="absolute -top-1 -right-1 text-[#F4C542] text-xs">★</div>
            <div className="absolute -bottom-0 -left-2 text-[#B4A7D6] text-xs">★</div>
            <div className="absolute top-1/2 -right-3 text-[#E89C8C] text-xs opacity-70">★</div>
          </>
        )}
      </motion.div>

      {/* Text Logo */}
      <div className="text-center">
        <div className={`font-semibold ${config.text} bg-gradient-to-r from-[#B4A7D6] via-[#E89C8C] to-[#F4C542] bg-clip-text text-transparent`}>
          Glow
        </div>
        {size !== "sm" && (
          <div className="text-xs text-muted-foreground mt-1">
            For your healthy pregnancy
          </div>
        )}
      </div>
    </div>
  );
}
