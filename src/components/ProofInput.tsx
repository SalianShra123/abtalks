import React from 'react';
import { GitCommit, Linkedin, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProofInputProps {
  githubUrl: string;
  linkedInUrl: string;
  onGithubChange: (val: string) => void;
  onLinkedInChange: (val: string) => void;
  isGithubValid: boolean;
  isLinkedInValid: boolean;
}

export const ProofInput: React.FC<ProofInputProps> = ({
  githubUrl,
  linkedInUrl,
  onGithubChange,
  onLinkedInChange,
  isGithubValid,
  isLinkedInValid,
}) => {
  const handlePasteSampleGithub = () => {
    onGithubChange('https://github.com/shravyams/abtalks-day12-rest-auth');
  };

  const handlePasteSampleLinkedIn = () => {
    onLinkedInChange('https://linkedin.com/posts/shravyams_abtalks-day12-restapi-proof');
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-md kinetic-border-tracer">
      <div className="mb-4 pb-3 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3b42c4] font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200/80 tag-interactive-indigo">
            PROOF OF WORK
          </span>
          <h3 className="text-lg font-black text-[#111111] mt-1">Leave Your Proof</h3>
          <p className="text-xs text-[#666666] font-medium mt-0.5">
            Your work becomes part of your immutable 60-day record. Submit both evidence points below:
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* GitHub Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
              <GitCommit className="w-4 h-4 text-[#111111]" />
              <span>GITHUB REPOSITORY OR COMMIT URL</span>
            </label>

            <AnimatePresence mode="wait">
              {isGithubValid ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-emerald-800 text-xs font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  GitHub verified
                </motion.span>
              ) : (
                <button
                  type="button"
                  onClick={handlePasteSampleGithub}
                  className="text-[11px] font-mono font-bold text-[#3b42c4] hover:text-indigo-800 underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#3b42c4]" />
                  Auto-fill Sample Link
                </button>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => onGithubChange(e.target.value)}
              placeholder="https://github.com/username/repository-or-commit"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-all duration-200 outline-none ${
                isGithubValid
                  ? 'border-emerald-500 bg-emerald-50/30 text-[#111111] font-semibold ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-zinc-300 bg-white text-[#111111] focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20'
              }`}
            />
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#3b42c4] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* LinkedIn Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>LINKEDIN POST URL</span>
            </label>

            <AnimatePresence mode="wait">
              {isLinkedInValid ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-emerald-800 text-xs font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  LinkedIn verified
                </motion.span>
              ) : (
                <button
                  type="button"
                  onClick={handlePasteSampleLinkedIn}
                  className="text-[11px] font-mono font-bold text-[#3b42c4] hover:text-indigo-800 underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#3b42c4]" />
                  Auto-fill Sample Link
                </button>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <input
              type="text"
              value={linkedInUrl}
              onChange={(e) => onLinkedInChange(e.target.value)}
              placeholder="https://linkedin.com/posts/username_abtalks-day12"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-all duration-200 outline-none ${
                isLinkedInValid
                  ? 'border-emerald-500 bg-emerald-50/30 text-[#111111] font-semibold ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-zinc-300 bg-white text-[#111111] focus:border-[#3b42c4] focus:ring-2 focus:ring-[#3b42c4]/20'
              }`}
            />
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#3b42c4] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

