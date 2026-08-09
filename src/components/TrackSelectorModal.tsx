import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Layout, Server, Cpu, Database, Smartphone, Cloud, ArrowRight, Check } from 'lucide-react';

interface TrackSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackName: string) => void;
  currentTrack?: string;
}

export const availableTracks = [
  {
    name: 'Frontend Development',
    icon: Layout,
    description: 'React 18+, TypeScript, Next.js, Framer Motion, Tailwind CSS & State Management.',
    tag: '60 DAY TRACK',
  },
  {
    name: 'Backend Development',
    icon: Server,
    description: 'Node.js Express, REST APIs, PostgreSQL, Redis Caching, Auth & Rate Limiting.',
    tag: '60 DAY TRACK',
  },
  {
    name: 'Full Stack Development',
    icon: Cpu,
    description: 'End-to-end Web Architecture, Microservices, System Design & Cloud Deployment.',
    tag: '60 DAY TRACK',
  },
  {
    name: 'AI / Machine Learning',
    icon: Sparkles,
    description: 'Gemini API, LLM Prompt Engineering, Vector Databases, Embeddings & RAG Apps.',
    tag: '60 DAY TRACK',
  },
  {
    name: 'Data Science',
    icon: Database,
    description: 'Python Data Analysis, SQL Queries, Pandas Dataframes & Interactive Dashboards.',
    tag: '60 DAY TRACK',
  },
  {
    name: 'Mobile Development',
    icon: Smartphone,
    description: 'React Native, Expo, Cross-Platform UI, Push Notifications & Mobile State.',
    tag: '60 DAY TRACK',
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    description: 'Docker Containers, CI/CD Pipelines, Kubernetes, Cloud Run & Terraform IaC.',
    tag: '60 DAY TRACK',
  },
];

export const TrackSelectorModal: React.FC<TrackSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
  currentTrack,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>(currentTrack || availableTracks[1].name);

  const handleConfirm = () => {
    onSelectTrack(selectedTrack);
    onClose();
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
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#3b42c4] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
                <Sparkles className="w-3 h-3 text-[#3b42c4]" />
                CONTINUOUS MASTERY
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                START ANOTHER 60-DAY CHALLENGE
              </h2>
              <p className="text-xs text-[#666666]">
                Select your next track. Your completed 60-day challenge will be safely archived in <strong className="text-zinc-900">MY JOURNEYS</strong>.
              </p>
            </div>

            {/* Track Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {availableTracks.map((t) => {
                const IconComponent = t.icon;
                const isSelected = selectedTrack === t.name;

                return (
                  <motion.div
                    key={t.name}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrack(t.name)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-indigo-50/70 border-[#3b42c4] shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-white hover:bg-zinc-50 border-zinc-200/90'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#3b42c4] text-white' : 'bg-zinc-100 text-zinc-700'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#3b42c4] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-[9px] font-mono font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                          {t.tag}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#111111]">{t.name}</h4>
                      <p className="text-[11px] text-[#666666] leading-tight mt-1 line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Confirm CTA */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-3">
              <div className="text-xs font-mono text-zinc-600">
                Selected: <strong className="text-zinc-900">{selectedTrack}</strong>
              </div>

              <button
                onClick={handleConfirm}
                className="px-5 py-3 rounded-xl bg-[#111111] hover:bg-[#3b42c4] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md group"
              >
                <span>BEGIN DAY 01 / 60</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
