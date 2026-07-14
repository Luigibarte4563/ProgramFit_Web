# 🎓 ProgramFit

> A modern, web-based career assessment system designed to help students discover university programs that align with their interests.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-2F8CE5?style=for-the-badge&logo=google-chrome&logoColor=white)](https://luigibarte4563.github.io/ProgramFit_Web/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_&_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

ProgramFit guides students through a structured assessment questionnaire, evaluating their responses in real-time to recommend ideal academic tracks. The interface is meticulously crafted around a **Soft Neo-Brutalist** design system, combining bold structural choices with soft, modern digital aesthetics.

---

## 🌐 Live Demo

- **Live Demo:** https://luigibarte4563.github.io/ProgramFit_Web/

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
# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Luigibarte4563/ProgramFit_Web.git
cd ProgramFit_Web
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Environment Configuration

Create a `.env` file in the root directory and add your Firebase configuration.

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

---

# ▶️ Script Commands

| Task | Command | Description |
|------|---------|-------------|
| Development | `npm run dev` | Launches the local development server at `http://localhost:5173/` |
| Network Host | `npm run dev -- --host` | Shares the development server across your local network (LAN). |
| Production Build | `npm run build` | Builds and optimizes the application into the `dist` directory. |
| Preview Build | `npm run preview` | Runs a local server to preview the production build. |

---

# 📖 System Workflow

```text
Google Login
      │
      ▼
Start Assessment
      │
      ▼
Answer Likert Questions
      │
      ▼
Firebase Processing
      │
      ▼
Dynamic Career Results
```

### 🔐 Authentication
Users securely authenticate using **Firebase Google Authentication** through a Google sign-in popup.

### 📝 Evaluation
The system loads the assessment questionnaire and records user responses using React state management for real-time interaction.

### ☁️ Synchronization
Upon assessment completion, responses and calculated scores are securely stored in **Cloud Firestore** under the authenticated user's unique Firebase UID.

### 🎯 Results
The application analyzes the collected responses and maps them to predefined university program categories, generating personalized career recommendations.

---

# 🔮 Roadmap

- [ ] Assessment history and analytics dashboard
- [ ] PDF export for assessment results
- [ ] AI-powered explanation of recommendations
- [ ] Admin portal for academic counselors
- [ ] Dark mode support using the Soft Neo-Brutalist design system

---

# 👨‍💻 Author

**Luigi Barte**

- **GitHub:** https://github.com/Luigibarte4563

---

# 📄 License

This project is open-source and intended for **educational, academic, and non-commercial purposes only**.
