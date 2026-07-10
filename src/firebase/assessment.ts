import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./config";

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

export async function loadAssessmentProgress() {
  const user = auth.currentUser;

  if (!user) return null;

  const snapshot = await getDoc(doc(db, "users", user.uid));

  if (!snapshot.exists()) return null;

  return snapshot.data().assessment ?? null;
}