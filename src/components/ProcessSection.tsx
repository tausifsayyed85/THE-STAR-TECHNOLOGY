import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">06</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                PROCESS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              HOW WE WORK
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            A structured, transparent engineering lifecycle from initial discovery to production launch and ongoing scale.
          </p>
        </div>

        {/* Step Navigation Bar / Progress Line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-12">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-4 border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#080808] text-white border-[#080808] shadow-md'
                    : 'bg-[#F4F5F7] text-[#6B7280] border-[#E5E7EB] hover:border-[#080808] hover:text-[#080808]'
                }`}
              >
                <div className="font-mono text-xs font-bold mb-1 flex items-center justify-between">
                  <span className={isActive ? 'text-[#00C2FF]' : 'text-[#6B7280]'}>{step.step}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF]" />}
                </div>
                <div className="font-heading text-xs font-bold uppercase tracking-wider truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-12 bg-[#F4F5F7] border border-[#080808] relative overflow-hidden"
        >
          {/* Subtle Corner Coordinate */}
          <div className="absolute top-6 right-6 font-mono text-[11px] text-[#6B7280]">
            PHASE {activeStep.step} OF 07 // LIFECYCLE
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
              STAGE {activeStep.step}
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-[#080808] font-heading tracking-tight uppercase">
              {activeStep.title}
            </h3>

            <p className="text-lg sm:text-xl text-[#080808] font-medium leading-relaxed">
              {activeStep.description}
            </p>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <h4 className="font-mono text-xs tracking-widest text-[#6B7280] uppercase font-bold">
                KEY ACTIVITIES &amp; DELIVERABLES
              </h4>
              <div className="space-y-2.5">
                {activeStep.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#080808]">
                    <span className="text-[#00C2FF] font-mono font-bold">0{idx + 1}.</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
