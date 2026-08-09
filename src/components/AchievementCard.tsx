import React from 'react';
import { Achievement } from '../types';
import { GitCommit, Flame, Share2, Award, Zap, Trophy, Lock, CheckCircle2 } from 'lucide-react';

interface AchievementCardProps {
  achievements: Achievement[];
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievements }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitCommit': return <GitCommit className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Share2': return <Share2 className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-md kinetic-border-tracer">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
        <div>
          <h3 className="text-lg font-black text-[#111111]">Builder Milestones</h3>
          <p className="text-xs text-[#666666] mt-0.5 font-medium">
            Earned proof milestones based on consistency and verified submissions.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-50 text-[#3b42c4] border border-indigo-200/80 tag-interactive-indigo">
          {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.map((item) => (
          <div
            key={item.id}
            className={`group p-3.5 rounded-xl border transition-all duration-300 cursor-default ${
              item.unlocked
                ? 'bg-gradient-to-br from-white via-white to-indigo-50/20 border-zinc-200/90 shadow-2xs hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-300 hover:-translate-y-1 hover:scale-[1.02]'
                : 'bg-zinc-50/50 border-zinc-200/50 opacity-60 hover:opacity-85 hover:border-zinc-300 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  item.unlocked
                    ? 'bg-[#111111] text-white shadow-xs group-hover:bg-[#3b42c4] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-indigo-500/30'
                    : 'bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300 group-hover:text-zinc-700'
                }`}
              >
                {getIcon(item.iconName)}
              </div>

              {item.unlocked ? (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs group-hover:border-emerald-300 group-hover:bg-emerald-100/80 transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                  {item.unlockedAt}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-mono text-[#666666] bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200/60 group-hover:bg-zinc-200/70 transition-colors">
                  <Lock className="w-3 h-3 text-zinc-500" />
                  Locked
                </span>
              )}
            </div>

            <div className="font-bold text-xs text-[#111111] group-hover:text-[#3b42c4] transition-colors duration-200">
              {item.title}
            </div>
            <div className="text-[11px] text-[#666666] mt-0.5 line-clamp-2 leading-relaxed group-hover:text-zinc-700 transition-colors">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
