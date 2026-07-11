import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";

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

  return (
    <div className="min-h-screen bg-slate-100">
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
              onClick={() => navigate("/assessment")}
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
    </div>
  );
}
