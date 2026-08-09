import React, { useState } from 'react';
import { usePageTransition } from '../context/TransitionContext';
import { useAuth } from '../context/AuthContext';
import { SignatureMorphingTracker } from '../components/SignatureMorphingTracker';
import { MethodologyTimelineSection } from '../components/MethodologyTimelineSection';
import { ProofOfWorkShowcase } from '../components/ProofOfWorkShowcase';
import { StudentTransformationTimeline } from '../components/StudentTransformationTimeline';
import { ChallengeDay, StudentProfile } from '../types';
import {
  ArrowRight,
  GitCommit,
  Linkedin,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Sparkles,
  Zap,
  Code,
  Terminal,
  Trophy,
  Layers,
  ChevronRight,
  Film,
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  days: ChallengeDay[];
  profile: StudentProfile;
  onReplayIntro?: () => void;
}

// Pre-calculate word and letter indices for exact letter-by-letter stagger reveal
const HERO_TEXT = "60 DAYS OF BUILDING.";
const HERO_WORDS = HERO_TEXT.split(" ");

const HERO_WORD_DATA = (() => {
  let charCounter = 0;
  return HERO_WORDS.map((word) => ({
    word,
    letters: word.split("").map((char) => ({
      char,
      index: charCounter++,
    })),
  }));
})();

