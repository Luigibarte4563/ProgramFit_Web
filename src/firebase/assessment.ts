import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./config";

export interface AssessmentResult {
  rank: number;
  program: string;
  percentage: number;
  description: string;
}

// Save assessment progress
export async function saveAssessmentProgress(
  answers: number[],
  currentQuestion: number,
) {
  const user = auth.currentUser;

  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      assessment: {
        answers,
        currentQuestion,
        updatedAt: serverTimestamp(),
      },
    },
    { merge: true },
  );
}

// Load assessment progress
export async function loadAssessmentProgress() {
  const user = auth.currentUser;

  if (!user) return null;

  const snapshot = await getDoc(doc(db, "users", user.uid));

  if (!snapshot.exists()) return null;

  return snapshot.data().assessment ?? null;
}

// Save final assessment results
export async function saveAssessmentResults(
  results: AssessmentResult[],
) {
  const user = auth.currentUser;

  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      assessmentResults: {
        results,
        updatedAt: serverTimestamp(),
      },
    },
    { merge: true },
  );
}

// Load final assessment results
export async function loadAssessmentResults(): Promise<
  AssessmentResult[]
> {
  const user = auth.currentUser;

  if (!user) return [];

  const snapshot = await getDoc(doc(db, "users", user.uid));

  if (!snapshot.exists()) return [];

  return snapshot.data().assessmentResults?.results ?? [];
}