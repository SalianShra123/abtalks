import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChallengeDay } from '../types';
import { ShieldCheck, CheckCircle2, Sparkles, RefreshCw, Layers, ArrowUpRight } from 'lucide-react';

interface SignatureMorphingTrackerProps {
  days: ChallengeDay[];
  currentDay: number;
  onSelectDay?: (dayNumber: number) => void;
  autoMorphOnScroll?: boolean;
}

export const SignatureMorphingTracker: React.FC<SignatureMorphingTrackerProps> = ({
  days,
  currentDay,
  onSelectDay,
  autoMorphOnScroll = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ChallengeDay | null>(null);

  // Ensure we have 60 days
  const gridDays = React.useMemo(() => {
    if (days.length >= 60) return days.slice(0, 60);
    const result = [...days];
    for (let i = days.length + 1; i <= 60; i++) {
      result.push({
        day: i,
        title: `Day ${i} Challenge`,
        category: 'Fullstack',
        difficulty: 'Intermediate',
        estimatedMinutes: 45,
        description: 'Daily building challenge',
        mission: 'Complete daily objective',
        practiceTopics: [],
        checklist: [],
        status: i < currentDay ? 'completed' : i === currentDay ? 'current' : 'upcoming',
      });
    }
    return result;
  }, [days, currentDay]);

  const completedCount = gridDays.filter((d) => d.status === 'completed').length;
  const totalDays = 60;

  // Toggle morph state
  const handleToggleMorph = () => {
    setIsMorphing(true);
    setIsCollapsed((prev) => !prev);
    setTimeout(() => {
      setIsMorphing(false);
    }, 400);
  };

  // Optional scroll listener to morph when user scrolls into view
  useEffect(() => {
    if (!autoMorphOnScroll) return;
    let thresholdTriggered = false;

    const handleScroll = () => {
      const el = document.getElementById('signature-tracker-section');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // If element is scrolled past top part of viewport
      if (rect.top < 100 && rect.bottom > 100 && !thresholdTriggered) {
        // Subtle feedback if needed
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoMorphOnScroll]);

  return (
    <div id="signature-tracker-section" className="w-full my-6 select-none">
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-zinc-200/90 shadow-md relative overflow-hidden bg-white/90 backdrop-blur-xl">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900">
              SIGNATURE 60-DAY TRACKER
            </span>
          </div>

          <button
            onClick={handleToggleMorph}
            disabled={isMorphing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-semibold transition-all border border-zinc-200/80 cursor-pointer active:scale-95"
            title={isCollapsed ? 'Expand 60-Day Matrix' : 'Compress to Validation Capsule'}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isMorphing ? 'animate-spin' : ''}`} />
            <span>{isCollapsed ? 'Expand Matrix' : 'Morph to Capsule'}</span>
          </button>
        </div>

        {/* Morphing Area Container */}
        <div className="relative min-h-[220px] flex items-center justify-center p-2">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              /* ================= 60-DAY MATRIX STATE ================= */
              <motion.div
                key="matrix-view"
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.4, rotate: 12 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="w-full flex flex-col items-center"
              >
                {/* 10 x 6 Matrix Grid with Flowing Wave Reveal */}
                <div className="grid grid-cols-10 gap-2 sm:gap-2.5 w-full max-w-lg mx-auto my-2">
                  {gridDays.map((d, index) => {
                    const isCompleted = d.status === 'completed' || d.day < currentDay;
                    const isCurrent = d.day === currentDay || d.status === 'current';
                    const isMissed = d.status === 'missed';

                    let dotBg = 'bg-[#E2E0DA]'; // Muted grey
                    if (isCompleted) dotBg = 'bg-[#18181B] shadow-2xs'; // Charcoal
                    if (isCurrent) dotBg = 'bg-[#4F46E5] ring-2 ring-indigo-500/50 ring-offset-1 shadow-[0_0_12px_rgba(79,70,229,0.4)]'; // Deep indigo
                    if (isMissed) dotBg = 'bg-amber-100 border border-amber-300';

                    // Sequential wave delay for initial render
                    const waveDelay = isCompleted
                      ? index * 0.008
                      : isCurrent
                      ? completedCount * 0.008 + 0.05
                      : completedCount * 0.008 + 0.1 + (index - completedCount) * 0.006;

                    return (
                      <motion.div
                        key={d.day}
                        initial={{ opacity: 0, scale: 0.2, y: 8 }}
                        animate={
                          isCurrent
                            ? { opacity: 1, scale: [1, 1.15, 1], y: 0 }
                            : isCompleted
                            ? { opacity: [0.9, 1, 0.9], scale: 1, y: 0 }
                            : { opacity: 1, scale: 1, y: 0 }
                        }
                        transition={
                          isCurrent
                            ? {
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: waveDelay,
                              }
                            : isCompleted
                            ? {
                                duration: 3 + (d.day % 5) * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: waveDelay,
                              }
                            : {
                                duration: 0.28,
                                delay: waveDelay,
                                ease: [0.16, 1, 0.3, 1],
                              }
                        }
                        whileHover={{ scale: 1.35, y: -2, zIndex: 30 }}
                        whileTap={{ scale: 0.92 }}
                        onHoverStart={() => setHoveredDay(d)}
                        onHoverEnd={() => setHoveredDay(null)}
                        onClick={() => onSelectDay?.(d.day)}
                        className={`matrix-dot aspect-square rounded-md ${dotBg} flex items-center justify-center cursor-pointer transition-all duration-200 relative group`}
                      >
                        {isCompleted && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                        )}
                        {isCurrent && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                        )}

                        {/* Tooltip on Hover */}
                        <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform group-hover:-translate-y-0.5 z-30">
                          <div className="bg-zinc-900 text-white text-[10px] font-mono px-2.5 py-1 rounded-lg shadow-2xl whitespace-nowrap flex items-center gap-1.5 border border-zinc-700/80">
                            <span className="font-bold text-indigo-400">Day {d.day}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="capitalize font-semibold text-zinc-200">
                              {isCurrent ? 'Current' : isCompleted ? 'Completed' : 'Upcoming'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Status Legend & Day Hover Detail */}
                <div className="mt-4 w-full flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#18181B]" />
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#4F46E5]" />
                      <span>Current</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#E2E0DA]" />
                      <span>Upcoming</span>
                    </div>
                  </div>

                  <div className="font-bold text-zinc-900">
                    {hoveredDay ? (
                      <span className="text-indigo-600">
                        Day {hoveredDay.day}: {hoveredDay.title}
                      </span>
                    ) : (
                      <span>{completedCount} / 60 DAYS COMPLETED</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ================= VALIDATION CAPSULE STATE ================= */
              <motion.div
                key="capsule-view"
                initial={{ opacity: 0, scale: 0.3, rotate: -15, y: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={handleToggleMorph}
                className="cursor-pointer group relative my-4"
              >
                {/* Glow ring with continuous infinite pulsing */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.98, 1.04, 0.98] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-zinc-900 rounded-full blur-md"
                />

                {/* Validation Capsule Container */}
                <div className="relative px-6 py-4 rounded-full bg-zinc-900 text-white border border-zinc-700/80 shadow-2xl flex items-center gap-4 sm:gap-6 hover:scale-105 transition-transform duration-300">
                  {/* Badge Icon Node */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-inner flex-shrink-0"
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </motion.div>

                  {/* Main Metric Text */}
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
                        {completedCount} <span className="text-zinc-500 text-lg font-normal">/ 60</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/30 animate-pulse">
                        VERIFIED
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-indigo-300 uppercase mt-0.5 flex items-center gap-1">
                      PROOF OF WORK
                      <motion.span
                        animate={{ x: [0, 2, 0], y: [0, -2, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block"
                      >
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </motion.span>
                    </span>
                  </div>

                  {/* Interactive hint */}
                  <div className="hidden sm:flex flex-col items-end pl-4 border-l border-zinc-800 text-[10px] font-mono text-zinc-400">
                    <span>CLICK TO</span>
                    <span className="text-indigo-400 font-bold">EXPAND MATRIX</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info note */}
        <div className="mt-2 text-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
          INTERACTIVE SIGNATURE MORPHING MATRIX • 60 DAYS OF VISIBLE PROOF
        </div>
      </div>
    </div>
  );
};
