import { useEffect, useState } from "react";

import ResultCard from "./ResultCard";

import { loadAssessmentResults } from "../firebase/assessment";

interface Result {
  rank: number;
  program: string;
  percentage: number;
  description: string;
}

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      const data = await loadAssessmentResults();

      setResults(data);

      setLoading(false);
    }

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">
          Loading your recommendations...
        </h2>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">No assessment results found.</h2>

        <p className="mt-2 text-gray-600">
          Please complete the assessment first.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Your Recommended Programs</h1>

        <p className="mt-2 text-gray-600">
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
