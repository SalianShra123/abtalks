import React from 'react';
import { ChallengeDay, StudentProfile, ViewModeState, Achievement } from '../types';
import { StreakCard } from '../components/StreakCard';
import { TodayBuildCard } from '../components/TodayBuildCard';
import { DayJourneyGrid } from '../components/DayJourneyGrid';
import { ProofCard } from '../components/ProofCard';
import { AchievementCard } from '../components/AchievementCard';
import { Sparkles, User, UserPlus, Flame, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { usePageTransition } from '../context/TransitionContext';

interface DashboardPageProps {
  profile: StudentProfile;
  days: ChallengeDay[];
  achievements: Achievement[];
  viewMode: ViewModeState;
  onSelectDay?: (dayNumber: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  days,
  achievements,
  viewMode,
  onSelectDay,
}) => {
  const { navigateWithTransition } = usePageTransition();

  const isFirstDay = viewMode === 'firstDay';
  const isMissedDay = viewMode === 'missedDay';
  const isEmptyProfile = viewMode === 'emptyProfile';

  const activeCurrentDay = isFirstDay ? 1 : profile.currentDay;
  const activeStreak = isFirstDay ? 0 : isMissedDay ? 11 : profile.streakDays;

  // Today's challenge payload based on active state
  const todayChallenge = days.find((d) => d.day === activeCurrentDay) || days[11];

  const completionPercentage = Math.round(((isFirstDay ? 0 : profile.totalCompleted) / 60) * 100);

  // Stagger container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="w-full ethereal-bg min-h-screen pt-4 pb-20 relative overflow-hidden">
      {/* Background Ambient Visual Glow Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-200/20 via-violet-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-[40%] -right-20 w-[400px] h-[400px] bg-gradient-to-b from-indigo-100/30 to-amber-100/20 blur-3xl pointer-events-none rounded-full" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 relative z-10"
      >
        {/* ================= DASHBOARD HEADER ================= */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-2xl p-5 sm:p-6 border border-zinc-200/90 shadow-sm hover:shadow-md hover:border-indigo-200/80 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group kinetic-border-tracer"
        >
          {/* Subtle Top Accent Shimmer Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#3b42c4] via-indigo-400 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity" />

          {/* Greeting & Day */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50/90 px-3 py-1 rounded-full border border-indigo-200/80 shadow-2xs inline-flex items-center gap-1.5 tag-interactive-indigo">
                <Sparkles className="w-3 h-3 text-[#3b42c4] animate-pulse" />
                <span>Dashboard Day {activeCurrentDay.toString().padStart(2, '0')}</span>
              </span>
              <span className="text-[10px] font-mono text-[#666666] font-semibold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                ACTIVE PIPELINE
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight mt-2">
              {isEmptyProfile ? 'Good evening, Builder.' : `Good evening, ${profile.name || 'Shravya'}.`}
            </h1>

            <p className="text-xs sm:text-sm text-[#666666] mt-1 font-medium leading-relaxed">
              {isFirstDay
                ? "Welcome to Day 01! Let's build your first proof of work today."
                : isMissedDay
                ? 'Momentum can pause. Resume Day 12 to keep building.'
                : '12 consecutive days of building. Keep the momentum going.'}
            </p>
          </div>

          {/* Progress Metric Ring Module ("11 / 60 Completed, 18%") */}
          <div className="flex items-center gap-3.5 bg-white/95 p-3 sm:p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs shrink-0 group/badge hover:border-indigo-200 transition-all tag-interactive-indigo">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-sm font-mono font-bold text-[#111111]">
                <span>{isFirstDay ? 0 : profile.totalCompleted} / 60</span>
              </div>
              <span className="text-[10px] text-[#666666] uppercase font-mono tracking-wider font-extrabold block mt-0.5">Completed</span>
            </div>

            {/* Circular Dashboard Metric Ring Asset with Clockwise Radial Shimmer */}
            <div className="relative w-14 h-14 rounded-2xl bg-[#111111] text-white font-mono font-black text-xs flex items-center justify-center border border-zinc-800 shadow-md overflow-hidden group-hover/badge:scale-105 transition-transform shrink-0">
              <div className="progress-ring-shimmer-mask" />
              {/* Circular SVG Ring track */}
              <svg className="absolute inset-0 w-full h-full p-1 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#3b42c4]"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="relative z-10 text-[11px] font-bold text-white drop-shadow-sm">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* ================= EMPTY PROFILE EDGE CASE BANNER ================= */}
        {isEmptyProfile && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-5 border border-indigo-200 bg-gradient-to-r from-indigo-50/90 via-white to-indigo-50/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-md shadow-indigo-600/20">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded">
                  YOUR BUILDER PROFILE
                </span>
                <h3 className="text-base font-bold text-zinc-900 mt-1">Your work should tell your story.</h3>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Complete your profile details to make your 60-day journey recognizable to recruiters.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateWithTransition('/day/12')}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-indigo-600 border border-transparent hover:border-indigo-400 text-white text-xs font-semibold shadow-sm hover:shadow-indigo-500/25 transition-all duration-300 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Complete Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* ================= STREAK COMPONENT ================= */}
        <motion.div variants={itemVariants}>
          <StreakCard
            streakDays={activeStreak}
            isFirstDay={isFirstDay}
            isMissedDay={isMissedDay}
          />
        </motion.div>

        {/* ================= TODAY'S BUILD ================= */}
        <motion.div variants={itemVariants}>
          <TodayBuildCard
            challenge={todayChallenge}
            isCompleted={todayChallenge.status === 'completed'}
          />
        </motion.div>

        {/* Section Divider */}
        <motion.div variants={itemVariants} className="section-divider py-2">
          <div className="section-divider-line" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-white/80 px-3 py-1 rounded-full border border-zinc-200/80 shadow-2xs">
            60-DAY PROGRESS MATRIX
          </span>
          <div className="section-divider-line" />
        </motion.div>

        {/* ================= 60-DAY JOURNEY DASHBOARD GRID ================= */}
        <motion.div variants={itemVariants}>
          <DayJourneyGrid
            days={days}
            currentDay={activeCurrentDay}
            compact={false}
            onSelectDay={onSelectDay}
          />
        </motion.div>

        {/* Section Divider */}
        <motion.div variants={itemVariants} className="section-divider py-2">
          <div className="section-divider-line" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-white/80 px-3 py-1 rounded-full border border-zinc-200/80 shadow-2xs">
            PROOF RECORD & ACHIEVEMENTS
          </span>
          <div className="section-divider-line" />
        </motion.div>

        {/* ================= PROOF OF WORK DASHBOARD ================= */}
        <motion.div variants={itemVariants}>
          <ProofCard
            totalBuilds={isFirstDay ? 1 : profile.totalCompleted}
            githubSubmissions={isFirstDay ? 0 : profile.githubSubmissions}
            linkedInPosts={isFirstDay ? 0 : profile.linkedInPosts}
          />
        </motion.div>

        {/* ================= ACHIEVEMENTS ================= */}
        <motion.div variants={itemVariants}>
          <AchievementCard achievements={achievements} />
        </motion.div>

      </motion.div>
    </div>
  );
};
