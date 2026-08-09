import React from 'react';
import { usePageTransition } from '../context/TransitionContext';
import { GitCommit, Linkedin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateWithTransition } = usePageTransition();

  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-zinc-900 font-extrabold flex items-center justify-center text-sm shadow-md">
              AB
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-tight">ABTalks</div>
              <div className="text-xs text-zinc-500 font-mono">60 Days • 60 Builds • Visible Proof</div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 text-xs text-zinc-300 font-medium">
            <button
              onClick={() => navigateWithTransition('/')}
              className="hover:text-white transition-colors"
            >
              Product Overview
            </button>
            <button
              onClick={() => navigateWithTransition('/dashboard')}
              className="hover:text-white transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigateWithTransition('/day/12')}
              className="hover:text-white transition-colors"
            >
              Day 12 Challenge
            </button>
          </div>
        </div>

        {/* Micro Copy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <div>
            Built for Indian college students building coding consistency.
          </div>
          <div className="font-mono text-[11px] text-zinc-600">
            Consistency becomes visible when you leave proof behind.
          </div>
        </div>
      </div>
    </footer>
  );
};
