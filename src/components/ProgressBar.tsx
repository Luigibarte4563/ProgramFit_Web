import { useEffect, useRef } from "react";

interface ProgressBarProps {
  current: number;
  answered: number;
  total: number;
  answers: number[];
  onSelectQuestion: (index: number) => void;
}

export default function ProgressBar({
  current,
  answered,
  total,
  answers,
  onSelectQuestion,
}: ProgressBarProps) {
  const percentage = (answered / total) * 100;

  // Create a ref to store references to all the button elements
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Automatically scroll to the active question whenever 'current' changes
  useEffect(() => {
    const activeIndex = current - 1;
    const activeButton = buttonRefs.current[activeIndex];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [current]);

  return (
    <div className="flex flex-col gap-6 w-full rounded-2xl border-2 border-[#1D3557] bg-[#FFFFFF] p-4 sm:p-5 shadow-[4px_4px_0px_0px_#1D3557] md:flex-row md:items-center">
      {/* Progress Bar Container */}
      <div className="flex-1 min-w-[140px]">
        <div className="mb-2 flex flex-row items-center justify-between text-sm font-extrabold text-[#0D1B2A]">
          <span className="whitespace-nowrap">
            Question <span className="text-[#2F8CE5]">{current}</span> of{" "}
            {total}
          </span>
        </div>

        {/* Neo-brutalist Main Track */}
        <div className="relative h-6 overflow-hidden rounded-xl border-2 border-[#1D3557] bg-[#FFFFFF]">
          {/* Animated Internal Progress Fill */}
          <div
            className="h-full bg-[#2F8CE5] border-r-2 border-[#1D3557] transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />

          {/* Centered Fixed Percentage */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className={`text-xs font-extrabold select-none transition-colors duration-300 ${
                percentage > 52 ? "text-white" : "text-[#0D1B2A]"
              }`}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto pb-2 max-w-full sm:flex-wrap no-scrollbar md:pb-0">
        {answers.map((answer, index) => {
          const isCurrent = index + 1 === current;
          const isAnswered = answer !== 0;

          // Compute dynamic styling matching your design token behavior
          let dynamicClasses = "";
          if (isCurrent) {
            dynamicClasses =
              "bg-[#2F8CE5] text-[#FFFFFF] shadow-[2px_2px_0px_0px_#1D3557] translate-y-0";
          } else if (isAnswered) {
            dynamicClasses =
              "bg-[#F7EBE1] text-[#0D1B2A] hover:bg-[#2F8CE5]/20 hover:text-[#000000] shadow-[3px_3px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557]";
          } else {
            dynamicClasses =
              "bg-[#FFFFFF] text-[#0D1B2A] hover:bg-[#F7EBE1] shadow-[3px_3px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557]";
          }

          return (
            <button
              key={index}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => onSelectQuestion(index)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black border-2 border-[#1D3557] transition-all duration-150 ${dynamicClasses}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
