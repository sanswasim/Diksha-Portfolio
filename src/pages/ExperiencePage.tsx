import React from 'react';
import { VerticalInteractiveTimeline } from '../components/VerticalInteractiveTimeline';
import { ConsultantProfile, ExperienceItem } from '../types/portfolio';
import { MotionReveal } from '../components/MotionReveal';
import { PageId } from '../components/Navbar';
import { GraduationCap, Download, ArrowLeft, ArrowRight, Sparkles, Droplets } from 'lucide-react';

interface ExperiencePageProps {
  profile: ConsultantProfile;
  experiences: ExperienceItem[];
  onNavigate: (page: PageId) => void;
  onExportPDF: () => void;
  isExportingPDF?: boolean;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  profile,
  experiences,
  onNavigate,
  onExportPDF,
  isExportingPDF = false,
}) => {
  return (
    <div className="pt-28 pb-20 space-y-12 relative overflow-hidden">
      {/* Background Ambient Refraction Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#86bc25]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-4 w-96 h-96 bg-[#00a3e0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Page Hero Header with Frosted Glass Banner */}
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
            <span className="text-white">Career Trajectory</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl frosted-glass flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
            
            {/* Decorative Floating 3D Water Droplet Badge */}
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full water-pill flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25] shadow-[0_0_6px_#86bc25]" />
              <span>7+ Years at Deloitte</span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#86bc25]">
                <Sparkles className="w-3.5 h-3.5 text-[#86bc25]" />
                <span>Offices of US-India · Enterprise Technology & Governance</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Vertical Career Timeline
              </h1>
              <p className="text-sm sm:text-base text-[#9ca3af] max-w-3xl leading-relaxed">
                Explore the chronological progression across ServiceNow Knowledge Base architecture, User Criteria access governance, enterprise training enablement (300+ professionals), and strategic Public Pricing leadership.
              </p>
            </div>

            <button
              onClick={onExportPDF}
              disabled={isExportingPDF}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.35)] flex items-center gap-2 cursor-pointer shrink-0 transition-all disabled:opacity-60 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download Experience CV (PDF)</span>
            </button>
          </div>
        </MotionReveal>
      </div>

      {/* Main Vertical Interactive Timeline Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <VerticalInteractiveTimeline experiences={experiences} />
      </div>

      {/* Education & Academic Foundation Section in Frosted Glass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        <MotionReveal direction="up" distance={20}>
          <div className="p-6 sm:p-8 rounded-3xl frosted-glass space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#00a3e0] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#86bc25]" />
                  Academic Foundation & Credentials
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Education & Global Languages
                </h3>
              </div>
              <span className="text-xs font-mono text-[#9ca3af] px-3 py-1 rounded-full water-pill">
                Hyderabad, India
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.education?.map((edu, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl frosted-glass-inset space-y-1.5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#86bc25] font-mono">
                      {edu.years}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono px-2 py-0.5 rounded bg-white/5">
                      Degree
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-[#9ca3af]">
                    {edu.institution}
                  </div>
                </div>
              ))}

              <div className="p-4 sm:p-5 rounded-2xl frosted-glass-inset space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00a3e0]">
                    Communication
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono px-2 py-0.5 rounded bg-white/5">
                    Global Reach
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">
                  Multi-Lingual Proficiency
                </h4>
                <div className="text-xs text-[#9ca3af]">
                  English (Full Professional), Hindi (Native), Telugu (Native)
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </section>

      {/* Navigation Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left pt-6 relative z-10">
        <div className="flex justify-between items-center border-t border-white/10 pt-6">
          <button
            onClick={() => onNavigate('overview')}
            className="text-xs font-semibold text-[#9ca3af] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
          </button>
          <button
            onClick={() => onNavigate('skills')}
            className="text-xs font-semibold text-[#00a3e0] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            Continue to Core Skills Matrix <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
