import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, ExternalLink, CheckCircle, AlertCircle, Building } from 'lucide-react';
import { OfficeLocation, ConsultantProfile } from '../types/portfolio';
import { DELOITTE_OFFICES } from '../data/defaultPortfolio';
import { MotionReveal } from './MotionReveal';
import { submitContactInquiry } from '../utils/submitContact';

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

const INQUIRY_TYPES = [
  'ServiceNow Knowledge Management & Governance',
  'User Criteria / Access Models',
  'SABA Digital Learning & Enablement',
  'Public Pricing / NPA Modernization',
  'General Professional Discussion',
];

const fieldClass =
  'w-full px-4 py-2.5 rounded-xl frosted-glass-inset text-xs text-white placeholder:text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#00a3e0] border border-white/15';

export const ContactAndMapsSection: React.FC<ContactAndMapsProps> = ({ profile }) => {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(DELOITTE_OFFICES[0]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    organization: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitContactInquiry({
      ...formData,
      recipientEmail: profile.email,
    });

    setIsSubmitting(false);
    setReference(result.reference);

    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'Delivery failed. Please try again.');
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      organization: '',
      inquiryType: INQUIRY_TYPES[0],
      message: '',
    });
    setErrors({});
    setSubmitError(null);
    setReference('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal direction="up" distance={20} className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00a3e0] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
            Deloitte Practice Office & Advisory Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Connect & Office Integration
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#9ca3af]">
            Initiate conversations on ServiceNow Knowledge Management, governance, enablement, or schedule a briefing at a Deloitte campus.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <MotionReveal delay={0.1} direction="up" distance={24}>
              <div className="p-6 sm:p-8 rounded-3xl frosted-glass text-left">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>Direct Engagement Inquiry</span>
                    <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_8px_#86bc25]" />
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-1">
                    Typical response window: within 24 business hours · delivers to {profile.email}
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl frosted-glass-inset text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#86bc25]/20 text-[#86bc25] flex items-center justify-center mx-auto shadow-[0_0_12px_rgba(134,188,37,0.4)]">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Inquiry Received Successfully</h4>
                      <p className="text-xs text-[#9ca3af] mt-1 max-w-sm mx-auto">
                        Thank you, {formData.fullName}. Your request regarding {formData.inquiryType} has been dispatched to {profile.email}.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-[#00a3e0] frosted-glass-inset py-1.5 px-3 rounded-lg inline-block">
                      Reference: {reference}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handleResetForm}
                        className="px-5 py-2 text-xs font-semibold rounded-full text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-white">
                        Full Name <span className="text-[#86bc25]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className={fieldClass}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-white">
                          Corporate Email <span className="text-[#86bc25]">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@enterprise.com"
                          className={fieldClass}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-white">
                          Organization / Firm <span className="text-[#86bc25]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. Global Financial Corp"
                          className={fieldClass}
                        />
                        {errors.organization && (
                          <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.organization}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-white">Engagement Domain</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className={`${fieldClass} cursor-pointer bg-transparent`}
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-[#0b0f17]">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-white">
                          Engagement Context / Requirements <span className="text-[#86bc25]">*</span>
                        </label>
                        <span className="text-[10px] text-[#9ca3af] font-mono">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide details on project timeline, current knowledge landscape, and objectives..."
                        className={`${fieldClass} resize-none`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl border border-red-400/30 bg-red-500/10 text-[11px] text-red-300 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>
                          {submitError}{' '}
                          <a className="underline text-[#00a3e0]" href={`mailto:${profile.email}`}>
                            Email {profile.email}
                          </a>
                        </span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-full font-semibold text-xs text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
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

                    <div className="text-[11px] text-center text-[#9ca3af] pt-1">
                      Confidentiality assured under standard Deloitte advisory covenants.
                    </div>
                  </form>
                )}
              </div>
            </MotionReveal>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <MotionReveal delay={0.2} direction="up" distance={24}>
              <div className="p-4 rounded-3xl frosted-glass">
                <div className="text-xs font-bold text-white mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#00a3e0]" />
                    Deloitte Office Locator & Locations
                  </span>
                  <span className="text-[10px] text-[#86bc25] font-mono">● 6 Global Hubs</span>
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
                            ? 'frosted-glass-active text-[#86bc25]'
                            : 'frosted-glass-inset text-[#9ca3af] hover:text-white'
                        }`}
                        title={office.name}
                      >
                        {office.city}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl frosted-glass space-y-4 mt-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-base text-white">{selectedOffice.name}</h4>
                      <span className="text-[10px] font-semibold text-[#86bc25] bg-[#86bc25]/10 border border-[#86bc25]/30 px-2 py-0.5 rounded-full">
                        {selectedOffice.badge}
                      </span>
                    </div>
                    <div className="text-xs text-[#9ca3af] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00a3e0] shrink-0" />
                      <span className="line-clamp-1">{selectedOffice.address}</span>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedOffice.name + ' ' + selectedOffice.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full frosted-glass-inset text-xs font-semibold text-[#00a3e0] hover:text-white transition-colors shrink-0 whitespace-nowrap"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedOffice.id}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 p-1.5 bg-black/40"
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl frosted-glass-inset space-y-0.5">
                    <div className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#00a3e0]" />
                      <span>Office Line</span>
                    </div>
                    <div className="font-semibold text-white truncate">{selectedOffice.phone}</div>
                  </div>

                  <div className="p-2.5 rounded-xl frosted-glass-inset space-y-0.5">
                    <div className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                      <Mail className="w-3 h-3 text-[#86bc25]" />
                      <span>Desk Email</span>
                    </div>
                    <div className="font-semibold text-white truncate">{selectedOffice.email}</div>
                  </div>

                  <div className="p-2.5 rounded-xl frosted-glass-inset space-y-0.5">
                    <div className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Time Zone</span>
                    </div>
                    <div className="font-semibold text-white truncate">{selectedOffice.timeZone}</div>
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
