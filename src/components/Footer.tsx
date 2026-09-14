import React from 'react';
import { Phone, Mail, MapPin, Instagram, ArrowUp, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerServices = [
    { name: 'Social Media Management', href: '#services' },
    { name: 'Logo Design', href: '#services' },
    { name: 'Dynamic Website Development', href: '#services' },
    { name: 'Static Website Development', href: '#services' },
    { name: 'SEO-Search Engine Optimization', href: '#services' },
    { name: 'Digital Marketing', href: '#services' },
  ];

  return (
    <footer className="relative bg-white border-t border-slate-200 text-slate-600 pt-20 pb-12 overflow-hidden">
      {/* Decorative top gradient rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-200">
          
          {/* Col 1: Brand & Tagline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#hero" className="inline-block">
              <Logo size={42} variant="light" />
            </a>
            <p className="text-slate-600 text-sm sm:text-base max-w-sm leading-relaxed font-normal">
              Leading web development and IT solutions experts delivering scalable, client-focused digital solutions for businesses that want to stand out.
            </p>
            <div className="text-xs text-slate-500 space-y-1 font-mono">
              <div>FOUNDER & TECH LEAD: <span className="font-bold text-slate-800">{COMPANY_INFO.founder.name}</span></div>
              <div>LOCATION: {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}</div>
            </div>

            {/* Instagram Link Badge with corrected @the_star_techno */}
            <div className="pt-2">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition-all group shadow-xs"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Follow {COMPANY_INFO.instagram}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Company Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-700 uppercase block">
              COMPANY
            </span>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'About', href: '#about' },
                { name: 'Services', href: '#services' },
                { name: 'Portfolio', href: '#projects' },
                { name: 'Blog', href: '#blog' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services from Reference (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-700 uppercase block">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footerServices.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    className="text-slate-600 hover:text-cyan-700 font-medium transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-700 uppercase block">
              CONTACT
            </span>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-1" />
                <span className="leading-snug">
                  {COMPANY_INFO.address.full}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-slate-800 hover:text-cyan-700 font-bold transition-colors"
                >
                  {COMPANY_INFO.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-slate-800 hover:text-cyan-700 text-xs sm:text-sm font-semibold transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all shadow-md shadow-cyan-600/20"
              >
                Start a Project
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {COMPANY_INFO.name}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-slate-800 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-slate-800 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 ml-2 font-semibold"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-600" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
