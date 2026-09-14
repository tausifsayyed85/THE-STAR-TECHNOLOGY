import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/companyData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-white border-t border-slate-200/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header from reference */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>CLIENT PERSPECTIVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Don't Take Our Word For It
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Real outcomes and feedback from founders and business operators who partnered with THE STAR TECHNOLOGY.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-200 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-cyan-900/5 group"
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-500 ml-2">5.0</span>
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Project info */}
              <div className="pt-6 border-t border-slate-200 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-heading font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
                  {t.initials}
                </div>

                <div className="leading-tight">
                  <h4 className="text-base font-extrabold text-slate-900 font-heading">
                    {t.clientName}
                  </h4>
                  <div className="text-xs text-cyan-700 font-bold mt-0.5">
                    {t.company}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Verified Project • {t.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
