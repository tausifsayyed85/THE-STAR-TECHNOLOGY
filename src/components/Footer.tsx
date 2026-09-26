import React from 'react';
import { ArrowUpRight, MapPin, Mail, Phone, Instagram, MessageCircle } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigate }) => {
  const handleNav = (route: string, elementId?: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#080808] text-white border-t border-neutral-800 pt-20 pb-12 relative overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Top Section: Logo, Statement & Newsletter/Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          
          <div className="lg:col-span-5 space-y-6">
            <Logo size={42} onDark={true} />
            
            <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
              A modern technology, software, digital solutions and innovation studio helping businesses build, launch and grow dependable digital products.
            </p>

            <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
              <span>HEADQUARTERS // BHUSAWAL, MAHARASHTRA, INDIA</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Navigation */}
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4">
                NAVIGATION
              </h4>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                <li>
                  <button onClick={() => handleNav('home', 'hero')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about', 'about')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    About TST
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('services', 'services')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('projects', 'projects')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Selected Work
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('pricing')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Pricing &amp; Scope
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('insights', 'insights')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Insights
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('faq')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('careers')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('contact', 'contact')} className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Capabilities (Top 6) */}
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4">
                CAPABILITIES
              </h4>
              <ul className="space-y-2.5 text-sm text-neutral-400">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => handleNav('services', 'services')}
                      className="hover:text-[#00C2FF] transition-colors cursor-pointer text-left truncate max-w-full"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Direct */}
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4">
                DIRECT CONTACT
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <a 
                    href={`tel:+91${COMPANY_INFO.phone}`} 
                    className="hover:text-[#00C2FF] transition-colors block"
                  >
                    {COMPANY_INFO.formattedPhone}
                  </a>
                </li>
                <li>
                  <a 
                    href={`mailto:${COMPANY_INFO.email}`} 
                    className="hover:text-[#00C2FF] transition-colors block break-words"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </li>
                <li>
                  <a 
                    href={COMPANY_INFO.whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </a>
                </li>
                <li>
                  <a 
                    href={COMPANY_INFO.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 hover:text-[#00C2FF] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{COMPANY_INFO.instagram}</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div>
            © 2026 THE STAR TECHNOLOGY. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal ? onOpenLegal('privacy') : null}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>/</span>
            <button
              onClick={() => onOpenLegal ? onOpenLegal('terms') : null}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>/</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#00C2FF] transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
