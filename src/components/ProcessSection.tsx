import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 relative bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span>METHODOLOGY & EXECUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            HOW WE WORK
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            From initial business consultation to live production deployment. Clear milestones, transparent updates, and structured craftsmanship.
          </p>
        </div>

        {/* 6-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-2xl bg-slate-50/70 hover:bg-white p-7 border border-slate-200 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-cyan-900/5 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-extrabold tracking-wider text-cyan-700 bg-cyan-100/70 px-3 py-1 rounded-full border border-cyan-200">
                    {step.step}
                  </span>
                  <span className="text-slate-400 font-mono text-xs group-hover:text-slate-600 transition-colors font-semibold">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-2 group-hover:text-cyan-700 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>

                {/* Sub-details */}
                <div className="space-y-2 pt-4 border-t border-slate-200">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
