import { Plus } from "lucide-react";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

interface MealCardProps {
  type: MealType;
  icon: React.ReactNode;
  color: string;
  hasData?: boolean;
  carbs?: number;
  imageUrl?: string;
  onClick: () => void;
}

const getMealLabel = (type: MealType) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export function MealCard({ type, icon, color, hasData, carbs, imageUrl, onClick }: MealCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-all w-full text-left"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          {hasData && imageUrl ? (
            <div className="w-full h-full rounded-xl overflow-hidden">
              <img src={imageUrl} alt={type} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div style={{ color }}>{icon}</div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {!hasData ? (
              <>
                <Plus className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Add {getMealLabel(type)}
                </span>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">{getMealLabel(type)}</span>
              </>
            )}
          </div>
          
          {hasData && carbs !== undefined && (
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-semibold" style={{ color }}>
                {carbs}g
              </span>
              <span className="text-xs text-muted-foreground">carbs</span>
            </div>
          )}
        </div>

        {hasData && (
          <div className="text-right">
            <div className="text-xs text-muted-foreground">View details</div>
          </div>
        )}
      </div>
    </button>
  );
}
