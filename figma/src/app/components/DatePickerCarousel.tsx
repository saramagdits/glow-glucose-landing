import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays, isSameDay } from "date-fns";

interface DatePickerCarouselProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function DatePickerCarousel({ selectedDate, onDateSelect }: DatePickerCarouselProps) {
  const [centerDate, setCenterDate] = useState(selectedDate);

  // Generate array of 7 dates centered around centerDate
  const dates = Array.from({ length: 7 }, (_, i) => addDays(centerDate, i - 3));

  const handlePrevious = () => {
    setCenterDate(subDays(centerDate, 1));
  };

  const handleNext = () => {
    setCenterDate(addDays(centerDate, 1));
  };

  return (
    <div className="flex items-center gap-2 py-4 px-2">
      <button
        onClick={handlePrevious}
        className="p-1 hover:bg-secondary rounded-full transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="flex-1 flex justify-between gap-1">
        {dates.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={`flex flex-col items-center justify-center min-w-[44px] h-16 rounded-xl transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              <span className="text-[10px] opacity-70 uppercase">
                {format(date, "EEE")}
              </span>
              <span className={`mt-0.5 ${isSelected ? "font-semibold" : ""}`}>
                {format(date, "d")}
              </span>
              {isToday && !isSelected && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        className="p-1 hover:bg-secondary rounded-full transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}
