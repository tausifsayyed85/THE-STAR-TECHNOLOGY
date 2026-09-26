import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WHY_TST_ITEMS, INDUSTRIES } from '../data/companyData';
import { ArrowUpRight } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState<string>(INDUSTRIES[0].id);

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">07</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                WHY TST
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              WHY THE STAR TECHNOLOGY
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            Built for speed, technical reliability, and measurable business growth without unnecessary agency overhead.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {WHY_TST_ITEMS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-8 bg-[#F4F5F7] border border-[#E5E7EB] hover:border-[#00C2FF] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs font-bold text-[#00C2FF] tracking-widest mb-4">
                  {item.number} // PRINCIPLE
                </div>

                <h3 className="text-xl font-bold text-[#080808] font-heading uppercase mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between font-mono text-xs text-[#080808] font-semibold">
                <span>{item.highlight}</span>
                <span className="text-[#00C2FF]">✓</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 08 / INDUSTRIES Integration */}
        <div className="pt-16 border-t border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-[#00C2FF]">08</span>
                <span className="text-neutral-400 font-mono text-sm">/</span>
                <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                  INDUSTRIES
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#080808] tracking-tight font-heading uppercase">
                DOMAINS WE SERVE
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#6B7280] max-w-sm">
              We apply proven digital engineering patterns across diverse industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind) => {
              const isSelected = activeIndustry === ind.id;
              return (
                <div
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`p-6 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#080808] text-white border-[#080808]'
                      : 'bg-[#FFFFFF] text-[#080808] border-[#E5E7EB] hover:border-[#00C2FF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-bold text-base uppercase tracking-tight">
                      {ind.name}
                    </h4>
                    <span className={isSelected ? 'text-[#00C2FF]' : 'text-neutral-300'}>
                      →
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
