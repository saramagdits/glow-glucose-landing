import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FastingBGSection } from "@/app/components/FastingBGSection";
import { DatePickerCarousel } from "@/app/components/DatePickerCarousel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface BloodGlucoseScreenProps {
  onBack: () => void;
}

const chartData = [
  { time: "6AM", value: 95, type: "fasting" },
  { time: "8AM", value: 118, type: "pre" },
  { time: "10AM", value: 142, type: "post" },
  { time: "12PM", value: 102, type: "pre" },
  { time: "2PM", value: 135, type: "post" },
  { time: "6PM", value: 108, type: "pre" },
  { time: "8PM", value: 128, type: "post" },
];

const weeklyData = [
  { day: "Mon", fasting: 94, preMeal: 105, postMeal: 125 },
  { day: "Tue", fasting: 98, preMeal: 110, postMeal: 132 },
  { day: "Wed", fasting: 92, preMeal: 102, postMeal: 118 },
  { day: "Thu", fasting: 96, preMeal: 108, postMeal: 128 },
  { day: "Fri", fasting: 90, preMeal: 103, postMeal: 122 },
  { day: "Sat", fasting: 95, preMeal: 107, postMeal: 130 },
  { day: "Sun", fasting: 93, preMeal: 104, postMeal: 120 },
];

export function BloodGlucoseScreen({ onBack }: BloodGlucoseScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fastingBG, setFastingBG] = useState<number | null>(95);
  const [selectedPeriod, setSelectedPeriod] = useState<3 | 7 | 14 | 30 | 90>(7);

  const getValueColor = (value: number) => {
    if (value < 95) return "#A8D5BA"; // green
    if (value <= 140) return "#F4C542"; // yellow
    return "#E89C8C"; // red
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/50 to-transparent px-4 pt-4 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Blood Glucose</h1>
        </div>

        {/* Fasting BG Section */}
        <FastingBGSection value={fastingBG} onValueChange={setFastingBG} />

        {/* Date Picker */}
        <DatePickerCarousel
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      {/* Daily Chart */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Today's Readings</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD4" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12, fill: "#8A8A8A" }}
                stroke="#E8DFD4"
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#8A8A8A" }}
                stroke="#E8DFD4"
                domain={[60, 160]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8DFD4",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <ReferenceLine y={95} stroke="#A8D5BA" strokeDasharray="3 3" />
              <ReferenceLine y={140} stroke="#E89C8C" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#B4A7D6"
                strokeWidth={3}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill={getValueColor(payload.value)}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Table */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">This Week</h3>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-2 text-muted-foreground font-medium">Day</th>
                <th className="text-center pb-2 text-muted-foreground font-medium">Fasting</th>
                <th className="text-center pb-2 text-muted-foreground font-medium">Pre-meal</th>
                <th className="text-center pb-2 text-muted-foreground font-medium">Post-meal</th>
              </tr>
            </thead>
            <tbody>
              {weeklyData.map((day, index) => (
                <tr key={index} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium">{day.day}</td>
                  <td className="text-center py-3">
                    <span style={{ color: getValueColor(day.fasting) }}>
                      {day.fasting}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span style={{ color: getValueColor(day.preMeal) }}>
                      {day.preMeal}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span style={{ color: getValueColor(day.postMeal) }}>
                      {day.postMeal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3">Summary</h3>
        
        {/* Period Selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {([3, 7, 14, 30, 90] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedPeriod === period
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:bg-secondary"
              }`}
            >
              {period} days
            </button>
          ))}
        </div>

        {/* Averages Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="text-xs text-muted-foreground mb-1">Average Glucose</div>
            <div className="text-2xl font-semibold text-primary">112</div>
            <div className="text-xs text-muted-foreground mt-0.5">mg/dL</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="text-xs text-muted-foreground mb-1">Average Fasting</div>
            <div className="text-2xl font-semibold text-[#A8D5BA]">94</div>
            <div className="text-xs text-muted-foreground mt-0.5">mg/dL</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="text-xs text-muted-foreground mb-1">Avg Pre-meal</div>
            <div className="text-2xl font-semibold text-[#F4C542]">106</div>
            <div className="text-xs text-muted-foreground mt-0.5">mg/dL</div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="text-xs text-muted-foreground mb-1">Avg Post-meal</div>
            <div className="text-2xl font-semibold text-[#E89C8C]">125</div>
            <div className="text-xs text-muted-foreground mt-0.5">mg/dL</div>
          </div>
        </div>
      </div>
    </div>
  );
}
