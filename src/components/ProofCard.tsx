import React from 'react';
import { GitCommit, Linkedin, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';

interface ProofCardProps {
  totalBuilds: number;
  githubSubmissions: number;
  linkedInPosts: number;
}

export const ProofCard: React.FC<ProofCardProps> = ({
  totalBuilds = 12,
  githubSubmissions = 11,
  linkedInPosts = 10,
}) => {
  const githubPercent = Math.min(100, Math.round((githubSubmissions / totalBuilds) * 100));
  const linkedInPercent = Math.min(100, Math.round((linkedInPosts / totalBuilds) * 100));

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-md kinetic-border-tracer">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3b42c4] font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200/80 tag-interactive-indigo">
            PROOF OF WORK
          </span>
          <h3 className="text-lg font-black text-[#111111] mt-1.5">Your Visible Proof Record</h3>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-[#111111] font-mono">{totalBuilds}</span>
          <span className="text-xs text-[#666666] font-medium block">Total Builds</span>
        </div>
      </div>

      <p className="text-xs text-[#666666] mb-4 leading-relaxed">
        Every challenge requires dual evidence. Recruiters evaluate what you built and how consistently you shipped.
      </p>

      {/* GitHub Proof Progress Bar */}
      <div className="space-y-3">
        <div className="bg-white/90 p-3 rounded-xl border border-zinc-200/80 shadow-2xs tag-interactive-indigo">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2 font-bold text-[#111111]">
              <GitCommit className="w-4 h-4 text-[#111111]" />
              <span>GitHub Repositories</span>
            </div>
            <span className="font-mono text-[#3b42c4] font-extrabold">
              {githubSubmissions} / {totalBuilds} ({githubPercent}%)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200/60">
            <div
              className="h-full bg-[#3b42c4] transition-all duration-500 rounded-full"
              style={{ width: `${githubPercent}%` }}
            />
          </div>
        </div>

        {/* LinkedIn Proof Progress Bar */}
        <div className="bg-white/90 p-3 rounded-xl border border-zinc-200/80 shadow-2xs tag-interactive-indigo">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2 font-bold text-[#111111]">
              <Linkedin className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>LinkedIn Posts</span>
            </div>
            <span className="font-mono text-[#3b42c4] font-extrabold">
              {linkedInPosts} / {totalBuilds} ({linkedInPercent}%)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200/60">
            <div
              className="h-full bg-[#3b42c4] transition-all duration-500 rounded-full"
              style={{ width: `${linkedInPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-[#666666]">
        <span className="status-tag inline-flex items-center gap-1 font-semibold">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          Verified Proof Ledger Active
        </span>
        <span className="font-mono text-[#3b42c4] font-bold">Public Portfolio Ready</span>
      </div>
    </div>
  );
};
