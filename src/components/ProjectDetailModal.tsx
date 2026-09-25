import React, { useEffect } from 'react';
import { X, CheckCircle, Layers, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { CaseStudyImage } from './CaseStudyImage';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl frosted-glass border border-white/20 p-6 sm:p-8 space-y-6 text-left shadow-[0_24px_80px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-xl frosted-glass-inset flex items-center justify-center text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00a3e0]">
            <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_8px_#86bc25]" />
            <span>{project.clientIndustry}</span>
            <span className="text-white/30">·</span>
            <span className="text-[#9ca3af] normal-case tracking-normal">{project.deloitteRole}</span>
          </div>

          <h3 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[#9ca3af]">
            {project.headline}
          </p>
        </div>

        <CaseStudyImage
          src={project.heroImage}
          alt={project.title}
          className="aspect-video w-full rounded-2xl border border-white/15"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.outcomes.map((metric, idx) => (
            <div key={idx} className="p-4 rounded-2xl frosted-glass-inset text-center">
              <div className="text-2xl font-extrabold font-mono text-[#00a3e0] tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-white mt-1">
                {metric.label}
              </div>
              {metric.subtext && (
                <div className="text-[11px] text-[#9ca3af] mt-0.5">
                  {metric.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-5 rounded-2xl frosted-glass-inset space-y-2 border-l-4 border-amber-400/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              The Enterprise Challenge
            </h4>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-5 rounded-2xl frosted-glass-inset space-y-2 border-l-4 border-[#86bc25]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              The Deloitte Architecture & Execution
            </h4>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00a3e0]" />
            Architecture Specifications & Resiliency Guardrails
          </h4>
          <ul className="space-y-2">
            {project.architecturePoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9ca3af]">
                <CheckCircle className="w-4 h-4 text-[#86bc25] shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="text-xs font-bold text-white">
            Delivered Technology Ecosystem
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium frosted-glass-inset text-[#c4cad4]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-white/10">
          <span className="text-xs text-[#9ca3af]">
            Confidential Deloitte engagement summary · Outcomes anonymized
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-[#0076a8] hover:bg-[#008fc9] border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.35)] flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>Close Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
