import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'project' | 'cta' | 'star' | 'hidden'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const starTarget = target.closest('[data-cursor="3d-star"]');
      const projectTarget = target.closest('[data-cursor="project"]');
      const ctaTarget = target.closest('[data-cursor="cta"]');
      const talkTarget = target.closest('[data-cursor="talk"]');
      const linkTarget = target.closest('a, button, [role="button"]');

      if (starTarget) {
        setCursorVariant('star');
        setCursorText('DRAG 3D');
      } else if (projectTarget) {
        setCursorVariant('project');
        setCursorText('VIEW');
      } else if (talkTarget) {
        setCursorVariant('cta');
        setCursorText('TALK');
      } else if (ctaTarget) {
        setCursorVariant('cta');
        setCursorText('OPEN');
      } else if (linkTarget) {
        setCursorVariant('default');
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

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center font-heading text-[10px] font-bold tracking-wider text-white select-none pointer-events-none shadow-lg"
        animate={{
          x: position.x - (cursorVariant === 'star' ? 44 : cursorVariant === 'project' || cursorVariant === 'cta' ? 36 : 14),
          y: position.y - (cursorVariant === 'star' ? 44 : cursorVariant === 'project' || cursorVariant === 'cta' ? 36 : 14),
          width: cursorVariant === 'star' ? 88 : cursorVariant === 'project' || cursorVariant === 'cta' ? 72 : 28,
          height: cursorVariant === 'star' ? 88 : cursorVariant === 'project' || cursorVariant === 'cta' ? 72 : 28,
          backgroundColor: cursorVariant === 'star' ? 'rgba(14, 165, 233, 0.88)' : cursorVariant === 'project' || cursorVariant === 'cta' ? '#0284c7' : 'rgba(2, 132, 199, 0.12)',
          borderColor: cursorVariant === 'star' ? '#38bdf8' : cursorVariant === 'project' || cursorVariant === 'cta' ? '#0284c7' : 'rgba(2, 132, 199, 0.4)',
          borderWidth: cursorVariant === 'star' ? 2 : cursorVariant === 'project' || cursorVariant === 'cta' ? 0 : 1.5,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 340,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="text-white font-extrabold tracking-widest text-[11px] animate-fade-in text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      {cursorVariant === 'default' && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-600 pointer-events-none"
          animate={{
            x: position.x - 3,
            y: position.y - 3,
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 700,
            mass: 0.1,
          }}
        />
      )}
    </div>
  );
};
