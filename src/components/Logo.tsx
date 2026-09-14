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
      {/* TST Geometric Hexagon Monogram */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Ambient Glow */}
        <div 
          className="absolute -inset-1 rounded-full blur-md opacity-40 transition-opacity duration-300 group-hover:opacity-80 bg-cyan-500/30" 
        />

        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="relative z-10 transition-colors duration-300 text-cyan-600 group-hover:text-cyan-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          {/* Left T */}
          <path
            d="M 12 40 L 32 28 L 32 39 L 24 44 L 24 74 L 14 74 L 14 45 L 6 49 Z"
            fill="url(#logoGrad)"
          />
          {/* Right T */}
          <path
            d="M 88 40 L 68 28 L 68 39 L 76 44 L 76 74 L 86 74 L 86 45 L 94 49 Z"
            fill="url(#logoGrad)"
          />
          {/* Central Angular S */}
          <path
            d="M 50 6 L 66 16 L 66 38 L 57 38 L 57 21 L 43 21 L 43 42 L 59 48 L 66 54 L 66 84 L 50 94 L 34 84 L 34 62 L 43 62 L 43 79 L 57 79 L 57 58 L 41 52 L 34 46 L 34 16 Z"
            fill="url(#logoGrad)"
          />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col leading-none">
          <span className={`font-heading font-extrabold tracking-wider text-base sm:text-lg transition-colors ${
            onDark 
              ? 'text-white group-hover:text-cyan-300' 
              : 'text-slate-900 group-hover:text-cyan-600'
          }`}>
            THE STAR
          </span>
          <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase ${
            onDark ? 'text-cyan-400' : 'text-cyan-600'
          }`}>
            TECHNOLOGY
          </span>
        </div>
      )}
    </div>
  );
};
