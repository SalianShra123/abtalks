import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flame, Trophy, GitCommit, Linkedin, ArrowRight, Sparkles, X } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

interface SuccessStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  streakDays: number;
}

export const SuccessStateModal: React.FC<SuccessStateModalProps> = ({
  isOpen,
  onClose,
  dayNumber = 12,
  streakDays = 12,
}) => {
  const { navigateWithTransition } = usePageTransition();

  if (!isOpen) return null;

  const handleNextDayClick = () => {
    onClose();
    navigateWithTransition(`/day/${dayNumber + 1}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md glass-panel-dark rounded-3xl p-6 text-white border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Glow Sheen */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close X Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-400 flex items-center justify-center glow-accent">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          </div>

          {/* Header text */}
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/80">
              DAY {dayNumber} COMPLETE
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">You showed up today.</h2>
            <p className="text-xs text-zinc-300 mt-1">
              Your proof of work has been verified and recorded to your 60-day ledger.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Flame className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-white">{streakDays} Days</div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Streak</div>
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-white">{dayNumber} / 60</div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Builds Complete</div>
              </div>
            </div>
          </div>

          {/* Verified Checkmarks */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 mb-6 space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-2 font-mono">
                <GitCommit className="w-4 h-4 text-emerald-400" />
                GitHub Submission
              </span>
              <span className="text-emerald-400 font-bold">✓ Verified</span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-2 font-mono">
                <Linkedin className="w-4 h-4 text-emerald-400" />
                LinkedIn Post
              </span>
              <span className="text-emerald-400 font-bold">✓ Verified</span>
            </div>
          </div>

          {/* Next Up Preview & CTA */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-400 uppercase font-mono">NEXT UP</span>
              <span className="text-indigo-300 font-semibold font-mono">DAY {dayNumber + 1}</span>
            </div>

            <button
              onClick={handleNextDayClick}
              className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-emerald-600 border border-transparent hover:border-emerald-400 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer"
            >
              <span>Preview Day {dayNumber + 1} Challenge</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
