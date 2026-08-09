import React, { useState } from 'react';
import { useParams, useNavigate } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePageTransition } from '../context/TransitionContext';
import { ShareAchievementModal } from '../components/ShareAchievementModal';
import { CertificateModal } from '../components/CertificateModal';
import { TrackSelectorModal } from '../components/TrackSelectorModal';
import {
  Github,
  Linkedin,
  ShieldCheck,
  Award,
  ArrowRight,
  Share2,
  Download,
  Flame,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProfilePage: React.FC = () => {
  const { user, complete60DayChallenge, startNewChallenge } = useAuth();
  const { navigateWithTransition } = usePageTransition();

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Profile data fallback
  const profileName = user?.name || 'Shravya';
  const profileTrack = user?.track || 'Frontend Development';
  const isCompleted = user?.challengeCompleted ?? true; // defaults to true for proof profile
  const totalDays = 60;
  const completedDays = isCompleted ? 60 : user?.completedDays || 60;
  const totalBuilds = isCompleted ? 60 : user?.totalBuilds || 60;
  const totalProofs = isCompleted ? 60 : user?.totalProofs || 60;
  const longestStreak = isCompleted ? 32 : user?.longestStreak || 32;
  const githubHandle = user?.githubHandle || 'shravyams';
  const linkedinHandle = user?.linkedinHandle || 'shravyamsalian';
  const completedJourneys = user?.completedJourneys || [
    {
      id: 'j_1',
      track: 'Frontend Development',
      completedAt: 'Jan 2026',
      totalDays: 60,
      totalBuilds: 60,
      totalProofs: 60,
      longestStreak: 32,
      githubHandle: 'shravyams',
      linkedinHandle: 'shravyamsalian',
    },
  ];

  return (
    <div className="w-full ethereal-bg min-h-screen pt-6 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-200/20 via-violet-200/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 relative z-10">
        {/* ================= HERO PORTFOLIO HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-lg relative overflow-hidden space-y-6 kinetic-border-tracer"
        >
          {/* Top Bar Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3b42c4] via-indigo-500 to-amber-500" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={profileName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-indigo-500/20"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#111111] text-white font-mono font-black text-2xl flex items-center justify-center border-2 border-white shadow-md">
                  {profileName.charAt(0)}
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                    {profileName}
                  </h1>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    VERIFIED BUILDER
                  </span>
                </div>

                <p className="text-sm font-mono font-semibold text-[#3b42c4]">{profileTrack}</p>

                <p className="text-xs text-zinc-500 font-medium">
                  {user?.college || 'Nitte Meenakshi Institute of Technology'}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`https://github.com/${githubHandle}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white border border-zinc-200/90 hover:border-zinc-300 text-xs font-mono font-bold text-[#111111] flex items-center gap-2 shadow-2xs hover:bg-zinc-50 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4 text-zinc-900" />
                <span>GITHUB</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href={`https://linkedin.com/in/${linkedinHandle}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white border border-zinc-200/90 hover:border-zinc-300 text-xs font-mono font-bold text-[#3b42c4] flex items-center gap-2 shadow-2xs hover:bg-indigo-50/60 transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-indigo-600" />
                <span>LINKEDIN</span>
                <ExternalLink className="w-3 h-3 text-indigo-400" />
              </a>
            </div>
          </div>

          {/* Banner Status */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-[#111111] to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  60-DAY CHALLENGE
                </div>
                <div className="text-sm font-bold text-white">
                  60 Days of Continuous Building & Social Proof
                </div>
              </div>
            </div>

            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1.5 self-end sm:self-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>✓ COMPLETED</span>
            </div>
          </div>

          {/* Four Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs text-center">
              <div className="text-2xl font-black font-mono text-[#111111]">
                {completedDays} / {totalDays}
              </div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 mt-1">Days Completed</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs text-center">
              <div className="text-2xl font-black font-mono text-[#111111]">{totalBuilds}</div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 mt-1">GitHub Repos</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs text-center">
              <div className="text-2xl font-black font-mono text-[#111111]">{totalProofs}</div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 mt-1">Social Proofs</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs text-center">
              <div className="text-2xl font-black font-mono text-amber-600 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>{longestStreak}d</span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 mt-1">Longest Streak</div>
            </div>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateWithTransition('/journey')}
                className="px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#3b42c4] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md group"
              >
                <span>VIEW MY JOURNEY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShareModalOpen(true)}
                className="px-4 py-3 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-[#111111] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <Share2 className="w-4 h-4 text-[#3b42c4]" />
                <span>SHARE MY ACHIEVEMENT</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCertModalOpen(true)}
                className="px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-[#3b42c4] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#3b42c4]" />
                <span>DOWNLOAD CERTIFICATE</span>
              </button>

              <button
                onClick={() => setTrackModalOpen(true)}
                className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>START ANOTHER CHALLENGE</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= MY JOURNEYS SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#3b42c4]" />
              <h2 className="text-lg font-black text-[#111111] tracking-tight">MY JOURNEYS</h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {completedJourneys.length} Completed Challenge{completedJourneys.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completedJourneys.map((j) => (
              <motion.div
                key={j.id}
                whileHover={{ y: -3, scale: 1.01 }}
                className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#3b42c4] bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200/80">
                    60 / 60 ✓
                  </span>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Completed
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111111] group-hover:text-[#3b42c4] transition-colors">
                    {j.track}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1 font-mono">
                    <span>60 Builds</span>
                    <span>•</span>
                    <span>60 Proofs</span>
                    <span>•</span>
                    <span>{j.completedAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateWithTransition('/journey')}
                  className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-[#3b42c4] hover:text-white text-zinc-800 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group/btn"
                >
                  <span>VIEW JOURNEY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MODALS */}
      <ShareAchievementModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        studentName={profileName}
        track={profileTrack}
      />

      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        studentName={profileName.toUpperCase()}
        track={profileTrack}
      />

      <TrackSelectorModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        onSelectTrack={(newTrack) => {
          startNewChallenge(newTrack);
          navigateWithTransition('/dashboard');
        }}
        currentTrack={profileTrack}
      />
    </div>
  );
};
