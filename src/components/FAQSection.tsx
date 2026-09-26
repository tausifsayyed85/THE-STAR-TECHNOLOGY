import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/companyData';

interface FAQSectionProps {
  onStartProject?: () => void;
  onViewAllFaqs?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onStartProject, onViewAllFaqs }) => {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  // Featured top questions for the homepage flow
  const featuredFaqs = FAQ_ITEMS.slice(0, 6);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">11</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            Direct answers regarding timelines, technical stacks, deliverables, and engineering workflow.
          </p>
        </div>

        {/* 2-Column Layout: Left Intro / CTA & Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
              HAVE QUESTIONS?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#080808] font-heading uppercase tracking-tight">
              EVERYTHING YOU NEED TO KNOW BEFORE KICKOFF
            </h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              We operate with complete clarity on project milestones, code ownership, technical stacks, and timelines.
            </p>

            <div className="p-6 bg-[#F4F5F7] border border-[#E5E7EB] space-y-3">
              <div className="font-mono text-[10px] text-[#00C2FF] font-bold uppercase tracking-wider">
                NEED RAPID CLARIFICATION?
              </div>
              <p className="text-xs text-[#080808]">
                Connect with our tech lead directly on WhatsApp for instantaneous answers.
              </p>
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold font-heading uppercase tracking-wider text-[#080808] hover:text-[#00C2FF] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>CHAT ON WHATSAPP →</span>
              </a>
            </div>

            {onViewAllFaqs && (
              <button
                onClick={onViewAllFaqs}
                className="text-xs font-mono font-bold text-[#080808] hover:text-[#00C2FF] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>EXPLORE ALL SEARCHABLE QUESTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-8 space-y-3">
            {featuredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-[#E5E7EB] bg-[#F4F5F7] transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#00C2FF]">
                        [{faq.category}]
                      </span>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-[#080808]">
                        {faq.question}
                      </h4>
                    </div>
                    <div className="text-[#080808] shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 pt-0 border-t border-[#E5E7EB]/60 text-sm sm:text-base text-[#6B7280] leading-relaxed bg-[#FFFFFF]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