export const LandingPage: React.FC<LandingPageProps> = ({ days, profile, onReplayIntro }) => {
  const { navigateWithTransition } = usePageTransition();
  const { isAuthenticated } = useAuth();
  const [animCycle, setAnimCycle] = useState(0);

  // Seamless letter-by-letter loop without fade-out or long blank delay
  React.useEffect(() => {
    // 20 chars * 50ms stagger = 1000ms + 200ms duration + 600ms hold = 1800ms total cycle
    const interval = setInterval(() => {
      setAnimCycle((prev) => prev + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const handleStartChallenge = () => {
    if (isAuthenticated) {
      navigateWithTransition('/dashboard');
    } else {
      navigateWithTransition('/signup');
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen pt-4 pb-20 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ================= HERO SECTION ================= */}
        <section className="pt-6 sm:pt-12 pb-10 sm:pb-14 text-center flex flex-col items-center">
          
          {/* Eyebrow Label & Replay Intro Button */}
          <div className="flex items-center gap-2.5 mb-4 flex-wrap justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: [0, -3, 0], scale: [1, 1.02, 1] }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.5 },
              }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[#3b42c4] text-xs font-mono font-bold uppercase tracking-wider shadow-2xs cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3b42c4] animate-spin-slow" />
              <span>60-DAY CODING CHALLENGE</span>
            </motion.div>

            {/* Replay Film Control */}
            {onReplayIntro && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-zinc-100 text-[#111111] border border-zinc-200 text-xs font-mono font-semibold transition-all shadow-2xs cursor-pointer"
                title="Replay Cinematic Brand Film"
              >
                <Film className="w-3.5 h-3.5 text-[#3b42c4]" />
                <span>Replay Intro</span>
              </motion.button>
            )}
          </div>

          {/* Main Heading — Continuous Letter-by-Letter Reveal without Fade Out */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.2] max-w-2xl text-center flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 select-none">
            {HERO_WORD_DATA.map((wordData, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {wordData.letters.map((letter) => (
                  <motion.span
                    key={`${animCycle}-${letter.index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: letter.index * 0.055, // 55ms sequential stagger
                      ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier
                    }}
                    className="inline-block"
                  >
                    {letter.char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Supporting Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.50, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-zinc-600 mt-4 max-w-xl leading-relaxed"
          >
            Build something every day, publish your proof, and turn consistency into visible evidence of your skills.
          </motion.p>

          {/* Primary & Secondary CTA Buttons with Continuous Micro-motion */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.70, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-7 w-full sm:w-auto"
          >
            <motion.button
              onClick={handleStartChallenge}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-indigo-600 text-white hover:border-indigo-400 border border-transparent font-semibold text-sm shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
            >
              <span className="relative z-10">Start the 60-Day Challenge</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block relative z-10"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>

            <motion.button
              onClick={scrollToHowItWorks}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-zinc-800 font-semibold text-sm border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>See how it works</span>
            </motion.button>
          </motion.div>

          {/* Supporting Micro-Information Bar with Continuous Icon Animations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-zinc-200/60 w-full flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-600"
          >
            <motion.div
              whileHover={{ y: -1, scale: 1.04 }}
              className="flex items-center gap-1.5 cursor-default group"
            >
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <GitCommit className="w-4 h-4 text-zinc-800" />
              </motion.span>
              <span className="group-hover:text-zinc-900 transition-colors">GitHub + LinkedIn proof</span>
            </motion.div>
            <span className="text-zinc-300">•</span>
            <motion.div
              whileHover={{ y: -1, scale: 1.04 }}
              className="flex items-center gap-1.5 cursor-default group"
            >
              <motion.span
                animate={{ scale: [1, 1.22, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <Zap className="w-4 h-4 text-indigo-600" />
              </motion.span>
              <span className="group-hover:text-zinc-900 transition-colors">Daily practical challenges</span>
            </motion.div>
            <span className="text-zinc-300">•</span>
            <motion.div
              whileHover={{ y: -1, scale: 1.04 }}
              className="flex items-center gap-1.5 cursor-default group"
            >
              <motion.span
                animate={{ rotate: [0, -12, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <Trophy className="w-4 h-4 text-amber-600" />
              </motion.span>
              <span className="group-hover:text-zinc-900 transition-colors">Built for college students</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= HERO SIGNATURE MORPHING VISUAL ================= */}
        <section className="mb-16">
          <SignatureMorphingTracker
            days={days}
            currentDay={profile.currentDay}
            onSelectDay={() => handleStartChallenge()}
          />
        </section>

        {/* Section Divider */}
        <div className="section-divider">
          <div className="section-divider-line" />
          <motion.span
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 inline-block"
          >
            HOW IT WORKS
          </motion.span>
          <div className="section-divider-line" />
        </div>

        {/* ================= "WHAT IS ABTALKS?" SECTION ================= */}
        <section id="how-it-works" className="mb-20 scroll-mt-20">
          <MethodologyTimelineSection />
        </section>

        {/* Section Divider */}
        <div className="section-divider">
          <div className="section-divider-line" />
          <motion.span
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 inline-block"
          >
            VERIFIABLE PROOF
          </motion.span>
          <div className="section-divider-line" />
        </div>

        {/* ================= PROOF OF WORK SECTION ================= */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 animate-pulse">
              PROOF OF WORK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-2">
              Don't just learn it. Leave evidence.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-md mx-auto">
              Recruiters don't hire promises. They hire engineers with visible, verifiable proof of execution.
            </p>
          </div>

          {/* Combined High-Fidelity Proof of Work Showcase */}
          <ProofOfWorkShowcase />
        </section>

        {/* ================= STUDENT TRANSFORMATION SECTION ================= */}
        <StudentTransformationTimeline />

        {/* ================= FINAL LANDING CTA ================= */}
        <section className="bg-white p-0.5 rounded-[1.6rem] border border-[#e5e4e0] shadow-xl relative overflow-hidden continuous-laser-perimeter-card">
          <div className="bg-[#faf9f6] rounded-[1.5rem] p-8 sm:p-12 text-center continuous-laser-perimeter-content relative z-10">
            <div className="max-w-md mx-auto relative z-10">
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-[#3b42c4] px-3.5 py-1 rounded-full shadow-sm shadow-indigo-500/20"
              >
                YOUR TIME TO BUILD
              </motion.span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-3">
                Your first build starts today.
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#111111] mt-2.5 leading-relaxed">
                You don't need 60 days of motivation. You only need to show up for Day 1.
              </p>

              <motion.button
                onClick={handleStartChallenge}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 px-8 py-3.5 rounded-xl bg-white hover:bg-[#3b42c4] text-[#111111] hover:text-white border border-zinc-200/90 hover:border-indigo-500 font-bold text-sm shadow-md hover:shadow-lg hover:shadow-indigo-500/25 hover:ring-2 hover:ring-[#3b42c4]/40 transition-all duration-300 flex items-center justify-center gap-2.5 mx-auto group cursor-pointer relative overflow-hidden"
              >
                <span className="relative z-10">Start the 60-Day Challenge</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block relative z-10"
                >
                  <ArrowRight className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors" />
                </motion.span>
              </motion.button>

              <p className="mt-4 text-xs font-mono font-semibold text-[#666666]">
                60 days · 60 builds · visible proof
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

