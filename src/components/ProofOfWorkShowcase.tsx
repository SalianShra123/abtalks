import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { GitCommit, Linkedin, Flame, CheckCircle2, RotateCcw, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface ProofOfWorkShowcaseProps {
  onReplay?: () => void;
}

export const ProofOfWorkShowcase: React.FC<ProofOfWorkShowcaseProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  // Animation Stage States:
  // 0: Muted Initial
  // 1: Streak Ignited
  // 2: Header Locked (Day 12 Solid)
  // 3: GitHub Laser Swept & Verified
  // 4: LinkedIn Laser Swept & Verified
  // 5: Bottom Index Revealed & Complete
  const [stage, setStage] = useState<number>(1);
  const [activeFocus, setActiveFocus] = useState<'github' | 'linkedin' | 'abtalks' | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Trigger sequence on scroll in or manually
  const runSequence = () => {
    setStage(0);
    setActiveFocus(null);

    // Timeline steps using cubic-bezier(0.16, 1, 0.3, 1)
    const t1 = setTimeout(() => setStage(1), 250); // Streak ignite
    const t2 = setTimeout(() => setStage(2), 600); // Day 12 Charcoal Lock
    const t3 = setTimeout(() => setStage(3), 1050); // GitHub Laser Sweep & Verified
    const t4 = setTimeout(() => setStage(4), 1500); // 450ms later: LinkedIn Laser Sweep & Verified
    const t5 = setTimeout(() => setStage(5), 1950); // Bottom Columns Drift Up

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  };

  // Infinite Automated Loop Engine
  useEffect(() => {
    runSequence();

    const loopInterval = setInterval(() => {
      if (!isPaused) {
        runSequence();
      }
    }, 6000);

    return () => clearInterval(loopInterval);
  }, [isPaused]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    runSequence();
  };

  const cubicEase = [0.16, 1, 0.3, 1];

  return (
    <div ref={containerRef} className="max-w-lg mx-auto relative group/container">
      {/* Replay Micro-Button at top right */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 hover:bg-indigo-50 border border-zinc-200/80 hover:border-indigo-200 text-[11px] font-mono font-medium text-zinc-600 hover:text-indigo-700 shadow-2xs transition-all duration-200 cursor-pointer"
          title="Replay Verification Animation"
        >
          <RotateCcw className="w-3 h-3 text-indigo-600" />
          <span>Replay Animation</span>
        </button>
      </div>

      {/* Main Interactive Showcase Card */}
      <motion.div
        animate={{
          boxShadow: stage >= 1
            ? '0 20px 40px -15px rgba(79, 70, 229, 0.12), 0 4px 16px rgba(0,0,0,0.04)'
            : '0 4px 12px rgba(0,0,0,0.02)',
        }}
        transition={{ duration: 0.6, ease: cubicEase }}
        className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-500 overflow-hidden border ${
          stage >= 1 ? 'bg-white border-zinc-300/90' : 'bg-zinc-50/60 border-zinc-200/80 grayscale'
        }`}
      >
        {/* ================= TOP HEADER BAR ================= */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80">
          <div className="flex items-center gap-2">
            {/* Day 12 Badge with Mechanical Charcoal Snap */}
            <motion.span
              animate={{
                backgroundColor: stage >= 2 ? '#18181b' : '#e4e4e7',
                color: stage >= 2 ? '#ffffff' : '#71717a',
                scale: stage === 2 ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.35, ease: cubicEase }}
              className="px-2.5 py-1 rounded-lg font-mono font-extrabold text-xs shadow-2xs tracking-wide"
            >
              DAY 12
            </motion.span>
            <span className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${stage >= 2 ? 'text-zinc-900' : 'text-zinc-500'}`}>
              Build a REST API
            </span>
          </div>

          {/* "12 Day Streak" Igniting Flame Tag */}
          <motion.div
            animate={{
              scale: stage === 1 ? [1, 1.25, 1] : 1,
              backgroundColor: stage >= 1 ? '#fff7ed' : '#f4f4f5',
              borderColor: stage >= 1 ? '#fed7aa' : '#e4e4e7',
              color: stage >= 1 ? '#ea580c' : '#a1a1aa',
            }}
            transition={{ duration: 0.4, ease: cubicEase }}
            className={`text-xs font-mono font-bold flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-2xs transition-colors duration-300 ${
              stage >= 1 ? 'shadow-amber-500/10' : ''
            }`}
          >
            <motion.div
              animate={stage >= 1 ? { scale: [1, 1.22, 1], rotate: [0, -8, 8, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flame className={`w-3.5 h-3.5 transition-colors duration-300 ${stage >= 1 ? 'fill-amber-500 text-amber-500' : 'text-zinc-400'}`} />
            </motion.div>
            <span>12 day streak</span>
          </motion.div>
        </div>

        {/* ================= SUBMISSION ROWS (Option A & Option B) ================= */}
        <div className="py-4 space-y-3 relative">
          {/* Active Bounding Focus Highlight Frame (Option B) */}
          <AnimatePresence>
            {activeFocus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: activeFocus === 'github' ? 0 : activeFocus === 'linkedin' ? 62 : 0,
                }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: cubicEase }}
                className="absolute inset-x-0 h-[52px] rounded-xl border-2 border-indigo-500/80 bg-indigo-50/20 pointer-events-none z-0 shadow-xs"
              />
            )}
          </AnimatePresence>

          {/* ---------- GITHUB ROW ---------- */}
          <motion.div
            onMouseEnter={() => setActiveFocus('github')}
            onMouseLeave={() => setActiveFocus(null)}
            animate={{
              opacity: activeFocus && activeFocus !== 'github' ? 0.4 : 1,
              borderColor: activeFocus === 'github' ? '#818cf8' : '#e4e4e7',
            }}
            transition={{ duration: 0.3, ease: cubicEase }}
            className="relative z-10 flex items-center justify-between p-3.5 rounded-xl bg-white/90 border shadow-2xs text-xs transition-all cursor-pointer group/github overflow-hidden"
          >
            {/* Laser Line Trace Sweep across GitHub Row (Option A) */}
            {stage === 3 && (
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 0.45, ease: cubicEase }}
                className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none z-20"
              />
            )}

            <div className="flex items-center gap-2.5 font-semibold text-zinc-800">
              <motion.div
                animate={stage >= 3 ? { scale: [1, 1.28, 1] } : {}}
                transition={{ duration: 0.35, ease: cubicEase }}
                className="p-1.5 rounded-lg bg-zinc-100 group-hover/github:bg-indigo-50 transition-colors"
              >
                <GitCommit className="w-4 h-4 text-zinc-900 group-hover/github:text-indigo-600 transition-colors" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-zinc-900 font-bold group-hover/github:text-indigo-600 transition-colors">
                  GitHub Repository
                </span>
                <span className="text-[10px] font-mono text-zinc-600">rest-api-express-ts</span>
              </div>
            </div>

            {/* Verification State Tag */}
            {stage < 3 ? (
              <div className="flex items-center gap-1.5 text-zinc-600 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span>Verifying trace...</span>
              </div>
            ) : (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: cubicEase }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/90 text-[11px] font-mono font-bold shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Submitted</span>
              </motion.span>
            )}
          </motion.div>

          {/* ---------- LINKEDIN ROW ---------- */}
          <motion.div
            onMouseEnter={() => setActiveFocus('linkedin')}
            onMouseLeave={() => setActiveFocus(null)}
            animate={{
              opacity: activeFocus && activeFocus !== 'linkedin' ? 0.4 : 1,
              borderColor: activeFocus === 'linkedin' ? '#818cf8' : '#e4e4e7',
            }}
            transition={{ duration: 0.3, ease: cubicEase }}
            className="relative z-10 flex items-center justify-between p-3.5 rounded-xl bg-white/90 border shadow-2xs text-xs transition-all cursor-pointer group/linkedin overflow-hidden"
          >
            {/* Laser Line Trace Sweep across LinkedIn Row (Option A - 400ms delay) */}
            {stage === 4 && (
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 0.45, ease: cubicEase }}
                className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none z-20"
              />
            )}

            <div className="flex items-center gap-2.5 font-semibold text-zinc-800">
              <motion.div
                animate={stage >= 4 ? { scale: [1, 1.28, 1] } : {}}
                transition={{ duration: 0.35, ease: cubicEase }}
                className="p-1.5 rounded-lg bg-blue-50 group-hover/linkedin:bg-blue-100 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-600 fill-blue-600" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-zinc-900 font-bold group-hover/linkedin:text-blue-600 transition-colors">
                  LinkedIn Post Proof
                </span>
                <span className="text-[10px] font-mono text-zinc-600">linkedin.com/posts/day-12-shipped</span>
              </div>
            </div>

            {/* Verification State Tag */}
            {stage < 4 ? (
              <div className="flex items-center gap-1.5 text-zinc-600 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" />
                <span>Pending sweep</span>
              </div>
            ) : (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: cubicEase }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/90 text-[11px] font-mono font-bold shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Submitted</span>
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* ================= BOTTOM INDEX MAPPING 3 COLUMNS ================= */}
        <motion.div
          animate={{
            opacity: stage >= 5 ? 1 : 0,
            y: stage >= 5 ? 0 : 6,
          }}
          transition={{ duration: 0.45, ease: cubicEase }}
          className="pt-3.5 border-t border-zinc-200/80 grid grid-cols-3 gap-2 text-center text-[11px] font-mono"
        >
          {/* GitHub Column */}
          <motion.div
            onMouseEnter={() => setActiveFocus('github')}
            onMouseLeave={() => setActiveFocus(null)}
            animate={{
              opacity: activeFocus && activeFocus !== 'github' ? 0.4 : 1,
              backgroundColor: activeFocus === 'github' ? '#f4f4f5' : 'transparent',
            }}
            transition={{ duration: 0.25, ease: cubicEase }}
            className="p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-zinc-200"
          >
            <strong className="block text-zinc-900 font-bold">GitHub</strong>
            <span className="text-zinc-600 text-[10px] block mt-0.5">what you built</span>
          </motion.div>

          {/* LinkedIn Column */}
          <motion.div
            onMouseEnter={() => setActiveFocus('linkedin')}
            onMouseLeave={() => setActiveFocus(null)}
            animate={{
              opacity: activeFocus && activeFocus !== 'linkedin' ? 0.4 : 1,
              backgroundColor: activeFocus === 'linkedin' ? '#eff6ff' : 'transparent',
            }}
            transition={{ duration: 0.25, ease: cubicEase }}
            className="p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-blue-200"
          >
            <strong className="block text-blue-700 font-bold">LinkedIn</strong>
            <span className="text-zinc-600 text-[10px] block mt-0.5">that you shipped</span>
          </motion.div>

          {/* ABTalks Column */}
          <motion.div
            onMouseEnter={() => setActiveFocus('abtalks')}
            onMouseLeave={() => setActiveFocus(null)}
            animate={{
              opacity: activeFocus && activeFocus !== 'abtalks' ? 0.4 : 1,
              backgroundColor: activeFocus === 'abtalks' ? '#f5f3ff' : 'transparent',
            }}
            transition={{ duration: 0.25, ease: cubicEase }}
            className="p-2 rounded-xl transition-all cursor-pointer border border-transparent hover:border-indigo-200"
          >
            <strong className="block text-indigo-700 font-bold">ABTalks</strong>
            <span className="text-zinc-600 text-[10px] block mt-0.5">your consistency</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
