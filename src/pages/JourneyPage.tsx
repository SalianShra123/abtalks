import React, { useState } from 'react';
import { ChallengeDay } from '../types';
import { generate60Days } from '../data/mockData';
import { usePageTransition } from '../context/TransitionContext';
import { ShareAchievementModal } from '../components/ShareAchievementModal';
import { CertificateModal } from '../components/CertificateModal';
import { TrackSelectorModal } from '../components/TrackSelectorModal';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  Github,
  Linkedin,
  ExternalLink,
  ArrowLeft,
  Share2,
  Download,
  Sparkles,
  ShieldCheck,
  Code2,
  Clock,
  Check,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JourneyPageProps {
  days?: ChallengeDay[];
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ days: propDays }) => {
  const { navigateWithTransition } = usePageTransition();
  const { user, startNewChallenge } = useAuth();

  const days = propDays || generate60Days(60, false);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(60);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Selected day object
  const activeDay = days.find((d) => d.day === selectedDayNumber) || days[59];

  return (
    <div className="w-full ethereal-bg min-h-screen pt-4 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-200/20 via-violet-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 relative z-10">
        {/* Nav back bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWithTransition('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#3b42c4] px-3.5 py-1.5 rounded-xl bg-white/90 border border-zinc-200/90 shadow-2xs transition-all duration-300 hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#3b42c4]" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              60 / 60 DAYS VERIFIED
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-md relative overflow-hidden space-y-4 kinetic-border-tracer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
                VISIBLE PROOF JOURNEY
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-2">
                60 DAYS OF BUILDING
              </h1>
              <p className="text-xs text-zinc-600 mt-1 font-medium">
                Every commit and social proof logged across your 60-day challenge.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShareModalOpen(true)}
                className="px-3.5 py-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-[#111111] text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-[#3b42c4]" />
                <span>SHARE</span>
              </button>

              <button
                onClick={() => setCertModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-[#3b42c4] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer hover:bg-indigo-100 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CERTIFICATE</span>
              </button>
            </div>
          </div>

          {/* 10 x 6 Matrix Grid of Days */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-zinc-500">
                10 × 6 MATRIX — SELECT A DAY TO INSPECT PROOF
              </span>
              <span className="text-xs font-mono font-bold text-[#3b42c4]">
                SELECTED: DAY {selectedDayNumber.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="grid grid-cols-10 gap-1.5 sm:gap-2.5 p-4 rounded-2xl bg-[#111111] border border-zinc-800 shadow-xl">
              {days.map((dayObj) => {
                const isSelected = dayObj.day === selectedDayNumber;

                return (
                  <motion.button
                    key={dayObj.day}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDayNumber(dayObj.day)}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-[9px] sm:text-xs font-mono font-black transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-amber-400 text-zinc-950 shadow-md ring-2 ring-white scale-105 z-10'
                        : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-2xs'
                    }`}
                  >
                    <span>{dayObj.day}</span>
                    <Check className="w-2 h-2 absolute top-0.5 right-0.5 stroke-[3] text-emerald-900 opacity-60" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ================= SELECTED DAY DETAIL INSPECTOR ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-md relative overflow-hidden space-y-6"
          >
            {/* Top Bar Accent */}
            <div className="h-1 bg-gradient-to-r from-[#3b42c4] via-indigo-500 to-amber-500 -mx-8 -mt-8 mb-6" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-[#3b42c4] bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200/80">
                    DAY {activeDay.day.toString().padStart(2, '0')} / 60
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Completed ✓
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {activeDay.category} • {activeDay.difficulty}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                  {activeDay.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
                <Clock className="w-3.5 h-3.5 text-[#3b42c4]" />
                <span>~{activeDay.estimatedMinutes} mins</span>
              </div>
            </div>

            {/* Mission & Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#3b42c4]">
                MISSION BRIEF
              </h3>
              <p className="text-sm font-bold text-[#111111] leading-relaxed">
                {activeDay.mission || activeDay.description}
              </p>
            </div>

            {/* Checklist items */}
            {activeDay.checklist && activeDay.checklist.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  VERIFIED CHECKLIST
                </h3>
                <div className="space-y-1.5">
                  {activeDay.checklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-zinc-800">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GitHub & LinkedIn Proof Links */}
            <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={activeDay.githubUrl || `https://github.com/shravyams/abtalks-day${activeDay.day}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-black text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>VIEW GITHUB REPO</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href={activeDay.linkedInUrl || `https://linkedin.com/posts/shravyams_abtalks-day${activeDay.day}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-indigo-50 text-[#3b42c4] border border-indigo-200 hover:bg-indigo-100 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-indigo-600" />
                  <span>VIEW LINKEDIN POST</span>
                  <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </div>

              <button
                onClick={() => setTrackModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>START NEW TRACK</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MODALS */}
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

      <TrackSelectorModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        onSelectTrack={(newTrack) => {
          startNewChallenge(newTrack);
          navigateWithTransition('/dashboard');
        }}
        currentTrack={user?.track}
      />
    </div>
  );
};
