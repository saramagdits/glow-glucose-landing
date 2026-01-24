import { ArrowLeft, Crown, ChevronRight } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [isPremium] = useState(true);
  const [reminders, setReminders] = useState({
    fasting: true,
    breakfast: true,
    lunch: true,
    dinner: false,
    bedtime: true,
  });

  const [targets, setTargets] = useState({
    fasting: "95",
    preMeal: "100",
    postMeal: "140",
  });

  const toggleReminder = (key: keyof typeof reminders) => {
    setReminders({ ...reminders, [key]: !reminders[key] });
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
          <h1 className="text-xl font-semibold">Profile & Settings</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-[#A8D5BA]/10 rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg">
                👩
              </div>
              <div>
                <h2 className="font-semibold text-lg">Sarah Johnson</h2>
                <p className="text-sm text-muted-foreground">24 weeks pregnant</p>
              </div>
            </div>
          </div>
          
          {isPremium && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-gradient-to-r from-[#F4C542]/20 to-primary/20 rounded-xl">
              <Crown className="w-5 h-5 text-[#F4C542]" />
              <div className="flex-1">
                <div className="text-sm font-medium">Premium Member</div>
                <div className="text-xs text-muted-foreground">Active subscription</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Personal Information</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-3">
          <button className="flex items-center justify-between w-full py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors">
            <span className="text-sm">Edit Profile</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center justify-between w-full py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors">
            <span className="text-sm">Due Date & Pregnancy Info</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Blood Sugar Targets */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Blood Sugar Targets</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Fasting (mg/dL)</label>
            <Input
              type="number"
              value={targets.fasting}
              onChange={(e) => setTargets({ ...targets, fasting: e.target.value })}
              className="bg-input-background"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Pre-meal (mg/dL)</label>
            <Input
              type="number"
              value={targets.preMeal}
              onChange={(e) => setTargets({ ...targets, preMeal: e.target.value })}
              className="bg-input-background"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Post-meal (mg/dL)</label>
            <Input
              type="number"
              value={targets.postMeal}
              onChange={(e) => setTargets({ ...targets, postMeal: e.target.value })}
              className="bg-input-background"
            />
          </div>
        </div>
      </div>

      {/* Chart Settings */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Chart Settings</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-3">
          <button className="flex items-center justify-between w-full py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors">
            <span className="text-sm">Chart Y-axis Range</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">60-180 mg/dL</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* Reminders */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Blood Sugar Test Reminders</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Fasting</div>
              <div className="text-xs text-muted-foreground">7:00 AM</div>
            </div>
            <Switch
              checked={reminders.fasting}
              onCheckedChange={() => toggleReminder("fasting")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">After Breakfast</div>
              <div className="text-xs text-muted-foreground">10:00 AM</div>
            </div>
            <Switch
              checked={reminders.breakfast}
              onCheckedChange={() => toggleReminder("breakfast")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">After Lunch</div>
              <div className="text-xs text-muted-foreground">2:00 PM</div>
            </div>
            <Switch
              checked={reminders.lunch}
              onCheckedChange={() => toggleReminder("lunch")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">After Dinner</div>
              <div className="text-xs text-muted-foreground">8:00 PM</div>
            </div>
            <Switch
              checked={reminders.dinner}
              onCheckedChange={() => toggleReminder("dinner")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Bedtime</div>
              <div className="text-xs text-muted-foreground">10:00 PM</div>
            </div>
            <Switch
              checked={reminders.bedtime}
              onCheckedChange={() => toggleReminder("bedtime")}
            />
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <div className="px-4 mt-6 mb-8">
        <div className="bg-card rounded-2xl shadow-sm border border-border divide-y divide-border">
          <button className="flex items-center justify-between w-full py-4 px-4 hover:bg-secondary/50 transition-colors first:rounded-t-2xl">
            <span className="text-sm">About Glow</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center justify-between w-full py-4 px-4 hover:bg-secondary/50 transition-colors">
            <span className="text-sm">Help & Support</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center justify-between w-full py-4 px-4 hover:bg-secondary/50 transition-colors">
            <span className="text-sm">Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center justify-between w-full py-4 px-4 hover:bg-secondary/50 transition-colors last:rounded-b-2xl">
            <span className="text-sm">Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
