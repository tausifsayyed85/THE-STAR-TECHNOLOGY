import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-sm shadow-slate-900/5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          className="outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1 transition-opacity hover:opacity-90"
          aria-label="THE STAR TECHNOLOGY - Home"
        >
          <Logo size={36} onDark={false} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-cyan-600 transition-colors rounded-full hover:bg-slate-100/80"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button: Start a Project */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="text-xs font-semibold text-slate-600 hover:text-cyan-600 hidden lg:flex items-center gap-1.5 transition-colors font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-600" />
            <span>{COMPANY_INFO.formattedPhone}</span>
          </a>

          <a
            href="#contact"
            data-cursor="cta"
            className="relative group overflow-hidden px-5 py-2.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-cyan-500/40"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Start a Project</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-xs"
          >
            Start
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-white border border-slate-200 shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 shadow-xl"
          >
            <nav className="flex flex-col space-y-3.5 text-base">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-800 hover:text-cyan-600 font-semibold py-1 transition-colors border-b border-slate-100"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-3 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-md shadow-cyan-500/20"
                >
                  Start a Project
                </a>
                
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-mono">
                  <span>{COMPANY_INFO.formattedPhone}</span>
                  <span className="text-cyan-600 font-bold">BHUSAWAL, MH</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
