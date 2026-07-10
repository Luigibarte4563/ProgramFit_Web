import { useEffect, useState } from "react";

import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

import { assessmentQuestions } from "../firebase/assessmentQuestions";
import {
  loadAssessmentProgress,
  saveAssessmentProgress,
} from "../firebase/assessment";

interface AssessmentProps {
  onFinish: () => void;
}

export default function Assessment({ onFinish }: AssessmentProps) {
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

  const handleFinish = async () => {
    await saveAssessmentProgress(answers, currentQuestion);

    // TODO:
    // Calculate program scores
    // Save final results
    // Mark assessment as completed

    onFinish();
  };

  const answeredQuestions = answers.filter((answer) => answer !== 0).length;

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;

  return (
    <div className="space-y-6">
      <ProgressBar
        current={currentQuestion + 1}
        answered={answeredQuestions}
        total={assessmentQuestions.length}
        answers={answers}
        onSelectQuestion={handleSelectQuestion}
      />

      <QuestionCard
        index={currentQuestion}
        answer={answers[currentQuestion]}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={isFirstQuestion}
          className={`rounded-lg px-4 py-2 font-medium transition ${
            isFirstQuestion
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Back
        </button>

        {!isLastQuestion ? (
          <button
            onClick={handleNext}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
