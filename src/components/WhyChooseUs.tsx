import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../data/companyData';
import { Target, Palette, Smartphone, MessageSquare } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Target className="w-6 h-6 text-cyan-600" />;
      case 1:
        return <Palette className="w-6 h-6 text-sky-600" />;
      case 2:
        return <Smartphone className="w-6 h-6 text-indigo-600" />;
      case 3:
        return <MessageSquare className="w-6 h-6 text-teal-600" />;
      default:
        return <Target className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span>VALUE & ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            WHY THE STAR TECHNOLOGY?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            A dedicated technology partner focused on building modern digital assets that drive tangible business results.
          </p>
        </div>

        {/* 4 Large Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1"
            >
              {/* Corner ambient accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-400/10 transition-colors" />

              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-3xl font-extrabold text-slate-300 group-hover:text-cyan-600 transition-colors">
                  {item.number}
                </span>
                <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white transition-all text-cyan-600">
                  {getIcon(idx)}
                </div>
              </div>

              <div className="inline-block text-[11px] font-mono tracking-wider font-extrabold text-cyan-700 uppercase mb-2">
                {item.highlight}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-4 group-hover:text-cyan-700 transition-colors">
                {item.title}
              </h3>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
