import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Check, Sparkles, Award, Github, Linkedin, ArrowRight, Share2, Download, RefreshCw } from 'lucide-react';

interface CompletionCinematicAnimationProps {
  studentName?: string;
  track?: string;
  onOpenShare?: () => void;
  onOpenCertificate?: () => void;
  onStartAnother?: () => void;
  onViewJourney?: () => void;
}

export const CompletionCinematicAnimation: React.FC<CompletionCinematicAnimationProps> = ({
  studentName = 'Shravya',
  track = 'Frontend Development',
  onOpenShare,
  onOpenCertificate,
  onStartAnother,
  onViewJourney,
}) => {
  // Sequence stages: 0=start, 1=github verified, 2=linkedin verified, 3=60th dot, 4=dots illuminate, 5=dots converge, 6=capsule morph, 7=you showed up text, 8=final static state
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),   // GitHub verified
      setTimeout(() => setStage(2), 1200),  // LinkedIn verified
      setTimeout(() => setStage(3), 1800),  // 60th dot completes
      setTimeout(() => setStage(4), 2400),  // All dots illuminate
      setTimeout(() => setStage(5), 3200),  // Dots converge
      setTimeout(() => setStage(6), 4000),  // Morph into completion capsule
      setTimeout(() => setStage(7), 4800),  // YOU SHOWED UP text
      setTimeout(() => setStage(8), 5600),  // Final state
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full space-y-8 my-6">
      {/* ================= STEP 1: VERIFIED PROOF BAR ================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-sm relative overflow-hidden text-center space-y-4"
      >
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b42c4] bg-indigo-50 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/80">
          <Sparkles className="w-3 h-3 text-[#3b42c4] animate-pulse" />
          FINAL PROOF OF WORK VERIFICATION
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {/* GitHub Verification Card */}
          <div
            className={`p-4 rounded-xl border transition-all duration-500 flex items-center justify-between ${
              stage >= 1
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-zinc-50 border-zinc-200 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Github className={`w-4 h-4 ${stage >= 1 ? 'text-zinc-900' : 'text-zinc-400'}`} />
              <div className="text-left">
                <div className="text-xs font-bold font-mono">GITHUB</div>
                <div className="text-[10px] text-zinc-500">60 Commits Pushed</div>
              </div>
            </div>
            {stage >= 1 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                VERIFIED
              </motion.span>
            ) : (
              <span className="text-[10px] font-mono text-zinc-400">Verifying...</span>
            )}
          </div>

          {/* LinkedIn Verification Card */}
          <div
            className={`p-4 rounded-xl border transition-all duration-500 flex items-center justify-between ${
              stage >= 2
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-zinc-50 border-zinc-200 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Linkedin className={`w-4 h-4 ${stage >= 2 ? 'text-indigo-600' : 'text-zinc-400'}`} />
              <div className="text-left">
                <div className="text-xs font-bold font-mono">LINKEDIN</div>
                <div className="text-[10px] text-zinc-500">60 Proof Updates</div>
              </div>
            </div>
            {stage >= 2 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                VERIFIED
              </motion.span>
            ) : (
              <span className="text-[10px] font-mono text-zinc-400">Verifying...</span>
            )}
          </div>
        </div>

        {/* Triple Stat Row */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
          <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
            <div className="text-lg font-black font-mono text-[#111111]">60</div>
            <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">BUILDS</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
            <div className="text-lg font-black font-mono text-[#111111]">60</div>
            <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">PROOFS</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-zinc-200 shadow-2xs">
            <div className="text-lg font-black font-mono text-[#111111]">60</div>
            <div className="text-[10px] font-mono uppercase text-zinc-500 font-bold">DAYS</div>
          </div>
        </div>
      </motion.div>

      {/* ================= STEP 2: ANIMATED MORPHING 60-DOT MATRIX ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-2xl p-6 sm:p-8 border border-zinc-200/90 shadow-md relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[280px]"
      >
        <AnimatePresence mode="wait">
          {stage < 5 ? (
            /* Matrix Phase: 60 dots illumination */
            <motion.div
              key="matrix"
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-4 w-full"
            >
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                {stage < 3 ? 'ILLUMINATING 60 DAYS OF PROOF...' : '60 / 60 DAYS COMPLETED'}
              </div>

              {/* 10 x 6 Dot Matrix Grid */}
              <div className="grid grid-cols-10 gap-2 sm:gap-2.5 max-w-sm mx-auto p-4 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">
                {Array.from({ length: 60 }).map((_, idx) => {
                  const isDay60 = idx === 59;
                  const isIlluminated = stage >= 4 || (stage >= 3 && isDay60) || idx < 59;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{
                        scale: isDay60 && stage === 3 ? [1, 1.5, 1] : 1,
                        backgroundColor: isIlluminated ? '#10B981' : '#3F3F46',
                        boxShadow: isIlluminated ? '0 0 8px rgba(16, 185, 129, 0.6)' : 'none',
                      }}
                      transition={{ duration: 0.3, delay: (idx % 10) * 0.02 }}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center text-[8px] font-mono font-bold text-white shadow-2xs"
                    >
                      {idx + 1}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Capsule Phase: Dots converged into single morphing completion capsule */
            <motion.div
              key="capsule"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="space-y-6 flex flex-col items-center w-full"
            >
              {/* Premium Completion Badge Capsule with Continuous Breathing Animation */}
              <motion.div
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 10px 30px rgba(59, 130, 246, 0.2)',
                    '0 15px 40px rgba(16, 185, 129, 0.35)',
                    '0 10px 30px rgba(59, 130, 246, 0.2)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#111111] via-[#1a1a2e] to-[#0f172a] text-white border border-emerald-500/40 shadow-2xl flex items-center gap-3 relative overflow-hidden group"
              >
                {/* Holographic Shimmer Line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>

                <div className="text-left font-mono">
                  <div className="text-xs font-extrabold text-emerald-400 tracking-wider">60 DAYS COMPLETE</div>
                  <div className="text-[10px] text-zinc-300">Visible Proof Achieved • 60 / 60</div>
                </div>

                <span className="ml-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  100% PROOF
                </span>
              </motion.div>

              {/* Emotional Transition Headline */}
              {stage >= 7 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2 max-w-md mx-auto"
                >
                  <div className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight uppercase">
                    YOU SHOWED UP.
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                    The goal was never just to finish 60 days. The goal was to create 60 days of undeniable, visible proof.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ================= STEP 3: ACHIEVEMENT CARD ================= */}
      {stage >= 7 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-xl relative overflow-hidden space-y-6"
        >
          {/* Subtle Top Accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#3b42c4] via-indigo-500 to-amber-500 -mx-8 -mt-8 mb-6" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white font-mono font-black text-base flex items-center justify-center shadow-md shrink-0">
                AB
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50 px-2.5 py-0.5 rounded">
                  ABTalks 60-Day Challenge
                </span>
                <h3 className="text-xl font-black text-[#111111] mt-1">{studentName}</h3>
                <p className="text-xs text-zinc-500 font-mono font-medium">{track}</p>
              </div>
            </div>

            {/* Verified Pulse Mark */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-black flex items-center gap-2 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>✓ COMPLETED</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="text-xl font-black font-mono text-[#111111]">60 BUILDS</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Code Repositories</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="text-xl font-black font-mono text-[#111111]">60 PROOFS</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Social Verifications</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="text-xl font-black font-mono text-[#111111]">60 DAYS</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Visible Consistency</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {onViewJourney && (
                <button
                  onClick={onViewJourney}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#3b42c4] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group"
                >
                  <span>VIEW MY 60-DAY JOURNEY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {onOpenShare && (
                <button
                  onClick={onOpenShare}
                  className="px-4 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-[#111111] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#3b42c4]" />
                  <span>SHARE ACHIEVEMENT</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onOpenCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className="px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-[#3b42c4] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CERTIFICATE</span>
                </button>
              )}

              {onStartAnother && (
                <button
                  onClick={onStartAnother}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>START ANOTHER CHALLENGE</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
