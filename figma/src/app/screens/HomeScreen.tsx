import { useState } from "react";
import { format } from "date-fns";
import { Coffee, Salad, UtensilsCrossed, Cookie } from "lucide-react";
import { MoonPhase } from "@/app/components/MoonPhase";
import { FastingBGSection } from "@/app/components/FastingBGSection";
import { DatePickerCarousel } from "@/app/components/DatePickerCarousel";
import { MealCard, MealType } from "@/app/components/MealCard";

interface Meal {
  type: MealType;
  carbs: number;
  imageUrl?: string;
}

interface HomeScreenProps {
  onMealClick: (mealType: MealType) => void;
  onBloodGlucoseClick: () => void;
}

export function HomeScreen({ onMealClick, onBloodGlucoseClick }: HomeScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fastingBG, setFastingBG] = useState<number | null>(null);
  const [meals, setMeals] = useState<Meal[]>([
    // Example data - would come from state/API
    // { type: "breakfast", carbs: 45, imageUrl: "..." }
  ]);

  // Calculate progress based on completed tasks
  const calculateProgress = () => {
    let progress = 0;
    if (fastingBG) progress += 25;
    const mealTypes: MealType[] = ["breakfast", "lunch", "dinner"];
    mealTypes.forEach((type) => {
      if (meals.find((m) => m.type === type)) progress += 25;
    });
    return progress;
  };

  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);

  const getMealData = (type: MealType) => {
    return meals.find((m) => m.type === type);
  };

  const mealConfigs = [
    { type: "breakfast" as MealType, icon: <Coffee className="w-6 h-6" />, color: "#F4C542" },
    { type: "lunch" as MealType, icon: <Salad className="w-6 h-6" />, color: "#E89C8C" },
    { type: "dinner" as MealType, icon: <UtensilsCrossed className="w-6 h-6" />, color: "#B4A7D6" },
    { type: "snack" as MealType, icon: <Cookie className="w-6 h-6" />, color: "#A8D5BA" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-transparent">
        {/* Moon Phase */}
        <MoonPhase progress={calculateProgress()} />

        {/* Fasting BG Section */}
        <div className="px-4 pb-4">
          <FastingBGSection value={fastingBG} onValueChange={setFastingBG} />
        </div>

        {/* Date Picker */}
        <DatePickerCarousel
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      {/* Today Section */}
      <div className="px-4 mt-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Today</h2>
            <p className="text-sm text-muted-foreground">{format(selectedDate, "MMMM d, yyyy")}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-primary">{totalCarbs}g</div>
            <div className="text-xs text-muted-foreground">Total carbs</div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="space-y-3">
          {mealConfigs.map((config) => {
            const mealData = getMealData(config.type);
            return (
              <MealCard
                key={config.type}
                type={config.type}
                icon={config.icon}
                color={config.color}
                hasData={!!mealData}
                carbs={mealData?.carbs}
                imageUrl={mealData?.imageUrl}
                onClick={() => onMealClick(config.type)}
              />
            );
          })}
        </div>

        {/* Blood Glucose Quick Link */}
        <button
          onClick={onBloodGlucoseClick}
          className="mt-6 w-full bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B4A7D6] to-[#E8B4D4] flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Blood Glucose Tracking</div>
                <div className="text-xs text-muted-foreground">View charts & trends</div>
              </div>
            </div>
            <div className="text-muted-foreground">→</div>
          </div>
        </button>
      </div>
    </div>
  );
}
