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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartAssessment = async () => {
    const results = await loadAssessmentResults();

    if (results.length === 0) {
      navigate("/assessment");
      return;
    }

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
    <div className="min-h-screen w-full bg-[#F7EBE1] text-[#0D1B2A] relative flex flex-col justify-between overflow-x-hidden pb-16">
      <div className="w-full">
        {/* Hero Section */}
        <section className="w-full px-4 sm:px-8 lg:px-16 pt-12 pb-6">
          {/* Wrapper container ensures shadow has spacing to render safely */}
          <div className="p-2">
            <div className="w-full bg-[#FFFFFF] rounded-2xl border-2 border-[#C5C5C5] p-8 md:p-12 shadow-[8px_8px_0px_0px_#1D3557] flex flex-col items-center text-center">
              <img
                src={user.photoURL ?? ""}
                alt={user.displayName ?? ""}
                className="mb-6 h-28 w-28 rounded-full border-4 border-[#2F8CE5] shadow-[4px_4px_0px_0px_#1D3557] object-cover"
              />

              <h1 className="text-4xl font-bold text-[#000000]">
                Welcome,{" "}
                <span className="text-[#2F8CE5]">{user.displayName}</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base text-[#0D1B2A] leading-relaxed">
                Discover which university program best matches your interests
                through our Career Assessment System.
              </p>

              <button
                onClick={handleStartAssessment}
                className="mt-8 px-8 py-3.5 text-lg font-bold rounded-xl text-[#FFFFFF] bg-[#2F8CE5] border-2 border-[#1D3557] shadow-[4px_4px_0px_0px_#1D3557] hover:bg-[#1D3557] hover:text-[#FFFFFF] transition-all duration-200 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1D3557]"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full px-4 sm:px-8 lg:px-16 py-6">
          <div className="p-2">
            <div className="rounded-2xl bg-[#FFFFFF] p-8 border-2 border-[#C5C5C5] shadow-[6px_6px_0px_0px_#1D3557]">
              <h2 className="mb-4 text-2xl font-bold text-[#000000] border-b-2 border-[#F7EBE1] pb-2">
                About the Assessment
              </h2>

              <p className="leading-relaxed text-[#0D1B2A]">
                This assessment helps identify your interests across different
                academic fields. Based on your responses, the system calculates
                your strengths and recommends the university programs that best
                match your profile.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="w-full px-4 sm:px-8 lg:px-16 py-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#000000]">
            Available Programs
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-2">
            {schools.map((school) => (
              <div
                key={school.title}
                className="rounded-2xl bg-[#FFFFFF] p-6 border-2 border-[#C5C5C5] shadow-[6px_6px_0px_0px_#1D3557]"
              >
                <h3 className="mb-4 text-xl font-bold text-[#2F8CE5] border-b border-[#F7EBE1] pb-2">
                  {school.title}
                </h3>

                <ul className="space-y-3 text-sm text-[#0D1B2A]">
                  {school.programs.map((program) => (
                    <li key={program} className="flex items-start gap-2">
                      <span className="text-[#2F8CE5] font-extrabold">•</span>
                      <span>{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- ASSESSMENT DECISION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container: Prevents shadow clipping with safe margin margins on mobile */}
          <div className="relative transform rounded-2xl bg-[#FFFFFF] p-6 text-left shadow-[8px_8px_0px_0px_#1D3557] border-2 border-[#C5C5C5] transition-all w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 my-8 mx-auto z-10">
            <h3 className="text-2xl font-bold text-[#000000]">
              Assessment Completed
            </h3>

            <p className="mt-3 text-sm text-[#0D1B2A] leading-relaxed">
              You have already completed your career assessment. Would you like
              to retake it and overwrite your old responses, or simply review
              your current recommendations?
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="order-3 sm:order-1 rounded-xl border-2 border-[#C5C5C5] bg-[#FFFFFF] px-4 py-2.5 text-sm font-bold text-[#0D1B2A] hover:bg-[#F7EBE1] shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557] transition-all"
              >
                Cancel
              </button>

              {/* View Results Button */}
              <button
                type="button"
                onClick={handleViewResults}
                className="order-1 sm:order-2 rounded-xl bg-[#2F8CE5] border-2 border-[#1D3557] px-4 py-2.5 text-sm font-bold text-[#FFFFFF] hover:bg-[#1D3557] shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557] transition-all"
              >
                View Results
              </button>

              {/* Retake Button */}
              <button
                type="button"
                onClick={handleRetake}
                className="order-2 sm:order-3 rounded-xl bg-[#EA4335] border-2 border-[#1D3557] px-4 py-2.5 text-sm font-bold text-[#FFFFFF] hover:bg-red-700 shadow-[2px_2px_0px_0px_#1D3557] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1D3557] transition-all"
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
