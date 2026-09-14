/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { FounderPhotoProvider } from './context/FounderPhotoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { StatementSection } from './components/StatementSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TechStackSection } from './components/TechStackSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BlogSection } from './components/BlogSection';
import { GrowthBanner } from './components/GrowthBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LegalModal } from './components/LegalModal';

export default function App() {
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('Dynamic Website Development');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProjectFromCaseStudy = (projectTitle: string) => {
    setSelectedServiceForContact(`Project inspired by ${projectTitle}`);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FounderPhotoProvider>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-cyan-600 selection:text-white font-sans antialiased">
        {/* Top Reading Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Custom Desktop Interactive Cursor */}
        <CustomCursor />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Page Flow Matching Upparac Structure */}
      <main className="flex-grow">
        {/* 1. Hero: Dynamic IT, Dynamic Results, Cycling Ticker, Key Pills */}
        <Hero />

        {/* 2. Marquee Ticker Strip */}
        <MarqueeStrip />

        {/* 3. What We Do: We're Provide Smart Solution (11 Core Services Grid) */}
        <ServicesSection
          onSelectService={handleSelectService}
          onViewPortfolio={handleScrollToProjects}
        />

        {/* 4. About Us: A Technology Partner Built for the Future (5 Metric Counters & Founder Profile) */}
        <AboutSection />

        {/* 5. Statement / Brand Rhythm */}
        <StatementSection />

        {/* 6. Portfolio / Selected Work: scanigo, My Care Hospital, Alperton MOT Centre + Showcases */}
        <ProjectsSection onStartProject={handleStartProjectFromCaseStudy} />

        {/* 7. Testimonials: Don't Take Our Word For It */}
        <TestimonialsSection />

        {/* 8. Tech Stack */}
        <TechStackSection />

        {/* 9. Process / How We Work */}
        <ProcessSection />

        {/* 10. Why Choose Us */}
        <WhyChooseUs />

        {/* 11. Blog: Technology & Growth Insights */}
        <BlogSection />

        {/* 12. Pre-CTA Banner: Available for new projects - Let's Build Something Great */}
        <GrowthBanner onStartProject={() => handleSelectService('Comprehensive IT & Web Solution')} />

        {/* 13. Contact Form: Formspree Integration & Direct Contact Info */}
        <ContactSection
          ref={contactSectionRef}
          initialService={selectedServiceForContact}
        />
      </main>

      {/* 14. Footer */}
      <Footer onOpenLegal={(type) => setLegalModalType(type)} />

      {/* 15. Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* 16. Legal Modal (Privacy Policy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
    </FounderPhotoProvider>
  );
}
