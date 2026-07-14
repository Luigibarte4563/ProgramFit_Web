import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateResults } from "../utils/calculateResults";

import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

import { assessmentQuestions } from "../data/assessmentQuestions";
import {
  loadAssessmentProgress,
  saveAssessmentProgress,
  saveAssessmentResults,
} from "../firebase/assessment";

export default function Assessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<number[]>(
    Array(assessmentQuestions.length).fill(0),
  );

  const [loaded, setLoaded] = useState(false);

  // Load saved assessment once
  useEffect(() => {
    async function loadProgress() {
      const progress = await loadAssessmentProgress();

      if (progress) {
        setAnswers(progress.answers);
        setCurrentQuestion(progress.currentQuestion);
      }

      setLoaded(true);
    }

    loadProgress();
  }, []);

  // Auto-save whenever answers or current question changes
  useEffect(() => {
    if (!loaded) return;

    saveAssessmentProgress(answers, currentQuestion);
  }, [answers, currentQuestion, loaded]);

  const handleAnswer = (value: number) => {
    const updated = [...answers];
    updated[currentQuestion] = value;

    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const answeredQuestions = answers.filter((answer) => answer !== 0).length;

  const isAssessmentComplete = answeredQuestions === assessmentQuestions.length;

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;

  const handleFinish = async () => {
    if (!isAssessmentComplete) return;

    await saveAssessmentProgress(answers, currentQuestion);

    const results = calculateResults(answers);

    await saveAssessmentResults(results);

    navigate("/results");
  };

  function AlertTriangleIcon() {
    return (
      <svg
        className="w-6 h-6 text-[#EA4335] flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F7EBE1] text-[#0D1B2A] px-4 sm:px-8 lg:px-16 pt-12 pb-16 overflow-x-hidden">
      <div className="max-w-4xl mx-auto p-2 space-y-8">
        {/* Progress Section Container */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] p-6 shadow-[6px_6px_0px_0px_#1D3557]">
          <h2 className="text-xl font-bold text-[#000000] mb-4 border-b-2 border-[#F7EBE1] pb-2">
            Assessment Progress
          </h2>
          <ProgressBar
            current={currentQuestion + 1}
            answered={answeredQuestions}
            total={assessmentQuestions.length}
            answers={answers}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>

        {/* Question Card Container */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] p-6 md:p-8 shadow-[8px_8px_0px_0px_#1D3557]">
          <QuestionCard
            index={currentQuestion}
            answer={answers[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={isFirstQuestion}
              className={`rounded-xl border-2 px-6 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_#1D3557] transition-all duration-200 ${
                isFirstQuestion
                  ? "cursor-not-allowed bg-gray-200 border-gray-300 text-gray-400 shadow-none pointer-events-none"
                  : "bg-[#FFFFFF] border-[#C5C5C5] text-[#0D1B2A] hover:bg-[#F7EBE1] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557]"
              }`}
            >
              Back
            </button>

            {/* Next or Finish Button */}
            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                className="rounded-xl bg-[#2F8CE5] border-2 border-[#1D3557] px-6 py-3 text-sm font-bold text-[#FFFFFF] hover:bg-[#1D3557] shadow-[4px_4px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557] transition-all duration-200"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!isAssessmentComplete}
                className={`rounded-xl border-2 px-6 py-3 text-sm font-bold text-[#FFFFFF] transition-all duration-200 ${
                  isAssessmentComplete
                    ? "bg-[#2E7D32] border-[#1D3557] hover:bg-green-800 shadow-[4px_4px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557]"
                    : "cursor-not-allowed bg-gray-300 border-gray-400 text-gray-500 shadow-none pointer-events-none"
                }`}
              >
                Finish Assessment
              </button>
            )}
          </div>

          {/* Validation Warning Alert */}
          {isLastQuestion && !isAssessmentComplete && (
            <div className="bg-red-50 border-2 border-[#EA4335] text-red-700 rounded-xl p-3 shadow-[4px_4px_0px_0px_#1D3557] max-w-md mx-auto animate-in fade-in duration-150">
              <div className="flex items-center justify-center gap-2.5 text-sm font-medium text-left sm:text-center">
                <AlertTriangleIcon />
                <span>
                  Please answer all questions before finishing the assessment.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
