import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Calculator, ShieldCheck, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface PricingPageProps {
  onContinueToContact: (scopeDetails: { service: string; budget: string; description: string }) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onContinueToContact }) => {
  const [selectedService, setSelectedService] = useState('Web Development');
  const [selectedStage, setSelectedStage] = useState('New Product / MVP');
  const [selectedComplexity, setSelectedComplexity] = useState('Standard (Core Features)');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Mobile Optimization & Core Vitals', 'Direct WhatsApp Integration']);

  const services = [
    { id: 'Web Development', name: 'Web Development', basePrice: 28000, desc: 'Corporate site or dynamic web portal' },
    { id: 'Mobile App Development', name: 'Mobile App Development', basePrice: 65000, desc: 'iOS & Android cross-platform app' },
    { id: 'Custom Software', name: 'Custom Software', basePrice: 75000, desc: 'Internal workflow engine or ERP/CRM' },
    { id: 'AI & Automation', name: 'AI & Automation', basePrice: 35000, desc: 'Intelligent routing, webhooks & assistants' },
    { id: 'E-Commerce', name: 'E-Commerce Platform', basePrice: 42000, desc: 'Online catalog with UPI & payment gateway' },
    { id: 'UI/UX Design', name: 'UI/UX Design & System', basePrice: 25000, desc: 'Figma prototypes and design tokens' },
  ];

  const stages = [
    { id: 'New Product / MVP', multiplier: 1.0, desc: 'Building from scratch' },
    { id: 'Redesign / Modernization', multiplier: 1.15, desc: 'Upgrading existing site' },
    { id: 'Scale & New Modules', multiplier: 1.3, desc: 'Expanding an active platform' },
  ];

  const complexities = [
    { id: 'Essential (Fast Launch)', multiplier: 0.85, timeline: '1 - 2 Weeks' },
    { id: 'Standard (Core Features)', multiplier: 1.0, timeline: '2 - 4 Weeks' },
    { id: 'Advanced (Custom Logic & APIs)', multiplier: 1.45, timeline: '4 - 6 Weeks' },
  ];

  const availableAddons = [
    { id: 'Mobile Optimization & Core Vitals', price: 0, desc: 'Included standard in all builds' },
    { id: 'Direct WhatsApp Integration', price: 0, desc: 'Included standard in all builds' },
    { id: 'Custom Admin Dashboard & CMS', price: 15000, desc: 'Self-serve content & order management' },
    { id: 'Automated Invoice / PDF Engine', price: 12000, desc: 'Instant downloadable receipts' },
    { id: 'Local SEO & Schema.org Setup', price: 8000, desc: 'Rich Google Search snippets' },
  ];

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Calculate estimated price
  const currentServiceObj = services.find(s => s.id === selectedService) || services[0];
  const currentStageObj = stages.find(s => s.id === selectedStage) || stages[0];
  const currentComplexityObj = complexities.find(c => c.id === selectedComplexity) || complexities[1];

  const addonTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = availableAddons.find(a => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const estimatedBase = Math.round(currentServiceObj.basePrice * currentStageObj.multiplier * currentComplexityObj.multiplier);
  const totalEstimated = estimatedBase + addonTotal;

  const getBudgetTierLabel = (amount: number) => {
    if (amount < 25000) return 'Under ₹25,000';
    if (amount <= 50000) return '₹25,000 - ₹50,000';
    if (amount <= 100000) return '₹50,000 - ₹1,00,000';
    if (amount <= 250000) return '₹1,00,000 - ₹2,50,000';
    return '₹2,50,000+';
  };

  const handleProceed = () => {
    onContinueToContact({
      service: selectedService,
      budget: getBudgetTierLabel(totalEstimated),
      description: `Project Scope:\n- Service: ${selectedService}\n- Stage: ${selectedStage}\n- Complexity: ${selectedComplexity}\n- Add-ons: ${selectedAddons.join(', ')}\n- Estimated Quote: ~₹${totalEstimated.toLocaleString('en-IN')}`,
    });
  };

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#00C2FF] tracking-widest uppercase">
            <span>PRICING &amp; SCOPING</span>
            <span>//</span>
            <span>TRANSPARENT SPECIFICATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#080808] font-heading tracking-tight uppercase leading-[0.98]">
            PROJECT SCOPE &amp; ESTIMATOR
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Configure your technical requirements to generate an immediate scope estimate. Every project includes milestone-based pricing with no hidden costs.
          </p>
        </div>

        {/* 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Scope Selector */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Select Service */}
            <div>
              <div className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E7EB] flex items-center justify-between">
                <span>01 // SELECT CORE SERVICE</span>
                <span className="text-[#00C2FF]">REQUIRED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => {
                  const isSelected = selectedService === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id)}
                      className={`text-left p-4 border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#080808] text-white border-[#080808]'
                          : 'bg-[#F4F5F7] text-[#080808] border-[#E5E7EB] hover:border-[#080808]'
                      }`}
                    >
                      <div className="font-heading font-bold text-sm uppercase mb-1">
                        {s.name}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-neutral-300' : 'text-[#6B7280]'}`}>
                        {s.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Project Stage */}
            <div>
              <div className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E7EB]">
                02 // CURRENT PRODUCT STAGE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stages.map((st) => {
                  const isSelected = selectedStage === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStage(st.id)}
                      className={`text-left p-4 border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#080808] text-white border-[#080808]'
                          : 'bg-[#F4F5F7] text-[#080808] border-[#E5E7EB] hover:border-[#080808]'
                      }`}
                    >
                      <div className="font-heading font-bold text-xs uppercase mb-1">
                        {st.id}
                      </div>
                      <div className={`text-[11px] ${isSelected ? 'text-neutral-300' : 'text-[#6B7280]'}`}>
                        {st.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Complexity */}
            <div>
              <div className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E7EB]">
                03 // ARCHITECTURAL COMPLEXITY
              </div>

              <div className="space-y-2.5">
                {complexities.map((comp) => {
                  const isSelected = selectedComplexity === comp.id;
                  return (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setSelectedComplexity(comp.id)}
                      className={`w-full text-left p-4 border flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#080808] text-white border-[#080808]'
                          : 'bg-[#F4F5F7] text-[#080808] border-[#E5E7EB] hover:border-[#080808]'
                      }`}
                    >
                      <span className="font-heading font-bold text-sm uppercase">
                        {comp.id}
                      </span>
                      <span className="font-mono text-xs text-[#00C2FF]">
                        Est. {comp.timeline}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Modules & Addons */}
            <div>
              <div className="font-mono text-xs font-bold text-[#080808] uppercase tracking-wider mb-4 pb-2 border-b border-[#E5E7EB]">
                04 // OPTIONAL SYSTEM MODULES
              </div>

              <div className="space-y-2.5">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#FFFFFF] border-[#080808]'
                          : 'bg-[#F4F5F7] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center ${
                          isChecked ? 'bg-[#00C2FF] border-[#00C2FF] text-[#080808]' : 'border-neutral-400 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="font-heading font-bold text-xs uppercase text-[#080808]">
                            {addon.id}
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            {addon.desc}
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-xs text-[#080808] font-bold">
                        {addon.price === 0 ? 'FREE / STANDARD' : `+₹${addon.price.toLocaleString('en-IN')}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Scope & Summary Card */}
          <div className="lg:col-span-5 sticky top-28 bg-[#F4F5F7] border border-[#080808] p-8 shadow-xl">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-[#00C2FF] pb-4 border-b border-[#E5E7EB] uppercase">
              <span>ESTIMATED PROJECT SCOPE</span>
              <span>CALC // LIVE</span>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider">
                  ESTIMATED INVESTMENT
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[#080808] font-heading mt-1">
                  ₹{totalEstimated.toLocaleString('en-IN')}*
                </div>
                <div className="font-mono text-[11px] text-[#6B7280] mt-1">
                  Scope Tier: <strong className="text-[#080808]">{getBudgetTierLabel(totalEstimated)}</strong>
                </div>
              </div>

              {/* Selected Attributes */}
              <div className="pt-4 border-t border-[#E5E7EB] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">SERVICE:</span>
                  <span className="font-bold text-[#080808]">{selectedService}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">STAGE:</span>
                  <span className="font-bold text-[#080808]">{selectedStage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">COMPLEXITY:</span>
                  <span className="font-bold text-[#080808]">{selectedComplexity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">EST. TIMELINE:</span>
                  <span className="font-bold text-[#00C2FF]">{currentComplexityObj.timeline}</span>
                </div>
              </div>

              {/* Standard Inclusions */}
              <div className="pt-4 border-t border-[#E5E7EB] space-y-1.5 text-xs text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <span className="text-[#00C2FF] font-bold">✓</span>
                  <span>100% Mobile responsive &amp; Core Web Vitals speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C2FF] font-bold">✓</span>
                  <span>Direct WhatsApp client routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C2FF] font-bold">✓</span>
                  <span>Full source code ownership upon final delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C2FF] font-bold">✓</span>
                  <span>Direct engineering lead access throughout</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <button
                onClick={handleProceed}
                className="w-full py-4 bg-[#080808] text-white hover:bg-[#00C2FF] hover:text-[#080808] font-heading font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>CONTINUE WITH THIS SCOPE →</span>
              </button>

              <p className="text-[11px] text-[#6B7280] text-center font-mono">
                *Final scope confirmed after technical discovery consultation.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
