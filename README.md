# 🎓 ProgramFit

> A modern, web-based career assessment system designed to help students discover university programs that align with their interests.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-2F8CE5?style=for-the-badge&logo=google-chrome&logoColor=white)](https://luigibarte4563.github.io/ProgramFit_Web/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_&_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

ProgramFit guides students through a structured assessment questionnaire, evaluating their responses in real-time to recommend ideal academic tracks. The interface is meticulously crafted around a **Soft Neo-Brutalist** design system, combining bold structural choices with soft, modern digital aesthetics.

---

## ⚡ Core Features

* **🔐 Secure Authentication:** Seamless Google Sign-In powered by Firebase Auth.
* **📋 Smart Questionnaire:** Interactive career assessment utilizing an intuitive Likert scale.
* **📊 Real-Time Analytics:** Live tracking of assessment progress and dynamic state management.
* **🎯 Targeted Recommendations:** Tailored university program matching based on algorithmic scoring.
* **💾 Cloud Synced Storage:** Automated saving of assessment history and states via Cloud Firestore.
* **🔄 Instant Retakes:** Flexibility to clear previous metrics and restart the assessment journey anytime.
* **🎨 Neo-Brutalist UI:** A distinct visual identity featuring hard offset shadows, flat colors, and bold typography.

---

## 🛠️ Tech Stack & Ecosystem

### Frontend Core
* **Framework:** React 19
* **Language:** TypeScript
* **Build Tool:** Vite
* **Routing:** React Router DOM

### Styling & UI
* **CSS Framework:** Tailwind CSS
* **Design Language:** Soft Neo-Brutalist

### Backend & Infrastructure
* **Authentication:** Firebase Authentication
* **Database:** Cloud Firestore
* **Hosting:** GitHub Pages

---

## 🎨 Design System Specifications

ProgramFit bridges the gap between raw brutalism and modern accessibility.

### Color Palette

| Token | Purpose | Hex Code | Preview |
| :--- | :--- | :--- | :--- |
| `bg-main` | Application Background | `#F7EBE1` | ![](https://via.placeholder.com/15/F7EBE1/000000?text=+) |
| `brand-primary` | Primary Accent / Callouts | `#2F8CE5` | ![](https://via.placeholder.com/15/2F8CE5/000000?text=+) |
| `shadow-hard` | Neo-Brutalist Offset Shadows | `#1D3557` | ![](https://via.placeholder.com/15/1D3557/000000?text=+) |
| `text-primary` | Main Typography | `#000000` | ![](https://via.placeholder.com/15/000000/000000?text=+) |
| `text-secondary`| Subheadings & Captions | `#0D1B2A` | ![](https://via.placeholder.com/15/0D1B2A/000000?text=+) |
| `bg-card` | Container Backgrounds | `#FFFFFF` | ![](https://via.placeholder.com/15/FFFFFF/000000?text=+) |
| `border-ui` | Structural Borders | `#C5C5C5` | ![](https://via.placeholder.com/15/C5C5C5/000000?text=+) |

### Structural Rules
* **Shadows:** High-contrast, unblurred `$offset` strokes using `#1D3557`.
* **Borders:** Thick, defined boundaries separating UI modules.
* **Layout:** Grid-aligned, highly structured, card-based responsive views.

---

## 📁 Project Architecture

```text
src/
├── components/           # Presentation & Interactive UI Modules
│   ├── Assessment.tsx    # Questionnaire Engine
│   ├── GoogleSignIn.tsx  # Auth Entry Point
│   ├── History.tsx       # Past Assessment Logs
│   ├── Home.tsx          # Dashboard / Landing View
│   ├── LikertScale.tsx   # Custom Input System
│   ├── LoadingScreen.tsx # Soft-Brutalist Spinners
│   ├── Navbar.tsx        # Global App Navigation
│   ├── ProgressBar.tsx   # Completion Status Tracker
│   ├── QuestionCard.tsx  # Dynamic Card Layouts
│   └── Results.tsx       # Algorithmic Recommendation View
├── data/
│   └── assessmentQuestions.ts  # Questionnaire Dataset
├── firebase/
│   ├── auth.ts           # Authentication Methods
│   ├── assessment.ts     # Firestore Database Operations
│   └── config.ts         # Base Firebase SDK Setup
├── hooks/
│   └── useAuth.ts        # Global Auth State Listener
├── App.tsx               # Main Core Controller
├── main.tsx              # Application Entry Point
└── index.css             # Tailwind Directives & Custom Brutalist Utility Classes
🚀 Getting Started1. Clone & NavigateBashgit clone [https://github.com/Luigibarte4563/ProgramFit_Web.git](https://github.com/Luigibarte4563/ProgramFit_Web.git)
cd ProgramFit_Web
2. Install DependenciesBashnpm install
3. Environment ConfigurationCreate a .env file in the root directory and populate it with your Firebase project keys:  Code snippetVITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
▶️ Script CommandsTaskCommandDescriptionDevelopmentnpm run devLaunches local development server at http://localhost:5173/Network Hostnpm run dev -- --hostShares the dev server across your local area network (LAN)Production Buildnpm run buildCompiles and optimizes assets into the /dist directoryPreview Buildnpm run previewSpins up a local server to test production build performance📖 System Workflow[ Google Login ] ➔ [ Start Assessment ] ➔ [ Answer Likert Questions ] ➔ [ Firebase Processing ] ➔ [ Dynamic Career Results ]
Authentication: User authenticates via Google Popup Redirect.Evaluation: Application initializes query dataset; monitors responses dynamically using real-time local hooks.Synchronization: Final scores sync to Firestore underneath the user's specific cryptographic UID.Output: The UI maps results against existing University Program matrices to deliver localized matches.🔮 Roadmap / Future Enhancements[ ] Advanced analytical user dashboard tracking historical shifts over time.[ ] Automated PDF export utility for physical documentation of results.[ ] Explanatory AI module breaking down why a specific program was matched.[ ] Institutional Admin portal for academic counselors.[ ] Universal Dark Mode mapping for Neo-Brutalist themes.👨‍💻 AuthorLuigi BarteGitHub: @Luigibarte4563Deployment: ProgramFit Web Application📄 LicenseThis project is open-source and intended exclusively for educational, academic, and non-commercial purposes.
