import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, ShieldCheck, Star, Award, CheckCircle2, ChevronDown, Sparkles, Zap, Code, Globe, Cpu } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { InteractiveStarCanvas } from './InteractiveStarCanvas';

export const Hero: React.FC = () => {
  const [tagIndex, setTagIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Capability tags rotation matching reference
  useEffect(() => {
    const timer = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % COMPANY_INFO.heroTags.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#f0f9ff]/70 via-[#f8fafc] to-[#ffffff]"
    >
      {/* Luminous Animated Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] bg-gradient-to-tr from-cyan-400/20 via-sky-300/15 to-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-[-5%] w-[450px] h-[450px] bg-cyan-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Cycling Ticker, CTAs, Trust Metrics */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Top Pill / Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-cyan-500/30 text-cyan-700 text-xs font-bold tracking-wide shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
              </span>
              <span>THE STAR TECHNOLOGY • BHUSAWAL & ACROSS INDIA</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
                Dynamic IT, <br />
                <span className="text-slate-900">Dynamic Results.</span>
              </h1>

              {/* Sub-Headline with gradient */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-600">
                  Precision IT Solutions Tailored for Demand
                </span>
              </h2>
            </motion.div>

            {/* Cycling Capability Ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-3 py-1 text-sm sm:text-base font-semibold text-slate-700"
            >
              <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                Specializing in:
              </span>
              <div className="h-9 overflow-hidden relative w-64">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tagIndex}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs sm:text-sm font-bold shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      {COMPANY_INFO.heroTags[tagIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Welcome Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              {COMPANY_INFO.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <a
                href="#services"
                data-cursor="cta"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-600/40"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm sm:text-base text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-cyan-400 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Talk to Our Team</span>
              </a>
            </motion.div>

            {/* 3 Trust Metric Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200"
            >
              {/* Metric 1 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 font-heading">20+ Projects</div>
                  <div className="text-[11px] text-slate-500 font-medium">Delivered</div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 font-heading">4.0 / 5 Rating</div>
                  <div className="text-[11px] text-slate-500 font-medium">Client Verified</div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900 font-heading">Enterprise</div>
                  <div className="text-[11px] text-slate-500 font-medium">Grade Security</div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Interactive Animated Cursor Star Centerpiece */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <InteractiveStarCanvas />
            </motion.div>
          </div>

        </div>

        {/* Scroll for more Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center gap-1.5 text-slate-500 text-xs font-semibold"
        >
          <span>Scroll for more</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-cyan-600" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
