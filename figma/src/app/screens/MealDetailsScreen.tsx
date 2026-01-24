import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Coffee, Edit2 } from "lucide-react";
import { MealType } from "@/app/components/MealCard";
import { Input } from "@/app/components/ui/input";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface Ingredient {
  id: string;
  name: string;
  servingSize: string;
  carbs: number;
  icon: string;
}

interface MealDetailsScreenProps {
  mealType: MealType;
  onBack: () => void;
  onDelete: () => void;
  onAddFood?: () => void;
  onEditIngredient?: (ingredientId: string) => void;
}

const mealTypeConfig = {
  breakfast: { 
    label: "Breakfast", 
    color: "#F4C542",
    imageUrl: "https://images.unsplash.com/photo-1559332167-dd24746aa6f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  lunch: { 
    label: "Lunch", 
    color: "#E89C8C",
    imageUrl: "https://images.unsplash.com/photo-1578679664605-80268ff31300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  dinner: { 
    label: "Dinner", 
    color: "#B4A7D6",
    imageUrl: "https://images.unsplash.com/photo-1546077500-45f1ac492543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  snack: { 
    label: "Snack", 
    color: "#A8D5BA",
    imageUrl: "https://images.unsplash.com/photo-1670607231914-605c7b94edd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
};

export function MealDetailsScreen({ mealType, onBack, onDelete, onAddFood, onEditIngredient }: MealDetailsScreenProps) {
  const [preMealGlucose, setPreMealGlucose] = useState("");
  const [postMealGlucose, setPostMealGlucose] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "Whole wheat toast", servingSize: "2 slices", carbs: 30, icon: "🍞" },
    { id: "2", name: "Scrambled eggs", servingSize: "2 eggs", carbs: 2, icon: "🥚" },
    { id: "3", name: "Avocado", servingSize: "1/2 medium", carbs: 6, icon: "🥑" },
  ]);

  const totalCarbs = ingredients.reduce((sum, ing) => sum + ing.carbs, 0);
  const config = mealTypeConfig[mealType];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={config.imageUrl}
          alt={config.label}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Meal Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md p-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <Coffee className="w-6 h-6" style={{ color: config.color }} />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{config.label}</h1>
                <p className="text-sm text-muted-foreground">Today, 8:30 AM</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold" style={{ color: config.color }}>
                {totalCarbs}g
              </div>
              <div className="text-xs text-muted-foreground">Total carbs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutritional Information */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Nutritional Information</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">{totalCarbs}g</div>
              <div className="text-xs text-muted-foreground mt-1">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-accent">18g</div>
              <div className="text-xs text-muted-foreground mt-1">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#A8D5BA]">12g</div>
              <div className="text-xs text-muted-foreground mt-1">Fat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Glucose Readings */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Blood Glucose</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Pre-meal glucose</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={preMealGlucose}
                onChange={(e) => setPreMealGlucose(e.target.value)}
                placeholder="Enter value"
                className="flex-1 bg-input-background"
              />
              <span className="text-sm text-muted-foreground">mg/dL</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Post-meal glucose (2hrs)</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={postMealGlucose}
                onChange={(e) => setPostMealGlucose(e.target.value)}
                placeholder="Enter value"
                className="flex-1 bg-input-background"
              />
              <span className="text-sm text-muted-foreground">mg/dL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Ingredients</h3>
        <div className="space-y-2">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-card rounded-xl p-4 shadow-sm border border-border flex items-center gap-3"
            >
              <div className="text-2xl">{ingredient.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{ingredient.name}</div>
                <div className="text-xs text-muted-foreground">{ingredient.servingSize}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold" style={{ color: config.color }}>
                  {ingredient.carbs}g
                </div>
                <div className="text-xs text-muted-foreground">carbs</div>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors" onClick={() => onEditIngredient?.(ingredient.id)}>
                <Edit2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Food Button */}
        <button className="mt-3 w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2" onClick={onAddFood}>
          <Plus className="w-5 h-5" />
          Add Food
        </button>
      </div>

      {/* Delete Meal Button */}
      <div className="px-4 mt-8 mb-8">
        <button
          onClick={onDelete}
          className="w-full bg-destructive/10 text-destructive py-3 rounded-xl font-medium hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Delete Meal
        </button>
      </div>
    </div>
  );
}