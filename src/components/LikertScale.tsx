interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
}

const labels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="mt-6 w-full">
      {/* 5-Column Grid on all screen sizes. Reduced padding and gap on mobile. */}
      <div className="grid grid-cols-5 gap-2 sm:gap-4 p-1 sm:p-2">
        {labels.map((label, index) => {
          const score = index + 1;
          const isSelected = value === score;

          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              className={`flex flex-col items-center justify-center rounded-xl sm:rounded-2xl p-2 sm:p-5 border-2 text-center transition-all duration-150 select-none
                ${
                  isSelected
                    ? "border-[#1D3557] bg-[#2F8CE5] text-[#FFFFFF] shadow-[2px_2px_0px_0px_#1D3557] translate-y-0.5"
                    : "border-[#C5C5C5] bg-[#FFFFFF] text-[#0D1B2A] hover:border-[#1D3557] shadow-[3px_3px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557]"
                }`}
            >
              {/* Score Bubble - Slightly smaller on mobile (h-8 w-8 vs h-10 w-10) */}
              <div
                className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-base sm:text-lg font-black border-2 transition-colors duration-150 mb-0 sm:mb-3
                  ${
                    isSelected
                      ? "bg-[#FFFFFF] text-[#2F8CE5] border-[#1D3557]"
                      : "bg-[#F7EBE1] text-[#0D1B2A] border-[#C5C5C5]"
                  }`}
              >
                {score}
              </div>

              {/* Label - Hidden on mobile, block on sm screens */}
              <div
                className={`hidden sm:block text-xs sm:text-sm font-bold tracking-tight leading-tight ${
                  isSelected ? "text-[#FFFFFF]" : "text-[#0D1B2A]"
                }`}
              >
                {label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile-only Legend: Displayed only below 'sm' breakpoint to keep scale clear and tiny */}
      <div className="flex justify-between px-2 mt-2 text-[10px] font-bold uppercase tracking-wider text-[#707070] sm:hidden">
        <span>Disagree</span>
        <span>Neutral</span>
        <span>Agree</span>
      </div>
    </div>
  );
}
