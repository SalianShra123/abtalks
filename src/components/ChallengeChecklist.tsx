import React from 'react';
import { Check, Flag } from 'lucide-react';
import { motion } from 'motion/react';

interface ChallengeChecklistProps {
  items: string[];
  checkedIndices: number[];
  onToggle: (index: number) => void;
}

export const ChallengeChecklist: React.FC<ChallengeChecklistProps> = ({
  items,
  checkedIndices,
  onToggle,
}) => {
  const isAllChecked = items.length > 0 && checkedIndices.length === items.length;

  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-200/90 shadow-md kinetic-border-tracer">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#3b42c4] flex items-center justify-center border border-indigo-200/60 shadow-2xs">
            <Flag className="w-4 h-4 text-[#3b42c4]" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#111111]">THE FINISH LINE</h3>
            <p className="text-xs text-[#666666] font-medium">Your build is complete when all items are verified:</p>
          </div>
        </div>

        <span
          className={`text-xs font-mono font-bold px-3 py-1 rounded-full transition-colors ${
            isAllChecked
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs momentum-ripple-node'
              : 'bg-zinc-100 text-[#666666] border border-zinc-200'
          }`}
        >
          {checkedIndices.length} / {items.length} Done
        </span>
      </div>

      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const isChecked = checkedIndices.includes(idx);
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggle(idx)}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold shadow-2xs'
                  : 'bg-white border-zinc-200/80 text-[#111111] hover:border-indigo-300 hover:shadow-xs'
              }`}
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                  isChecked
                    ? 'bg-emerald-600 text-white shadow-2xs scale-105'
                    : 'border-2 border-zinc-300 text-transparent hover:border-[#3b42c4]'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </motion.button>
              <span
                className={`select-none leading-relaxed transition-all duration-200 ${
                  isChecked ? 'line-through text-emerald-800/80 font-normal' : 'font-medium'
                }`}
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

