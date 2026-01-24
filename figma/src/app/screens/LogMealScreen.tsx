import { useState } from "react";
import { Camera, Image, Barcode, Search, Coffee, Salad, UtensilsCrossed, Cookie } from "lucide-react";
import { MealType } from "@/app/components/MealCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";

interface LogMealScreenProps {
  initialMealType?: MealType;
  onClose: () => void;
  onMealLogged: (mealType: MealType) => void;
}

export function LogMealScreen({ initialMealType = "breakfast", onClose, onMealLogged }: LogMealScreenProps) {
  const [selectedMealType, setSelectedMealType] = useState<MealType>(initialMealType);
  const [searchQuery, setSearchQuery] = useState("");

  const mealTypeConfig = {
    breakfast: { icon: <Coffee className="w-5 h-5" />, label: "Breakfast", color: "#F4C542" },
    lunch: { icon: <Salad className="w-5 h-5" />, label: "Lunch", color: "#E89C8C" },
    dinner: { icon: <UtensilsCrossed className="w-5 h-5" />, label: "Dinner", color: "#B4A7D6" },
    snack: { icon: <Cookie className="w-5 h-5" />, label: "Snack", color: "#A8D5BA" },
  };

  const handleTakePhoto = () => {
    // Simulate taking photo
    console.log("Taking photo...");
    // In real app, this would open camera
    setTimeout(() => {
      onMealLogged(selectedMealType);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-transparent px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Log Meal</h1>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Meal Type Tabs */}
        <Tabs value={selectedMealType} onValueChange={(v) => setSelectedMealType(v as MealType)}>
          <TabsList className="w-full grid grid-cols-4 bg-card/50">
            {(Object.keys(mealTypeConfig) as MealType[]).map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className="flex flex-col gap-1 py-3 data-[state=active]:bg-card"
              >
                <div style={{ color: mealTypeConfig[type].color }}>
                  {mealTypeConfig[type].icon}
                </div>
                <span className="text-xs">{mealTypeConfig[type].label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative bg-gradient-to-br from-secondary/30 to-background">
        {/* Simulated camera view */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Camera className="w-16 h-16 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm px-8">
              Position your meal in the frame
            </p>
          </div>
        </div>

        {/* Overlay guides */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-dashed border-primary/30 rounded-2xl"></div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-card/80 backdrop-blur-lg px-4 py-6 space-y-4 border-t border-border">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type food name to search..."
            className="w-full pl-10 pr-4 py-3 bg-input-background rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleTakePhoto}
            className="flex flex-col items-center gap-2 p-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            <Camera className="w-6 h-6" />
            <span className="text-xs">Take Photo</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:bg-secondary transition-colors">
            <Barcode className="w-6 h-6 text-foreground" />
            <span className="text-xs text-foreground">Scan Barcode</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border hover:bg-secondary transition-colors">
            <Image className="w-6 h-6 text-foreground" />
            <span className="text-xs text-foreground">Gallery</span>
          </button>
        </div>
      </div>
    </div>
  );
}
