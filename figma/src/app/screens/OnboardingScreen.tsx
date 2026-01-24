import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { GlowLogo } from "@/app/components/GlowLogo";
import heroImage from "figma:asset/83db2086a16c89910cc90aea0d5887cd2987ea8a.png";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    title: "Welcome to Glow",
    description: "Your gentle companion for managing gestational diabetes with care and confidence",
    image: heroImage,
  },
  {
    title: "Track Your Meals",
    description: "Simply snap a photo and let AI analyze the nutritional content of your food",
    image: heroImage,
  },
  {
    title: "Monitor Blood Sugar",
    description: "Keep track of your glucose levels with beautiful charts and insights",
    image: heroImage,
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {/* Image */}
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold mb-4 text-foreground">
            {slides[currentSlide].title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            {slides[currentSlide].description}
          </p>

          {/* Stars decoration */}
          <div className="mt-6 flex justify-center gap-4">
            <span className="text-[#F4C542] text-lg">★</span>
            <span className="text-[#B4A7D6] text-sm">★</span>
            <span className="text-[#E89C8C] text-lg">★</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div className="p-8 space-y-6">
        {/* Pagination dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
        >
          {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}