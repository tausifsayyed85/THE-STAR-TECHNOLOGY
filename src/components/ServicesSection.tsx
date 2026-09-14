import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Share2, 
  PenTool, 
  Database, 
  Code, 
  Search, 
  TrendingUp, 
  Globe2, 
  ShoppingBag, 
  Monitor, 
  Smartphone, 
  FileText,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { Service } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
  onViewPortfolio?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  onViewPortfolio,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'social-media-management':
        return <Share2 className="w-5 h-5 text-cyan-600" />;
      case 'logo-design':
        return <PenTool className="w-5 h-5 text-sky-600" />;
      case 'dynamic-website-development':
        return <Database className="w-5 h-5 text-blue-600" />;
      case 'static-website-development':
        return <Code className="w-5 h-5 text-teal-600" />;
      case 'seo-search-engine-optimization':
        return <Search className="w-5 h-5 text-emerald-600" />;
      case 'digital-marketing':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'domain-registration':
        return <Globe2 className="w-5 h-5 text-indigo-600" />;
      case 'ecommerce-website':
        return <ShoppingBag className="w-5 h-5 text-purple-600" />;
      case 'web-development':
        return <Monitor className="w-5 h-5 text-cyan-600" />;
      case 'app-development':
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case 'content-creation':
        return <FileText className="w-5 h-5 text-pink-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-600" />;
    }
  };

  const categories = ['All Services', 'Web & App', 'Design & Brand', 'Marketing & SEO'];

  const filteredServices = SERVICES.filter((s) => {
    if (filterCategory === 'All Services') return true;
    if (filterCategory === 'Web & App') {
      return (
        s.id.includes('website') || 
        s.id.includes('web-dev') || 
        s.id.includes('app') || 
        s.id.includes('ecommerce') ||
        s.id.includes('domain')
      );
    }
    if (filterCategory === 'Design & Brand') {
      return s.id.includes('logo') || s.id.includes('content');
    }
    if (filterCategory === 'Marketing & SEO') {
      return s.id.includes('seo') || s.id.includes('marketing') || s.id.includes('social');
    }
    return true;
  });

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Matching Reference */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>WHAT WE DO</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
              We're Provide Smart Solution
            </h2>
            
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              From web development to SEO and digital marketing, we build practical digital systems that help businesses grow faster and operate smarter.
            </p>
          </div>

          {/* 11 Core Services Badge & Filters */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <div className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-cyan-300 shadow-sm text-left">
              <span className="font-heading font-extrabold text-3xl text-cyan-600 leading-none">
                11
              </span>
              <div className="text-xs leading-tight">
                <strong className="text-slate-900 block font-bold">Core Services</strong>
                <span className="text-slate-500">across every digital layer</span>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filterCategory === cat
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 11 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
              className="group relative rounded-2xl bg-white p-7 border border-slate-200/90 hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 hover:-translate-y-1"
            >
              <div>
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors border border-cyan-100">
                    {service.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-cyan-300 group-hover:bg-cyan-50/50 transition-all">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading group-hover:text-cyan-700 transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Exact Buttons from Reference: [Service Details] [View Portfolio] */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-900 py-1.5 transition-colors group/btn"
                >
                  <span>Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onViewPortfolio) {
                      onViewPortfolio();
                    } else {
                      const el = document.getElementById('projects');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  View Portfolio
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectService={(title) => {
          setSelectedService(null);
          if (onSelectService) onSelectService(title);
        }}
      />
    </section>
  );
};
