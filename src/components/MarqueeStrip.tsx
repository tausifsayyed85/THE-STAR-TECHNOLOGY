import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    "WEB DEVELOPMENT",
    "DIGITAL DESIGN",
    "BUSINESS WEBSITES",
    "UI/UX ARCHITECTURE",
    "DIGITAL SOLUTIONS",
    "AI & AUTOMATION",
    "E-COMMERCE STORES",
    "LOCAL SEO & GROWTH",
  ];

  return (
    <div className="relative w-full py-4 sm:py-5 border-y border-slate-200/90 bg-white/90 backdrop-blur-md overflow-hidden select-none shadow-xs">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit animate-[marquee_25s_linear_infinite]">
        {[...Array(4)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-xs sm:text-sm font-heading font-bold tracking-[0.2em] text-slate-700 hover:text-cyan-600 transition-colors px-5 sm:px-8 uppercase whitespace-nowrap">
                  {item}
                </span>
                <span className="text-cyan-600 text-xs">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
