import { useState } from "react";
import { Droplet, Edit2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";

interface FastingBGSectionProps {
  value: number | null;
  onValueChange: (value: number) => void;
}

export function FastingBGSection({ value, onValueChange }: FastingBGSectionProps) {
  const [isEditing, setIsEditing] = useState(!value);
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  const handleSave = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue > 0) {
      onValueChange(numValue);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setInputValue(value?.toString() || "");
  };

  const getBGStatus = (bg: number) => {
    if (bg < 95) return { color: "text-[#A8D5BA]", label: "Good" };
    if (bg <= 105) return { color: "text-[#F4C542]", label: "Fair" };
    return { color: "text-[#E89C8C]", label: "High" };
  };

  const status = value ? getBGStatus(value) : null;

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B4A7D6] to-[#E8B4D4] flex items-center justify-center">
            <Droplet className="w-4 h-4 text-white" fill="white" />
          </div>
          <div>
            <div className="text-sm font-medium">Fasting Blood Glucose</div>
            <div className="text-xs text-muted-foreground">Morning reading</div>
          </div>
        </div>
        
        {value && !isEditing && (
          <button
            onClick={handleEdit}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="flex-1 bg-input-background"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            autoFocus
          />
          <div className="text-sm text-muted-foreground">mg/dL</div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      ) : value ? (
        <div className="flex items-baseline gap-2">
          <div className={`text-3xl font-semibold ${status?.color}`}>
            {value}
          </div>
          <div className="text-sm text-muted-foreground">mg/dL</div>
          <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${status?.color} bg-current/10`}>
            {status?.label}
          </div>
        </div>
      ) : (
        <div className="text-center py-2 text-muted-foreground text-sm">
          Tap to add your fasting glucose
        </div>
      )}
    </div>
  );
}
