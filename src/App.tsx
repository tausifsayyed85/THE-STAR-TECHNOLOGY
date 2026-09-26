/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { FounderPhotoProvider } from './context/FounderPhotoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { StatementSection } from './components/StatementSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { FAQSection } from './components/FAQSection';
import { GrowthBanner } from './components/GrowthBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LegalModal } from './components/LegalModal';
import { LoadingScreen } from './components/LoadingScreen';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { CareersPage } from './pages/CareersPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'pricing' | 'faq' | 'careers'>('home');
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('Web Development');
  const [selectedBudgetForContact, setSelectedBudgetForContact] = useState<string>('₹50k - ₹1L');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  // Sync route with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'pricing') {
        setCurrentRoute('pricing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'faq-all' || hash === 'faq') {
        setCurrentRoute('faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'careers') {
        setCurrentRoute('careers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: string, elementId?: string) => {
    if (route === 'pricing') {
      setCurrentRoute('pricing');
      window.location.hash = 'pricing';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'faq') {
      setCurrentRoute('faq');
      window.location.hash = 'faq';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'careers') {
      setCurrentRoute('careers');
      window.location.hash = 'careers';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentRoute('home');
      window.location.hash = elementId || '';
      if (elementId) {
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleStartProject = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForContact(serviceTitle);
    }
    setCurrentRoute('home');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleContinueFromPricing = (scopeDetails: { service: string; budget: string; description: string }) => {
    setSelectedServiceForContact(scopeDetails.service);
    setSelectedBudgetForContact(scopeDetails.budget);
    setCurrentRoute('home');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <FounderPhotoProvider>
      {/* Loading Screen on Initial Visit */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-[#FFFFFF] text-[#080808] flex flex-col selection:bg-[#00C2FF] selection:text-[#080808] font-sans antialiased">
        {/* Top Reading Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Custom Desktop Interactive Cursor */}
        <CustomCursor />

        {/* Sticky Header Navigation */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onStartProject={() => handleStartProject('Web Development')}
        />

        {/* Dynamic Route View */}
        <main className="flex-grow">
          {currentRoute === 'pricing' ? (
            <PricingPage onContinueToContact={handleContinueFromPricing} />
          ) : currentRoute === 'faq' ? (
            <FAQPage onStartProject={() => handleStartProject('Web Development')} />
          ) : currentRoute === 'careers' ? (
            <CareersPage />
          ) : (
            <>
              {/* 1. Hero with Abstract Technical TST System */}
              <Hero
                onStartProject={() => handleStartProject('Web Development')}
                onExploreWork={() => handleNavigate('home', 'projects')}
              />

              {/* 2. Marquee Ticker Strip */}
              <MarqueeStrip />

              {/* 3. 01 / WHAT WE DO - Statement */}
              <StatementSection />

              {/* 4. 02 / SERVICES - 10 Core Services Grid */}
              <ServicesSection
                onSelectService={(service) => handleStartProject(service)}
                onViewPortfolio={() => handleNavigate('home', 'projects')}
              />

              {/* 5. 03 / SELECTED WORK - Projects & Case Studies */}
              <ProjectsSection
                onStartProject={(project) => handleStartProject(`Project inspired by ${project}`)}
              />

              {/* 6. 04 / ABOUT - Founder Tausif Sayyed & Studio */}
              <AboutSection />

              {/* 7. 05 / TECHNOLOGY - Modern Tech Stack */}
              <TechStackSection />

              {/* 8. 06 / PROCESS - 7-Step Lifecycle */}
              <ProcessSection />

              {/* 9. 07 / WHY TST & 08 / INDUSTRIES */}
              <WhyChooseUs />

              {/* 10. 09 / TESTIMONIALS - Client Voices */}
              <TestimonialsSection />

              {/* 11. 10 / INSIGHTS - Perspectives & Analysis */}
              <BlogSection />

              {/* 12. 11 / FAQ - Frequently Asked Questions Accordion */}
              <FAQSection
                onStartProject={() => handleStartProject('Web Development')}
                onViewAllFaqs={() => handleNavigate('faq')}
              />

              {/* 13. Pre-CTA Banner: Ready to Build What's Next? */}
              <GrowthBanner
                onStartProject={() => handleStartProject('Comprehensive Product Engineering')}
              />

              {/* 14. 12 / CONTACT - Specification Intake Form */}
              <ContactSection
                ref={contactSectionRef}
                initialService={selectedServiceForContact}
                initialBudget={selectedBudgetForContact}
              />
            </>
          )}
        </main>

        {/* Premium Corporate Footer */}
        <Footer
          onOpenLegal={(type) => setLegalModalType(type)}
          onNavigate={(route) => handleNavigate(route)}
        />

        {/* Floating Quick WhatsApp Action */}
        <WhatsAppButton />

        {/* Legal Modal (Privacy Policy & Terms) */}
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </FounderPhotoProvider>
  );
}
