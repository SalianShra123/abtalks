# ABTalks — 60-Day Visible Proof Platform

ABTalks is a **Visible Proof Platform** designed to help students and developers build coding consistency and turn daily learning into **verifiable proof of work**.

Instead of relying only on unverified resume claims, ABTalks guides builders through a structured **60-Day Coding Challenge** where every day requires completing a real build, committing the work to GitHub, and sharing a proof update on LinkedIn.

The platform transforms daily effort into a structured, public, and recruiter-ready record of progress.

---

## ✨ Key Features

### 🎯 Interactive Daily Challenges

Each day of the 60-Day Challenge provides a dedicated workspace with:

* Mission brief and daily build requirements
* Practice topics and key concepts
* Estimated completion time
* Interactive verification checklist
* GitHub repository proof submission
* LinkedIn proof submission
* URL validation for submitted proofs
* Day-by-day completion tracking

**Route:** `/day/:dayId`

---

### 📊 Personal Dashboard

The dashboard gives builders a clear overview of their current journey and consistency.

* Current streak tracking
* Total completed days
* Overall completion percentage
* Visual progress indicators
* Today's build prompt
* GitHub and LinkedIn proof statistics
* Current challenge/track status
* Journey progress

The dashboard also includes UX state presets for testing different user journeys:

* First Day
* Active Streak
* Missed Day
* Empty Profile
* 60-Day Completed

**Route:** `/dashboard`

---

### 🏆 60-Day Completion Experience

Day 60 provides a dedicated cinematic completion experience instead of simply showing a completed status.

When the final day is verified:

1. The **10 × 6 matrix of 60 daily dots** illuminates.
2. The completed days visually converge.
3. The matrix transforms into a single verified completion capsule.
4. The user receives the milestone message:

> **YOU SHOWED UP.**

The experience represents the transition from *trying to become consistent* to having **60 days of visible proof**.

**Route:** `/day/60`

---

### 👤 Public Proof Profile

Every builder can have a public, recruiter-ready proof profile.

The profile showcases:

* 60 Builds
* 60 Proofs
* 60 Days
* Longest Streak
* Verified status badges
* GitHub profile link
* LinkedIn profile link
* Completed journeys
* Daily proof history

Instead of simply listing skills, the profile provides evidence of consistent execution.

**Example route:** `/profile/shravya`

---

### 🗓️ Interactive 60-Day Journey

The Journey page provides a complete visual representation of the builder's 60-day challenge.

The **10 × 6 interactive day matrix** allows recruiters, peers, or the builder to select any completed day and inspect:

* Day number
* Mission brief
* Build information
* GitHub repository
* LinkedIn proof
* Completion status

This turns the entire challenge into an interactive timeline of visible work.

**Route:** `/journey`

---

### 🎓 Shareable Achievements & Certificates

After completing a 60-day track, builders can showcase their achievement through shareable proof.

#### Achievement Share Modal

Provides:

* Achievement preview
* Copyable profile link
* Shareable completion information
* LinkedIn sharing option

#### Verified Certificate

The certificate experience documents:

* Completed track
* 60-day completion
* Verified proof hash
* Completion date
* Builder identity

---

### 🚀 Continuous Mastery Tracks

ABTalks is designed to continue beyond the first 60 days.

After completing a challenge, builders can start another 60-day track in a different discipline.

Available tracks include:

* Frontend
* Backend
* Full Stack
* AI/ML
* Data Science
* Mobile
* Cloud & DevOps

This allows builders to create multiple completed journeys and continuously expand their visible proof of work.

---

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **CSS**
* **React Router**
* **Framer Motion**
* **Lucide Icons**
* **Mock data / local state**
* **Gemini API**

The current implementation primarily uses mock/local data to demonstrate the complete product experience and interaction flows.

---

## 🚀 Run Locally

### Prerequisites

* Node.js
* npm

### Installation

```bash
git clone <repository-url>
cd abtalks
npm install
```

### Environment Variables

If Gemini API functionality is enabled, create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit your actual API key to the repository.

### Start the Development Server

```bash
npm run dev
```

The application will be available at the local development URL displayed in your terminal.

---

## 📍 Route Map

```text
/
├── /dashboard
├── /day/:dayId
├── /day/60
├── /journey
├── /profile/:username
├── /signin
└── /signup
```

---

## 📱 Design Philosophy

ABTalks is designed **mobile-first around a 390px viewport**, while remaining responsive across larger mobile, tablet, and desktop screens.

The interface focuses on:

* Clear visual hierarchy
* Minimal friction
* Progress visibility
* Strong feedback for completed actions
* Cinematic milestone moments
* Recruiter-friendly proof presentation
* Responsive interaction patterns

The goal is to make daily coding progress feel tangible rather than treating it as another checklist.

---

## 🧠 Product Philosophy

ABTalks is built around a simple idea:

> **Consistency is valuable when it becomes visible proof.**

Instead of asking students to simply say that they code every day, ABTalks creates a structured system where their progress can be demonstrated through:

**Build → Commit → Share → Verify → Track**

Over 60 days, these individual actions become a visible body of work.

---

## 📂 Project Structure

```text
src/
├── main.tsx
├── App.tsx
├── index.css
├── types.ts
│
├── context/
│   ├── AuthContext.tsx
│   └── TransitionContext.tsx
│
├── data/
│   └── mockData.ts
│
├── pages/
│   ├── LandingPage.tsx
│   ├── DashboardPage.tsx
│   ├── ChallengeDayPage.tsx
│   ├── ProfilePage.tsx
│   ├── JourneyPage.tsx
│   ├── SignInPage.tsx
│   └── SignUpPage.tsx
│
└── components/
    ├── Navbar.tsx
    ├── Footer.tsx
    ├── StreakCard.tsx
    ├── TodayBuildCard.tsx
    ├── ProofCard.tsx
    ├── ProofInput.tsx
    ├── DayJourneyGrid.tsx
    ├── TrackSelectorModal.tsx
    ├── CertificateModal.tsx
    ├── ShareAchievementModal.tsx
    ├── CinematicIntroExperience.tsx
    └── CompletionCinematicAnimation.tsx
```

---

## 🤖 AI Usage

The project's AI-assisted development process is documented in:

[`PROMPTS.md`](./PROMPTS.md)

The document contains the prompts and AI-assisted development workflow used during the creation and refinement of ABTalks.

---

## 📦 Submission

ABTalks was developed as a redesign and product implementation for the ABTalks challenge.

The project focuses on transforming daily coding activity into a structured system of **visible, verifiable, and shareable proof of work**.

---

## 📜 License

This project was created as a redesign submission for the ABTalks challenge.
