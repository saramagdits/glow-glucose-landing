import { useState } from "react";
import { ArrowLeft, Search, Plus } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  servingSize: string;
  carbs: number;
  icon: string;
  category: string;
}

interface SearchFoodScreenProps {
  onBack: () => void;
  onFoodSelect: (food: FoodItem) => void;
}

const foodDatabase: FoodItem[] = [
  { id: "1", name: "White Rice", servingSize: "1 cup", carbs: 45, icon: "🍚", category: "Grains" },
  { id: "2", name: "Banana", servingSize: "1 medium", carbs: 27, icon: "🍌", category: "Fruits" },
  { id: "3", name: "Apple", servingSize: "1 medium", carbs: 25, icon: "🍎", category: "Fruits" },
  { id: "4", name: "Whole Wheat Bread", servingSize: "2 slices", carbs: 30, icon: "🍞", category: "Grains" },
  { id: "5", name: "Sweet Potato", servingSize: "1 medium", carbs: 26, icon: "🍠", category: "Vegetables" },
  { id: "6", name: "Oatmeal", servingSize: "1 cup", carbs: 27, icon: "🥣", category: "Grains" },
  { id: "7", name: "Greek Yogurt", servingSize: "1 cup", carbs: 9, icon: "🥛", category: "Dairy" },
  { id: "8", name: "Chicken Breast", servingSize: "3 oz", carbs: 0, icon: "🍗", category: "Protein" },
  { id: "9", name: "Broccoli", servingSize: "1 cup", carbs: 6, icon: "🥦", category: "Vegetables" },
  { id: "10", name: "Avocado", servingSize: "1/2 medium", carbs: 6, icon: "🥑", category: "Fruits" },
];

export function SearchFoodScreen({ onBack, onFoodSelect }: SearchFoodScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", "Grains", "Fruits", "Vegetables", "Protein", "Dairy"];

  const filteredFoods = foodDatabase.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-transparent px-4 pt-4 pb-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Search Food</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search foods..."
            className="w-full pl-10 pr-4 py-3 bg-card rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category || (category === "All" && !selectedCategory)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4">
        {filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground">No foods found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFoods.map((food) => (
              <button
                key={food.id}
                onClick={() => onFoodSelect(food)}
                className="w-full bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="text-3xl">{food.icon}</div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-muted-foreground">{food.servingSize}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{food.carbs}g</div>
                  <div className="text-xs text-muted-foreground">carbs</div>
                </div>
                <Plus className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add Common Foods */}
      {searchQuery === "" && (
        <div className="px-4 mt-6">
          <h3 className="font-semibold mb-3">Recent Foods</h3>
          <div className="space-y-2">
            {foodDatabase.slice(0, 3).map((food) => (
              <button
                key={food.id}
                onClick={() => onFoodSelect(food)}
                className="w-full bg-secondary/50 rounded-xl p-3 border border-border hover:bg-secondary transition-colors flex items-center gap-3"
              >
                <div className="text-2xl">{food.icon}</div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium">{food.name}</div>
                  <div className="text-xs text-muted-foreground">{food.servingSize}</div>
                </div>
                <div className="text-sm font-semibold text-primary">{food.carbs}g</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
