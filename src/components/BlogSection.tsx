import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/companyData';
import { BlogArticle } from '../types';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="insights" className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E5E7EB] relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">10</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                INSIGHTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              PERSPECTIVES &amp; ANALYSIS
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            Architectural thinking, software economics, and technical lessons from our product engineering work.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setActiveArticle(article)}
              className="p-8 bg-[#F4F5F7] border border-[#E5E7EB] hover:border-[#00C2FF] transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-lg"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between font-mono text-[11px] text-[#6B7280] mb-4">
                  <span className="text-[#00C2FF] font-bold uppercase">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#080808] font-heading tracking-tight mb-3 leading-snug group-hover:text-black">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider text-[#080808] group-hover:text-[#00C2FF] transition-colors">
                <span>READ ARTICLE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#080808] p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-[#080808] border border-[#E5E7EB] hover:border-[#080808] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Eyebrow */}
              <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase mb-3">
                <span>{activeArticle.category}</span>
                <span>//</span>
                <span>{activeArticle.date}</span>
                <span>//</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#080808] font-heading tracking-tight mb-6 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="space-y-4 text-base text-[#080808] leading-relaxed mb-8 pt-6 border-t border-[#E5E7EB]">
                {activeArticle.fullBody ? (
                  activeArticle.fullBody.map((paragraph, idx) => (
                    <p key={idx} className="text-[#080808]/90">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p>{activeArticle.contentSnippet}</p>
                )}
              </div>

              {/* Author & Footer */}
              <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#6B7280]">
                <div>
                  <span className="text-[#080808] font-bold">PUBLISHED BY //</span> THE STAR TECHNOLOGY RESEARCH
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] font-heading font-bold uppercase transition-colors cursor-pointer"
                >
                  CLOSE ARTICLE
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
