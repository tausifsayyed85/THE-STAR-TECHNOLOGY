import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Smartphone, Cpu, Layout, Bot, ShoppingBag, TrendingUp, Search, Palette, Compass, X } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { Service } from '../types';

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
  onViewPortfolio?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onViewPortfolio }) => {
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const getServiceIcon = (iconType?: string) => {
    switch (iconType) {
      case 'code': return <Layers className="w-5 h-5" />;
      case 'device': return <Smartphone className="w-5 h-5" />;
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'layout': return <Layout className="w-5 h-5" />;
      case 'cart': return <ShoppingBag className="w-5 h-5" />;
      case 'network': return <TrendingUp className="w-5 h-5" />;
      case 'storefront': return <Search className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const handleOpenService = (service: Service) => {
    setActiveModalService(service);
  };

  const handleStartProject = (service: Service) => {
    setActiveModalService(null);
    if (onSelectService) {
      onSelectService(service.title);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F4F5F7] border-b border-[#E5E7EB] relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">02</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              CAPABILITIES &amp; SOLUTIONS
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            We combine engineering rigor, product thinking and design precision to build reliable digital systems.
          </p>
        </div>

        {/* 10 Services Grid (Swiss Modernist Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => handleOpenService(service)}
              className="group relative bg-[#FFFFFF] border border-[#E5E7EB] p-8 flex flex-col justify-between hover:border-[#00C2FF] transition-all duration-300 shadow-xs cursor-pointer hover:shadow-lg"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#00C2FF] transition-all duration-300" />

              <div>
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#00C2FF] tracking-widest">
                    {service.number} // CAPABILITY
                  </span>
                  <div className="text-[#6B7280] group-hover:text-[#00C2FF] transition-colors">
                    {getServiceIcon(service.iconType)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#080808] tracking-tight mb-3 font-heading group-hover:text-black">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                {((service.technologies && service.technologies.length > 0) || (service.deliverables && service.deliverables.length > 0)) && (
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[#E5E7EB]">
                    {(service.technologies || service.deliverables || []).slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="font-mono text-[11px] px-2 py-0.5 bg-[#F4F5F7] text-[#080808] border border-[#E5E7EB]"
                      >
                        {tech}
                      </span>
                    ))}
                    {(service.technologies || service.deliverables || []).length > 3 && (
                      <span className="font-mono text-[11px] px-1.5 py-0.5 text-[#6B7280]">
                        +{(service.technologies || service.deliverables || []).length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Action Link */}
                <div className="flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider text-[#080808] group-hover:text-[#00C2FF] transition-colors pt-2">
                  <span>EXPLORE SERVICE</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-16 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="font-mono text-xs text-[#6B7280]">
            NEED A BESPOKE ARCHITECTURE OR HYBRID SCOPE?
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectService ? onSelectService('Comprehensive IT & Web Solution') : null}
              className="px-6 py-3 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              REQUEST CUSTOM PROPOSAL →
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#080808] p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-[#080808] border border-[#E5E7EB] hover:border-[#080808] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Service Number & Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-sm font-bold text-[#00C2FF]">
                  {activeModalService.number} // CAPABILITY TEMPLATE
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#080808] font-heading tracking-tight mb-3 uppercase">
                {activeModalService.title}
              </h2>

              <p className="text-base sm:text-lg text-[#6B7280] font-normal mb-8">
                {activeModalService.tagline}
              </p>

              {/* Capabilities List: What We Build */}
              <div className="mb-8">
                <h3 className="font-mono text-xs tracking-widest text-[#080808] uppercase font-bold mb-4 pb-2 border-b border-[#E5E7EB]">
                  WHAT WE BUILD &amp; DELIVER
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalService.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#080808]">
                      <span className="text-[#00C2FF] font-mono font-bold">✓</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="font-mono text-xs tracking-widest text-[#080808] uppercase font-bold mb-3 pb-2 border-b border-[#E5E7EB]">
                  ENGINEERING STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeModalService.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="font-mono text-xs px-3 py-1 bg-[#F4F5F7] border border-[#E5E7EB] text-[#080808] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Specific FAQ if present */}
              {activeModalService.faqs && activeModalService.faqs.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-mono text-xs tracking-widest text-[#080808] uppercase font-bold mb-3 pb-2 border-b border-[#E5E7EB]">
                    COMMON QUESTIONS
                  </h3>
                  <div className="space-y-4">
                    {activeModalService.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 bg-[#F4F5F7] border border-[#E5E7EB]">
                        <p className="text-sm font-bold text-[#080808] mb-1 font-heading">
                          Q: {faq.question}
                        </p>
                        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA within modal */}
              <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-mono text-xs text-[#6B7280]">
                  READY TO ARCHITECT THIS SYSTEM?
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleStartProject(activeModalService)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>LET'S BUILD IT →</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
