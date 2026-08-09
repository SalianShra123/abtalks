import React from 'react';
import { Check, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SubmissionSummaryProps {
  dayNumber: number;
  isGithubValid: boolean;
  isLinkedInValid: boolean;
  isChecklistComplete: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const SubmissionSummary: React.FC<SubmissionSummaryProps> = ({
  dayNumber,
  isGithubValid,
  isLinkedInValid,
  isChecklistComplete,
  isSubmitting,
  onSubmit,
}) => {
  const isReady = isGithubValid && isLinkedInValid;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 border border-zinc-200/90 shadow-xl bg-gradient-to-br from-white via-zinc-50 to-indigo-50/30 kinetic-border-tracer relative overflow-hidden">
      {/* Background Accent Sheen */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#3b42c4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/80">
        <h3 className="text-base font-black text-[#111111]">READY TO SUBMIT?</h3>
        <span className="text-xs font-mono font-bold text-[#3b42c4] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 shadow-2xs tag-interactive-indigo">
          DAY {dayNumber.toString().padStart(2, '0')} OF 60
        </span>
      </div>

      <div className="space-y-2.5 mb-5">
        <div className="flex items-center justify-between text-xs sm:text-sm p-2.5 rounded-xl bg-white/90 border border-zinc-200/80 shadow-2xs tag-interactive-indigo">
          <span className="font-bold text-[#111111]">GitHub Repository URL</span>
          {isGithubValid ? (
            <span className="text-emerald-800 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
              Verified
            </span>
          ) : (
            <span className="text-zinc-400 font-mono text-xs font-semibold">Pending URL</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm p-2.5 rounded-xl bg-white/90 border border-zinc-200/80 shadow-2xs tag-interactive-indigo">
          <span className="font-bold text-[#111111]">LinkedIn Post URL</span>
          {isLinkedInValid ? (
            <span className="text-emerald-800 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
              Verified
            </span>
          ) : (
            <span className="text-zinc-400 font-mono text-xs font-semibold">Pending URL</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm p-2.5 rounded-xl bg-white/90 border border-zinc-200/80 shadow-2xs tag-interactive-indigo">
          <span className="font-bold text-[#111111]">Challenge Finish Line</span>
          {isChecklistComplete ? (
            <span className="text-emerald-800 font-bold text-xs flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
              All Verified
            </span>
          ) : (
            <span className="text-amber-800 font-bold text-xs bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">In Progress</span>
          )}
        </div>
      </div>

      {!isReady && (
        <div className="p-3 mb-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2 shadow-2xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Please paste valid GitHub & LinkedIn URLs above to enable final submission.</span>
        </div>
      )}

      <motion.button
        whileHover={isReady && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
        whileTap={isReady && !isSubmitting ? { scale: 0.98 } : {}}
        type="button"
        disabled={!isReady || isSubmitting}
        onClick={onSubmit}
        className={`w-full py-3.5 px-6 rounded-xl font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer ${
          isReady && !isSubmitting
            ? 'bg-[#111111] hover:bg-[#3b42c4] text-white border border-transparent shadow-lg hover:shadow-indigo-500/30'
            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Verifying & Recording Proof...</span>
          </>
        ) : (
          <>
            <span>Submit Day {dayNumber} Proof</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>
    </div>
  );
};

