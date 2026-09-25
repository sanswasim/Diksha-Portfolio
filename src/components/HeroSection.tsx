import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Building2, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { ConsultantProfile } from '../types/portfolio';
import { MotionReveal } from './MotionReveal';
import { PageId } from './Navbar';
import dikshaAvatar from '../assets/images/diksha_profile_alpine_square.jpg';

interface HeroSectionProps {
  profile: ConsultantProfile;
  onNavigate: (page: PageId) => void;
  onExportPDF: () => void;
  isExportingPDF?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onNavigate,
  onExportPDF,
  isExportingPDF = false,
}) => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-black overflow-hidden">
      {/* Background radial glow matching the RiskPulse artwork in screenshot */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#86bc25]/10 via-[#00a3e0]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#002c6c]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial & Impact Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Deloitte Firm Tag */}
            <MotionReveal delay={0.05} direction="up" distance={16}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full frosted-glass-inset text-xs font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_8px_rgba(134,188,37,0.9)] animate-pulse" />
                <span className="font-semibold text-white">{profile.firm}</span>
                <span className="text-[#4b5d78]">·</span>
                <span className="text-[#00a3e0]">{profile.practice}</span>
              </div>
            </MotionReveal>

            {/* Display Headline */}
            <MotionReveal delay={0.12} direction="up" distance={20}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] max-w-2xl text-balance">
                {profile.designation.split('·')[0]}
                <span className="block text-[#00a3e0] mt-1 font-bold">
                  {profile.designation.split('·')[1] || 'ServiceNow Knowledge & Governance'}
                </span>
              </h1>
            </MotionReveal>

            {/* Subhead / Value Proposition */}
            <MotionReveal delay={0.18} direction="up" distance={20}>
              <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed max-w-2xl">
                {profile.headline}
              </p>
            </MotionReveal>

            {/* Location & Practice Info */}
            <MotionReveal delay={0.24} direction="up" distance={16}>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#9ca3af] pt-1">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#00a3e0]" />
                  <span>{profile.firm}</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#86bc25]" />
                  <span>{profile.location}</span>
                </div>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#86bc25]" />
                  <span>7+ Years at Deloitte</span>
                </div>
              </div>
            </MotionReveal>

            {/* Tactical CTA Buttons styled after Deloitte homepage button */}
            <MotionReveal delay={0.3} direction="up" distance={16}>
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                {/* Styled like "Register now" from Deloitte homepage screenshot */}
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-6 py-2.5 rounded-full font-semibold text-xs text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.35)] transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('experience')}
                  className="px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-[#0c1017] hover:bg-[#131924] border border-[#1e2636] hover:border-[#86bc25]/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Career Trajectory (7+ Yrs)</span>
                </button>

                {/* Formatted PDF Report Export Button */}
                <button
                  onClick={onExportPDF}
                  disabled={isExportingPDF}
                  className="px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-[#0c1017] hover:bg-[#131924] border border-[#86bc25]/40 hover:border-[#86bc25] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  title="Generate & Download Formatted PDF Report via jsPDF"
                >
                  {isExportingPDF ? (
                    <Loader2 className="w-3.5 h-3.5 text-[#86bc25] animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-[#86bc25]" />
                  )}
                  <span>{isExportingPDF ? 'Generating PDF...' : 'Download Executive Report (PDF)'}</span>
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2.5 text-xs font-semibold text-[#9ca3af] hover:text-white transition-colors"
                >
                  Office Locator & Contact →
                </button>
              </div>
            </MotionReveal>

            {/* Quantitative Rigor: Key Proof Metrics */}
            <MotionReveal delay={0.36} direction="up" distance={20}>
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 border-t border-[#1e2636]">
                {profile.statHighlights.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-2xl frosted-glass relative"
                  >
                    <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-[#9ca3af] mt-0.5 leading-snug">
                      {stat.label}
                    </div>
                    {stat.subtext && (
                      <div className="text-[11px] text-[#6b7280] mt-0.5">
                        {stat.subtext}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </MotionReveal>

          </div>

          {/* Right Column: Tactile Neumorphic Profile Showcase Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <MotionReveal delay={0.2} direction="up" distance={28} className="w-full max-w-md">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full"
              >
                {/* Outer Glassmorphic Frame with Frosted Glass & Water Drop */}
                <div className="p-5 sm:p-6 rounded-3xl frosted-glass relative overflow-hidden">
                  
                  {/* Floating 3D Water Droplet Badge */}
                  <div className="absolute -top-3.5 -right-2 px-3.5 py-1 rounded-full water-drop flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25] shadow-[0_0_6px_#86bc25]" />
                    <span>Deloitte Verified</span>
                  </div>

                  {/* Image inset container */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden p-1.5 bg-white/5 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    <img
                      src={profile.avatarUrl || dikshaAvatar}
                      alt={`${profile.name} - Assistant Manager at Deloitte`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center rounded-xl transition-transform duration-500 hover:scale-105"
                    />
                    {/* Soft frost overlay that keeps alpine tones visible */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15 pointer-events-none" />

                    {/* Overlaid Name & Practice badge in frosted glass */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl frosted-glass-inset text-white">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                            <span>{profile.name}</span>
                            <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_6px_#86bc25]" />
                          </div>
                          <div className="text-[11px] text-[#c4cad4]">
                            {profile.firm}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] uppercase font-mono tracking-wider bg-[#0076a8]/45 backdrop-blur-md border border-[#00a3e0]/55 text-[#7dd3f5] px-2 py-0.5 rounded-full">
                            Assistant Manager
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Capability Details Pill in Frosted Glass */}
                  <div className="mt-4 p-3.5 rounded-2xl frosted-glass-inset space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#86bc25]" />
                        Deloitte Core Focus
                      </span>
                      <span className="text-[11px] text-[#00a3e0]">
                        ServiceNow & Governance
                      </span>
                    </div>
                    <p className="text-xs text-[#9ca3af] leading-snug">
                      Specialized in enterprise ServiceNow Knowledge Management, User Criteria access models, training 300+ professionals, and public pricing governance.
                    </p>
                  </div>

                  {/* Certification Badges Row with tactile water pill styling */}
                  <div className="mt-3 flex items-center justify-between gap-2 text-[11px] font-mono text-[#9ca3af] px-1">
                    <span className="text-slate-300">PSM I Certified</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-300">ServiceNow IT Lead</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[#86bc25]">PMP In-Progress</span>
                  </div>

                </div>
              </motion.div>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
