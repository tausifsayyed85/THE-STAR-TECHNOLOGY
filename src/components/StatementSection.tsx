import React from 'react';
import { motion } from 'motion/react';

export const StatementSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Number & Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E5E7EB] gap-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#00C2FF]">01</span>
            <span className="text-neutral-400 font-mono text-sm">/</span>
            <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
              WHAT WE DO
            </span>
          </div>

          {/* Technical Metadata */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-[#6B7280]">
            <div>
              <span className="text-[#080808] font-bold">STATUS //</span> READY FOR ENGAGEMENT
            </div>
            <div>
              <span className="text-[#080808] font-bold">SYSTEM //</span> DIGITAL PRODUCT STUDIO
            </div>
            <div className="hidden sm:block">
              <span className="text-[#00C2FF] font-bold">HQ //</span> BHUSAWAL, MAHARASHTRA
            </div>
          </div>
        </div>

        {/* Large Statement and Supporting Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#080808] tracking-tight leading-[1.08] font-heading uppercase text-balance"
            >
              "Technology should solve problems, <br />
              <span className="text-[#6B7280]">not create more of them."</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:pt-3">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed"
            >
              <strong className="text-[#080808] font-semibold">THE STAR TECHNOLOGY</strong> helps businesses turn ideas, workflows and operational challenges into practical digital products, robust software architectures, and scalable technology systems.
            </motion.p>

            {/* Subtle Animated Line */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="h-[2px] bg-gradient-to-r from-[#00C2FF] to-transparent"
            />

            <div className="font-mono text-xs text-[#6B7280] flex items-center justify-between">
              <span>PRECISION ENGINEERING</span>
              <span className="text-[#00C2FF]">EST. 2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
