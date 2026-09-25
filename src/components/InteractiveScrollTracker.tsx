import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, ArrowDown, Compass } from 'lucide-react';

export const InteractiveScrollTracker: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showScrollControls, setShowScrollControls] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
      setShowScrollControls(latest > 0.02);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollDownOneScreen = () => {
    window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top glowing progress bar */}
      <motion.div
        className="scroll-tracker"
        style={{ scaleX }}
      />

      {/* Floating Glassmorphic Scroll Dock */}
      {showScrollControls && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-full frosted-glass shadow-[0_12px_32px_rgba(0,0,0,0.85)] border border-white/20 select-none"
        >
          {/* Water drop scroll percentage indicator */}
          <div className="w-8 h-8 rounded-full water-drop flex items-center justify-center font-mono text-[10px] font-bold text-white shadow-inner">
            {scrollPercentage}%
          </div>

          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={scrollDownOneScreen}
            title="Scroll down"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </>
  );
};
