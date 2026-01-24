import { Check, X } from "lucide-react";
import { motion } from "motion/react";

interface PaywallScreenProps {
  onSubscribe: () => void;
  onClose: () => void;
}

export function PaywallScreen({ onSubscribe, onClose }: PaywallScreenProps) {
  return (
    <div className="h-screen bg-gradient-to-b from-background via-secondary/30 to-background flex flex-col">
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Decorative moon and stars */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F4C542] via-[#B4A7D6] to-[#E89C8C] flex items-center justify-center shadow-2xl">
            <div className="text-4xl">✨</div>
          </div>
        </motion.div>

        <h1 className="text-3xl font-semibold mb-3 text-center">
          Unlock Premium Glow
        </h1>

        <p className="text-muted-foreground text-center mb-8 max-w-sm">
          Get personalized insights and unlimited tracking for a healthier pregnancy journey
        </p>

        {/* Features */}
        <div className="space-y-4 mb-8 w-full max-w-sm">
          {[
            "AI-powered meal analysis",
            "Unlimited photo uploads",
            "Advanced glucose charts",
            "Weekly health reports",
            "Priority support",
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 w-full max-w-sm border-2 border-primary/20 shadow-lg">
          <div className="text-center mb-4">
            <div className="text-sm text-muted-foreground mb-1">Monthly subscription</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-semibold text-primary">$9.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <div className="text-xs text-primary mt-2 font-medium">
              3 days free trial • Cancel anytime
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-8 space-y-3">
        <button
          onClick={onSubscribe}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          Start Free Trial
        </button>
        
        <p className="text-xs text-center text-muted-foreground">
          Automatically renews after trial. Cancel anytime in settings.
        </p>
      </div>
    </div>
  );
}
