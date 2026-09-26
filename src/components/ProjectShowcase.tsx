import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download, Loader2 } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';
import { MotionReveal } from './MotionReveal';
import { CaseStudyImage } from './CaseStudyImage';

interface ProjectShowcaseProps {
  projects: ProjectItem[];
  onExportPDF?: () => void;
  isExportingPDF?: boolean;
  initialProjectId?: string | null;
  onOpenProject?: (projectId: string) => void;
  onCloseProject?: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onExportPDF,
  isExportingPDF = false,
  initialProjectId = null,
  onOpenProject,
  onCloseProject,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!initialProjectId) {
      setActiveModalProject(null);
      return;
    }
    const match = projects.find((p) => p.id === initialProjectId) || null;
    setActiveModalProject(match);
  }, [initialProjectId, projects]);

  const openProject = (project: ProjectItem) => {
    setActiveModalProject(project);
    onOpenProject?.(project.id);
  };

  const closeProject = () => {
    setActiveModalProject(null);
    onCloseProject?.();
  };

  const filters = [
    { id: 'all', label: 'All Engagements' },
    { id: 'servicenow', label: 'ServiceNow KM & Governance' },
    { id: 'transformation', label: 'Learning & Digital Enablement' },
    { id: 'pricing', label: 'Pricing & NPA Modernization' },
  ];

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="py-12 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00a3e0] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
                Enterprise Case Studies & Delivery Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Interactive Project Showcase
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#9ca3af]">
                Explore key ServiceNow Knowledge Management, SABA digital curriculum, and Pricing governance initiatives delivered at Deloitte. Click any case study to inspect the blueprint and outcomes.
              </p>
            </div>

            {onExportPDF && (
              <button
                onClick={onExportPDF}
                disabled={isExportingPDF}
                className="self-start md:self-end px-5 py-2.5 rounded-full bg-[#0c1017] hover:bg-[#131924] border border-[#86bc25]/40 hover:border-[#86bc25] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 whitespace-nowrap disabled:opacity-60 shadow-sm"
                title="Download Full Project Report as PDF"
              >
                {isExportingPDF ? (
                  <Loader2 className="w-4 h-4 text-[#86bc25] animate-spin" />
                ) : (
                  <Download className="w-4 h-4 text-[#86bc25]" />
                )}
                <span>{isExportingPDF ? 'Generating Report...' : 'Export Projects as PDF'}</span>
              </button>
            )}
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1} direction="up" distance={16}>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#0076a8] text-white border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.4)]'
                      : 'frosted-glass text-[#9ca3af] hover:text-white hover:border-white/30'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFeatured = idx === 0 && filteredProjects.length > 1;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5 }}
                  className={`${
                    isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                  } p-6 sm:p-8 rounded-3xl frosted-glass text-left space-y-6 transition-all duration-300 group`}
                >
                  <div
                    className={`relative ${
                      isFeatured ? 'aspect-[21/9] sm:aspect-[24/9]' : 'aspect-video'
                    } w-full rounded-2xl overflow-hidden border border-white/15 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]`}
                    onClick={() => openProject(project)}
                  >
                    <CaseStudyImage
                      src={project.heroImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full"
                      imgClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-[2] rounded-2xl bg-gradient-to-t from-black/75 via-black/15 to-transparent group-hover:opacity-70 transition-opacity pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 z-[3] flex items-center justify-between pointer-events-none">
                      <span className="text-[11px] font-semibold text-white frosted-glass-inset px-3 py-1 rounded-full">
                        {project.clientIndustry}
                      </span>
                      <span className="text-[11px] font-mono text-[#86bc25] frosted-glass-inset px-2.5 py-1 rounded-full border border-[#86bc25]/35 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25] shadow-[0_0_6px_#86bc25]" />
                        Deloitte Delivery
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-[3]">
                      <div className="w-10 h-10 rounded-full water-drop text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#00a3e0] font-semibold">
                      <span>{project.deloitteRole}</span>
                    </div>

                    <h3
                      onClick={() => openProject(project)}
                      className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00a3e0] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                      {project.headline}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    {project.outcomes.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-2xl frosted-glass-inset text-center min-w-0 flex flex-col justify-center gap-0.5"
                      >
                        <div
                          className={`font-bold text-[#00a3e0] leading-tight break-words ${
                            metric.value.length > 6
                              ? 'text-sm sm:text-base'
                              : 'text-base sm:text-lg font-mono tabular-nums'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-medium text-slate-300 leading-snug">
                          {metric.label}
                        </div>
                        {metric.subtext && (
                          <div className="text-[9px] text-[#6b7280] leading-snug line-clamp-2 hidden sm:block">
                            {metric.subtext}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono water-pill text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[11px] font-mono text-[#9ca3af] self-center">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => openProject(project)}
                      className="text-xs font-semibold text-[#00a3e0] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Inspect Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <ProjectDetailModal project={activeModalProject} onClose={closeProject} />
    </section>
  );
};
