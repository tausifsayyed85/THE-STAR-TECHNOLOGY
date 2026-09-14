import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Star, Camera, UploadCloud, RotateCcw } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { Skeleton } from './SkeletonLoader';

export const AboutSection: React.FC = () => {
  const { photoUrl, updatePhotoFromFile, isCustom, resetToDefault } = useFounderPhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ok = await updatePhotoFromFile(file);
      if (ok) {
        setUploadNotice('Founder photo updated successfully!');
        setTimeout(() => setUploadNotice(null), 4000);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const ok = await updatePhotoFromFile(file);
      if (ok) {
        setUploadNotice('Founder photo updated successfully!');
        setTimeout(() => setUploadNotice(null), 4000);
      }
    }
  };
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-white overflow-hidden border-t border-slate-200/80">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Matching Reference */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <span>ABOUT US</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            A Technology Partner <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-600">
              Built for the Future
            </span>
          </h2>
        </div>

        {/* Two-Column Grid: Narrative & Founder Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Narrative, Story & 5 Stats Counters */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal">
              <strong className="text-slate-900 font-bold">THE STAR TECHNOLOGY</strong> is a full-service IT firm with 1+ years empowering businesses through innovative digital solutions.
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We integrate AI, cloud, and modern development practices to drive measurable, lasting results. When you work with us, you're gaining a dedicated partner — not just a vendor.
            </p>

            {/* Our Story Button & Core Values */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-cyan-700 border border-slate-200 text-xs font-bold transition-all group shadow-xs hover:border-cyan-400"
              >
                <span>Our Story & Vision</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Enterprise-Grade Code • Direct Tech Lead Access</span>
              </div>
            </div>

            {/* 5 Stats Counters from Reference Site */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                
                {/* 1. Rating */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 font-heading">
                    4.0 / 5
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                    Average Client Rating
                  </div>
                </div>

                {/* 2. Projects Delivered */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    20+
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                    Projects Delivered
                  </div>
                </div>

                {/* 3. Client Satisfaction */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading">
                    98%
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                    Client Satisfaction
                  </div>
                </div>

                {/* 4. Happy Clients */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-heading">
                    18+
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                    Happy Clients
                  </div>
                </div>

                {/* 5. Years Experience */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-heading">
                    1+
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1 leading-tight">
                    Years Experience
                  </div>
                </div>

              </div>
            </div>

            {/* Target Businesses Badges */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Industries Empowered
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Vehicle & Smart QR Systems",
                  "Hospitals & Healthcare Clinics",
                  "Automotive MOT Centers",
                  "Dining & Restaurants",
                  "Fitness & Gyms",
                  "Real Estate Portals",
                  "Startups & SMEs",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:border-cyan-400 transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Reference */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5 font-bold">Headquarters & Service Area</strong>
                <span>{COMPANY_INFO.locationCopy}</span>
              </div>
            </div>
          </div>

          {/* Right: Executive Founder Profile Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl shadow-slate-900/5 relative overflow-hidden group hover:border-cyan-400 transition-all duration-300"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Founder Photo with direct upload and drag-and-drop capability */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="founder-photo-upload-input"
              />

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-slate-100 border transition-all duration-300 shadow-sm ${
                  isDragging ? 'border-cyan-500 ring-4 ring-cyan-500/20' : 'border-slate-200/90'
                }`}
              >
                {!isPhotoLoaded && (
                  <div className="absolute inset-0 z-10">
                    <Skeleton className="w-full h-full rounded-2xl" />
                  </div>
                )}

                <img
                  src={photoUrl}
                  alt="Tausif Sayyed - Founder & Technology Lead"
                  referrerPolicy="no-referrer"
                  onLoad={() => setIsPhotoLoaded(true)}
                  onError={(e) => {
                    setIsPhotoLoaded(true);
                    // graceful fallback chain
                    const target = e.currentTarget;
                    if (target.src !== '/Founder.png' && !target.src.endsWith('/Founder.png')) {
                      target.src = '/Founder.png';
                    } else if (target.src !== '/founder.png' && !target.src.endsWith('/founder.png')) {
                      target.src = '/founder.png';
                    }
                  }}
                  className={`w-full h-full object-cover object-top filter contrast-105 transition-all duration-500 group-hover:scale-[1.02] ${
                    isPhotoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-cyan-500/30 text-[11px] font-bold text-cyan-800 shadow-sm">
                  FOUNDER PROFILE
                </div>

                {/* Direct Upload / Replace Photo Button */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {isCustom && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetToDefault();
                      }}
                      title="Reset to default photo"
                      className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 shadow-sm border border-slate-200 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload / Replace founder photo from your device"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md text-[11px] font-semibold shadow-md transition-all hover:scale-105"
                  >
                    <Camera className="w-3 h-3 text-cyan-400" />
                    <span>Upload Image</span>
                  </button>
                </div>

                {isDragging && (
                  <div className="absolute inset-0 bg-cyan-900/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center z-20">
                    <UploadCloud className="w-10 h-10 mb-2 text-cyan-300 animate-bounce" />
                    <p className="text-xs font-bold uppercase tracking-wider">Drop your photo here</p>
                  </div>
                )}
              </div>

              {uploadNotice && (
                <div className="mb-4 p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-800 font-semibold text-center animate-fade-in">
                  {uploadNotice}
                </div>
              )}

              {/* Profile Details */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                    {COMPANY_INFO.founder.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-cyan-600 tracking-wider">
                    {COMPANY_INFO.shortName}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-bold text-cyan-700 tracking-wide">
                  {COMPANY_INFO.founder.role}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed pt-1 font-normal">
                  "{COMPANY_INFO.founder.bio}"
                </p>

                {/* Direct Connect Actions with Corrected Instagram handle */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{COMPANY_INFO.formattedPhone}</span>
                  </a>

                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 text-xs font-bold text-pink-700 border border-pink-500/20 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>{COMPANY_INFO.instagram}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
