import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Package, Users, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectService,
}) => {
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [service]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl z-10 text-left p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                SERVICE {service.number}
              </span>
              <span className="text-xs text-slate-500 font-bold tracking-wider uppercase">
                {service.tagline}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close service details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Description */}
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {service.title}
            </h3>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-mono font-bold tracking-wider text-cyan-700 uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Core Inclusions & Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          {service.deliverables && (
            <div className="space-y-2 mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-mono font-bold tracking-wider text-blue-700 uppercase flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                Key Deliverables
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {service.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ideal For */}
          {service.idealFor && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-slate-700 mb-8">
              <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-900 block mb-0.5 font-bold">Recommended For</strong>
                <span>{service.idealFor}</span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Back to Services
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectService(service.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/25 transition-all"
            >
              <span>Get Started with {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
