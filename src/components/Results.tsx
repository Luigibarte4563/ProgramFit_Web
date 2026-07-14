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

  const handleConfirmRetake = async () => {
    setIsModalOpen(false);
    try {
      await resetAssessment();
      navigate("/assessment");
    } catch (error) {
      console.error("Failed to reset assessment:", error);
    }
  };

  // Neo-Brutalist Loading State
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F7EBE1] flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] border-2 border-[#C5C5C5] p-8 rounded-2xl shadow-[6px_6px_0px_0px_#1D3557] text-center max-w-sm">
          <h2 className="text-xl font-bold text-[#000000] animate-pulse">
            Loading your recommendations...
          </h2>
        </div>
      </div>
    );
  }

  // Neo-Brutalist Empty State
  if (results.length === 0) {
    return (
      <div className="min-h-screen w-full bg-[#F7EBE1] flex items-center justify-center p-4">
        <div className="bg-[#FFFFFF] border-2 border-[#C5C5C5] p-8 rounded-2xl shadow-[8px_8px_0px_0px_#1D3557] text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#000000]">
            No Results Found
          </h2>

          <p className="mt-4 text-[#0D1B2A] leading-relaxed">
            Please complete the career assessment first so we can map out your
            recommendations.
          </p>

          <button
            onClick={() => navigate("/assessment")}
            className="mt-6 px-6 py-3 font-bold rounded-xl text-[#FFFFFF] bg-[#2F8CE5] border-2 border-[#1D3557] shadow-[4px_4px_0px_0px_#1D3557] hover:bg-[#1D3557] hover:text-[#FFFFFF] transition-all duration-200 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557]"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F7EBE1] text-[#0D1B2A] py-12 px-4 sm:px-8 lg:px-16 flex flex-col items-center relative overflow-x-hidden">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header Hero Box */}
        <div className="p-2">
          <div className="w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] p-8 shadow-[8px_8px_0px_0px_#1D3557] text-center">
            <h1 className="text-3xl sm:text-4xl font-black text-[#000000]">
              Your Recommended Programs
            </h1>

            <p className="mt-4 text-base text-[#0D1B2A] leading-relaxed max-w-xl mx-auto">
              Based on your assessment responses, these programs best match your
              interests and strengths.
            </p>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6 p-2">
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

        {/* Retake Button Container */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 text-md font-bold rounded-xl text-[#FFFFFF] bg-[#EA4335] border-2 border-[#1D3557] shadow-[4px_4px_0px_0px_#1D3557] hover:bg-red-700 transition-all duration-200 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557]"
          >
            Retake Assessment
          </button>
        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative transform rounded-2xl bg-[#FFFFFF] p-6 text-left shadow-[8px_8px_0px_0px_#1D3557] border-2 border-[#C5C5C5] transition-all w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-[#000000]">
              Retake Assessment?
            </h3>

            <p className="mt-3 text-sm text-[#0D1B2A] leading-relaxed">
              Are you sure you want to retake the assessment? Your current
              answers and recommendations will be permanently removed.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border-2 border-[#C5C5C5] bg-[#FFFFFF] px-4 py-2.5 text-sm font-bold text-[#0D1B2A] hover:bg-[#F7EBE1] shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557] transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmRetake}
                className="rounded-xl bg-[#EA4335] border-2 border-[#1D3557] px-4 py-2.5 text-sm font-bold text-[#FFFFFF] hover:bg-red-700 shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557] transition-all"
              >
                Yes, Reset and Retake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
