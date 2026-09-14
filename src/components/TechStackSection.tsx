import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Globe, Cpu, CheckCircle } from 'lucide-react';
import { TECHNOLOGIES } from '../data/companyData';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend & Tools', 'Architecture'];

  const filteredTech = activeCategory === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((t) => t.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 relative bg-[#f8fafc] border-t border-slate-200/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <span>STACK & INFRASTRUCTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              BUILT WITH MODERN TECHNOLOGY.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl font-normal">
              We leverage modern, battle-tested tools to ensure your website is lightning fast, search-optimized, and rock solid.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTech.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 transition-all duration-300 group flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                <Code className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900 font-heading truncate group-hover:text-cyan-700 transition-colors">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                    {tech.level}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
