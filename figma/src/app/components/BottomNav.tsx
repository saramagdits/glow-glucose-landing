import { Home, PlusCircle, Activity, User } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "log" | "glucose" | "profile";
  onTabChange: (tab: "home" | "log" | "glucose" | "profile") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "log" as const, icon: PlusCircle, label: "Log Meal" },
    { id: "glucose" as const, icon: Activity, label: "Glucose" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "mb-1" : ""}`} />
              <span className={`text-xs mt-1 font-medium ${isActive ? "" : "opacity-70"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
