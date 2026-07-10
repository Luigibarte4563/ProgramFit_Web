import { useState } from "react";

import GoogleSignIn from "./components/GoogleSignIn";
import Home from "./components/Home";
import Assessment from "./components/Assessment";
import Results from "./components/Results";

import { useAuth } from "./hooks/useAuth";
import { logout } from "./firebase/auth";

type Screen = "home" | "assessment" | "results";

function App() {
  const { user, loading } = useAuth();

  const [screen, setScreen] = useState<Screen>("home");

  // Loading State
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="animate-pulse text-sm font-medium text-slate-500">
            Loading ProgramFit...
          </p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return <GoogleSignIn />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 font-sans antialiased">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-base font-bold text-white shadow-sm">
                PF
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-900">
                Program<span className="text-blue-600">Fit</span>
              </span>

              <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-400 sm:inline-block">
                Assessment System
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User Profile"}
                  className="hidden h-8 w-8 rounded-full border border-slate-200 object-cover xs:block"
                />
              )}

              <button
                onClick={logout}
                className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          {screen === "home" && (
            <Home
              user={user}
              onStartAssessment={() => setScreen("assessment")}
            />
          )}

          {screen === "assessment" && (
            <Assessment onFinish={() => setScreen("results")} />
          )}

          {screen === "results" && <Results />}
        </div>
      </main>
    </div>
  );
}

export default App;
