import { assessmentQuestions } from "../data/assessmentQuestions";
import LikertScale from "./LikertScale";

interface QuestionCardProps {
  index: number;
  answer?: number;
  onAnswer: (value: number) => void;
}

export default function QuestionCard({
  index,
  answer,
  onAnswer,
}: QuestionCardProps) {
  const question = assessmentQuestions[index];

  if (!question) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4">
        <p className="font-semibold text-red-600">
          Invalid question index: {index}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Question {question.id}</h2>

      <p>{question.category}</p>

      <p>{question.question}</p>

      <LikertScale value={answer} onChange={onAnswer} />
    </div>
  );
}
