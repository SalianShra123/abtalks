# ABTalks — 60-Day Coding Challenge

A premium, mobile-first redesign of **ABTalks**, a 60-day coding challenge platform for Indian college students.

ABTalks helps students build consistency, maintain a public learning streak, and create visible proof of their daily progress through GitHub commits and LinkedIn posts.

## ✨ Features

* Cinematic introduction experience
* Mobile-first landing page
* Student dashboard with streak and progress tracking
* Daily challenge experience
* GitHub and LinkedIn proof-of-work submission
* Achievement and milestone tracking
* Mock student data for realistic interactions
* Sign in and sign up UI
* Responsive design for mobile and desktop
* Thoughtful edge-case handling for missed days and empty profiles

## 🛠️ Tech Stack

* React
* TypeScript
* Vite
* CSS
* Mock JSON/data
* Gemini API

## 🚀 Run Locally

### Prerequisites

* Node.js
* npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit your actual API key to the repository.

### Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in your terminal.

## 📍 Route Map

```text
/
/dashboard
/day/12
```

## 📱 Design

The experience is designed **mobile-first around a 390px viewport**, with responsive support for larger screens.

## 📄 AI Usage

The project's AI-assisted development process is documented in [`PROMPTS.md`](./PROMPTS.md).

## 📦 Project Structure

```text
src/
├── components/
├── context/
├── data/
├── pages/
├── App.tsx
├── main.tsx
└── types.ts
```

## 📜 License

This project was created as a redesign submission for the ABTalks challenge.
