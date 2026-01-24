import { useState } from "react";
import { SplashScreen } from "@/app/screens/SplashScreen";
import { OnboardingScreen } from "@/app/screens/OnboardingScreen";
import { PaywallScreen } from "@/app/screens/PaywallScreen";
import { HomeScreen } from "@/app/screens/HomeScreen";
import { LogMealScreen } from "@/app/screens/LogMealScreen";
import { MealDetailsScreen } from "@/app/screens/MealDetailsScreen";
import { BloodGlucoseScreen } from "@/app/screens/BloodGlucoseScreen";
import { ProfileScreen } from "@/app/screens/ProfileScreen";
import { SearchFoodScreen } from "@/app/screens/SearchFoodScreen";
import { EditIngredientScreen } from "@/app/screens/EditIngredientScreen";
import { BottomNav } from "@/app/components/BottomNav";
import { MealType } from "@/app/components/MealCard";

type Screen =
  | "splash"
  | "onboarding"
  | "paywall"
  | "home"
  | "logMeal"
  | "mealDetails"
  | "glucose"
  | "profile"
  | "searchFood"
  | "editIngredient";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<"home" | "log" | "glucose" | "profile">("home");
  const [selectedMealType, setSelectedMealType] = useState<MealType>("breakfast");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen("paywall");
  };

  const handlePaywallSubscribe = () => {
    setHasSubscribed(true);
    setCurrentScreen("home");
  };

  const handlePaywallClose = () => {
    // Allow skip for demo
    setCurrentScreen("home");
  };

  const handleMealClick = (mealType: MealType) => {
    setSelectedMealType(mealType);
    // Check if meal exists, if so go to details, otherwise log
    // For demo, always go to log
    setCurrentScreen("logMeal");
  };

  const handleMealLogged = () => {
    setCurrentScreen("mealDetails");
  };

  const handleTabChange = (tab: "home" | "log" | "glucose" | "profile") => {
    setActiveTab(tab);
    
    if (tab === "home") {
      setCurrentScreen("home");
    } else if (tab === "log") {
      setCurrentScreen("logMeal");
    } else if (tab === "glucose") {
      setCurrentScreen("glucose");
    } else if (tab === "profile") {
      setCurrentScreen("profile");
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case "onboarding":
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      
      case "paywall":
        return (
          <PaywallScreen
            onSubscribe={handlePaywallSubscribe}
            onClose={handlePaywallClose}
          />
        );
      
      case "home":
        return (
          <HomeScreen
            onMealClick={handleMealClick}
            onBloodGlucoseClick={() => setCurrentScreen("glucose")}
          />
        );
      
      case "logMeal":
        return (
          <LogMealScreen
            initialMealType={selectedMealType}
            onClose={() => setCurrentScreen("home")}
            onMealLogged={handleMealLogged}
          />
        );
      
      case "mealDetails":
        return (
          <MealDetailsScreen
            mealType={selectedMealType}
            onBack={() => setCurrentScreen("home")}
            onDelete={() => setCurrentScreen("home")}
            onAddFood={() => setCurrentScreen("searchFood")}
            onEditIngredient={() => setCurrentScreen("editIngredient")}
          />
        );
      
      case "glucose":
        return <BloodGlucoseScreen onBack={() => setCurrentScreen("home")} />;
      
      case "profile":
        return <ProfileScreen onBack={() => setCurrentScreen("home")} />;
      
      case "searchFood":
        return (
          <SearchFoodScreen 
            onBack={() => setCurrentScreen("mealDetails")} 
            onFoodSelect={(food) => {
              console.log("Food selected:", food);
              setCurrentScreen("mealDetails");
            }}
          />
        );
      
      case "editIngredient":
        return (
          <EditIngredientScreen 
            onBack={() => setCurrentScreen("mealDetails")}
            onSave={(data) => {
              console.log("Ingredient saved:", data);
              setCurrentScreen("mealDetails");
            }}
          />
        );
      
      default:
        return <HomeScreen onMealClick={handleMealClick} onBloodGlucoseClick={() => setCurrentScreen("glucose")} />;
    }
  };

  const showBottomNav = currentScreen !== "splash" && currentScreen !== "onboarding" && currentScreen !== "paywall" && currentScreen !== "logMeal" && currentScreen !== "mealDetails" && currentScreen !== "searchFood" && currentScreen !== "editIngredient";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Mobile container */}
      <div className="mx-auto max-w-md h-full relative bg-background shadow-2xl">
        {/* Main content */}
        <div className="h-full overflow-y-auto">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}