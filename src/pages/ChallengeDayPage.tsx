import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeDay } from '../types';
import { ChallengeChecklist } from '../components/ChallengeChecklist';
import { ProofInput } from '../components/ProofInput';
import { SubmissionSummary } from '../components/SubmissionSummary';
import { SuccessStateModal } from '../components/SuccessStateModal';
import { CompletionCinematicAnimation } from '../components/CompletionCinematicAnimation';
import { ShareAchievementModal } from '../components/ShareAchievementModal';
import { CertificateModal } from '../components/CertificateModal';
import { TrackSelectorModal } from '../components/TrackSelectorModal';
import { usePageTransition } from '../context/TransitionContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Clock,
  Code2,
  Server,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ChallengeDayPageProps {
  days: ChallengeDay[];
  onCompleteDay?: (dayNumber: number, githubUrl: string, linkedInUrl: string) => void;
}

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
} as const;

export const ChallengeDayPage: React.FC<ChallengeDayPageProps> = ({
  days,
  onCompleteDay,
}) => {
  const { dayId } = useParams<{ dayId: string }>();
  const { navigateWithTransition } = usePageTransition();
  const { user, complete60DayChallenge, startNewChallenge } = useAuth();

  const currentDayNumber = dayId ? parseInt(dayId, 10) : 12;
  const isDay60 = currentDayNumber === 60;

  // Day payload
  const day60Fallback: ChallengeDay = {
    day: 60,
    title: 'Build & Deploy Full Stack Final Showcase',
    category: 'Fullstack',
    difficulty: 'Advanced',
    estimatedMinutes: 90,
    description: 'Final culmination of your 60-day journey! Deploy a production-ready application with full CI/CD pipeline, database integration, and public proof.',
    mission: 'Deploy your complete capstone product live, push final clean production commit to GitHub, and document your 60-day proof milestone on LinkedIn.',
    practiceTopics: [
      { title: 'Production Architecture', description: 'Containerization, environment configuration & automated Cloud Run build pipeline', icon: 'Server' },
      { title: 'End-to-End Verification', description: 'Full system health verification, database index optimization & error telemetry', icon: 'ShieldCheck' },
      { title: 'Public Portfolio Showcase', description: 'Crafting recruiter-ready repository README and final 60-day reflection post', icon: 'Code2' },
    ],
    checklist: [
      'Final production application deployed and operational',
      'GitHub repository updated with comprehensive architecture documentation',
      'Full suite of API endpoints and UI integration tested end-to-end',
      'Final Day 60 proof update published to LinkedIn with live link',
      'All 60 days of visible proof verified and completed',
    ],
    status: 'current',
    githubUrl: 'https://github.com/shravyams/abtalks-day60-final-showcase',
    linkedInUrl: 'https://linkedin.com/posts/shravyams_abtalks-day60-complete',
  };

  const challenge = isDay60 ? day60Fallback : (days.find((d) => d.day === currentDayNumber) || days[11]);

  // Checklist interactive state
  const [checkedIndices, setCheckedIndices] = useState<number[]>([0, 1, 2, 3, 4]);

  // Proof input states
  const [githubUrl, setGithubUrl] = useState<string>(
    challenge.githubUrl || (isDay60 ? 'https://github.com/shravyams/abtalks-day60-final-showcase' : 'https://github.com/shravyams/abtalks-day12-rest-auth')
  );
  const [linkedInUrl, setLinkedInUrl] = useState<string>(
    challenge.linkedInUrl || (isDay60 ? 'https://linkedin.com/posts/shravyams_abtalks-day60-complete' : 'https://linkedin.com/posts/shravyams_abtalks-day12-restapi')
  );

  // Validation
  const isGithubValid = githubUrl.trim().length > 10 && githubUrl.includes('github.com');
  const isLinkedInValid = linkedInUrl.trim().length > 10 && linkedInUrl.includes('linkedin.com');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDay60Animation, setShowDay60Animation] = useState<boolean>(isDay60 && (user?.challengeCompleted || false));

  // Modal states for Day 60
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  const handleToggleChecklist = (index: number) => {
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmitProof = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onCompleteDay) {
        onCompleteDay(challenge.day, githubUrl, linkedInUrl);
      }

      if (isDay60) {
        complete60DayChallenge();
        setShowDay60Animation(true);
      } else {
        setShowSuccessModal(true);
      }
    }, 1000);
  };

  const checklistProgressPercent = Math.round(
    (checkedIndices.length / (challenge.checklist.length || 1)) * 100
  );

  return (
    <div className="w-full ethereal-bg min-h-screen pt-4 pb-24 relative overflow-hidden">
      {/* Dynamic Ambient Background Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 relative z-10"
      >
        {/* ================= TOP HEADER NAV ================= */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <button
            onClick={() => navigateWithTransition('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#3b42c4] px-3.5 py-1.5 rounded-xl bg-white/90 border border-zinc-200/90 shadow-2xs transition-all duration-300 hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#3b42c4]" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#3b42c4] font-extrabold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/80 flex items-center gap-1">
              {isDay60 && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
              DAY {challenge.day.toString().padStart(2, '0')} / 60
            </span>
            <div className="w-24 h-2 bg-zinc-200/80 rounded-full overflow-hidden p-0.5 border border-zinc-300/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(challenge.day / 60) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#3b42c4] to-emerald-500 rounded-full shadow-2xs"
              />
            </div>
          </div>
        </motion.div>

        {/* If Day 60 is triggered/completed, show the Cinematic Completion Experience */}
        {isDay60 && showDay60Animation ? (
          <CompletionCinematicAnimation
            studentName={user?.name || 'Shravya'}
            track={user?.track || 'Frontend Development'}
            onOpenShare={() => setShareModalOpen(true)}
            onOpenCertificate={() => setCertModalOpen(true)}
            onStartAnother={() => setTrackModalOpen(true)}
            onViewJourney={() => navigateWithTransition('/journey')}
          />
        ) : (
          <>
            {/* ================= CHALLENGE HEADER ================= */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-zinc-200/90 shadow-md kinetic-border-tracer relative overflow-hidden group"
            >
              {/* Top Holographic Shimmer Line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#3b42c4] via-indigo-400 to-amber-500 opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/80 shadow-2xs inline-flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#3b42c4] animate-pulse" />
                    {isDay60 ? "FINAL DAY 60 BUILD" : "TODAY'S BUILD"}
                  </span>
                  <span className="text-xs font-mono text-[#666666] font-semibold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                    {challenge.category} • {challenge.difficulty}
                  </span>
                </div>

                {/* Live Progress Radar Meter Badge */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#111111] bg-white/90 px-2.5 py-1 rounded-full border border-zinc-200/90 shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{checklistProgressPercent}% Verified</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                {challenge.title}
              </h1>

              <div className="flex items-center gap-4 mt-3 text-xs text-[#666666] font-medium">
                <div className="flex items-center gap-1.5 font-semibold text-[#111111]">
                  <Clock className="w-3.5 h-3.5 text-[#3b42c4]" />
                  <span>~{challenge.estimatedMinutes} minutes</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#111111]">
                  <Code2 className="w-3.5 h-3.5 text-[#3b42c4]" />
                  <span>GitHub + LinkedIn Proof</span>
                </div>
              </div>
            </motion.div>

            {/* ================= THE MISSION ================= */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-sm kinetic-border-tracer relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#3b42c4] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3b42c4]" />
                  THE MISSION BRIEF
                </h2>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {isDay60 ? 'FINAL MISSION' : 'MISSION ACTIVE'}
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-[#111111] leading-relaxed">
                {challenge.mission}
              </p>
            </motion.div>

            {/* ================= WHAT YOU WILL PRACTICE ================= */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-sm kinetic-border-tracer"
            >
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#666666] mb-3 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-[#3b42c4]" />
                WHAT YOU WILL PRACTICE
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenge.practiceTopics.map((topic, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-xl bg-white/90 border border-zinc-200/90 shadow-2xs flex items-start gap-3 cursor-default group/topic"
                  >
                    <div className="p-2 rounded-lg bg-indigo-50 text-[#3b42c4] shrink-0 border border-indigo-100 group-hover/topic:bg-[#3b42c4] group-hover/topic:text-white transition-colors duration-300">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#111111] group-hover/topic:text-[#3b42c4] transition-colors">
                        {topic.title}
                      </div>
                      <div className="text-[11px] text-[#666666] mt-0.5 leading-normal font-medium">
                        {topic.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ================= COMPLETION CHECKLIST ================= */}
            <motion.div variants={itemVariants}>
              <ChallengeChecklist
                items={challenge.checklist}
                checkedIndices={checkedIndices}
                onToggle={handleToggleChecklist}
              />
            </motion.div>

            {/* ================= PROOF SUBMISSION INPUTS ================= */}
            <motion.div variants={itemVariants}>
              <ProofInput
                githubUrl={githubUrl}
                linkedInUrl={linkedInUrl}
                onGithubChange={setGithubUrl}
                onLinkedInChange={setLinkedInUrl}
                isGithubValid={isGithubValid}
                isLinkedInValid={isLinkedInValid}
              />
            </motion.div>

            {/* ================= SUBMISSION SUMMARY & CTA ================= */}
            <motion.div variants={itemVariants}>
              <SubmissionSummary
                dayNumber={challenge.day}
                isGithubValid={isGithubValid}
                isLinkedInValid={isLinkedInValid}
                isChecklistComplete={checkedIndices.length === challenge.checklist.length}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmitProof}
              />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* MODALS */}
      <SuccessStateModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        dayNumber={challenge.day}
        streakDays={12}
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

