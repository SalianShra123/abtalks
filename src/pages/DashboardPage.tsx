import React, { useState } from 'react';
import { ChallengeDay, StudentProfile, ViewModeState, Achievement } from '../types';
import { StreakCard } from '../components/StreakCard';
import { TodayBuildCard } from '../components/TodayBuildCard';
import { DayJourneyGrid } from '../components/DayJourneyGrid';
import { ProofCard } from '../components/ProofCard';
import { AchievementCard } from '../components/AchievementCard';
import { TrackSelectorModal } from '../components/TrackSelectorModal';
import { ShareAchievementModal } from '../components/ShareAchievementModal';
import { CertificateModal } from '../components/CertificateModal';
import { Sparkles, UserPlus, ArrowRight, ShieldCheck, Award, RefreshCw, Share2, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { usePageTransition } from '../context/TransitionContext';
import { useAuth } from '../context/AuthContext';

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
  const { user, startNewChallenge } = useAuth();

  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const isCompleted = viewMode === 'completed' || user?.challengeCompleted;
  const isFirstDay = !isCompleted && viewMode === 'firstDay';
  const isMissedDay = !isCompleted && viewMode === 'missedDay';
  const isEmptyProfile = !isCompleted && viewMode === 'emptyProfile';

  const activeCurrentDay = isCompleted ? 60 : isFirstDay ? 1 : profile.currentDay;
  const activeStreak = isCompleted ? 60 : isFirstDay ? 0 : isMissedDay ? 11 : profile.streakDays;

  // Today's challenge payload based on active state
  const todayChallenge = days.find((d) => d.day === activeCurrentDay) || days[11];

  const completionPercentage = isCompleted
    ? 100
    : Math.round(((isFirstDay ? 0 : profile.totalCompleted) / 60) * 100);

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
  } as const;

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
  } as const;

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
          className="glass-card rounded-2xl p-5 sm:p-6 border border-zinc-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group kinetic-border-tracer"
        >
          {/* Subtle Top Accent Shimmer Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#3b42c4] via-indigo-400 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity" />

          {/* Greeting & Day */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs inline-flex items-center gap-1.5 ${
                isCompleted
                  ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  : 'text-[#3b42c4] bg-indigo-50/90 border-indigo-200/80'
              }`}>
                {isCompleted ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3 h-3 text-[#3b42c4] animate-pulse" />}
                <span>{isCompleted ? 'CHALLENGE COMPLETED ✓' : `Dashboard Day ${activeCurrentDay.toString().padStart(2, '0')}`}</span>
              </span>

              <span className="text-[10px] font-mono text-[#666666] font-semibold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                {isCompleted ? 'ARCHIVED PIPELINE' : 'ACTIVE PIPELINE'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight mt-2">
              {isEmptyProfile ? 'Good evening, Builder.' : `Good evening, ${user?.name || profile.name || 'Shravya'}.`}
            </h1>

            <p className="text-xs sm:text-sm text-[#666666] mt-1 font-medium leading-relaxed">
              {isCompleted
                ? '60 Days of visible proof complete! Check your journey or start your next track.'
                : isFirstDay
                ? "Welcome to Day 01! Let's build your first proof of work today."
                : isMissedDay
                ? 'Momentum can pause. Resume Day 12 to keep building.'
                : '12 consecutive days of building. Keep the momentum going.'}
            </p>

            {/* Post-Completion CTA Bar */}
            {isCompleted && (
              <div className="pt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => navigateWithTransition('/journey')}
                  className="px-3.5 py-2 rounded-xl bg-[#111111] hover:bg-[#3b42c4] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs group"
                >
                  <span>VIEW MY JOURNEY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-300 text-xs font-mono font-bold text-[#111111] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#3b42c4]" />
                  <span>SHARE</span>
                </button>

                <button
                  onClick={() => setCertModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-mono font-bold text-[#3b42c4] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CERTIFICATE</span>
                </button>

                <button
                  onClick={() => setTrackModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>START ANOTHER CHALLENGE</span>
                </button>
              </div>
            )}
          </div>

          {/* Progress Metric Ring Module ("60 / 60 Completed, 100%") */}
          <div className="flex items-center gap-3.5 bg-white/95 p-3 sm:p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs shrink-0 group/badge hover:border-indigo-200 transition-all">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-sm font-mono font-bold text-[#111111]">
                <span>{isCompleted ? 60 : isFirstDay ? 0 : profile.totalCompleted} / 60</span>
              </div>
              <span className="text-[10px] text-[#666666] uppercase font-mono tracking-wider font-extrabold block mt-0.5">Completed</span>
            </div>

            {/* Circular Dashboard Metric Ring Asset */}
            <div className="relative w-14 h-14 rounded-2xl bg-[#111111] text-white font-mono font-black text-xs flex items-center justify-center border border-zinc-800 shadow-md overflow-hidden group-hover/badge:scale-105 transition-transform shrink-0">
              <div className="progress-ring-shimmer-mask" />
              <svg className="absolute inset-0 w-full h-full p-1 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={isCompleted ? 'text-emerald-500' : 'text-[#3b42c4]'}
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
            isCompleted={isCompleted || todayChallenge.status === 'completed'}
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
            totalBuilds={isCompleted ? 60 : isFirstDay ? 1 : profile.totalCompleted}
            githubSubmissions={isCompleted ? 60 : isFirstDay ? 0 : profile.githubSubmissions}
            linkedInPosts={isCompleted ? 60 : isFirstDay ? 0 : profile.linkedInPosts}
          />
        </motion.div>

        {/* ================= ACHIEVEMENTS ================= */}
        <motion.div variants={itemVariants}>
          <AchievementCard achievements={achievements} />
        </motion.div>

      </motion.div>

      {/* MODALS */}
      <TrackSelectorModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        onSelectTrack={(newTrack) => {
          startNewChallenge(newTrack);
          navigateWithTransition('/dashboard');
        }}
        currentTrack={user?.track}
      />

      <ShareAchievementModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        studentName={user?.name || 'Shravya'}
        track={user?.track || 'Frontend Development'}
      />

      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        studentName={(user?.name || 'SHRAVYA').toUpperCase()}
        track={user?.track || 'Frontend Development'}
      />
    </div>
  );
};
