import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import GoogleSignIn from "./components/GoogleSignIn";
import Home from "./components/Home";
import Assessment from "./components/Assessment";
import Results from "./components/Results";

import { useAuth } from "./hooks/useAuth";
import { logout } from "./firebase/auth";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <GoogleSignIn />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        title="ProgramFit"
        userName={user.displayName ?? undefined}
        onLogout={logout}
      />

      <main className="mx-auto max-w-7xl p-6">
        <Routes>
          <Route path="/" element={<Home user={user} />} />

          <Route path="/assessment" element={<Assessment />} />

          <Route path="/results" element={<Results />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
