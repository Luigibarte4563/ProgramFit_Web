import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ResultCard from "./ResultCard";

import {
  loadAssessmentResults,
  resetAssessment,
  type AssessmentResult,
} from "../firebase/assessment";

export default function Results() {
  const navigate = useNavigate();

  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      try {
        const data = await loadAssessmentResults();
        setResults(data);
      } catch (error) {
        console.error("Failed to load assessment results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  // Executes the logic if the user confirms inside the modal
  const handleConfirmRetake = async () => {
    setIsModalOpen(false);
    try {
      await resetAssessment();
      navigate("/assessment");
    } catch (error) {
      console.error("Failed to reset assessment:", error);
    }
  };

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

        <button
          onClick={() => navigate("/assessment")}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 relative">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Your Recommended Programs</h1>

        <p className="mt-2 text-gray-600">
          Based on your assessment responses, these programs best match your
          interests and strengths.
        </p>
      </div>

      <div className="space-y-4">
        {results.slice(0, 3).map((result) => (
          <ResultCard
            key={result.rank}
            rank={result.rank}
            program={result.program}
            percentage={result.percentage}
            description={result.description}
          />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
        >
          Retake Assessment
        </button>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content Box */}
          <div className="relative transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all sm:w-full sm:max-w-md border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Retake Assessment?
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Are you sure you want to retake the assessment? Your current
              answers and recommendations will be permanently removed.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRetake}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none shadow-sm"
              >
                Yes, reset and retake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
