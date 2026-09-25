import React from 'react';
import { X, CheckCircle, ExternalLink, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl neu-raised bg-[#e8edf5] dark:bg-[#101c31] border border-white/40 dark:border-slate-800 p-6 sm:p-8 space-y-6 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl neu-button bg-[#e8edf5] dark:bg-[#101c31] flex items-center justify-center text-[#4b5d78] dark:text-[#8fa3c0] hover:text-[#002c6c] dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00558f] dark:text-[#00a3e0]">
            <span className="w-2 h-2 rounded-full bg-[#86bc25]" />
            <span>{project.clientIndustry}</span>
            <span>·</span>
            <span>{project.deloitteRole}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f1c30] dark:text-[#f0f4fa] leading-tight">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[#4b5d78] dark:text-[#8fa3c0]">
            {project.headline}
          </p>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden neu-pressed p-1.5 bg-[#e8edf5] dark:bg-[#0b1424]">
          <img
            src={project.heroImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.outcomes.map((metric, idx) => (
            <div key={idx} className="p-4 rounded-2xl neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] text-center">
              <div className="text-2xl font-extrabold font-mono text-[#002c6c] dark:text-[#00a3e0] tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-[#0f1c30] dark:text-[#f0f4fa] mt-1">
                {metric.label}
              </div>
              {metric.subtext && (
                <div className="text-[11px] text-[#4b5d78] dark:text-[#8fa3c0] mt-0.5">
                  {metric.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Challenge vs Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl neu-raised-sm bg-[#e8edf5] dark:bg-[#101c31] space-y-2 border-l-4 border-amber-500">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f1c30] dark:text-[#f0f4fa]">
              The Enterprise Challenge
            </h4>
            <p className="text-xs sm:text-sm text-[#4b5d78] dark:text-[#8fa3c0] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-5 rounded-2xl neu-raised-sm bg-[#e8edf5] dark:bg-[#101c31] space-y-2 border-l-4 border-[#86bc25]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f1c30] dark:text-[#f0f4fa]">
              The Deloitte Architecture & Execution
            </h4>
            <p className="text-xs sm:text-sm text-[#4b5d78] dark:text-[#8fa3c0] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Topology & Engineering Specifications */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f1c30] dark:text-[#f0f4fa] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00558f]" />
            Architecture Specifications & Resiliency Guardrails
          </h4>
          <ul className="space-y-2">
            {project.architecturePoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4b5d78] dark:text-[#8fa3c0]">
                <CheckCircle className="w-4 h-4 text-[#86bc25] shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-2 pt-2 border-t border-[#c3cbd8]/60 dark:border-[#182844]">
          <div className="text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa]">
            Delivered Technology Ecosystem
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] text-[#002c6c] dark:text-[#8fa3c0]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 flex items-center justify-between border-t border-[#c3cbd8]/60 dark:border-[#182844]">
          <span className="text-xs text-[#4b5d78] dark:text-[#8fa3c0]">
            Validated Deloitte Case Study
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#002c6c] hover:bg-[#00388c] dark:bg-[#00558f] transition-all cursor-pointer"
          >
            Close Inspection
          </button>
        </div>

      </div>
    </div>
  );
};
