// src/utils/calculateResults.ts

import { assessmentQuestions } from "../data/assessmentQuestions";

export interface ProgramResult {
  rank: number;
  program: string;
  percentage: number;
  score: number;
  maxScore: number;
}

export function calculateResults(answers: number[]): ProgramResult[] {
  const categoryScores: Record<string, number> = {};
  const categoryMaxScores: Record<string, number> = {};

  assessmentQuestions.forEach((question, index) => {
    const category = question.category;

    if (!categoryScores[category]) {
      categoryScores[category] = 0;
      categoryMaxScores[category] = 0;
    }

    // User score (1–5)
    categoryScores[category] += answers[index] ?? 0;

    // Every question has a maximum of 5 points
    categoryMaxScores[category] += 5;
  });

  const results: ProgramResult[] = Object.keys(categoryScores).map(
    (category) => ({
      rank: 0,
      program: category,
      score: categoryScores[category],
      maxScore: categoryMaxScores[category],
      percentage: Math.round(
        (categoryScores[category] / categoryMaxScores[category]) * 100
      ),
    })
  );

  results.sort((a, b) => b.percentage - a.percentage);

  return results.map((result, index) => ({
    ...result,
    rank: index + 1,
  }));
}