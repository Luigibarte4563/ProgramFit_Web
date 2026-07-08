import { assessmentQuestions } from "../firebase/assessmentQuestions";
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

  return (
    <div>
      <h2>Question {question.id}</h2>

      <p>{question.category}</p>

      <p>{question.question}</p>

      <LikertScale value={answer} onChange={onAnswer} />
    </div>
  );
}
