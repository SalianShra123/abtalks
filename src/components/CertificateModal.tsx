import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Check, Award, ShieldCheck, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  track?: string;
  completionDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName = 'SHRAVYA',
  track = 'Frontend Development',
  completionDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
}) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'ready'>('idle');

  const handleDownload = () => {
    setDownloadState('preparing');
    setTimeout(() => {
      setDownloadState('ready');
      setTimeout(() => setDownloadState('idle'), 4000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="w-full max-w-2xl bg-white rounded-3xl border border-zinc-200/90 shadow-2xl overflow-hidden relative my-auto"
        >
          {/* Top Bar Accent */}
          <div className="h-2 bg-gradient-to-r from-[#3b42c4] via-indigo-500 to-amber-500 w-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-10 space-y-6">
            {/* Header Note */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#3b42c4]" />
                  VERIFIED ACHIEVEMENT CERTIFICATE
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-600">ID: ABT-2026-60D-012</span>
            </div>

            {/* Certificate Preview Document Frame */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#FAFAF8] border-2 border-dashed border-zinc-300 relative text-center space-y-6 shadow-inner overflow-hidden">
              {/* Corner Watermark Accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-indigo-600/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-indigo-600/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-indigo-600/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-indigo-600/40" />

              {/* ABTalks Brand Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#111111] text-white font-mono font-black text-lg shadow-md mb-2">
                  AB
                </div>
                <h3 className="text-xl font-extrabold tracking-tight text-[#111111]">ABTalks</h3>
                <p className="text-[11px] font-mono uppercase tracking-widest text-indigo-700 font-bold">
                  Visible Proof Platform
                </p>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
                  Certificate of Completion
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                  60-DAY CODING CHALLENGE
                </h2>
              </div>

              {/* Recipient */}
              <div className="space-y-2 py-2">
                <p className="text-xs font-serif text-zinc-600 italic">This certifies that</p>
                <div className="text-2xl sm:text-3xl font-black text-[#3b42c4] uppercase tracking-wider underline decoration-indigo-200 underline-offset-8">
                  {studentName}
                </div>
                <p className="text-xs font-serif text-zinc-600 italic pt-2">
                  has successfully completed
                </p>
                <p className="text-base font-black text-[#111111] uppercase tracking-wide">
                  60 DAYS OF BUILDING
                </p>
              </div>

              {/* Track & Proof Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto">
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div className="text-[10px] font-mono uppercase text-zinc-600 font-bold">Track</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5 truncate">{track}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div className="text-[10px] font-mono uppercase text-zinc-600 font-bold">Proofs</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">60 GitHub / 60 LinkedIn</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                  <div className="text-[10px] font-mono uppercase text-zinc-600 font-bold">Date</div>
                  <div className="text-xs font-bold text-zinc-900 mt-0.5">{completionDate}</div>
                </div>
              </div>

              {/* Verified Badge & Footer */}
              <div className="pt-4 flex items-center justify-between border-t border-zinc-200/80 text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-[10px] font-mono font-bold text-zinc-900">VERIFIED ON-CHAIN</div>
                    <div className="text-[9px] font-mono text-zinc-600">Proof Hash: 0x60d...abf9</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif italic text-xs text-zinc-800 font-bold">ABTalks Academic Council</div>
                  <div className="text-[9px] font-mono text-zinc-600">Official Certification</div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-2">
              <button
                onClick={handleDownload}
                disabled={downloadState === 'preparing'}
                className={`w-full py-3.5 px-5 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  downloadState === 'ready'
                    ? 'bg-emerald-600 text-white'
                    : downloadState === 'preparing'
                    ? 'bg-indigo-700 text-white animate-pulse'
                    : 'bg-[#111111] hover:bg-[#3b42c4] text-white'
                }`}
              >
                {downloadState === 'preparing' ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-indigo-300" />
                    <span>PREPARING CERTIFICATE...</span>
                  </>
                ) : downloadState === 'ready' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>CERTIFICATE READY ✓</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-indigo-300" />
                    <span>DOWNLOAD CERTIFICATE</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-zinc-600 font-mono">
                Note: Certificate generation simulation for preview. Official PDF export supported.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
