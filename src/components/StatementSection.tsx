import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const StatementSection: React.FC = () => {
  const statements = [
    { prefix: "WE BUILD", highlight: "BRAND EXPERIENCES." },
    { prefix: "WE BUILD", highlight: "CUSTOMER TRUST." },
    { prefix: "WE BUILD", highlight: "DIGITAL PRESENCE." },
    { prefix: "WE BUILD", highlight: "BUSINESS GROWTH." },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#f1f5f9] border-y border-slate-200/90 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-400/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow / Premise */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/70 border border-cyan-300 text-cyan-900 text-xs sm:text-sm font-bold tracking-wider uppercase mb-8 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>OUR PROMISE & PURPOSE</span>
        </motion.div>

        {/* Lead Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-500 font-heading tracking-tight mb-12 sm:mb-14"
        >
          WE DON'T JUST BUILD WEBSITES.
        </motion.h2>

        {/* Animated Rhythmic Statements */}
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
          {statements.map((stmt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-4 sm:p-6 rounded-2xl bg-white hover:bg-white border border-slate-200/90 hover:border-cyan-400 transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 shadow-sm hover:shadow-lg hover:shadow-cyan-900/10 hover:-translate-y-0.5"
            >
              <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-400 tracking-tight group-hover:text-slate-600 transition-colors">
                {stmt.prefix}
              </span>
              <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 tracking-tight transition-all">
                {stmt.highlight}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
