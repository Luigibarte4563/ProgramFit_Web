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
    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
      {labels.map((label, index) => {
        const score = index + 1;

        return (
          <button
            key={score}
            onClick={() => onChange(score)}
            className={`rounded-lg border p-4 transition
            ${
              value === score
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 bg-white hover:border-blue-500"
            }`}
          >
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-sm">{label}</div>
          </button>
        );
      })}
    </div>
  );
}
