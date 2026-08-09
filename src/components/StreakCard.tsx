import React from 'react';
import { Flame, CheckCircle2, Trophy, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface StreakCardProps {
  streakDays: number;
  isFirstDay?: boolean;
  isMissedDay?: boolean;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  streakDays = 12,
  isFirstDay = false,
  isMissedDay = false,
}) => {
  // Weekly days checklist (Mon-Sun)
  const weekDays = [
    { day: 'M', checked: !isFirstDay },
    { day: 'T', checked: !isFirstDay },
    { day: 'W', checked: !isFirstDay },
    { day: 'T', checked: !isFirstDay },
    { day: 'F', checked: !isFirstDay },
    { day: 'S', checked: !isFirstDay && !isMissedDay },
    { day: 'S', checked: !isFirstDay && !isMissedDay },
  ];

  if (isFirstDay) {
    return (
      <div className="glass-card rounded-2xl p-5 border border-indigo-200/80 bg-gradient-to-br from-indigo-50/50 via-white to-amber-50/30 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 font-bold px-2 py-0.5 rounded-full bg-indigo-100/80 border border-indigo-200">
              Welcome to Day 01
            </span>
            <h3 className="text-xl font-bold text-zinc-900 mt-2">Every streak starts with one build.</h3>
            <p className="text-xs text-zinc-600 mt-1 max-w-sm">
              You haven't built a streak yet. Complete Day 01 today to unlock your first active streak dot!
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-lg shadow-md shrink-0">
            01
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
          <span className="font-mono font-medium">Target: 60 Days Streak</span>
          <span className="text-indigo-600 font-semibold flex items-center gap-1">
            Start Day 01 Challenge →
          </span>
        </div>
      </div>
    );
  }

  if (isMissedDay) {
    return (
      <div className="glass-card rounded-2xl p-5 border border-amber-200 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200">
              DAY 11 MISSED
            </span>
            <h3 className="text-lg font-bold text-zinc-900 mt-2">You didn't lose your journey.</h3>
            <p className="text-xs text-zinc-600 mt-1 max-w-sm">
              Momentum can pause, but the journey continues. Complete today's build to resume your 60-day progress immediately.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-mono font-bold text-lg shadow-md shrink-0">
            11
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-100/80 flex items-center justify-between text-xs">
          <span className="text-amber-800 font-medium">Day 11: Missed • Day 12: Active</span>
          <span className="text-amber-900 font-semibold">Resume Build →</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-md flex flex-col justify-between kinetic-border-tracer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 flame-bonfire-ignition relative">
            <Flame className="w-6 h-6 fill-amber-100 text-amber-500" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#111111] tracking-tight font-mono">
                {streakDays}
              </span>
              <span className="text-xs font-extrabold text-[#3b42c4] uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                DAY STREAK
              </span>
            </div>
            <p className="text-xs text-[#666666] font-medium mt-0.5">
              You've shown up for {streakDays} consecutive days.
            </p>
          </div>
        </div>
      </div>

      {/* Week Tracker */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100">
        <div className="text-[11px] font-mono text-[#666666] uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>This Week's Momentum</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 font-bold flex items-center gap-1 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% Active Consistency
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {weekDays.map((w, idx) => (
            <div
              key={idx}
              style={{ animationDelay: `${idx * 0.4}s` }}
              className={`p-2 rounded-xl border text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                w.checked
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 font-bold shadow-2xs momentum-ripple-node hover:scale-105'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-400'
              }`}
            >
              <span className="text-[10px] font-mono font-bold">{w.day}</span>
              {w.checked ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
