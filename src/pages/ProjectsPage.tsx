import React from 'react';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { ConsultantProfile, ProjectItem } from '../types/portfolio';
import { MotionReveal } from '../components/MotionReveal';
import { PageId } from '../components/Navbar';
import { ArrowLeft, ArrowRight, Download, Sparkles } from 'lucide-react';

interface ProjectsPageProps {
  profile: ConsultantProfile;
  projects: ProjectItem[];
  onNavigate: (page: PageId, projectId?: string | null) => void;
  onExportPDF: () => void;
  isExportingPDF?: boolean;
  initialProjectId?: string | null;
  onOpenProject?: (projectId: string) => void;
  onCloseProject?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  profile,
  projects,
  onNavigate,
  onExportPDF,
  isExportingPDF = false,
  initialProjectId = null,
  onOpenProject,
  onCloseProject,
}) => {
  return (
    <div className="pt-28 pb-20 space-y-12 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#00a3e0]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-4 w-96 h-96 bg-[#86bc25]/10 rounded-full blur-3xl pointer-events-none" />

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
            <span className="text-white">Enterprise Case Studies</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl frosted-glass flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full water-pill flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
              <span>Deloitte Engagements</span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#86bc25]">
                <Sparkles className="w-3.5 h-3.5 text-[#86bc25]" />
                <span>Architecture Blueprints & Measured Deliverables</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Case Studies & Blueprints
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#9ca3af] max-w-3xl leading-relaxed">
                Detailed breakdowns of key enterprise engagements led at Deloitte — from multi-unit ServiceNow Knowledge Base governance to SABA digital training automation and strategic Public Pricing migrations.
              </p>
            </div>

            <button
              onClick={onExportPDF}
              disabled={isExportingPDF}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.35)] flex items-center gap-2 cursor-pointer shrink-0 transition-all disabled:opacity-60 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export Case Studies (PDF)</span>
            </button>
          </div>
        </MotionReveal>
      </div>

      <div className="relative z-10">
        <ProjectShowcase
          projects={projects}
          onExportPDF={onExportPDF}
          isExportingPDF={isExportingPDF}
          initialProjectId={initialProjectId}
          onOpenProject={onOpenProject}
          onCloseProject={onCloseProject}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left pt-6 relative z-10">
        <div className="flex justify-between items-center border-t border-white/10 pt-6">
          <button
            onClick={() => onNavigate('skills')}
            className="text-xs font-semibold text-[#9ca3af] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Skills Matrix
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-semibold text-[#00a3e0] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            Deloitte Offices & Connect <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
