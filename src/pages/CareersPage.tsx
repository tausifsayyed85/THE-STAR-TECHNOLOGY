import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, ShieldCheck, Code, Zap } from 'lucide-react';
import { COMPANY_INFO, CAREER_ROLES } from '../data/companyData';

export const CareersPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
            <span>PEOPLE &amp; CULTURE</span>
            <span>//</span>
            <span>CAREERS AT TST</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#080808] font-heading tracking-tight uppercase leading-[0.98]">
            JOIN THE STUDIO
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            We are an engineering-driven digital product studio. We value clean code, intellectual honesty, minimalist design, and deep technical ownership.
          </p>
        </div>

        {/* Culture Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-[#F4F5F7] border border-[#E5E7EB]">
            <div className="font-mono text-xs text-[#00C2FF] font-bold mb-3 uppercase">
              01 // CRAFTSMANSHIP
            </div>
            <h3 className="font-heading font-bold text-lg text-[#080808] uppercase mb-2">
              PRIDE IN EXECUTION
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              We care about clean semantic HTML, 60fps animations, typed schemas, and zero dependency bloat.
            </p>
          </div>

          <div className="p-8 bg-[#F4F5F7] border border-[#E5E7EB]">
            <div className="font-mono text-xs text-[#00C2FF] font-bold mb-3 uppercase">
              02 // AUTONOMY
            </div>
            <h3 className="font-heading font-bold text-lg text-[#080808] uppercase mb-2">
              DIRECT OWNERSHIP
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              No endless committees or bureaucracy. You make decisions, write architecture, and ship directly to users.
            </p>
          </div>

          <div className="p-8 bg-[#F4F5F7] border border-[#E5E7EB]">
            <div className="font-mono text-xs text-[#00C2FF] font-bold mb-3 uppercase">
              03 // MODERN STACK
            </div>
            <h3 className="font-heading font-bold text-lg text-[#080808] uppercase mb-2">
              CUTTING-EDGE TOOLING
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Modern React, Next.js, TypeScript, Tailwind CSS, PostgreSQL, and practical AI APIs.
            </p>
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-8">
            <h2 className="font-heading font-bold text-2xl uppercase tracking-tight text-[#080808]">
              CURRENT OPENINGS
            </h2>
            <span className="font-mono text-xs text-[#6B7280]">
              STATUS: SELECTIVE HIRING
            </span>
          </div>

          {/* Status Box */}
          <div className="p-8 bg-[#F4F5F7] border border-[#080808] space-y-4 mb-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00C2FF] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
              <span>CURRENT STATUS // NO ACTIVE COMMERCIAL OPENINGS</span>
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#080808] uppercase">
              SPECULATIVE APPLICATIONS WELCOME
            </h3>
            <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
              While we are not running open mass recruitment, we always make room for exceptional frontend engineers, full-stack developers, and UI/UX designers who share our obsessive focus on performance and craft.
            </p>
          </div>

          {/* Roles We Regularly Look For */}
          <div className="space-y-4">
            {CAREER_ROLES.map((role) => (
              <div
                key={role.id}
                className="p-6 bg-[#FFFFFF] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#6B7280] mb-1">
                    <span>{role.department}</span>
                    <span>//</span>
                    <span>{role.location}</span>
                    <span>//</span>
                    <span>{role.type}</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#080808]">
                    {role.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {role.description}
                  </p>
                </div>

                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Speculative Application: ${encodeURIComponent(role.title)}`}
                  className="px-5 py-2.5 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] text-xs font-heading font-bold uppercase tracking-wider transition-colors shrink-0 text-center"
                >
                  SEND PORTFOLIO →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Speculative Application CTA */}
        <div className="p-8 sm:p-12 bg-[#080808] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-heading font-bold text-xl uppercase">
              THINK YOU WOULD BE A FIT?
            </h3>
            <p className="text-sm text-neutral-400 max-w-lg">
              Send your GitHub profile, Figma portfolio, and a short note on what you love building directly to our founder.
            </p>
          </div>

          <a
            href={`mailto:${COMPANY_INFO.email}?subject=Speculative Developer Application - THE STAR TECHNOLOGY`}
            className="px-8 py-4 bg-[#00C2FF] text-[#080808] hover:bg-white transition-colors font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL FOUNDER DIRECTLY</span>
          </a>
        </div>

      </div>
    </div>
  );
};
