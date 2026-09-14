import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [type]);

  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl z-10 text-left p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div className="flex items-center gap-2.5">
              {type === 'privacy' ? (
                <Shield className="w-5 h-5 text-cyan-600" />
              ) : (
                <FileText className="w-5 h-5 text-cyan-600" />
              )}
              <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {type === 'privacy' ? (
              <>
                <p>
                  <strong className="text-slate-900">THE STAR TECHNOLOGY</strong> ("we", "us", or "our") respects the privacy of our clients and website visitors. This Privacy Policy clarifies how information submitted through our website and inquiry forms is treated.
                </p>
                <h4 className="text-slate-900 font-bold pt-2">1. Information We Collect</h4>
                <p>
                  When you submit an inquiry through our contact form, we collect your name, business name, email address, phone number, and any project details you voluntarily provide.
                </p>
                <h4 className="text-slate-900 font-bold pt-2">2. How We Use Your Information</h4>
                <p>
                  Information gathered is used exclusively to respond to your project inquiries, deliver tailored proposals, and coordinate web development and digital services. We do not sell, rent, or trade your personal or business data to third-party advertisers.
                </p>
                <h4 className="text-slate-900 font-bold pt-2">3. Direct Inquiries & Communications</h4>
                <p>
                  For any privacy-related queries, you may reach our founder directly at <a href={`mailto:${COMPANY_INFO.email}`} className="text-cyan-700 font-semibold underline">{COMPANY_INFO.email}</a> or via phone at {COMPANY_INFO.formattedPhone}.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to <strong className="text-slate-900">THE STAR TECHNOLOGY</strong>. By engaging with our website and digital design services, you agree to the following terms and guidelines.
                </p>
                <h4 className="text-slate-900 font-bold pt-2">1. Scope of Digital Services</h4>
                <p>
                  THE STAR TECHNOLOGY provides bespoke website development, user interface design, and digital consulting. Specific project scopes, timelines, deliverables, and payment milestones are established collaboratively upon project agreement.
                </p>
                <h4 className="text-slate-900 font-bold pt-2">2. Intellectual Property</h4>
                <p>
                  Upon final payment settlement for completed web engineering or design work, full ownership of agreed client-specific assets and content is transferred to the client, while underlying open-source libraries remain subject to their respective licenses.
                </p>
                <h4 className="text-slate-900 font-bold pt-2">3. Jurisdiction & Business Office</h4>
                <p>
                  THE STAR TECHNOLOGY operates from {COMPANY_INFO.address.full}. Governed under applicable regulations of Maharashtra, India.
                </p>
              </>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
