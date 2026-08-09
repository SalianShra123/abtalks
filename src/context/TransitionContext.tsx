import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface TransitionContextType {
  navigateWithTransition: (to: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);

  const navigateWithTransition = (to: string) => {
    if (isTransitioning) return;
    setNextPath(to);
    setIsTransitioning(true);

    // Phase 1: Panels close & meet in middle (approx 350ms)
    setTimeout(() => {
      navigate(to);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      
      // Phase 2: Content swapped, panels slide open (approx 400ms)
      setTimeout(() => {
        setIsTransitioning(false);
        setNextPath(null);
      }, 350);
    }, 320);
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-50 pointer-events-none flex overflow-hidden">
            {/* Left Curtain Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-zinc-950/95 backdrop-blur-2xl border-r border-indigo-500/20 shadow-2xl flex items-center justify-end pr-6 text-white/70"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span className="code-font text-xs uppercase tracking-widest text-indigo-300/80">ABTALKS</span>
              </div>
            </motion.div>

            {/* Right Curtain Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-zinc-950/95 backdrop-blur-2xl border-l border-indigo-500/20 shadow-2xl flex items-center justify-start pl-6 text-white/70"
            >
              <span className="code-font text-xs uppercase tracking-widest text-zinc-400">BUILD • PROVE • REPEAT</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
