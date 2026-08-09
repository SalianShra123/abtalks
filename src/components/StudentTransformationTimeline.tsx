import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const StudentTransformationTimeline: React.FC = () => {
  return (
    <section className="w-full py-10 px-4 sm:px-6 md:px-8 bg-[#faf9f6] rounded-3xl border border-[#e5e4e0] my-12 font-sans selection:bg-[#3b42c4] selection:text-white">
      {/* CSS Keyframe Animations for Progress Infusion Wave */}
      <style>{`
        /* Card Elevate Activation Keyframes */
        @keyframes elevateCard1 {
          0%, 100% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
          2%, 14% { transform: translateY(-4px); border-color: #3b42c4; box-shadow: 0 12px 28px -6px rgba(59, 66, 196, 0.16); }
          18%, 85% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
        }

        @keyframes elevateCard2 {
          0%, 12%, 100% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
          14%, 26% { transform: translateY(-4px); border-color: #3b42c4; box-shadow: 0 12px 28px -6px rgba(59, 66, 196, 0.16); }
          30%, 85% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
        }

        @keyframes elevateCard3 {
          0%, 24%, 100% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
          26%, 38% { transform: translateY(-4px); border-color: #3b42c4; box-shadow: 0 12px 28px -6px rgba(59, 66, 196, 0.16); }
          42%, 85% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
        }

        @keyframes elevateCard4 {
          0%, 36%, 100% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
          38%, 50% { transform: translateY(-4px); border-color: #3b42c4; box-shadow: 0 12px 28px -6px rgba(59, 66, 196, 0.16); }
          54%, 85% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
        }

        @keyframes elevateCard5 {
          0%, 48%, 100% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
          50%, 85% { transform: translateY(-4px); border-color: #3b42c4; box-shadow: 0 12px 28px -6px rgba(59, 66, 196, 0.16); }
          90% { transform: translateY(0); border-color: #e5e4e0; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); }
        }

        /* Progress Bar Fill Keyframes */
        @keyframes waveCard1 {
          0% { width: 0%; }
          12%, 85% { width: 35%; }
          95%, 100% { width: 0%; }
        }

        @keyframes waveCard2 {
          0%, 12% { width: 0%; }
          24%, 85% { width: 55%; }
          95%, 100% { width: 0%; }
        }

        @keyframes waveCard3 {
          0%, 24% { width: 0%; }
          36%, 85% { width: 70%; }
          95%, 100% { width: 0%; }
        }

        @keyframes waveCard4 {
          0%, 36% { width: 0%; }
          48%, 85% { width: 85%; }
          95%, 100% { width: 0%; }
        }

        @keyframes waveCard5 {
          0%, 48% { width: 0%; }
          60%, 85% { width: 100%; }
          95%, 100% { width: 0%; }
        }

        /* Animation Assignments */
        .anim-card-1 { animation: elevateCard1 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-card-2 { animation: elevateCard2 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-card-3 { animation: elevateCard3 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-card-4 { animation: elevateCard4 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-card-5 { animation: elevateCard5 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }

        .anim-bar-1 { animation: waveCard1 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-bar-2 { animation: waveCard2 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-bar-3 { animation: waveCard3 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-bar-4 { animation: waveCard4 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .anim-bar-5 { animation: waveCard5 10s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      `}</style>

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3b42c4]/10 border border-[#3b42c4]/20 text-[#3b42c4] text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#3b42c4] animate-pulse" />
          <span>THE TRANSFORMATION</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
          From "I want to learn" to "I have 60 days of proof."
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
          Watch real daily builder habits compound into a verifiable engineering track record.
        </p>
      </div>

      {/* Timeline Wrapper with Flat Progression Track Line */}
      <div className="relative max-w-5xl mx-auto">
        {/* Desktop Horizontal Connecting Track */}
        <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-[#e5e4e0] z-0 pointer-events-none" />

        {/* 5 Milestone Cards Grid (Horizontal on Desktop, Vertical Stack on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          
          {/* CARD 1 */}
          <div className="anim-card-1 bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e4e0] shadow-2xs flex flex-col justify-between transition-all duration-300 will-change-transform group cursor-default">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#3b42c4] uppercase tracking-widest bg-[#3b42c4]/5 px-2 py-0.5 rounded border border-[#3b42c4]/15">
                  DAY 01
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3b42c4] animate-ping" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] tracking-tight group-hover:text-[#3b42c4] transition-colors">
                Starting
              </h3>
              <p className="text-xs text-[#666666] mt-1 leading-snug">
                First commit pushed
              </p>
            </div>
            {/* Thin 4px horizontal progress loader track */}
            <div className="w-full h-1 bg-[#f0efe9] rounded-full overflow-hidden mt-4">
              <div className="anim-bar-1 h-full bg-[#3b42c4] rounded-full" />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="anim-card-2 bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e4e0] shadow-2xs flex flex-col justify-between transition-all duration-300 will-change-transform group cursor-default">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#3b42c4] uppercase tracking-widest bg-[#3b42c4]/5 px-2 py-0.5 rounded border border-[#3b42c4]/15">
                  DAY 15
                </span>
                <span className="text-[10px] font-mono text-[#666666]">Phase 2</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] tracking-tight group-hover:text-[#3b42c4] transition-colors">
                Momentum
              </h3>
              <p className="text-xs text-[#666666] mt-1 leading-snug">
                2-week habit formed
              </p>
            </div>
            {/* Thin 4px horizontal progress loader track */}
            <div className="w-full h-1 bg-[#f0efe9] rounded-full overflow-hidden mt-4">
              <div className="anim-bar-2 h-full bg-[#3b42c4] rounded-full" />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="anim-card-3 bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e4e0] shadow-2xs flex flex-col justify-between transition-all duration-300 will-change-transform group cursor-default">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#3b42c4] uppercase tracking-widest bg-[#3b42c4]/5 px-2 py-0.5 rounded border border-[#3b42c4]/15">
                  DAY 30
                </span>
                <span className="text-[10px] font-mono text-[#666666]">50%</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] tracking-tight group-hover:text-[#3b42c4] transition-colors">
                Halfway
              </h3>
              <p className="text-xs text-[#666666] mt-1 leading-snug">
                15 full projects built
              </p>
            </div>
            {/* Thin 4px horizontal progress loader track */}
            <div className="w-full h-1 bg-[#f0efe9] rounded-full overflow-hidden mt-4">
              <div className="anim-bar-3 h-full bg-[#3b42c4] rounded-full" />
            </div>
          </div>

          {/* CARD 4 */}
          <div className="anim-card-4 bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e4e0] shadow-2xs flex flex-col justify-between transition-all duration-300 will-change-transform group cursor-default">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#3b42c4] uppercase tracking-widest bg-[#3b42c4]/5 px-2 py-0.5 rounded border border-[#3b42c4]/15">
                  DAY 45
                </span>
                <span className="text-[10px] font-mono text-[#666666]">Phase 4</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] tracking-tight group-hover:text-[#3b42c4] transition-colors">
                Consistency
              </h3>
              <p className="text-xs text-[#666666] mt-1 leading-snug">
                Advanced REST & DB
              </p>
            </div>
            {/* Thin 4px horizontal progress loader track */}
            <div className="w-full h-1 bg-[#f0efe9] rounded-full overflow-hidden mt-4">
              <div className="anim-bar-4 h-full bg-[#3b42c4] rounded-full" />
            </div>
          </div>

          {/* CARD 5 */}
          <div className="anim-card-5 bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e4e0] shadow-2xs flex flex-col justify-between transition-all duration-300 will-change-transform group cursor-default">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#3b42c4] uppercase tracking-widest bg-[#3b42c4]/5 px-2 py-0.5 rounded border border-[#3b42c4]/15">
                  DAY 60
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600">✓ Done</span>
              </div>
              <h3 className="text-sm font-bold text-[#111111] tracking-tight group-hover:text-[#3b42c4] transition-colors">
                Proof Complete
              </h3>
              <p className="text-xs text-[#666666] mt-1 leading-snug">
                Recruiter-ready record
              </p>
            </div>
            {/* Thin 4px horizontal progress loader track */}
            <div className="w-full h-1 bg-[#f0efe9] rounded-full overflow-hidden mt-4">
              <div className="anim-bar-5 h-full bg-[#3b42c4] rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
