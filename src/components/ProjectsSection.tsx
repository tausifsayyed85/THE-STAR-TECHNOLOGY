import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { PROJECTS } from '../data/companyData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ProjectCardSkeleton, ImageWithSkeleton } from './SkeletonLoader';

interface ProjectsSectionProps {
  onStartProject: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onStartProject }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories = ['All', 'Smart Systems', 'Healthcare', 'Automotive', 'Dining', 'Fitness', 'Real Estate'];

  const handleFilterChange = (cat: string) => {
    if (cat === activeFilter) return;
    setIsLoading(true);
    setActiveFilter(cat);
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  const handleSimulateReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (activeFilter === 'Smart Systems') return p.id.includes('scanigo') || p.category.includes('Smart');
        if (activeFilter === 'Healthcare') return p.id.includes('hospital') || p.category.includes('Dental') || p.category.includes('Clinic');
        if (activeFilter === 'Automotive') return p.id.includes('alperton') || p.category.includes('Automotive');
        if (activeFilter === 'Dining') return p.category.includes('Restaurant');
        if (activeFilter === 'Fitness') return p.category.includes('Gym') || p.category.includes('Fitness');
        if (activeFilter === 'Real Estate') return p.category.includes('Real Estate');
        return true;
      });

  return (
    <section id="projects" className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-slate-200/80">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Matching Reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>PORTFOLIO & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Selected Work
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl font-normal">
              Proven digital systems built for privacy-first tech platforms, healthcare institutions, automotive centres, and ambitious brands.
            </p>
          </div>

          {/* Category Filter Pills & Skeleton Reload Simulator */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Subtle Reload / Skeleton Preview Button */}
            <button
              onClick={handleSimulateReload}
              disabled={isLoading}
              title="Preview loading skeleton state"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors ml-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-600' : ''}`} />
              <span className="hidden sm:inline">Test Skeleton</span>
            </button>
          </div>
        </div>

        {/* Projects Grid or Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl bg-white p-4 border border-slate-200/90 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 hover:-translate-y-1"
              >
                {/* Image Container with Integrated Shimmer Skeleton */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-5 border border-slate-200">
                  <ImageWithSkeleton
                    src={project.thumbnail}
                    alt={project.projectTitle}
                    aspectRatio="aspect-[16/10]"
                    imageClassName="transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                  {/* Badge Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-mono font-bold text-cyan-800 shadow-sm z-20">
                    {project.badge}
                  </div>

                  {/* Hover Action Indicator */}
                  <div className="absolute bottom-3 right-3 p-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

              {/* Text Info */}
              <div className="px-2 pb-2">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 font-heading group-hover:text-cyan-700 transition-colors mb-2">
                  {project.projectTitle}
                </h3>

                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {project.technology.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technology.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400">
                      +{project.technology.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )))}
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={onStartProject}
      />
    </section>
  );
};
