import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring physics for a silky smooth scroll tracking experience
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      id="reading-progress-container"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-slate-200/20"
    >
      <motion.div
        id="scroll-progress-bar"
        className="h-full w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 origin-left shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
