import { type AssessmentQuestion } from "../data/assessmentQuestions";
import LikertScale from "./LikertScale";

interface QuestionCardProps {
  // displayIndex is the sequential step number the user sees (e.g., 1, 2, 3...)
  displayIndex: number;
  question: AssessmentQuestion;
  answer?: number;
  onAnswer: (value: number) => void;
}

export default function QuestionCard({
  displayIndex,
  question,
  answer,
  onAnswer,
}: QuestionCardProps) {
  if (!question) {
    return (
      <div className="p-1">
        <div className="rounded-xl border-2 border-[#EA4335] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_0px_#1D3557] text-center">
          <p className="font-bold text-[#EA4335]">Invalid question card data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 w-full max-w-3xl mx-auto">
      <div className="rounded-2xl bg-[#FFFFFF] p-4 md:p-5 border-2 border-[#C5C5C5] shadow-[5px_5px_0px_0px_#1D3557] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-[#F7EBE1] pb-2.5">
          <h2 className="text-lg md:text-xl font-black text-[#000000]">
            Question <span className="text-[#2F8CE5]">#{displayIndex}</span>
          </h2>

          {question.category && (
            <span className="px-2.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#1D3557] bg-[#F7EBE1] border-2 border-[#1D3557] rounded-full shadow-[2px_2px_0px_0px_#1D3557]">
              {question.category}
            </span>
          )}
        </div>

        {/* Question Text */}
        <p className="text-base md:text-lg font-bold text-[#0D1B2A] leading-snug">
          {question.question}
        </p>

        {/* Likert Scale Container */}
        <div className="w-full">
          <LikertScale value={answer} onChange={onAnswer} />
        </div>
      </div>
    </div>
  );
}
