import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECHNOLOGIES } from '../data/companyData';

export const TechStackSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'AI & Automation', 'Design & DevOps'];

  const filteredTech = selectedCat === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter(t => t.category === selectedCat);

  return (
    <section className="py-24 sm:py-32 bg-[#F4F5F7] border-b border-[#E5E7EB] relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">05</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                TECHNOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              MODERN TECH STACK
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            We engineer with proven, high-standard technologies chosen strictly for performance, speed, and long-term maintainability.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer border ${
                selectedCat === cat
                  ? 'bg-[#080808] text-white border-[#080808]'
                  : 'bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB] hover:text-[#080808] hover:border-[#080808]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTech.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-6 bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#00C2FF] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#00C2FF] uppercase font-bold">
                    {item.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-[#00C2FF] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#080808] font-heading mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between font-mono text-[10px] text-[#6B7280]">
                <span>ARCHITECTURE</span>
                <span className="text-[#080808] font-semibold">{item.level}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
