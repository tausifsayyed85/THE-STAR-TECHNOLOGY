import React, { useState, forwardRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send, CheckCircle2, Phone, Mail, MapPin, Instagram, MessageCircle, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
  initialBudget?: string;
}

export const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(({ initialService, initialBudget }, ref) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: initialService || 'Web Development',
    budgetRange: initialBudget || '₹50k - ₹1L',
    timeline: '2 - 4 Weeks',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialBudget) {
      setFormData(prev => ({ ...prev, budgetRange: initialBudget }));
    }
  }, [initialBudget]);

  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'Custom Software',
    'AI & Automation',
    'UI/UX Design',
    'E-Commerce',
    'Digital Marketing & SEO',
    'Technology Consulting',
    'Other Bespoke Architecture',
  ];

  const budgetRanges = [
    'Under ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000+',
  ];

  const timelines = [
    'Immediate (Under 2 weeks)',
    '2 - 4 Weeks',
    '1 - 2 Months',
    'Exploring / Planning Stage',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(COMPANY_INFO.formspreeAction, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          budgetRange: formData.budgetRange,
          timeline: formData.timeline,
          message: formData.message,
          _subject: `New TST Project Inquiry from ${formData.name} (${formData.projectType})`,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form. Please use direct WhatsApp.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setFormStatus('error');
      setErrorMessage(err.message || 'Error transmitting inquiry. Please reach us via WhatsApp or direct phone.');
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello THE STAR TECHNOLOGY,\n\nName: ${formData.name || 'Client'}\nCompany: ${formData.company || 'N/A'}\nProject: ${formData.projectType}\nBudget: ${formData.budgetRange}\nTimeline: ${formData.timeline}\nDetails: ${formData.message || 'I would like to discuss a digital project.'}`
    );
    window.open(`https://wa.me/91${COMPANY_INFO.phone}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 bg-[#FFFFFF] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E5E7EB] gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-sm font-bold text-[#00C2FF]">12</span>
              <span className="text-neutral-400 font-mono text-sm">/</span>
              <span className="font-mono text-sm tracking-[0.2em] font-semibold text-[#080808] uppercase">
                CONTACT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#080808] tracking-tight font-heading uppercase">
              START A PROJECT
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-md">
            Direct communication with engineering leadership. No salespeople, no delays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Studio Contacts & Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#080808] font-heading uppercase tracking-tight">
                LET'S TALK SPECIFICATIONS
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                Whether you have an established scope of work or an early-stage concept, we are ready to discuss architecture, timeline, and execution.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* WhatsApp & Phone */}
              <div className="p-6 bg-[#F4F5F7] border border-[#E5E7EB]">
                <div className="font-mono text-[10px] tracking-widest text-[#00C2FF] uppercase font-bold mb-2">
                  DIRECT PHONE &amp; WHATSAPP
                </div>
                <div className="text-lg font-bold text-[#080808] font-heading mb-1">
                  {COMPANY_INFO.formattedPhone}
                </div>
                <div className="text-xs text-[#6B7280] mb-3">
                  Monday to Saturday: 9:00 AM – 8:00 PM IST
                </div>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#080808] hover:text-[#00C2FF] font-heading uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>LAUNCH INSTANT WHATSAPP CHAT →</span>
                </button>
              </div>

              {/* Email */}
              <div className="p-6 bg-[#F4F5F7] border border-[#E5E7EB]">
                <div className="font-mono text-[10px] tracking-widest text-[#00C2FF] uppercase font-bold mb-2">
                  OFFICIAL EMAIL
                </div>
                <div className="text-lg font-bold text-[#080808] font-heading mb-1">
                  {COMPANY_INFO.email}
                </div>
                <div className="text-xs text-[#6B7280]">
                  Send RFPs, architectural specs, and project decks.
                </div>
              </div>

              {/* Physical Studio */}
              <div className="p-6 bg-[#F4F5F7] border border-[#E5E7EB]">
                <div className="font-mono text-[10px] tracking-widest text-[#00C2FF] uppercase font-bold mb-2">
                  STUDIO HEADQUARTERS
                </div>
                <div className="text-sm font-bold text-[#080808] mb-1">
                  {COMPANY_INFO.address.full}
                </div>
                <div className="text-xs text-[#6B7280]">
                  Serving enterprises locally in Maharashtra and remotely across India &amp; global markets.
                </div>
              </div>
            </div>

            {/* Social / Instagram */}
            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between font-mono text-xs text-[#6B7280]">
              <span>INSTAGRAM // <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#080808] hover:text-[#00C2FF] font-bold">{COMPANY_INFO.instagram}</a></span>
              <span className="text-[#00C2FF]">TST / 2026</span>
            </div>
          </div>

          {/* Right Column: Complete Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F4F5F7] border border-[#080808] p-8 sm:p-12 shadow-xl">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-[#00C2FF] text-[#080808] mx-auto flex items-center justify-center font-bold text-2xl shadow-md">
                  ✓
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#080808] font-heading uppercase">
                    INQUIRY TRANSMITTED SUCCESSFULLY
                  </h3>
                  <p className="text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Tausif Sayyed and the TST engineering team will review your specifications and contact you within 2 to 4 business hours.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-3 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>

                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 bg-white border border-[#080808] text-[#080808] hover:bg-[#080808] hover:text-white font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CONNECT ON WHATSAPP NOW →
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Title & Indicator */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider">
                    SPECIFICATION INTAKE FORM
                  </span>
                  <span className="font-mono text-[10px] text-[#00C2FF] font-bold">
                    STEP 01 // TRANSMIT
                  </span>
                </div>

                {/* Name & Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] focus:ring-1 focus:ring-[#080808] text-sm text-[#080808] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                      COMPANY / BRAND NAME
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Health Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] focus:ring-1 focus:ring-[#080808] text-sm text-[#080808] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] focus:ring-1 focus:ring-[#080808] text-sm text-[#080808] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                      PHONE / WHATSAPP NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] focus:ring-1 focus:ring-[#080808] text-sm text-[#080808] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div>
                  <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                    PRIMARY SERVICE REQUIRED *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] text-sm text-[#080808] outline-none transition-colors cursor-pointer"
                  >
                    {projectTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                      APPROX. BUDGET RANGE
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] text-sm text-[#080808] outline-none transition-colors cursor-pointer"
                    >
                      {budgetRanges.map((b, idx) => (
                        <option key={idx} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                      TARGET TIMELINE
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] text-sm text-[#080808] outline-none transition-colors cursor-pointer"
                    >
                      {timelines.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Details Message */}
                <div>
                  <label className="block font-mono text-[11px] text-[#080808] font-bold uppercase tracking-wider mb-2">
                    PROJECT DESCRIPTION &amp; GOALS *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about what you want to build, existing systems, or problems you are solving..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] focus:border-[#080808] focus:ring-1 focus:ring-[#080808] text-sm text-[#080808] outline-none transition-colors resize-none"
                  />
                </div>

                {/* Error Banner if any */}
                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full sm:w-auto flex-grow px-8 py-4 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] disabled:bg-neutral-400 font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
                  >
                    <span>{formStatus === 'submitting' ? 'TRANSMITTING...' : 'SUBMIT PROJECT INQUIRY'}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto px-6 py-4 bg-white border border-[#E5E7EB] hover:border-[#080808] text-[#080808] font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>DIRECT WHATSAPP</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
});
