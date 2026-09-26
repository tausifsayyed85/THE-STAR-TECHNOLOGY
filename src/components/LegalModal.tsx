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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#080808] shadow-2xl z-10 text-left p-6 sm:p-10 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#00C2FF] uppercase">
                TST // LEGAL COMPLIANCE
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-[#080808] border border-[#E5E7EB] hover:border-[#080808] transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl font-black text-[#080808] font-heading uppercase mb-4">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            <p>
              Last Updated: March 2026. This policy governs digital operations by <strong>THE STAR TECHNOLOGY</strong> (registered studio address: {COMPANY_INFO.address.full}).
            </p>

            {type === 'privacy' ? (
              <>
                <h3 className="font-heading font-bold text-sm text-[#080808] uppercase pt-2">
                  1. Information Collection &amp; Scope
                </h3>
                <p>
                  We only gather information provided directly through our intake channels, including your name, email address, phone/WhatsApp number, project requirements, and communication logs. We do not sell, rent, or lease personal information to any third parties.
                </p>

                <h3 className="font-heading font-bold text-sm text-[#080808] uppercase pt-2">
                  2. Use of Information
                </h3>
                <p>
                  Information submitted is strictly utilized to communicate project timelines, technical proposals, scope updates, and deliver software engineering services requested by you.
                </p>

                <h3 className="font-heading font-bold text-sm text-[#080808] uppercase pt-2">
                  3. Data Security
                </h3>
                <p>
                  We implement industry-standard transmission encryption, secure hosting configurations, and access restrictions to protect intellectual property and private client records.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-heading font-bold text-sm text-[#080808] uppercase pt-2">
                  1. Engagement &amp; Deliverables
                </h3>
                <p>
                  Project engagements are defined through mutual technical discovery. Statements of work outlining features, payment milestones, timelines, and deployment criteria are agreed prior to engineering sprints.
                </p>

                <h3 className="font-heading font-bold text-sm text-[#080808] uppercase pt-2">
                  2. Intellectual Property Rights
                </h3>
                <p>
                  Upon complete settlement of agreed project milestone invoices, full ownership of client-specific custom code, design tokens, and digital assets transitions directly to the client.
                </p>

                <h3 className="font-heading font-bold text-sm text-[#080808] uppercase pt-2">
                  3. Maintenance &amp; Warranties
                </h3>
                <p>
                  Standard deployment packages include post-launch support and bug fixes for the agreed baseline scope. Long-term maintenance and infrastructure monitoring are provided under ongoing service agreements.
                </p>
              </>
            )}

            <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between font-mono text-[11px] text-[#6B7280]">
              <span>QUESTIONS? CONTACT {COMPANY_INFO.email}</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] font-heading font-bold uppercase transition-colors"
              >
                ACKNOWLEDGE &amp; CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
