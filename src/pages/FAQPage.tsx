import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/companyData';

interface FAQPageProps {
  onStartProject?: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onStartProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Services', 'Projects', 'Pricing', 'Process', 'Support', 'Technology'];

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
            <span>KNOWLEDGE BASE</span>
            <span>//</span>
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#080808] font-heading tracking-tight uppercase leading-[0.98]">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Transparent answers regarding development timelines, technical frameworks, milestone pricing, and client collaboration.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-12">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. timeline, pricing, mobile, hosting)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#F4F5F7] border border-[#E5E7EB] focus:border-[#080808] text-sm text-[#080808] outline-none transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#080808] text-white border-[#080808]'
                    : 'bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB] hover:text-[#080808] hover:border-[#080808]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-[#E5E7EB] bg-[#F4F5F7] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#00C2FF]">
                        [{faq.category}]
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#080808]">
                        {faq.question}
                      </h3>
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
            })
          ) : (
            <div className="p-12 text-center border border-[#E5E7EB] bg-[#F4F5F7] space-y-3">
              <p className="font-heading font-bold text-[#080808]">No matching questions found.</p>
              <p className="text-xs text-[#6B7280]">Try searching with different terms or reset your category filter.</p>
            </div>
          )}
        </div>

        {/* Bottom Direct CTA */}
        <div className="p-8 sm:p-12 bg-[#080808] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-xl uppercase">
              HAVE A SPECIFIC TECHNICAL QUESTION?
            </h3>
            <p className="text-sm text-neutral-400">
              Message Tausif Sayyed directly on WhatsApp for immediate technical answers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#00C2FF] text-[#080808] hover:bg-white transition-colors font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>

            <button
              onClick={onStartProject}
              className="px-6 py-3.5 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors font-heading text-xs font-bold uppercase tracking-wider"
            >
              START PROJECT INTAKE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
