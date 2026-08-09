import React, { useState } from 'react';
import { ChallengeDay } from '../types';
import { Check, Flame, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePageTransition } from '../context/TransitionContext';

interface DayJourneyGridProps {
  days: ChallengeDay[];
  currentDay?: number;
  compact?: boolean;
  interactive?: boolean;
  onSelectDay?: (dayNumber: number) => void;
}

export const DayJourneyGrid: React.FC<DayJourneyGridProps> = ({
  days,
  currentDay = 12,
  compact = false,
  interactive = true,
  onSelectDay,
}) => {
  const { navigateWithTransition } = usePageTransition();
  const [hoveredDay, setHoveredDay] = useState<ChallengeDay | null>(null);

  const completedCount = days.filter((d) => d.status === 'completed').length;
  const missedCount = days.filter((d) => d.status === 'missed').length;

  const handleDayClick = (dayNumber: number) => {
    if (onSelectDay) {
      onSelectDay(dayNumber);
    } else {
      // Navigate to challenge day page
      navigateWithTransition(`/day/${dayNumber}`);
    }
  };

  if (compact) {
    // Compact Hero Version (60 dots in 6 rows of 10)
    return (
      <div className="w-full glass-card rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-lg">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="font-mono uppercase font-semibold text-zinc-900 tracking-wider">
              60-Day Progress Signature
            </span>
          </div>
          <span className="text-zinc-600 font-mono">
            {completedCount} / 60 Days
          </span>
        </div>

        <div className="grid grid-cols-10 gap-1.5 sm:gap-2 my-2">
          {days.map((day) => {
            const isCompleted = day.status === 'completed';
            const isCurrent = day.status === 'current' || day.day === currentDay;
            const isMissed = day.status === 'missed';

            let stateClass = '';
            let textClass = 'text-zinc-700';

            if (isCompleted) {
              stateClass = 'completed text-white';
              textClass = 'text-white';
            } else if (isCurrent) {
              stateClass = 'current text-white font-bold';
              textClass = 'text-white';
            } else if (isMissed) {
              stateClass = 'bg-amber-100 border border-amber-300 text-amber-800';
              textClass = 'text-amber-800';
            }

            return (
              <motion.div
                key={day.day}
                className={`matrix-dot flex items-center justify-center text-[10px] sm:text-xs font-mono select-none ${stateClass}`}
                onClick={() => handleDayClick(day.day)}
                title={`Day ${day.day}: ${day.title} (${day.status})`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <span className={textClass}>{day.day}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-600 font-mono">
          <span className="text-indigo-600 font-semibold">● Day 01 Start</span>
          <span>● Day 30 Midpoint</span>
          <span className="text-zinc-600">● Day 60 Complete</span>
        </div>
      </div>
    );
  }

  // Full Dashboard Version
  return (
    <div className="w-full glass-card rounded-2xl p-4 sm:p-6 border border-zinc-200/90 shadow-xl relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Your 60-Day Journey</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/60">
              {completedCount} / 60 Complete
            </span>
          </div>
          <p className="text-xs text-zinc-600 mt-0.5">
            Every square represents a day of building & publishing visible evidence.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-zinc-600 font-medium overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded bg-indigo-600 flex items-center justify-center text-white text-[8px]">✓</span>
            <span>Completed ({completedCount})</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded bg-zinc-900 ring-2 ring-indigo-500/50" />
            <span>Current (Day {currentDay})</span>
          </div>
          {missedCount > 0 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
              <span>Missed ({missedCount})</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded bg-zinc-100 border border-zinc-200" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      {/* Interactive 60-Day Grid */}
      <div className="grid grid-cols-10 sm:grid-cols-12 gap-1.5 sm:gap-2.5 my-2">
        {days.map((day) => {
          const isCurrent = day.day === currentDay || day.status === 'current';
          const isCompleted = day.status === 'completed';
          const isMissed = day.status === 'missed';

          let stateClass = '';
          if (isCompleted) {
            stateClass = 'completed text-white';
          } else if (isCurrent) {
            stateClass = 'current text-white font-bold';
          } else if (isMissed) {
            stateClass = 'bg-amber-100 border border-amber-300 text-amber-800';
          }

          return (
            <div
              key={day.day}
              className="relative group"
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <button
                onClick={() => handleDayClick(day.day)}
                className={`matrix-dot w-full flex items-center justify-center text-xs font-mono font-semibold ${stateClass}`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isMissed ? (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <span>{day.day}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Day Hover Detail Banner */}
      <div className="mt-4 pt-3 border-t border-zinc-100 min-h-[50px] flex items-center justify-between text-xs text-zinc-600">
        {hoveredDay ? (
          <div className="flex items-center justify-between w-full bg-zinc-50 rounded-xl p-2.5 border border-zinc-200/80">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-zinc-900">DAY {hoveredDay.day}:</span>
              <span className="font-medium text-zinc-800 line-clamp-1">{hoveredDay.title}</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-200 text-zinc-700 uppercase font-mono hidden sm:inline">
                {hoveredDay.category}
              </span>
            </div>
            <button
              onClick={() => handleDayClick(hoveredDay.day)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0 ml-2"
            >
              <span>View Challenge</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full text-zinc-600 text-xs">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Hover or tap any day to preview the challenge payload & proof status.
            </span>
            <span className="font-mono text-[11px] text-zinc-600 hidden sm:inline">
              Target: 60 Days / 60 Builds
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
