import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip Notification */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0d121e]/95 backdrop-blur-md border border-cyan-400/30 text-xs text-zinc-200 shadow-xl shadow-black/50 animate-fade-in">
          <span>Chat directly on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-zinc-500 hover:text-white p-0.5"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={COMPANY_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact THE STAR TECHNOLOGY on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-950/60 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-current relative z-10 transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
};
