import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Code, Terminal, ShieldCheck, Flame, Sparkles, Check } from 'lucide-react';

interface MethodStep {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  activeBorder: string;
  iconColor: string;
}

const steps: MethodStep[] = [
  {
    num: '01',
    title: 'CHOOSE',
    subtitle: 'Choose your coding track',
    description: 'Select Full Stack, Backend APIs, or Frontend Engineering tailored specifically for college tech curriculum.',
    icon: Code,
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    activeBorder: 'border-indigo-400/80 shadow-indigo-500/10',
    iconColor: 'text-indigo-600',
  },
  {
    num: '02',
    title: 'BUILD',
    subtitle: 'Complete one challenge every day',
    description: 'Spend 45–60 minutes completing a focused daily task with clear mission objectives and finish line requirements.',
    icon: Terminal,
    accentColor: 'violet',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    activeBorder: 'border-violet-400/80 shadow-violet-500/10',
    iconColor: 'text-violet-600',
  },
  {
    num: '03',
    title: 'PROVE',
    subtitle: 'Submit GitHub & LinkedIn proof',
    description: 'Commit code to your repository and share your learning insights publicly to build social & developer evidence.',
    icon: ShieldCheck,
    accentColor: 'emerald',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    activeBorder: 'border-emerald-400/80 shadow-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
  {
    num: '04',
    title: 'REPEAT',
    subtitle: 'Return tomorrow & scale habits',
    description: 'Maintain your streak, level up your developer portfolio, and build a consistent routine over 60 continuous days.',
    icon: Flame,
    accentColor: 'amber',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    activeBorder: 'border-amber-400/80 shadow-amber-500/10',
    iconColor: 'text-amber-600',
  },
];

export const MethodologyTimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll driven progress hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 25%'],
  });

  // Smooth physical spring interpolation with ultra-clean cubic-bezier-like momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  // Animated pathLength for the snaking SVG line
  const linePathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Card 01 interpolations
  const bgCard1 = useTransform(smoothProgress, [0, 0.08, 0.3], ['#ffffff', '#faf9f6', '#faf9f6']);
  const iconScale1 = useTransform(smoothProgress, [0.02, 0.15, 0.35], [1, 1.3, 1.1]);
  const iconRotate1 = useTransform(smoothProgress, [0.02, 0.15, 0.35], [0, -12, 0]);
  const borderOpacity1 = useTransform(smoothProgress, [0, 0.1, 0.35], [0.3, 1, 0.6]);

  // Card 02 interpolations
  const bgCard2 = useTransform(smoothProgress, [0.25, 0.35, 0.55], ['#ffffff', '#faf9f6', '#faf9f6']);
  const iconScale2 = useTransform(smoothProgress, [0.25, 0.38, 0.58], [1, 1.3, 1.1]);
  const iconRotate2 = useTransform(smoothProgress, [0.25, 0.38, 0.58], [0, 12, 0]);
  const borderOpacity2 = useTransform(smoothProgress, [0.25, 0.35, 0.58], [0.3, 1, 0.6]);

  // Card 03 interpolations
  const bgCard3 = useTransform(smoothProgress, [0.5, 0.6, 0.8], ['#ffffff', '#faf9f6', '#faf9f6']);
  const iconScale3 = useTransform(smoothProgress, [0.5, 0.63, 0.82], [1, 1.3, 1.1]);
  const iconRotate3 = useTransform(smoothProgress, [0.5, 0.63, 0.82], [0, -10, 0]);
  const borderOpacity3 = useTransform(smoothProgress, [0.5, 0.6, 0.82], [0.3, 1, 0.6]);

  // Card 04 interpolations
  const bgCard4 = useTransform(smoothProgress, [0.72, 0.85, 1.0], ['#ffffff', '#faf9f6', '#faf9f6']);
  const iconScale4 = useTransform(smoothProgress, [0.72, 0.88, 1.0], [1, 1.35, 1.1]);
  const iconRotate4 = useTransform(smoothProgress, [0.72, 0.88, 1.0], [0, 15, 0]);
  const borderOpacity4 = useTransform(smoothProgress, [0.72, 0.85, 1.0], [0.3, 1, 1]);

  const bgCards = [bgCard1, bgCard2, bgCard3, bgCard4];
  const iconScales = [iconScale1, iconScale2, iconScale3, iconScale4];
  const iconRotates = [iconRotate1, iconRotate2, iconRotate3, iconRotate4];
  const borderOpacities = [borderOpacity1, borderOpacity2, borderOpacity3, borderOpacity4];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>METHODOLOGY</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-3">
          Choose → Build → Prove → Repeat
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-md mx-auto">
          A simple, focused system designed to turn daily coding habits into verifiable proof.
        </p>
      </div>

      {/* Grid Container & Snaking Indigo Accent Line Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Desktop 2x2 Snaking Accent Line SVG overlay */}
        <div className="hidden sm:block absolute inset-0 pointer-events-none z-10 overflow-visible">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background trace line */}
            <path
              d="M 25 25 L 75 25 C 90 25 90 75 75 75 L 25 75"
              stroke="#E2E8F0"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              fill="none"
            />
            {/* Morphing 1px Indigo Accent Line */}
            <motion.path
              d="M 25 25 L 75 25 C 90 25 90 75 75 75 L 25 75"
              stroke="#4F46E5"
              strokeWidth="1.2"
              fill="none"
              style={{
                pathLength: linePathLength,
              }}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Mobile 1-Column Vertical Snaking Accent Line */}
        <div className="sm:hidden absolute left-[22px] top-6 bottom-6 w-[2px] pointer-events-none z-10 bg-zinc-200/80 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-indigo-500 via-violet-500 to-amber-500 origin-top rounded-full"
            style={{
              scaleY: linePathLength,
              height: '100%',
            }}
          />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const bgCard = bgCards[idx];
            const iconScale = iconScales[idx];
            const iconRotate = iconRotates[idx];
            const borderOpacity = borderOpacities[idx];

            return (
              <motion.div
                key={step.num}
                style={{
                  backgroundColor: bgCard,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  boxShadow: '0 16px 32px -4px rgba(79, 70, 229, 0.08), 0 4px 12px rgba(0,0,0,0.03)',
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 1, 0.5, 1], // Hardware-accelerated cubic-bezier
                }}
                className="step-card relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 group cursor-default shadow-xs flex flex-col justify-between overflow-hidden"
              >
                {/* Active Glow Border Line Overlay */}
                <motion.div
                  style={{ opacity: borderOpacity }}
                  className="absolute inset-0 rounded-2xl border-2 border-indigo-500/70 pointer-events-none transition-opacity duration-300"
                />

                {/* Card Top Row: Number & Animated Icon */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Mobile Node Dot Indicator */}
                      <span className="sm:hidden w-3 h-3 rounded-full bg-indigo-600 border-2 border-white shadow-xs" />
                      <span className="text-xl sm:text-2xl font-mono font-extrabold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                        {step.num} — {step.title}
                      </span>
                    </div>

                    {/* Fluid Scale & Pulse Animated Icon */}
                    <motion.div
                      style={{
                        scale: iconScale,
                        rotate: iconRotate,
                      }}
                      className={`p-2.5 rounded-xl bg-white/90 border border-zinc-200/90 shadow-2xs group-hover:bg-indigo-50/80 group-hover:border-indigo-200 transition-colors duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${step.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </motion.div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {step.subtitle}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Card Bottom Row: Micro Status Pill */}
                <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-mono">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${step.badgeBg}`}>
                    <Check className="w-3 h-3" />
                    <span>STEP {step.num}</span>
                  </span>
                  <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors">
                    Phase {idx + 1} of 4
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
