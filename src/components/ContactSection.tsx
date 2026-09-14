import React, { useState, forwardRef } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  User, 
  Building2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(({ initialService }, ref) => {
  const { photoUrl } = useFounderPhoto();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    business: '',
    email: '',
    phone: '',
    service: initialService || 'Web Development',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update selected service if parent changes it
  React.useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(COMPANY_INFO.formspreeAction, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          service: 'Web Development',
          message: '',
        });
      } else {
        const data = await response.json();
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          setErrorMessage('Unable to submit your message. Please try again or reach out via WhatsApp/Phone.');
        }
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage('Network connection error. You can also contact us directly at 9595689877.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 relative bg-[#f8fafc] border-t border-slate-200/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-600" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            LET'S BUILD SOMETHING GREAT.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Have an idea, a business or a project in mind? Let's talk. We'll discuss your goals and propose a clear, modern roadmap.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Functional Formspree Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl shadow-slate-900/5">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-cyan-700 uppercase font-extrabold">
                  DIRECT CONTACT
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
                  Get In Touch
                </h3>
              </div>

              {/* Founder Identity */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-xs">
                  <img
                    src={photoUrl}
                    alt={COMPANY_INFO.founder.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== '/Founder.png' && !target.src.endsWith('/Founder.png')) {
                        target.src = '/Founder.png';
                      } else if (target.src !== '/founder.png' && !target.src.endsWith('/founder.png')) {
                        target.src = '/founder.png';
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-mono font-bold">PRIMARY CONTACT</div>
                  <div className="text-base font-extrabold text-slate-900">{COMPANY_INFO.founder.name}</div>
                  <div className="text-xs text-cyan-700 font-bold">{COMPANY_INFO.founder.role}</div>
                </div>
              </div>

              {/* Information Rows */}
              <div className="space-y-3.5 text-sm">
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-100/80 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-mono font-bold">PHONE / WHATSAPP</span>
                    <span className="text-slate-900 font-bold text-base group-hover:text-cyan-700 transition-colors">
                      {COMPANY_INFO.formattedPhone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-100/80 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-mono font-bold">EMAIL INQUIRIES</span>
                    <span className="text-slate-900 font-bold text-sm sm:text-base group-hover:text-cyan-700 transition-colors break-all">
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Instagram with corrected handle @the_star_techno */}
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-mono font-bold">OFFICIAL INSTAGRAM</span>
                    <span className="text-slate-900 font-bold text-base group-hover:text-pink-600 transition-colors">
                      {COMPANY_INFO.instagram}
                    </span>
                  </div>
                </a>

                {/* Office Address */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="p-2.5 rounded-xl bg-cyan-100/80 text-cyan-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-mono font-bold">OFFICE LOCATION</span>
                    <span className="text-slate-800 text-sm leading-relaxed block font-medium">
                      {COMPANY_INFO.address.full}
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours note */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                <span>Prompt responses within 24 business hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Formspree Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 relative shadow-xl shadow-slate-900/5">
              
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Message Received
                  </h3>
                  <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you. We've received your enquiry and will get back to you shortly.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20"
                    >
                      Instant WhatsApp Chat
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form
                  action={COMPANY_INFO.formspreeAction}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      Project Inquiry Form
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct transmission to THE STAR TECHNOLOGY engineering desk.
                    </p>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-business" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Business / Brand Name
                      </label>
                      <input
                        id="form-business"
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="e.g. Royal Cafe & Restro"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your Email *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9595689877"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Service Required Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="form-service" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Service Required
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="text-slate-900 bg-white">
                          {s.title} — {s.tagline}
                        </option>
                      ))}
                      <option value="Full Digital Transformation" className="text-slate-900 bg-white">
                        Full Digital Transformation / Brand Website
                      </option>
                      <option value="Other Inquiries" className="text-slate-900 bg-white">
                        Other Consultation / Inquiries
                      </option>
                    </select>
                  </div>

                  {/* Your Message */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Message & Project Details *
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business, current website or the kind of digital presence you want to create..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    data-cursor="cta"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 font-medium">
                    <span>Direct submission via Formspree</span>
                    <span>Confidential & Spam-free</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
