import ResultCard from "./ResultCard";

export default function Results() {
  // Temporary sample data
  const results = [
    {
      rank: 1,
      program: "BS Information Technology",
      percentage: 95,
      description:
        "You demonstrate strong problem-solving and technical interests.",
    },
    {
      rank: 2,
      program: "BS Computer Science",
      percentage: 91,
      description: "You enjoy analytical thinking and logical reasoning.",
    },
    {
      rank: 3,
      program: "BS Information Systems",
      percentage: 88,
      description:
        "You have a good balance of technology and business interests.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Your Recommended Programs
        </h1>

        <p className="mt-2 text-slate-600">
          Based on your assessment responses, these programs best match your
          interests and strengths.
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <ResultCard
            key={result.rank}
            rank={result.rank}
            program={result.program}
            percentage={result.percentage}
            description={result.description}
          />
        ))}
      </div>
    </div>
  );
}
