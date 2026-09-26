import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  onDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 38,
  withText = true,
  onDark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Official TST Geometric Hexagon Monogram */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Subtle Ambient Tech Glow */}
        <div 
          className={`absolute -inset-1 rounded-full blur-md opacity-30 transition-opacity duration-300 group-hover:opacity-75 ${
            onDark ? 'bg-cyan-400/30' : 'bg-cyan-500/20'
          }`} 
        />

        <svg
          viewBox="0 0 600 600"
          width={size}
          height={size}
          className={`relative z-10 transition-colors duration-200 ${
            onDark 
              ? 'text-white group-hover:text-cyan-400' 
              : 'text-[#080808] group-hover:text-cyan-600'
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor" fillRule="evenodd">
            {/* Left T */}
            <path d="M 200,107.8 L 83.5,175 L 148,212.2 L 148,387.8 L 196,415.5 L 196,110.1 Z" />
            {/* Center S */}
            <path d="M 300,50 L 380,96.2 L 380,215 L 332,215 L 332,135 L 300,116.5 L 268,135 L 268,265 L 380,265 L 380,503.8 L 300,550 L 220,503.8 L 220,385 L 268,385 L 268,465 L 300,483.5 L 332,465 L 332,335 L 220,335 L 220,96.2 Z" />
            {/* Right T */}
            <path d="M 400,107.8 L 516.5,175 L 452,212.2 L 452,387.8 L 404,415.5 L 404,110.1 Z" />
          </g>
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-heading font-black tracking-tight text-base sm:text-lg transition-colors ${
              onDark 
                ? 'text-white group-hover:text-cyan-300' 
                : 'text-[#080808] group-hover:text-cyan-600'
            }`}>
              THE STAR
            </span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold tracking-wider">
              TST
            </span>
          </div>
          <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase transition-colors ${
            onDark ? 'text-cyan-400' : 'text-cyan-600'
          }`}>
            TECHNOLOGY
          </span>
        </div>
      )}
    </div>
  );
};
