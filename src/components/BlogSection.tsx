import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, Clock, Calendar, X, Sparkles, RefreshCw } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/companyData';
import { BlogArticle } from '../types';
import { BlogCardSkeleton } from './SkeletonLoader';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories = ['All', 'Web Development', 'Architecture', 'SEO & Growth'];

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(cat);
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

  const filteredArticles = activeCategory === 'All'
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.filter((a) => a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="blog" className="py-24 sm:py-32 relative bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
              <span>DIGITAL INSIGHTS & ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Technology & Growth Blog
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-md font-normal">
              Actionable strategies on web engineering, local search optimization, and modern software design.
            </p>
          </div>

          {/* Category Filter Pills & Skeleton Reload Simulator */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}

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

        {/* Articles Grid or Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-7 border border-slate-200 flex flex-col justify-between hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-900/5 transition-all group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-200">
                    <span className="font-mono text-cyan-700 font-bold px-2.5 py-0.5 rounded-md bg-cyan-100/70">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 font-heading group-hover:text-cyan-700 transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-900 transition-colors group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))
          )}
        </div>

      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl z-10 text-left p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-700 px-2.5 py-1 rounded-md bg-cyan-100/70">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {selectedArticle.date} • {selectedArticle.readTime}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-4 leading-tight">
                {selectedArticle.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <p className="text-base text-slate-900 font-semibold">
                  {selectedArticle.summary}
                </p>
                <p>
                  {selectedArticle.contentSnippet}
                </p>
                <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-slate-700">
                  <span className="font-bold text-cyan-900 block mb-1">Key Takeaway</span>
                  Engineering precision and purposeful digital architecture consistently outperform off-the-shelf templates. Invest in systems built specifically for your audience.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-500/25"
                >
                  Discuss With Our Team
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
