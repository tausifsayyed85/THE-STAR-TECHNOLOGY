import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  currentRoute?: string;
  onNavigate?: (route: string, elementId?: string) => void;
  onStartProject?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute = 'home',
  onNavigate,
  onStartProject,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: 'home', elementId: 'hero' },
    { label: 'About', route: 'about', elementId: 'about' },
    { label: 'Services', route: 'services', elementId: 'services' },
    { label: 'Projects', route: 'projects', elementId: 'projects' },
    { label: 'Pricing & Scope', route: 'pricing' },
    { label: 'Insights', route: 'insights', elementId: 'insights' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Contact', route: 'contact', elementId: 'contact' },
  ];

  const handleItemClick = (route: string, elementId?: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(route, elementId);
    } else if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartProjectClick = () => {
    setMobileMenuOpen(false);
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] py-3.5 shadow-xs'
            : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleItemClick('home', 'hero')}
            className="cursor-pointer text-left focus:outline-none"
            aria-label="THE STAR TECHNOLOGY Home"
          >
            <Logo size={36} withText={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item.route, item.elementId)}
                className={`font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  currentRoute === item.route
                    ? 'text-[#00C2FF]'
                    : 'text-[#080808] hover:text-[#00C2FF]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={handleStartProjectClick}
              className="px-6 py-2.5 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] transition-all duration-300 font-heading text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              START A PROJECT
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#080808] hover:text-[#00C2FF] border border-[#E5E7EB] bg-white transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#080808] text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <Logo size={36} withText={true} onDark={true} />
              
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Sequential Menu Items */}
            <div className="py-8 space-y-4">
              <span className="font-mono text-xs text-[#00C2FF] tracking-widest uppercase font-bold">
                MENU NAVIGATION
              </span>

              <nav className="flex flex-col space-y-3">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={() => handleItemClick(item.route, item.elementId)}
                    className="flex items-center justify-between text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight py-2 border-b border-neutral-900 text-left hover:text-[#00C2FF] transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 text-neutral-600" />
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions inside Mobile Overlay */}
            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <button
                onClick={handleStartProjectClick}
                className="w-full py-4 bg-[#00C2FF] text-[#080808] font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>START A PROJECT →</span>
              </button>

              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 pt-2">
                <span>{COMPANY_INFO.formattedPhone}</span>
                <span className="text-[#00C2FF]">BHUSAWAL // MH</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
