import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface GrowthBannerProps {
  onStartProject?: () => void;
}

export const GrowthBanner: React.FC<GrowthBannerProps> = ({ onStartProject }) => {
  return (
    <section className="py-24 sm:py-32 relative bg-gradient-to-r from-sky-50/80 via-cyan-50/60 to-blue-50/80 overflow-hidden border-y border-slate-200/90">
      {/* Background Radial Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Exact Upparac Badge: Available for new projects */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-8 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Available for new projects</span>
        </motion.div>

        {/* Headline from Reference: Let's Build Something Great */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 font-heading tracking-tight leading-[1.1] mb-6"
        >
          Let's Build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700">
            Something Great
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          Partner with THE STAR TECHNOLOGY for scalable, client-focused IT & web engineering designed to deliver measurable results.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={onStartProject}
            data-cursor="cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-600/25 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-cyan-400 transition-all duration-300"
          >
            <Phone className="w-4 h-4 text-cyan-600" />
            <span>Call {COMPANY_INFO.formattedPhone}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
