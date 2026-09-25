import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, MapPin, CheckCircle2 } from 'lucide-react';
import { ConsultantProfile } from '../types/portfolio';
import { MotionReveal } from './MotionReveal';
import { PageId } from './Navbar';
import dikshaAvatar from '../assets/images/diksha_profile_alpine_square.jpg';

interface HeroSectionProps {
  profile: ConsultantProfile;
  onNavigate: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onNavigate,
}) => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-black overflow-hidden">
      {/* Refraction field — gives frosted glass something vivid to blur */}
      <div className="absolute top-1/4 right-0 w-[620px] h-[620px] bg-gradient-to-br from-[#86bc25]/25 via-[#00a3e0]/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-0 w-[480px] h-[480px] bg-gradient-to-tr from-[#002c6c]/45 via-[#00a3e0]/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/3 w-[320px] h-[320px] bg-[#86bc25]/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="glass-atmosphere absolute inset-0 pointer-events-none opacity-60" />

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
                  className="px-5 py-2.5 rounded-full font-semibold text-xs text-white frosted-glass-inset hover:border-[#86bc25]/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Career Trajectory (7+ Yrs)</span>
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
                    {/* Stronger bottom scrim so the name plate always reads */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15 pointer-events-none" />

                    {/* Overlaid Name & Practice badge — high-contrast plate */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 p-3.5 rounded-xl bg-black/85 backdrop-blur-xl border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.65)] text-white">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 text-white">
                            <span className="truncate">{profile.name}</span>
                            <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_6px_#86bc25] shrink-0" />
                          </div>
                          <div className="text-[11px] text-white/75 truncate mt-0.5">
                            {profile.firm}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-block text-[10px] uppercase font-mono tracking-wider bg-[#0076a8] border border-[#00a3e0] text-white px-2.5 py-1 rounded-full whitespace-nowrap">
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
