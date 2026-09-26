import React from 'react';
import { ContactAndMapsSection } from '../components/ContactAndMapsSection';
import { ConsultantProfile } from '../types/portfolio';
import { MotionReveal } from '../components/MotionReveal';
import { PageId } from '../components/Navbar';
import { ArrowLeft, Building, Sparkles } from 'lucide-react';
import { DELOITTE_OFFICES } from '../data/defaultPortfolio';

interface ContactPageProps {
  profile: ConsultantProfile;
  onNavigate: (page: PageId, projectId?: string | null) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ profile, onNavigate }) => {
  return (
    <div className="pt-28 pb-20 space-y-12 relative overflow-hidden">
      {/* Background Ambient Refraction Orbs — luminous for frosted glass */}
      <div className="absolute top-20 right-10 w-[28rem] h-[28rem] bg-[#86bc25]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-4 w-[28rem] h-[28rem] bg-[#00a3e0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="glass-atmosphere absolute inset-0 pointer-events-none opacity-50" />

      {/* Page Hero Header in Frosted Glass */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        <MotionReveal direction="up" distance={16}>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00a3e0] uppercase tracking-wider mb-3">
            <button
              onClick={() => onNavigate('overview')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Overview
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-white">Deloitte Offices & Direct Contact</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl frosted-glass flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
            
            {/* Water Drop Badge */}
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full water-pill flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
              <span>Hyderabad Campus</span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#86bc25]">
                <Sparkles className="w-3.5 h-3.5 text-[#86bc25]" />
                <span>Offices of US-India · Deloitte Consulting LLP</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Offices & Contact Integration
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#9ca3af] max-w-3xl leading-relaxed">
                Reach out for professional collaboration, ServiceNow Knowledge Management advisory, or connect at the Deloitte Hyderabad campus (Offices of US-India) and global practice hubs.
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>

      {/* Main Contact and Google Maps Section */}
      <div className="relative z-10">
        <ContactAndMapsSection profile={profile} />
      </div>

      {/* Quick Office Hubs Grid in Frosted Glass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        <MotionReveal direction="up" distance={20}>
          <div className="p-6 sm:p-8 rounded-3xl frosted-glass space-y-6">
            <div className="border-b border-white/10 pb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00a3e0] flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#86bc25]" />
                Deloitte Global Hubs Directory
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Presence Across India & International Centers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DELOITTE_OFFICES.map((office) => (
                <div key={office.id} className="p-4 rounded-2xl frosted-glass border border-white/10 space-y-1.5 hover:border-[#00a3e0]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white">{office.city}</span>
                    <span className="text-[10px] text-[#86bc25] font-mono px-2 py-0.5 rounded-full water-pill">{office.badge}</span>
                  </div>
                  <div className="text-xs text-slate-200 line-clamp-1">{office.name}</div>
                  <div className="text-[11px] text-[#9ca3af] line-clamp-2">{office.address}</div>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
      </section>

      {/* Navigation Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left pt-6 relative z-10">
        <div className="flex justify-between items-center border-t border-white/10 pt-6">
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-[#9ca3af] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Case Studies
          </button>
          <button
            onClick={() => onNavigate('overview')}
            className="text-xs font-semibold text-[#00a3e0] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            Return to Overview <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
