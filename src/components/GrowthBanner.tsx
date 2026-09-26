import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface GrowthBannerProps {
  onStartProject?: () => void;
}

export const GrowthBanner: React.FC<GrowthBannerProps> = ({ onStartProject }) => {
  const handleClick = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#080808] text-white relative overflow-hidden border-b border-neutral-800">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />

      {/* Luminous Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00C2FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#00C2FF] animate-pulse" />
              <span>STATUS // OPEN FOR NEW CLIENT ENGAGEMENTS</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight uppercase leading-[0.98]">
              READY TO BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00C2FF]">
                WHAT'S NEXT?
              </span>
            </h2>

            <p className="text-base sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
              Tell us about your product idea, operational bottleneck, or upcoming release. We will analyze your requirements and respond with clear architectural steps.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <button
              onClick={handleClick}
              className="group inline-flex items-center justify-between px-8 py-5 bg-[#00C2FF] text-[#080808] hover:bg-white transition-all duration-300 font-heading text-sm font-bold tracking-wider uppercase cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-8 py-4 bg-transparent border border-neutral-700 text-white hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all duration-300 font-heading text-xs font-bold tracking-wider uppercase"
            >
              <span>CHAT ON WHATSAPP DIRECTLY</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="font-mono text-[11px] text-neutral-500 pt-2 flex items-center justify-between">
              <span>AVG. RESPONSE: UNDER 2 HOURS</span>
              <span className="text-[#00C2FF]">BHUSAWAL, MH</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
