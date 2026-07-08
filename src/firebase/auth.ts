import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import type { User } from "firebase/auth";

import { auth } from "./config";

const provider = new GoogleAuthProvider();

// Optional: Always prompt the user to choose an account
provider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Sign in using Google
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, provider);

    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}