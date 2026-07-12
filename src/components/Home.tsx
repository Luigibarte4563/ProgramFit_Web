import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";

import { loadAssessmentResults, resetAssessment } from "../firebase/assessment";

interface HomeProps {
  user: User;
}

const schools = [
  {
    title: "School of Information Technology",
    programs: [
      "BS Computer Science - Data Science",
      "BS Information Technology - Web Development",
      "BS Information Technology - Multimedia Arts",
      "BS Information Technology - Infrastructure with Cybersecurity",
    ],
  },
  {
    title: "School of Engineering",
    programs: [
      "BS Civil Engineering",
      "BS Computer Engineering",
      "BS Electrical Engineering",
      "BS Electronics Engineering",
    ],
  },
  {
    title: "School of Teacher Education",
    programs: [
      "Bachelor of Early Childhood Education",
      "Bachelor of Elementary Education",
      "BSEd Major in English",
      "BSEd Major in Filipino",
      "BSEd Major in Mathematics",
      "BSEd Major in Science",
      "Bachelor of Special Needs Education",
    ],
  },
  {
    title: "School of Business and Accountancy",
    programs: [
      "BS Accountancy",
      "BSBA - Financial Management",
      "BSBA - Marketing Management",
    ],
  },
  {
    title: "School of International Hospitality Management",
    programs: ["BS Tourism Management", "BS Hospitality Management"],
  },
  {
    title: "School of Humanities",
    programs: ["BA Communication", "BS Psychology"],
  },
  {
    title: "School of Health and Sciences",
    programs: ["BS Nursing"],
  },
  {
    title: "School of Criminology",
    programs: ["BS Criminology"],
  },
];

export default function Home({ user }: HomeProps) {
  const navigate = useNavigate();
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartAssessment = async () => {
    const results = await loadAssessmentResults();

    // No previous assessment
    if (results.length === 0) {
      navigate("/assessment");
      return;
    }

    // Existing assessment found -> Trigger the modal
    setIsModalOpen(true);
  };

  const handleRetake = async () => {
    setIsModalOpen(false);
    try {
      await resetAssessment();
      navigate("/assessment");
    } catch (error) {
      console.error("Failed to reset assessment:", error);
    }
  };

  const handleViewResults = () => {
    setIsModalOpen(false);
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-slate-100 relative">
      {/* Hero */}
      <section className="bg-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <img
              src={user.photoURL ?? ""}
              alt={user.displayName ?? ""}
              className="mb-4 h-28 w-28 rounded-full border-4 border-white object-cover"
            />

            <h1 className="text-4xl font-bold">Welcome, {user.displayName}</h1>

            <p className="mt-4 max-w-2xl text-lg text-blue-100">
              Discover which university program best matches your interests
              through our Career Assessment System.
            </p>

            <button
              onClick={handleStartAssessment}
              className="mt-8 rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-700 shadow transition hover:bg-blue-50"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="mb-4 text-2xl font-bold">About the Assessment</h2>

          <p className="leading-7 text-gray-700">
            This assessment helps identify your interests across different
            academic fields. Based on your responses, the system calculates your
            strengths and recommends the university programs that best match
            your profile.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Available Programs
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {schools.map((school) => (
            <div key={school.title} className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold text-blue-700">
                {school.title}
              </h3>

              <ul className="space-y-2 text-gray-700">
                {school.programs.map((program) => (
                  <li key={program}>• {program}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- ASSESSMENT DECISION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all sm:w-full sm:max-w-md border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900">
              Assessment Completed
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              You have already completed your career assessment. Would you like
              to retake it and overwrite your old responses, or simply review
              your current recommendations?
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="order-3 sm:order-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleViewResults}
                className="order-1 sm:order-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-sm"
              >
                View Results
              </button>

              <button
                type="button"
                onClick={handleRetake}
                className="order-2 sm:order-3 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 shadow-sm"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
