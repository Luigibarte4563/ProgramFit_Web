import GoogleSignIn from "./components/GoogleSignIn";
import Home from "./components/Home";
import Assessment from "./components/Assessment";
import { useState } from "react";

import { useAuth } from "./hooks/useAuth";
import { logout } from "./firebase/auth";

function App() {
  const { user, loading } = useAuth();

  const [started, setStarted] = useState(false);
  // 1. Sleek, animated loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Loading ProgramFit...
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State (Letting the GoogleSignIn card handle centering)
  if (!user) {
    return <GoogleSignIn />;
  }

  // 3. Authenticated Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      {/* Premium Responsive Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Branding */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-base shadow-sm">
                PF
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Program<span className="text-blue-600">Fit</span>
              </span>
              <span className="hidden sm:inline-block text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                Assessment System
              </span>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User Profile"}
                  className="hidden xs:block h-8 w-8 rounded-full border border-slate-200 object-cover"
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

      {/* Main Responsive Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          {!started ? (
            <Home user={user} onStartAssessment={() => setStarted(true)} />
          ) : (
            <Assessment />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
