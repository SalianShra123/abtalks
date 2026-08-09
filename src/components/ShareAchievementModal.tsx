import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Award, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface ShareAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  track?: string;
  profileUrl?: string;
}

export const ShareAchievementModal: React.FC<ShareAchievementModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Shravya',
  track = 'Frontend Developer',
  profileUrl = window.location.origin + '/profile/shravya',
}) => {
  const [copied, setCopied] = useState(false);
  const [linkedInShared, setLinkedInShared] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLinkedIn = () => {
    setLinkedInShared(true);
    const text = encodeURIComponent(
      `I completed 60 Days of building with ABTalks! 60 builds, 60 proofs of work, and visible proof of consistency. Check out my 60-day portfolio: ${profileUrl}`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}&text=${text}`, '_blank');
    setTimeout(() => setLinkedInShared(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="w-full max-w-lg bg-[#FAFAF8] rounded-3xl border border-zinc-200/90 shadow-2xl overflow-hidden relative"
        >
          {/* Top Bar Accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#3b42c4] via-indigo-500 to-amber-500 w-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
                <Sparkles className="w-3 h-3 text-[#3b42c4]" />
                SHARE YOUR PROOF
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                I COMPLETED 60 DAYS WITH ABTALKS.
              </h2>
              <p className="text-xs text-[#666666]">
                Share your verified 60-day proof of work portfolio with your network and recruiters.
              </p>
            </div>

            {/* Preview Card */}
            <motion.div
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#111111] via-[#1a1a2e] to-[#0f172a] text-white border border-zinc-800 shadow-xl relative overflow-hidden group"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                    AB
                  </div>
                  <span className="font-bold text-sm tracking-tight">ABTalks</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  VERIFIED BUILDER
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-black text-white">{studentName}</h3>
                  <p className="text-xs font-mono text-indigo-300 font-semibold">{track}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">60-Day Challenge</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">✓ Completed</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-sm font-black font-mono text-white">60</div>
                    <div className="text-[9px] font-mono uppercase text-zinc-400">Builds</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-sm font-black font-mono text-white">60</div>
                    <div className="text-[9px] font-mono uppercase text-zinc-400">Proofs</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-sm font-black font-mono text-white">60</div>
                    <div className="text-[9px] font-mono uppercase text-zinc-400">Days</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-zinc-50 text-[#111111] border border-zinc-300'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>LINK COPIED ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#3b42c4]" />
                    <span>COPY PROFILE LINK</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareLinkedIn}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  linkedInShared
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#111111] hover:bg-[#3b42c4] text-white'
                }`}
              >
                {linkedInShared ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>READY TO SHARE ✓</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-indigo-300" />
                    <span>SHARE ON LINKEDIN</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
