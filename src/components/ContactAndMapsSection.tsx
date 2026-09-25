import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, ExternalLink, CheckCircle, AlertCircle, Building } from 'lucide-react';
import { OfficeLocation, ConsultantProfile } from '../types/portfolio';
import { DELOITTE_OFFICES } from '../data/defaultPortfolio';
import { MotionReveal } from './MotionReveal';

interface ContactAndMapsProps {
  profile: ConsultantProfile;
}

interface FormData {
  fullName: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  organization?: string;
  message?: string;
}

export const ContactAndMapsSection: React.FC<ContactAndMapsProps> = ({ profile }) => {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(DELOITTE_OFFICES[0]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    organization: '',
    inquiryType: 'Cloud Architecture & Modernization',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Corporate email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid corporate email format.';
    }

    if (!formData.organization.trim()) {
      errs.organization = 'Please specify your organization or company.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please share brief engagement details (at least 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real enterprise dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      organization: '',
      inquiryType: 'Cloud Architecture & Modernization',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <MotionReveal direction="up" distance={20} className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00558f] dark:text-[#00a3e0] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
            Deloitte Practice Office & Advisory Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0f1c30] dark:text-[#f0f4fa]">
            Connect & Office Integration
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4b5d78] dark:text-[#8fa3c0]">
            Initiate conversations regarding enterprise cloud modernization, executive advisory, or schedule a briefing at any Deloitte campus.
          </p>
        </MotionReveal>

        {/* 2-Column Responsive Grid: Left Contact Form, Right Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Neumorphic Contact Form */}
          <div className="lg:col-span-6">
            <MotionReveal delay={0.1} direction="up" distance={24}>
              <div className="p-6 sm:p-8 rounded-3xl neu-raised bg-[#e8edf5] dark:bg-[#101c31] text-left border border-white/50 dark:border-slate-800/40">
                <div className="border-b border-[#c3cbd8]/60 dark:border-[#182844] pb-4 mb-6">
                  <h3 className="text-xl font-bold text-[#0f1c30] dark:text-[#f0f4fa] flex items-center gap-2">
                    <span>Direct Engagement Inquiry</span>
                    <span className="w-2 h-2 rounded-full bg-[#86bc25]" />
                  </h3>
                  <p className="text-xs text-[#4b5d78] dark:text-[#8fa3c0] mt-1">
                    Typical response window: within 24 business hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#86bc25]/20 text-[#86bc25] flex items-center justify-center mx-auto shadow-[0_0_12px_rgba(134,188,37,0.4)]">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
                        Inquiry Received Successfully
                      </h4>
                      <p className="text-xs text-[#4b5d78] dark:text-[#8fa3c0] mt-1 max-w-sm mx-auto">
                        Thank you, {formData.fullName}. Your engagement request regarding {formData.inquiryType} has been dispatched to {profile.email}.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-[#00558f] dark:text-[#00a3e0] bg-white/40 dark:bg-slate-800/40 py-1.5 px-3 rounded-lg inline-block">
                      Reference: DLT-{Math.floor(100000 + Math.random() * 900000)}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handleResetForm}
                        className="px-5 py-2 text-xs font-semibold rounded-xl text-white bg-[#002c6c] hover:bg-[#00388c] dark:bg-[#00558f] transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
                        Full Name <span className="text-[#86bc25]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-4 py-2.5 rounded-xl neu-input text-xs text-[#0f1c30] dark:text-[#f0f4fa] placeholder-[#4b5d78]/60 focus:outline-none focus:ring-1 focus:ring-[#00558f]"
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Corporate Email & Organization */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
                          Corporate Email <span className="text-[#86bc25]">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@enterprise.com"
                          className="w-full px-4 py-2.5 rounded-xl neu-input text-xs text-[#0f1c30] dark:text-[#f0f4fa] placeholder-[#4b5d78]/60 focus:outline-none focus:ring-1 focus:ring-[#00558f]"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
                          Organization / Firm <span className="text-[#86bc25]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. Global Financial Corp"
                          className="w-full px-4 py-2.5 rounded-xl neu-input text-xs text-[#0f1c30] dark:text-[#f0f4fa] placeholder-[#4b5d78]/60 focus:outline-none focus:ring-1 focus:ring-[#00558f]"
                        />
                        {errors.organization && (
                          <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.organization}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
                        Engagement Domain
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl neu-input text-xs text-[#0f1c30] dark:text-[#f0f4fa] bg-transparent focus:outline-none focus:ring-1 focus:ring-[#00558f] cursor-pointer"
                      >
                        <option value="Cloud Architecture & Modernization" className="dark:bg-[#101c31]">
                          Cloud Architecture & Modernization
                        </option>
                        <option value="Enterprise AI & GenAI Implementation" className="dark:bg-[#101c31]">
                          Enterprise AI & GenAI Implementation
                        </option>
                        <option value="Executive Technology Advisory" className="dark:bg-[#101c31]">
                          Executive Technology Advisory
                        </option>
                        <option value="Systems Integration & Data Mesh" className="dark:bg-[#101c31]">
                          Systems Integration & Data Mesh
                        </option>
                        <option value="General Professional Discussion" className="dark:bg-[#101c31]">
                          General Professional Discussion
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
                          Engagement Context / Requirements <span className="text-[#86bc25]">*</span>
                        </label>
                        <span className="text-[10px] text-[#4b5d78] dark:text-[#8fa3c0] font-mono">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide details on project timeline, current architecture state, and objectives..."
                        className="w-full px-4 py-2.5 rounded-xl neu-input text-xs text-[#0f1c30] dark:text-[#f0f4fa] placeholder-[#4b5d78]/60 focus:outline-none focus:ring-1 focus:ring-[#00558f] resize-none"
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-[#002c6c] hover:bg-[#00388c] dark:bg-[#00558f] dark:hover:bg-[#0066aa] shadow-[0_6px_16px_rgba(0,44,108,0.25)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Briefing Request</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-center text-[#4b5d78] dark:text-[#8fa3c0] pt-1">
                      Confidentiality assured under standard Deloitte advisory covenants.
                    </div>
                  </form>
                )}
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Google Maps Integration & Office Selector */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <MotionReveal delay={0.2} direction="up" distance={24}>
              
              {/* Interactive Office Switcher Tabs */}
              <div className="p-4 rounded-3xl neu-raised bg-[#e8edf5] dark:bg-[#101c31] border border-white/50 dark:border-slate-800/40">
                <div className="text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa] mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#00558f]" />
                    Deloitte Office Locator & Locations
                  </span>
                  <span className="text-[10px] text-[#86bc25] font-mono">
                    ● 6 Global Hubs
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {DELOITTE_OFFICES.map((office) => {
                    const isSelected = selectedOffice.id === office.id;
                    return (
                      <button
                        key={office.id}
                        onClick={() => setSelectedOffice(office)}
                        className={`px-2 py-1.5 rounded-xl text-center text-[11px] font-semibold transition-all cursor-pointer truncate ${
                          isSelected
                            ? 'neu-pressed bg-[#e8edf5] dark:bg-[#101c31] text-[#002c6c] dark:text-[#00a3e0] border border-[#00558f]/20'
                            : 'neu-raised-sm bg-[#e8edf5] dark:bg-[#101c31] text-[#4b5d78] dark:text-[#8fa3c0]'
                        }`}
                        title={office.name}
                      >
                        {office.city}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Maps Container */}
              <div className="p-5 sm:p-6 rounded-3xl neu-raised bg-[#e8edf5] dark:bg-[#101c31] border border-white/50 dark:border-slate-800/40 space-y-4 mt-5">
                
                {/* Active Office Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c3cbd8]/60 dark:border-[#182844] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#0f1c30] dark:text-[#f0f4fa]">
                        {selectedOffice.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-[#86bc25] bg-[#86bc25]/10 px-2 py-0.5 rounded-full">
                        {selectedOffice.badge}
                      </span>
                    </div>
                    <div className="text-xs text-[#4b5d78] dark:text-[#8fa3c0] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00558f] shrink-0" />
                      <span className="line-clamp-1">{selectedOffice.address}</span>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedOffice.name + ' ' + selectedOffice.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl neu-button text-xs font-semibold text-[#002c6c] dark:text-[#00a3e0] hover:text-[#86bc25] transition-colors shrink-0 whitespace-nowrap"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Real Responsive Google Maps Embed with key transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedOffice.id}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden neu-pressed p-1.5 bg-[#e8edf5] dark:bg-[#0b1424]"
                  >
                    <iframe
                      title={`Google Maps location of ${selectedOffice.name}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        selectedOffice.query
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full rounded-xl border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Local Contact & Coordinates Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] space-y-0.5">
                    <div className="text-[10px] text-[#4b5d78] dark:text-[#8fa3c0] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#00558f]" />
                      <span>Office Line</span>
                    </div>
                    <div className="font-semibold text-[#0f1c30] dark:text-[#f0f4fa] truncate">
                      {selectedOffice.phone}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] space-y-0.5">
                    <div className="text-[10px] text-[#4b5d78] dark:text-[#8fa3c0] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#86bc25]" />
                      <span>Desk Email</span>
                    </div>
                    <div className="font-semibold text-[#0f1c30] dark:text-[#f0f4fa] truncate">
                      {selectedOffice.email}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] space-y-0.5">
                    <div className="text-[10px] text-[#4b5d78] dark:text-[#8fa3c0] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>Time Zone</span>
                    </div>
                    <div className="font-semibold text-[#0f1c30] dark:text-[#f0f4fa] truncate">
                      {selectedOffice.timeZone}
                    </div>
                  </div>
                </div>

              </div>

            </MotionReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
