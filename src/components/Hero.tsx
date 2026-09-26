import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { InteractiveStarCanvas } from './InteractiveStarCanvas';

interface HeroProps {
  onStartProject?: () => void;
  onExploreWork?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const handleStartProjectClick = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExploreWorkClick = () => {
    if (onExploreWork) {
      onExploreWork();
    } else {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden bg-[#FFFFFF] border-b border-[#E5E7EB]">
      {/* Subtle Background Technical Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-70 pointer-events-none" />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] bg-[#00C2FF]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Eyebrow, Main Headline, Subheading, CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Small Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-[#00C2FF] rounded-none animate-pulse" />
              <p className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#6B7280] uppercase">
                {COMPANY_INFO.eyebrow}
              </p>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#080808] tracking-tight leading-[0.98] font-heading text-balance uppercase">
                WE BUILD <br />
                DIGITAL PRODUCTS <br />
                <span className="text-[#080808]">THAT MOVE BUSINESS </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-sky-600">
                  FORWARD.
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-[#6B7280] font-normal leading-relaxed max-w-2xl"
            >
              {COMPANY_INFO.heroSubheading}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA */}
              <button
                onClick={handleStartProjectClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] transition-all duration-300 font-heading text-sm font-bold tracking-wider uppercase shadow-sm cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={handleExploreWorkClick}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#080808] text-[#080808] hover:bg-[#080808] hover:text-white transition-all duration-300 font-heading text-sm font-bold tracking-wider uppercase cursor-pointer"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>

            {/* Micro Technical Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px] text-[#6B7280]"
            >
              {COMPANY_INFO.heroMicro.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#00C2FF] font-bold">/</span>
                  <span className="tracking-wider">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Hero Visual (TST Abstract Technical Visualization) */}
          <div className="lg:col-span-5 relative w-full h-[420px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Visual Container with subtle technical border */}
            <div className="relative w-full h-full border border-[#E5E7EB] bg-[#F4F5F7]/40 p-2 overflow-hidden shadow-xs">
              {/* Corner crosshairs */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#080808]" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#080808]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#080808]" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#080808]" />

              {/* Three.js Canvas */}
              <InteractiveStarCanvas className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip Immediately Below Hero */}
      <div className="mt-14 pt-6 border-t border-[#E5E7EB] bg-[#F4F5F7]/80 w-full relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-[#080808] font-bold uppercase">
              FROM IDEA TO DEPLOYMENT
            </span>
            <span className="hidden md:inline-block w-8 h-[1px] bg-[#00C2FF]" />
          </div>

          {/* Capabilities */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#6B7280]">
            {COMPANY_INFO.capabilitiesStrip.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-2 group cursor-default">
                <span className="text-[#00C2FF] font-bold">/</span>
                <span className="group-hover:text-[#080808] transition-colors">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
