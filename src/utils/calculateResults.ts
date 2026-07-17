// src/utils/calculateResults.ts

import { assessmentQuestions } from "../data/assessmentQuestions";
import type { AssessmentResult } from "../firebase/assessment";

const descriptions: Record<string, string> = {
  "School of Information Technology":
    "You enjoy technology, problem-solving, and creating digital solutions.",

  "School of Engineering":
    "You have strong analytical skills and enjoy designing and building systems.",

  "School of Teacher Education":
    "You enjoy helping others learn and making a positive impact through education.",

  "School of Business and Accountancy":
    "You are interested in business, leadership, finance, and entrepreneurship.",

  "School of International Hospitality Management":
    "You enjoy serving people and working in tourism and hospitality industries.",

  "School of Humanities":
    "You are interested in communication, psychology, and understanding people.",

  "School of Health and Sciences":
    "You are passionate about healthcare and helping improve people's lives.",

  "School of Criminology":
    "You are interested in justice, public safety, and law enforcement.",
};

import type { AssessmentQuestion } from "../data/assessmentQuestions";

export function calculateResults(
  answers: number[],
  questions: AssessmentQuestion[]
): AssessmentResult[] {
  const categoryScores: Record<string, number> = {};
  const categoryMaxScores: Record<string, number> = {};

  questions.forEach((question, index) => {
    const category = question.category;

    categoryScores[category] =
      (categoryScores[category] ?? 0) + (answers[index] ?? 0);

    categoryMaxScores[category] =
      (categoryMaxScores[category] ?? 0) + 5;
  });

  const results: AssessmentResult[] = Object.keys(categoryScores).map(
    (category) => ({
      rank: 0,
      program: category,
      percentage: Math.round(
        (categoryScores[category] / categoryMaxScores[category]) * 100
      ),
      description:
        descriptions[category] ??
        "This program matches your assessment profile.",
    })
  );

  results.sort((a, b) => b.percentage - a.percentage);

  return results.map((result, index) => ({
    ...result,
    rank: index + 1,
  }));
}