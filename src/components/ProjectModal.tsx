import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Layers, Cpu, ExternalLink, ShieldCheck } from 'lucide-react';
import { Project } from '../types';
import { ImageWithSkeleton } from './SkeletonLoader';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onStartProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl z-10 text-left my-auto custom-scrollbar"
        >
          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-cyan-50 border border-cyan-200 text-cyan-800 uppercase">
                {project.badge}
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold hidden sm:inline">
                CASE STUDY & ARCHITECTURE
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close case study modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-10 space-y-10">
            
            {/* Title & Category Header */}
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-cyan-700 uppercase mb-2">
                {project.category}
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
                {project.projectTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
                {project.description}
              </p>
            </div>

            {/* 06 — VISUAL EXPERIENCE (Mockup Showcase Banner) */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
              <ImageWithSkeleton
                src={project.thumbnail}
                alt={`${project.projectTitle} digital experience interface`}
                aspectRatio="aspect-video"
                imageClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white z-20">
                <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 font-mono font-semibold">
                  06 — VISUAL EXPERIENCE
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 font-medium">
                  Engineered by THE STAR TECHNOLOGY
                </span>
              </div>
            </div>

            {/* 8-Part Structured Case Study Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
              
              {/* 01 — OVERVIEW */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-bold tracking-wider text-cyan-700">
                  01 — OVERVIEW
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">Digital Identity & Positioning</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Tailored web architecture designed to transform how prospective clients discover, interact with, and trust the brand.
                </p>
              </div>

              {/* 02 — THE CHALLENGE */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-bold tracking-wider text-amber-700">
                  02 — THE CHALLENGE
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">The Core Problem</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {project.challenge}
                </p>
              </div>

              {/* 03 — OUR APPROACH */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-bold tracking-wider text-blue-700">
                  03 — OUR APPROACH
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">Strategic Blueprint</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {project.approach}
                </p>
              </div>

              {/* 04 — THE SOLUTION */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-bold tracking-wider text-emerald-700">
                  04 — THE SOLUTION
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">Technical Execution</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>

            </div>

            {/* 05 — KEY FEATURES */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="text-xs font-mono font-bold tracking-wider text-cyan-700">
                05 — KEY FEATURES
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-heading">Implemented Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 07 — TECHNOLOGY */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-mono font-bold tracking-wider text-cyan-700">
                07 — TECHNOLOGY
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading">Tech Stack & Tools</h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.technology.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-cyan-800 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 08 — PROJECT OUTCOME */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 space-y-2">
              <div className="text-xs font-mono font-bold tracking-wider text-cyan-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                08 — PROJECT OUTCOME
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-heading">Business Value Delivered</h4>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                "{project.outcome}"
              </p>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Need a similar high-impact website for your business?
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartProject(project.projectTitle);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20 transition-all"
                >
                  <span>Build A Website Like This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
