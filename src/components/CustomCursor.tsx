import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'project' | 'service' | 'button'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest('#projects [class*="group"], [data-cursor="project"]');
      const serviceTarget = target.closest('#services [class*="group"], [data-cursor="service"]');
      const buttonTarget = target.closest('button, a, input, select, textarea');

      if (projectTarget) {
        setCursorVariant('project');
        setCursorText('VIEW →');
      } else if (serviceTarget) {
        setCursorVariant('service');
        setCursorText('EXPLORE');
      } else if (buttonTarget) {
        setCursorVariant('button');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isExpanded = cursorVariant === 'project' || cursorVariant === 'service';
  const size = isExpanded ? 64 : cursorVariant === 'button' ? 24 : 8;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
      {/* Outer Circle / Follower */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-[#080808] select-none pointer-events-none"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          width: size,
          height: size,
          backgroundColor: isExpanded ? '#00C2FF' : cursorVariant === 'button' ? 'rgba(0, 194, 255, 0.2)' : '#00C2FF',
          borderWidth: cursorVariant === 'button' ? 1.5 : 0,
          borderColor: '#00C2FF',
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 350,
          mass: 0.4,
        }}
      >
        {cursorText && (
          <span className="text-[#080808] font-bold tracking-wider uppercase px-1 text-center">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
