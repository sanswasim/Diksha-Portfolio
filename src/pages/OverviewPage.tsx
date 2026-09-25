import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ConsultantProfile, ExperienceItem, ProjectItem } from '../types/portfolio';
import { MotionReveal } from '../components/MotionReveal';
import { PageId } from '../components/Navbar';
import { ArrowRight, Award, CheckCircle2, ChevronRight, Layers, Users, TrendingUp, ShieldCheck, Sparkles, Droplets } from 'lucide-react';

interface OverviewPageProps {
  profile: ConsultantProfile;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  onNavigate: (page: PageId) => void;
  onExportPDF: () => void;
  isExportingPDF?: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  profile,
  experiences,
  projects,
  onNavigate,
  onExportPDF,
  isExportingPDF = false,
}) => {
  return (
    <div className="space-y-16 pb-20 relative overflow-hidden">
      {/* Background Ambient Refraction Orbs */}
      <div className="absolute top-40 right-10 w-96 h-96 bg-[#86bc25]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[650px] left-10 w-96 h-96 bg-[#00a3e0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <HeroSection
        profile={profile}
        onNavigate={onNavigate}
        onExportPDF={onExportPDF}
        isExportingPDF={isExportingPDF}
      />

      {/* Clean Editorial Deloitte Practices Strip with Frosted Glass & Water Drop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionReveal delay={0.08} direction="up" distance={16}>
          <div className="p-4 sm:p-5 rounded-2xl frosted-glass flex flex-wrap items-center justify-between gap-4 text-xs text-[#9ca3af]">
            <div className="flex items-center gap-3 font-medium">
              <div className="w-8 h-8 rounded-full water-drop flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_8px_#86bc25]" />
                <span className="font-semibold text-white">Deloitte Offices of US-India Practices</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-slate-300">
              <span className="px-2.5 py-1 rounded-full water-pill">ServiceNow KM & Governance</span>
              <span>·</span>
              <span className="px-2.5 py-1 rounded-full water-pill">User Criteria Access Models</span>
              <span>·</span>
              <span className="px-2.5 py-1 rounded-full water-pill">SABA Digital Curriculum</span>
              <span>·</span>
              <span className="px-2.5 py-1 rounded-full water-pill">Public Pricing Strategy</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onExportPDF}
                disabled={isExportingPDF}
                className="text-[#00a3e0] hover:text-[#86bc25] font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Download Executive Dossier (PDF) ↓</span>
              </button>
            </div>
          </div>
        </MotionReveal>
      </div>

      {/* Selected Key Achievements Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Summary */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <MotionReveal direction="up" distance={20}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00a3e0] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
                Executive Profile Summary
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                7+ Years of Impact & Leadership at Deloitte
              </h2>
              <p className="text-sm text-[#9ca3af] leading-relaxed pt-1">
                {profile.summary}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('experience')}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.3)] flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>View Vertical Career Trajectory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('skills')}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-200 hover:text-white water-pill flex items-center gap-1 cursor-pointer transition-all"
                >
                  <span>Explore Skills Matrix →</span>
                </button>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Key Achievements Highlights with Frosted Glass & Water Drop Badge */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.15} direction="up" distance={20}>
              <div className="p-6 sm:p-8 rounded-3xl frosted-glass space-y-5 text-left relative">
                
                {/* 3D Liquid Water Drop Badge */}
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full water-drop flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25] shadow-[0_0_6px_#86bc25]" />
                  <span>Deloitte Proven Impact</span>
                </div>

                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#86bc25]" />
                    Key Career Achievements & Deloitte Honors
                  </h3>
                  <span className="text-[11px] font-mono text-[#86bc25] bg-[#86bc25]/15 border border-[#86bc25]/30 px-2.5 py-0.5 rounded-full">
                    Verified Record
                  </span>
                </div>

                <div className="space-y-3">
                  {(profile.keyAchievements || []).slice(0, 5).map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#9ca3af]">
                      <div className="w-5 h-5 rounded-full water-drop text-[#86bc25] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed text-slate-200">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">
                    Certified Professional Scrum Master (PSM I) · ServiceNow IT Leadership
                  </span>
                  <button
                    onClick={() => onNavigate('experience')}
                    className="text-[#00a3e0] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Milestones →</span>
                  </button>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </section>

      {/* Featured Projects Preview Strip in Frosted Glass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00a3e0] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
              Enterprise Blueprints Preview
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-[#00a3e0] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>View All Case Studies & Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <MotionReveal key={proj.id} delay={idx * 0.1} direction="up" distance={20}>
              <div
                onClick={() => onNavigate('projects')}
                className="p-5 rounded-3xl frosted-glass text-left space-y-4 hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white/95 frosted-glass-inset px-2.5 py-0.5 rounded-full">
                    {proj.clientIndustry}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-[#00a3e0]">
                    {proj.deloitteRole}
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#00a3e0] transition-colors line-clamp-2">
                    {proj.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#9ca3af]">
                  <span className="font-mono text-white font-bold">{proj.outcomes[0]?.value}</span>
                  <span className="text-[11px] text-[#00a3e0] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Inspect Blueprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Navigation Quick Cards in Frosted Glass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div
            onClick={() => onNavigate('experience')}
            className="p-6 rounded-3xl frosted-glass hover:border-[#86bc25]/50 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full water-drop flex items-center justify-center mb-3 text-[#00a3e0]">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-[#00a3e0] transition-colors">
              Vertical Career Trajectory
            </h4>
            <p className="text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
              7+ years across Assistant Manager, Senior Analyst, Pricing Lead, and Audit Central with interactive expandable details.
            </p>
          </div>

          <div
            onClick={() => onNavigate('skills')}
            className="p-6 rounded-3xl frosted-glass hover:border-[#86bc25]/50 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full water-drop flex items-center justify-center mb-3 text-[#86bc25]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-[#86bc25] transition-colors">
              Skills & Governance
            </h4>
            <p className="text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
              ServiceNow KM administration, User Criteria, SABA curriculum, and PSM I Scrum credentials.
            </p>
          </div>

          <div
            onClick={() => onNavigate('projects')}
            className="p-6 rounded-3xl frosted-glass hover:border-[#00a3e0]/50 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full water-drop flex items-center justify-center mb-3 text-[#00a3e0]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-[#00a3e0] transition-colors">
              Case Studies
            </h4>
            <p className="text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
              Deep dive into ServiceNow multi-unit rollouts, SABA training savings, and NPA tools.
            </p>
          </div>

          <div
            onClick={() => onNavigate('contact')}
            className="p-6 rounded-3xl frosted-glass hover:border-white/50 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full water-drop flex items-center justify-center mb-3 text-white">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-[#86bc25] transition-colors">
              Offices & Contact
            </h4>
            <p className="text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
              Deloitte Hyderabad campus, interactive Google Maps, and direct briefing form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
