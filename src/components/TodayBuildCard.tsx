import React from 'react';
import { ChallengeDay } from '../types';
import { Clock, ShieldCheck, Code2, ArrowRight, Play, Sparkles } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

interface TodayBuildCardProps {
  challenge: ChallengeDay;
  isCompleted?: boolean;
}

export const TodayBuildCard: React.FC<TodayBuildCardProps> = ({
  challenge,
  isCompleted = false,
}) => {
  const { navigateWithTransition } = usePageTransition();

  return (
    <div className="w-full glass-card rounded-2xl p-5 sm:p-6 border border-zinc-200/90 shadow-xl bg-gradient-to-br from-white via-zinc-50/50 to-indigo-50/20 relative overflow-hidden group kinetic-border-tracer">
      {/* Background Accent Sheen */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#3b42c4]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#111111] text-white shadow-sm">
            DAY {challenge.day.toString().padStart(2, '0')}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-[#3b42c4] border border-indigo-200/80 shadow-2xs">
            TODAY'S BUILD
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#666666]">
          <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 tag-interactive-indigo font-semibold cursor-default">
            {challenge.difficulty}
          </span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 tag-interactive-indigo font-semibold cursor-default">
            {challenge.category}
          </span>
          <span className="hidden sm:flex items-center gap-1 text-[#666666] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#3b42c4]" />
            ~{challenge.estimatedMinutes} min
          </span>
        </div>
      </div>

      {/* Main Title & Description */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mt-1 mb-2">
        {challenge.title}
      </h2>

      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-2xl mb-5">
        {challenge.description}
      </p>

      {/* Key Deliverables Pill Checklist preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {challenge.checklist.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-xs text-[#111111] bg-white/90 p-2.5 rounded-xl border border-zinc-200/90 shadow-2xs tag-interactive-indigo"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#3b42c4] shrink-0" />
            <span className="truncate font-medium">{item}</span>
          </div>
        ))}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-zinc-200/80">
        <div className="flex items-center gap-4 text-xs text-[#666666]">
          <div className="flex items-center gap-1.5 font-medium">
            <Code2 className="w-4 h-4 text-zinc-700" />
            <span>GitHub Commit</span>
          </div>
          <span className="text-zinc-300">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-[#3b42c4]" />
            <span>LinkedIn Post Proof</span>
          </div>
        </div>

        <button
          onClick={() => navigateWithTransition(`/day/${challenge.day}`)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#111111] text-white font-bold text-sm border border-transparent shadow-md btn-interactive-indigo flex items-center justify-center gap-2 group/btn cursor-pointer"
        >
          {isCompleted ? (
            <>
              <span>Review Day {challenge.day} Proof</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white shrink-0" />
              <span>Continue Today's Build</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
