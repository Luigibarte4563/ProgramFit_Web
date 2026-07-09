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

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="w-full">
        <div className="mb-2 flex justify-between text-sm">
          <span>
            Question {current} of {total}
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
      <div className="flex flex-wrap gap-2">
        {answers.map((answer, index) => {
          const isCurrent = index + 1 === current;

          return (
            <button
              key={index}
              onClick={() => onSelectQuestion(index)}
              className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-semibold text-white transition
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
  );
}
