import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { TransitionProvider } from './context/TransitionContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CinematicIntroExperience } from './components/CinematicIntroExperience';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChallengeDayPage } from './pages/ChallengeDayPage';
import { ProfilePage } from './pages/ProfilePage';
import { JourneyPage } from './pages/JourneyPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { initialProfile, emptyProfile, achievementsData, generate60Days } from './data/mockData';
import { ViewModeState, ChallengeDay, StudentProfile, Achievement } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewModeState>('normal');
  const [days, setDays] = useState<ChallengeDay[]>(() => generate60Days(12, false));
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [achievements, setAchievements] = useState<Achievement[]>(achievementsData);

  // Full-screen cinematic film intro state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    const hasSeen = sessionStorage.getItem('hasSeenIntro');
    return !hasSeen;
  });

  const handleReplayIntro = () => {
    sessionStorage.removeItem('hasSeenIntro');
    setShowIntro(true);
  };

  const handleCompleteIntro = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  // When viewMode preset changes, adapt days data accordingly
  const handleSetViewMode = (newMode: ViewModeState) => {
    setViewMode(newMode);
    if (newMode === 'firstDay') {
      setDays(generate60Days(1, false));
    } else if (newMode === 'missedDay') {
      setDays(generate60Days(12, true));
    } else if (newMode === 'emptyProfile') {
      setDays(generate60Days(12, false));
    } else {
      setDays(generate60Days(12, false));
    }
  };

  const handleCompleteDay = (dayNumber: number, githubUrl: string, linkedInUrl: string) => {
    setDays((prevDays) =>
      prevDays.map((d) => {
        if (d.day === dayNumber) {
          return {
            ...d,
            status: 'completed',
            githubUrl,
            linkedInUrl,
            completedAt: new Date().toISOString(),
          };
        }
        return d;
      })
    );

    setProfile((prev) => ({
      ...prev,
      totalCompleted: Math.max(prev.totalCompleted, dayNumber),
      githubSubmissions: prev.githubSubmissions + 1,
      linkedInPosts: prev.linkedInPosts + 1,
    }));
  };

  const activeProfile = viewMode === 'emptyProfile' ? emptyProfile : profile;

  return (
    <BrowserRouter>
      <AuthProvider>
        <TransitionProvider>
          <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-zinc-900 selection:bg-indigo-500 selection:text-white">
            {/* Full-Screen Cinematic Film Intro Experience */}
            <AnimatePresence>
              {showIntro && (
                <CinematicIntroExperience onComplete={handleCompleteIntro} />
              )}
            </AnimatePresence>

            <Navbar
              viewMode={viewMode}
              setViewMode={handleSetViewMode}
              streakDays={viewMode === 'firstDay' ? 0 : viewMode === 'missedDay' ? 11 : profile.streakDays}
              currentDay={viewMode === 'firstDay' ? 1 : profile.currentDay}
              onReplayIntro={handleReplayIntro}
            />

            <main className="flex-grow">
              <Routes>
                {/* Route 1: / */}
                <Route
                  path="/"
                  element={
                    <LandingPage
                      days={days}
                      profile={activeProfile}
                      onReplayIntro={handleReplayIntro}
                    />
                  }
                />

                {/* Route 2: /signin */}
                <Route path="/signin" element={<SignInPage />} />

                {/* Route 3: /signup */}
                <Route path="/signup" element={<SignUpPage />} />

                {/* Route 4: /dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <DashboardPage
                      profile={activeProfile}
                      days={days}
                      achievements={achievements}
                      viewMode={viewMode}
                    />
                  }
                />

                {/* Route 5: /profile/shravya and /profile/:username */}
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/profile" element={<Navigate to="/profile/shravya" replace />} />

                {/* Route 6: /journey */}
                <Route path="/journey" element={<JourneyPage days={days} />} />

                {/* Route 7: /day/12 and dynamic /day/:dayId */}
                <Route
                  path="/day/:dayId"
                  element={
                    <ChallengeDayPage
                      days={days}
                      onCompleteDay={handleCompleteDay}
                    />
                  }
                />

                <Route
                  path="/day"
                  element={<Navigate to="/day/12" replace />}
                />

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </TransitionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
