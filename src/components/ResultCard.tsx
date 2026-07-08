interface ResultCardProps {
  rank: number;
  program: string;
  percentage: number;
  description?: string;
}

export default function ResultCard({
  rank,
  program,
  percentage,
  description,
}: ResultCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          #{rank} {program}
        </h2>

        <span className="rounded-full bg-blue-600 px-4 py-2 text-white">
          {percentage}%
        </span>
      </div>

      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
