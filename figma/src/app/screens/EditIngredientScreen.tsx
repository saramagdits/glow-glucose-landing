import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Input } from "@/app/components/ui/input";

interface EditIngredientScreenProps {
  ingredient?: {
    name: string;
    servingSize: string;
    carbs: number;
    icon: string;
  };
  onBack: () => void;
  onSave: (data: { servingSize: string; carbs: number; servings: number }) => void;
}

export function EditIngredientScreen({ ingredient, onBack, onSave }: EditIngredientScreenProps) {
  const [servings, setServings] = useState(1);
  const [customCarbs, setCustomCarbs] = useState(ingredient?.carbs.toString() || "0");
  const [customServing, setCustomServing] = useState(ingredient?.servingSize || "1 serving");

  const handleDecrement = () => {
    if (servings > 0.25) {
      setServings(Math.max(0.25, servings - 0.25));
    }
  };

  const handleIncrement = () => {
    setServings(servings + 0.25);
  };

  const totalCarbs = parseFloat(customCarbs) * servings;

  const handleSave = () => {
    onSave({
      servingSize: customServing,
      carbs: parseFloat(customCarbs),
      servings,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-transparent px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Edit Ingredient</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {/* Ingredient Info */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border text-center">
          <div className="text-6xl mb-4">{ingredient?.icon || "🍽️"}</div>
          <h2 className="text-xl font-semibold mb-2">{ingredient?.name || "Food Item"}</h2>
        </div>

        {/* Serving Size */}
        <div>
          <label className="text-sm font-medium mb-2 block">Serving Size</label>
          <Input
            type="text"
            value={customServing}
            onChange={(e) => setCustomServing(e.target.value)}
            className="bg-input-background"
            placeholder="e.g., 1 cup, 100g, 1 slice"
          />
        </div>

        {/* Carbs per Serving */}
        <div>
          <label className="text-sm font-medium mb-2 block">Carbs per Serving (g)</label>
          <Input
            type="number"
            value={customCarbs}
            onChange={(e) => setCustomCarbs(e.target.value)}
            className="bg-input-background"
            placeholder="0"
          />
        </div>

        {/* Number of Servings */}
        <div>
          <label className="text-sm font-medium mb-2 block">Number of Servings</label>
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleDecrement}
                className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <div className="text-center min-w-[80px]">
                <div className="text-4xl font-semibold text-primary">{servings}</div>
                <div className="text-xs text-muted-foreground mt-1">servings</div>
              </div>
              
              <button
                onClick={handleIncrement}
                className="w-12 h-12 rounded-full bg-primary hover:opacity-90 transition-opacity flex items-center justify-center text-primary-foreground"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Total Carbs */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 shadow-sm border-2 border-primary/20">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Total Carbohydrates</div>
            <div className="text-5xl font-semibold text-primary mb-1">
              {totalCarbs.toFixed(1)}g
            </div>
            <div className="text-xs text-muted-foreground">
              {servings} × {customCarbs}g
            </div>
          </div>
        </div>

        {/* Quick Serving Buttons */}
        <div>
          <label className="text-sm font-medium mb-2 block">Quick Select</label>
          <div className="grid grid-cols-4 gap-2">
            {[0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4].map((amount) => (
              <button
                key={amount}
                onClick={() => setServings(amount)}
                className={`py-3 rounded-xl font-medium transition-all ${
                  servings === amount
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground border border-border hover:bg-secondary"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSave}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
