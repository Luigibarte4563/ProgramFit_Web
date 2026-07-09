import { useState } from "react";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import { assessmentQuestions } from "../firebase/assessmentQuestions";

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<number[]>(
    Array(assessmentQuestions.length).fill(0),
  );

  const handleAnswer = (value: number) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === assessmentQuestions.length - 1;

  const handleFinish = () => {
    console.log("Assessment Finished!");
    console.log(answers);

    // TODO:
    // - Calculate scores
    // - Save to Firebase
    // - Show recommendation page
  };

  const answeredQuestions = answers.filter((answer) => answer !== 0).length;
  return (
    <div className="space-y-6">
      <ProgressBar
        current={currentQuestion + 1}
        answered={answeredQuestions}
        total={assessmentQuestions.length}
        answers={answers}
        onSelectQuestion={setCurrentQuestion}
      />

      <QuestionCard
        index={currentQuestion}
        answer={answers[currentQuestion]}
        onAnswer={handleAnswer}
      />

      <div className="flex justify-between">
        {/* Back Button */}
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={isFirstQuestion}
          className={`rounded-lg px-4 py-2 font-medium transition ${
            isFirstQuestion
              ? "cursor-not-allowed bg-gray-200 text-gray-400"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Back
        </button>

        {/* Next / Finish Button */}
        {!isLastQuestion ? (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
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
