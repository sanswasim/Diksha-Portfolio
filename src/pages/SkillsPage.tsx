import React from 'react';
import { SkillsMatrix } from '../components/SkillsMatrix';
import { ConsultantProfile, SkillItem } from '../types/portfolio';
import { MotionReveal } from '../components/MotionReveal';
import { PageId } from '../components/Navbar';
import { ArrowLeft, ArrowRight, Download, ShieldCheck, Sparkles, CheckCircle2, Layers } from 'lucide-react';

interface SkillsPageProps {
  profile: ConsultantProfile;
  skills: SkillItem[];
  onNavigate: (page: PageId) => void;
  onExportPDF: () => void;
  isExportingPDF?: boolean;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({
  profile,
  skills,
  onNavigate,
  onExportPDF,
  isExportingPDF = false,
}) => {
  return (
    <div className="pt-28 pb-20 space-y-12 relative overflow-hidden">
      {/* Background Refraction Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#86bc25]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-4 w-96 h-96 bg-[#00a3e0]/10 rounded-full blur-3xl pointer-events-none" />

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
            <span className="text-white">Competencies & Skills</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl frosted-glass flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
            
            {/* Water Drop Badge */}
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full water-drop flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
              <span>PSM I Certified</span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#86bc25]">
                <Sparkles className="w-3.5 h-3.5 text-[#86bc25]" />
                <span>Enterprise Frameworks & Architectural Governance</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Skills & Governance Matrix
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#9ca3af] max-w-3xl leading-relaxed">
                Specialized expertise across ServiceNow Knowledge Management architecture, User Criteria access controls, enterprise instructor-led training (300+ professionals), SABA digital enablement, and public pricing governance.
              </p>
            </div>

            <button
              onClick={onExportPDF}
              disabled={isExportingPDF}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.35)] flex items-center gap-2 cursor-pointer shrink-0 transition-all disabled:opacity-60 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export Skills Matrix (PDF)</span>
            </button>
          </div>
        </MotionReveal>
      </div>

      {/* Main Skills Matrix Component */}
      <div className="relative z-10">
        <SkillsMatrix skills={skills} certifications={profile.certifications} />
      </div>

      {/* Governance & Adoption Methodology Callout in Frosted Glass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
        <MotionReveal direction="up" distance={20}>
          <div className="p-6 sm:p-8 rounded-3xl frosted-glass space-y-6">
            <div className="border-b border-white/10 pb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00a3e0] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#86bc25]" />
                Deloitte Knowledge Governance Principles
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                How Diksha Drives Knowledge Adoption & Compliance
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#9ca3af]">
              <div className="p-4 sm:p-5 rounded-2xl frosted-glass-inset space-y-2">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#86bc25]" />
                  Information Architecture
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Designing logical hierarchies with category and subcategory structures that simplify discovery and reduce duplication by reusing existing Knowledge Bases.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl frosted-glass-inset space-y-2">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00a3e0]" />
                  User Criteria & Roles
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Configuring granular access permissions, Knowledge Roles, and group management to ensure strict data security and compliance with enterprise standards.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl frosted-glass-inset space-y-2">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Self-Service Enablement
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Conducting instructor-led sessions, developing SABA interactive digital modules, and monitoring reports to ensure content freshness and active ownership.
                </p>
              </div>
            </div>
          </div>
        </MotionReveal>
      </section>

      {/* Navigation Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left pt-6 relative z-10">
        <div className="flex justify-between items-center border-t border-white/10 pt-6">
          <button
            onClick={() => onNavigate('experience')}
            className="text-xs font-semibold text-[#9ca3af] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Experience
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-[#00a3e0] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            Explore Case Studies & Blueprints <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
