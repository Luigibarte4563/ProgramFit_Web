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

  // 1. Create a ref to store references to all the button elements
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 2. Automatically scroll to the active question whenever 'current' changes
  useEffect(() => {
    // Array indexes are 0-based, so current question is at index (current - 1)
    const activeIndex = current - 1;
    const activeButton = buttonRefs.current[activeIndex];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Prevents jumping the whole page vertically
        inline: "center", // Centers the active box in the horizontal scroll view
      });
    }
  }, [current]);

  return (
    <>
      {/* Changed mobile to flex-col and desktop (sm) to flex-row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full">
        {/* Progress Bar Container */}
        <div className="flex-1 min-w-[120px]">
          <div className="mb-2 flex justify-between text-xs sm:text-sm">
            <span className="whitespace-nowrap">
              Q {current} of {total}
            </span>
            <span>{Math.round(percentage)}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Question Navigator */}
        {/* Keeps them strictly in 1 row on mobile with horizontal scroll, wraps on desktop */}
        <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto pb-2 max-w-full sm:flex-wrap no-scrollbar">
          {answers.map((answer, index) => {
            const isCurrent = index + 1 === current;

            return (
              <button
                key={index}
                // 3. Assign the element to our ref array
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                onClick={() => onSelectQuestion(index)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white transition
                ${
                  isCurrent
                    ? "bg-blue-600 ring-2 ring-blue-300"
                    : answer !== 0
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
