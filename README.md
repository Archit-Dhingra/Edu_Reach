<div align="center">

# 📚 EduReach

### AI Tutor Platform for Underprivileged Children

*Bringing personalized, syllabus-aligned education to every child — regardless of language, location, or income.*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://edu-reach-mu.vercel.app)

[🌐 Live Demo](https://edu-reach-mu.vercel.app) · [Report a Bug](https://github.com/Archit-Dhingra/Edu_Reach/issues) · [Request Feature](https://github.com/Archit-Dhingra/Edu_Reach/issues)

</div>

---

## 🌍 The Problem

Over **250 million children** in India lack access to quality education. The barriers are systemic:

| Challenge | Impact |
|-----------|--------|
| 🏫 Overcrowded classrooms | No personalized attention; individual learning gaps go unaddressed |
| 🌐 Language barriers | Complex English-only content alienates students from regional backgrounds |
| 📖 No syllabus alignment | Generic online content doesn't match what children actually study in school |
| 👩‍🏫 Teacher shortage | Rural areas face acute shortages of qualified subject teachers |
| 💸 Paywalled platforms | Most edtech solutions require smartphones, strong internet, English proficiency, and paid subscriptions |

**EduReach is built to tear down every one of these walls.**

---

## 💡 Our Solution

EduReach is a **free, AI-powered tutoring platform** designed specifically for children aged 8–16. It meets students where they are — in their language, with their textbooks, on their devices.

```
Upload your syllabus → Learn from a patient AI tutor → Practice with auto-generated quizzes → Connect with real teachers when needed
```

No English proficiency required. No paid subscription. No powerful device needed.

---

## ✨ Features

### 🤖 AI Tutor Chat
An intelligent tutor that teaches from *your* uploaded syllabus using simple, friendly, age-appropriate explanations. Never gives a generic answer — always contextual to the student's actual coursework.

### 📂 Syllabus Upload
Drag-and-drop any subject PDF. The AI instantly grounds itself in that content, ensuring all explanations and quizzes are aligned to what the student actually needs to learn.

### 📝 Auto-Generated Assignments
After any topic is covered, the AI automatically creates practice quizzes tailored to the syllabus content — reinforcing learning without extra teacher effort.

### 👩‍🏫 Human Teacher Matching
Students can browse verified human tutors, send messages, and enroll in sessions. Teachers can host live classes via Google Meet integration.

### 📊 Progress Dashboard
Visual learning streaks, subject-wise coverage charts, and progress tracking — keeping students motivated and guardians informed.

### 🌙 Dark / Light Mode
Full theme toggle for comfortable learning in any environment.

### 📱 Mobile Responsive
Optimized for basic smartphones — because that's what most of our users have.

### 📶 Offline & SMS Mode *(Planned)*
For students with no internet access, offline mode and SMS-based interaction are on the roadmap.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Vite |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 |
| **State Management** | Zustand / Context API |
| **Animations** | Framer Motion |
| **Charts** | Recharts |

---

## 🔐 Auth Flow

```
Welcome Screen
     │
     ├── Login  ──────────────────────► Dashboard
     │
     └── Sign Up
          │
          ├── Step 1: Build your profile
          ├── Step 2: Select subjects
          ├── Step 3: Upload your syllabus
          └── Step 4: Complete → Dashboard
```

> All dashboard routes are protected. Unauthenticated users are redirected to the welcome screen.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Archit-Dhingra/Edu_Reach.git

# 2. Navigate into the project
cd Edu_Reach

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📁 Project Structure

```
Edu_Reach/
├── public/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level page components
│   ├── store/           # Zustand state management
│   ├── hooks/           # Custom React hooks
│   └── App.jsx          # Root component & routing
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## 🗺️ Roadmap

- [x] AI tutor chat with syllabus grounding
- [x] PDF syllabus upload
- [x] Auto-generated quizzes
- [x] Human teacher directory & messaging
- [x] Progress dashboard with streaks
- [x] Dark / Light mode
- [ ] Multi-language support (Hindi, Tamil, Bengali, etc.)
- [ ] Offline mode for no-internet environments
- [ ] SMS-based interaction for feature phones
- [ ] Teacher analytics dashboard
- [ ] Parent / guardian view

---

## 👥 Team

Built with ❤️ for India's children by:

| Name | GitHub |
|------|--------|
| Archit Dhingra | [@Archit Dhingra](https://github.com/Archit-Dhingra) |
| Dhruv Gupta | [@Dhruv Gupta](https://github.com/dhruv-dev-coder) |
| Ankit Kumar | [@Ankit Kumar](https://github.com/ankitcodes18) |
| Deepak Aggarwal | [@Deepak Aggarwal](https://github.com/deepak1268) |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to help improve EduReach:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please open an issue first to discuss significant changes.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

*"Education is the most powerful weapon which you can use to change the world."*
— Nelson Mandela

**⭐ Star this repo if EduReach resonates with you.**

</div>
