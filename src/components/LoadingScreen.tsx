import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoaded, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center p-6 select-none"
    >
      <div className="w-full max-w-xs space-y-6 flex flex-col items-center">
        {/* TST Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Logo size={56} withText={true} onDark={true} />
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-[2px] bg-neutral-800 overflow-hidden relative">
          <motion.div
            className="h-full bg-[#00C2FF]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Micro Technical Readout */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          <span>INITIALIZING SYSTEMS</span>
          <span className="text-[#00C2FF] font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
