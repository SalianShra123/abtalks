import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  GitCommit,
  Linkedin,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface CinematicIntroExperienceProps {
  onComplete: () => void;
}

const SCENE_TITLES = [
  "Identity",
  "The Idea",
  "1 to 60 Days",
  "60-Day Journey",
  "Tracker Morph",
  "Proof System",
  "Core Purpose",
  "Philosophy",
  "Interactive Tracker",
  "Enter ABTalks"
];

export const CinematicIntroExperience: React.FC<CinematicIntroExperienceProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
  const [morphedCapsule, setMorphedCapsule] = useState(false);
  const totalScenes = 10;

  // Auto-advance scenes if playing — continuously loop back to scene 0 at the end
  useEffect(() => {
    if (!isPlaying) return;

    // Give Scene 3 (dot fill) and Scene 5 (morph) slightly more time
    const duration = currentScene === 2 ? 4200 : currentScene === 4 ? 4000 : 3500;

    const timer = setTimeout(() => {
      if (currentScene < totalScenes - 1) {
        setCurrentScene((prev) => prev + 1);
      } else {
        // Continuous infinite loop: jump back to scene 0
        setCurrentScene(0);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying]);

  // Continuous morph toggle loop while in Scene 5
  useEffect(() => {
    if (currentScene === 4) {
      setMorphedCapsule(true);
      const interval = setInterval(() => {
        setMorphedCapsule((prev) => !prev);
      }, 1800);
      return () => clearInterval(interval);
    } else {
      setMorphedCapsule(false);
    }
  }, [currentScene]);

  const handleFinishIntro = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    onComplete();
  };

  const nextScene = () => {
    if (currentScene < totalScenes - 1) {
      setCurrentScene((prev) => prev + 1);
    } else {
      handleFinishIntro();
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#faf9f6] text-[#111111] flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* Background subtle ambient grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e4e0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top Header: Brand mark & Progress scrubber */}
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#111111] text-white flex items-center justify-center font-black text-xs shadow-sm">
            AB
          </div>
          <span className="text-xs font-mono font-bold tracking-tight text-[#111111]">
            ABTalks <span className="text-[#3b42c4] font-normal">/ Film</span>
          </span>
        </div>

        {/* Scene progress indicators */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {Array.from({ length: totalScenes }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentScene(idx);
                setIsPlaying(true);
              }}
              title={`Scene ${idx + 1}: ${SCENE_TITLES[idx]}`}
              className="group relative p-1 cursor-pointer"
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentScene
                    ? 'w-6 bg-[#3b42c4]'
                    : idx < currentScene
                    ? 'w-2 bg-[#111111]/70'
                    : 'w-2 bg-[#e5e4e0]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Play/Pause controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-[#e5e4e0] bg-white/80 hover:bg-white text-[#666666] hover:text-[#111111] text-xs transition-colors cursor-pointer shadow-2xs"
            title={isPlaying ? "Pause auto-play" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* CENTER STAGE — ANIMATED FILM SCENES */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto px-4 py-6 text-center">
        <AnimatePresence mode="wait">
          {/* ================= SCENE 01: IDENTITY ================= */}
          {currentScene === 0 && (
            <motion.div
              key="scene-0"
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center space-y-4"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 1.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-black text-2xl shadow-xl border border-zinc-800"
              >
                AB
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight"
              >
                ABTalks
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[#3b42c4] font-mono text-xs font-extrabold uppercase tracking-widest shadow-2xs"
              >
                60-DAY CODING CHALLENGE
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-xs sm:text-sm font-medium text-[#666666] max-w-xs leading-relaxed"
              >
                Visible Proof Platform for Indian College Students
              </motion.p>
            </motion.div>
          )}

          {/* ================= SCENE 02: THE IDEA ================= */}
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-3 sm:space-y-4"
            >
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#3b42c4] bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200">
                THE SYSTEM
              </span>

              <div className="space-y-2 text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="text-[#3b42c4]">60 DAYS.</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span>ONE BUILD.</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="flex items-center justify-center gap-2 text-zinc-700"
                >
                  <span>EVERY DAY.</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="pt-2 text-[#3b42c4] underline decoration-[#3b42c4]/40 decoration-2 underline-offset-4"
                >
                  VISIBLE PROOF.
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ================= SCENE 03: SINGLE DOT TO 60 DAYS ================= */}
          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#111111] bg-white px-3 py-1 rounded-full border border-[#e5e4e0] shadow-2xs">
                  CONSISTENCY MATRIX
                </span>
              </div>

              {/* Animated 10x6 Dot Multiplication Grid */}
              <div className="p-4 sm:p-5 bg-white/90 rounded-2xl border border-[#e5e4e0] shadow-md backdrop-blur-sm">
                <div className="grid grid-cols-10 gap-2 sm:gap-2.5 max-w-[280px] sm:max-w-[340px]">
                  {Array.from({ length: 60 }).map((_, idx) => {
                    const isCompleted = idx < 11;
                    const isCurrent = idx === 11;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: isCurrent ? 1.25 : 1 }}
                        transition={{
                          delay: (idx / 60) * 1.8, // Staggered creation across 1.8 seconds
                          duration: 0.25,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-[#111111]'
                            : isCurrent
                            ? 'bg-[#3b42c4] ring-4 ring-[#3b42c4]/20'
                            : 'bg-[#e5e4e0]'
                        }`}
                      >
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic counter text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs font-mono font-bold text-[#666666]"
              >
                1 DAY → 5 DAYS → 30 DAYS → <span className="text-[#3b42c4]">60 DAYS OF PROOF</span>
              </motion.p>
            </motion.div>
          )}

          {/* ================= SCENE 04: 60-DAY JOURNEY ================= */}
          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-[#3b42c4] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
                  DAY 12 / 60 ACTIVE
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#e5e4e0] shadow-md">
                <div className="grid grid-cols-10 gap-2 max-w-[280px] sm:max-w-[320px]">
                  {Array.from({ length: 60 }).map((_, idx) => {
                    const isCompleted = idx < 11;
                    const isCurrent = idx === 11;

                    return (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-[#111111]'
                            : isCurrent
                            ? 'bg-[#3b42c4] ring-4 ring-[#3b42c4]/30 animate-pulse'
                            : 'bg-[#e5e4e0]'
                        }`}
                      >
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-[#111111]">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-800">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>12 DAY STREAK</span>
                </div>
                <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200 text-emerald-800">
                  <span>100% On-Time Proof</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SCENE 05: TRACKER MORPH ================= */}
          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#111111] bg-white px-3 py-0.5 rounded-full border border-[#e5e4e0]">
                SIGNATURE MORPHING CAPSULE
              </span>

              {/* Transformation stage */}
              <div className="h-36 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {morphedCapsule ? (
                    <motion.div
                      key="capsule"
                      initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.3, rotate: 20, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 py-3.5 rounded-full bg-[#111111] text-white flex items-center gap-3 shadow-xl border border-indigo-500/30 ring-4 ring-[#3b42c4]/20"
                    >
                      <Sparkles className="w-4 h-4 text-[#818cf8] animate-spin-slow" />
                      <div className="text-left font-mono">
                        <span className="text-xs font-bold text-[#818cf8] block">12 / 60 COMPLETE</span>
                        <span className="text-[10px] text-zinc-300 block">PROOF OF WORK VERIFIED</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="grid"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="p-4 bg-white rounded-2xl border border-[#e5e4e0] shadow-md"
                    >
                      <div className="grid grid-cols-10 gap-2 max-w-[280px]">
                        {Array.from({ length: 60 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-3.5 h-3.5 rounded-full ${
                              idx < 11
                                ? 'bg-[#111111]'
                                : idx === 11
                                ? 'bg-[#3b42c4] ring-2 ring-[#3b42c4]/30'
                                : 'bg-[#e5e4e0]'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-xs font-mono text-[#666666]">
                Matrix converges into compact proof token & expands back
              </p>
            </motion.div>
          )}

          {/* ================= SCENE 06: PROOF OF WORK ================= */}
          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#3b42c4] bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200">
                VERIFIABLE EVIDENCE FLOW
              </span>

              {/* Connecting Nodes diagram */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-5 bg-white rounded-2xl border border-[#e5e4e0] shadow-md">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 border border-zinc-200">
                  <span className="text-xs font-bold text-[#111111]">1. BUILD</span>
                </div>

                <div className="w-0.5 h-4 sm:w-6 sm:h-0.5 bg-[#3b42c4]" />

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-[#3b42c4] text-xs font-bold">
                  <GitCommit className="w-4 h-4 text-[#3b42c4]" />
                  <span>2. GITHUB</span>
                </div>

                <div className="w-0.5 h-4 sm:w-6 sm:h-0.5 bg-[#3b42c4]" />

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                  <Linkedin className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span>3. LINKEDIN</span>
                </div>

                <div className="w-0.5 h-4 sm:w-6 sm:h-0.5 bg-[#3b42c4]" />

                <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>4. PROOF</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-[#111111]">
                12 Daily Builds Verified • Immutable Public History
              </div>
            </motion.div>
          )}

          {/* ================= SCENE 07: WHAT ABTALKS DOES ================= */}
          {currentScene === 6 && (
            <motion.div
              key="scene-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-lg"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b42c4] bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200">
                WHAT IS ABTALKS?
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight leading-tight">
                A structured 60-day challenge designed for college students to turn daily coding into visible proof.
              </h2>

              <p className="text-xs sm:text-sm font-medium text-[#666666] leading-relaxed">
                Build something every day. Publish your proof. Build your consistency record that recruiters can actually inspect.
              </p>
            </motion.div>
          )}

          {/* ================= SCENE 08: BUILD -> PROVE -> REPEAT ================= */}
          {currentScene === 7 && (
            <motion.div
              key="scene-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#111111] bg-white px-3 py-0.5 rounded-full border border-[#e5e4e0]">
                THE DAILY ENGINE
              </span>

              <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base font-black text-[#111111]">
                <span className="px-3.5 py-2 rounded-xl bg-white border border-[#e5e4e0] shadow-2xs">
                  BUILD
                </span>
                <span className="text-[#3b42c4]">→</span>
                <span className="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-[#3b42c4] shadow-2xs">
                  PROVE
                </span>
                <span className="text-[#3b42c4]">→</span>
                <span className="px-3.5 py-2 rounded-xl bg-white border border-[#e5e4e0] shadow-2xs">
                  REPEAT
                </span>
              </div>

              <p className="text-xs font-mono font-medium text-[#666666] max-w-xs">
                No complex theory marathons. Practical daily execution.
              </p>
            </motion.div>
          )}

          {/* ================= SCENE 09: INTERACTIVE TRACKER ================= */}
          {currentScene === 8 && (
            <motion.div
              key="scene-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-3"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b42c4] bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200">
                TRY INTERACTING WITH THE MATRIX
              </span>

              <div className="p-4 bg-white rounded-2xl border border-[#e5e4e0] shadow-md relative">
                <div className="grid grid-cols-10 gap-2 max-w-[280px] sm:max-w-[320px]">
                  {Array.from({ length: 60 }).map((_, idx) => {
                    const isCompleted = idx < 11;
                    const isCurrent = idx === 11;

                    return (
                      <button
                        key={idx}
                        onMouseEnter={() => setHoveredDotIndex(idx)}
                        onMouseLeave={() => setHoveredDotIndex(null)}
                        onClick={() => setHoveredDotIndex(idx)}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform cursor-pointer ${
                          isCompleted
                            ? 'bg-[#111111] hover:scale-125'
                            : isCurrent
                            ? 'bg-[#3b42c4] ring-4 ring-[#3b42c4]/30 scale-110'
                            : 'bg-[#e5e4e0] hover:scale-125 hover:bg-zinc-400'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Tooltip display */}
                {hoveredDotIndex !== null && (
                  <div className="mt-3 p-2 rounded-xl bg-[#111111] text-white text-[11px] font-mono flex items-center justify-between">
                    <span>
                      DAY {hoveredDotIndex + 1}:{' '}
                      {hoveredDotIndex < 11
                        ? 'Completed'
                        : hoveredDotIndex === 11
                        ? 'Active Challenge'
                        : 'Upcoming'}
                    </span>
                    <span className="text-[#818cf8] font-bold">
                      {hoveredDotIndex < 11 ? '✓ Proof Verified' : hoveredDotIndex === 11 ? 'In Progress' : 'Locked'}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-[#666666]">
                Hover or tap any dot to view challenge day status
              </p>
            </motion.div>
          )}

          {/* ================= SCENE 10: FINAL STATE & ENTER ================= */}
          {currentScene === 9 && (
            <motion.div
              key="scene-9"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-5 max-w-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#111111] text-white flex items-center justify-center font-black text-sm">
                  AB
                </div>
                <span className="font-extrabold text-lg text-[#111111]">ABTalks</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                60 DAYS OF BUILDING.
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#666666] leading-relaxed">
                You don't need 60 days of motivation. You only need to show up for Day 1.
              </p>

              {/* Primary Enter CTA */}
              <motion.button
                onClick={handleFinishIntro}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-8 rounded-xl bg-[#111111] hover:bg-[#3b42c4] text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer group"
              >
                <span>ENTER ABTALKS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER CONTROLS & SKIP BUTTON */}
      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 pb-4 sm:pb-6 flex items-center justify-between text-xs text-[#666666]">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={prevScene}
            disabled={currentScene === 0}
            className={`p-2 rounded-lg border border-[#e5e4e0] bg-white text-[#111111] transition-all ${
              currentScene === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#3b42c4] hover:text-[#3b42c4] cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextScene}
            className="p-2 rounded-lg border border-[#e5e4e0] bg-white text-[#111111] hover:border-[#3b42c4] hover:text-[#3b42c4] transition-all cursor-pointer flex items-center gap-1 font-bold"
          >
            <span>{currentScene === totalScenes - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Current scene label */}
        <div className="hidden sm:block font-mono text-[11px] font-semibold text-[#666666]">
          Scene {currentScene + 1} / {totalScenes}: <span className="text-[#111111]">{SCENE_TITLES[currentScene]}</span>
        </div>

        {/* SKIP INTRO CONTROL */}
        <button
          onClick={handleFinishIntro}
          className="font-mono text-xs font-bold text-[#666666] hover:text-[#3b42c4] flex items-center gap-1 transition-colors cursor-pointer group"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
