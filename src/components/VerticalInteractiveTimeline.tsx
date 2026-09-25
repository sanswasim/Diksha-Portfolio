import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, Award, CheckCircle2, ChevronUp, Sparkles, Layers } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { MotionReveal } from './MotionReveal';

interface VerticalInteractiveTimelineProps {
  experiences: ExperienceItem[];
}

export const VerticalInteractiveTimeline: React.FC<VerticalInteractiveTimelineProps> = ({ experiences }) => {
  // First item expanded by default
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set([experiences[0]?.id || ''])
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedIds(new Set(experiences.map((e) => e.id)));
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  const isAllExpanded = expandedIds.size === experiences.length;

  return (
    <div className="relative text-left space-y-8">
      {/* Controls Bar with Frosted Glass & Water Drop Pill */}
      <MotionReveal direction="up" distance={16}>
        <div className="p-4 sm:p-5 rounded-2xl frosted-glass flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Tactile 3D water drop icon */}
            <div className="w-9 h-9 rounded-full water-drop flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Vertical Career Trajectory</span>
                <span className="w-2 h-2 rounded-full bg-[#86bc25] shadow-[0_0_8px_#86bc25]" />
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Click any role card to expand or collapse delivery details & metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline mr-1">
              {experiences.length} Milestones
            </span>
            <button
              onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#0e1420] hover:bg-[#151e2f] border border-white/15 hover:border-[#86bc25] transition-all cursor-pointer flex items-center gap-1.5"
            >
              {isAllExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-[#00a3e0]" />
                  <span>Collapse All</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-[#86bc25]" />
                  <span>Expand All Roles</span>
                </>
              )}
            </button>
          </div>
        </div>
      </MotionReveal>

      {/* Vertical Spine Timeline Layout */}
      <div className="relative pl-6 sm:pl-10">
        
        {/* Continuous Glowing Line */}
        <div className="absolute top-4 bottom-8 left-3 sm:left-5 w-0.5 bg-gradient-to-b from-[#86bc25] via-[#00a3e0] to-[#002c6c] shadow-[0_0_12px_rgba(134,188,37,0.7)]" />

        {/* Timeline Entries */}
        <div className="space-y-8 sm:space-y-10">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedIds.has(exp.id);

            return (
              <div key={exp.id} className="relative group">
                
                {/* 3D Liquid Water Drop Timeline Node on the Spine */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className={`absolute -left-6 sm:-left-10 top-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full water-drop flex items-center justify-center cursor-pointer z-10 transition-transform duration-300 ${
                    isExpanded ? 'scale-110 shadow-[0_0_15px_rgba(134,188,37,0.8)]' : 'hover:scale-105'
                  }`}
                  title={isExpanded ? 'Collapse role' : 'Expand role'}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      exp.current
                        ? 'bg-[#86bc25] shadow-[0_0_6px_#86bc25] animate-pulse'
                        : isExpanded
                        ? 'bg-[#00a3e0]'
                        : 'bg-white/80'
                    }`}
                  />
                </div>

                {/* Frosted Glass Experience Card */}
                <motion.div
                  layout
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`rounded-3xl transition-all duration-300 ${
                    isExpanded
                      ? 'frosted-glass-active shadow-[0_20px_50px_rgba(0,0,0,0.95)]'
                      : 'frosted-glass hover:border-white/20'
                  }`}
                >
                  {/* Clickable Header Area */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-5 sm:p-7 cursor-pointer select-none"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Role & Company Header */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-mono text-[#00a3e0] bg-[#00a3e0]/10 border border-[#00a3e0]/30">
                            {exp.startDate} – {exp.endDate}
                          </span>

                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#86bc25] bg-[#86bc25]/10 border border-[#86bc25]/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25] animate-ping" />
                              Current Role
                            </span>
                          )}

                          <span className="text-xs text-[#9ca3af] hidden sm:inline">
                            {exp.department}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#00a3e0] transition-colors leading-snug">
                          {exp.role}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#9ca3af]">
                          <span className="font-semibold text-slate-200">
                            {exp.company}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#86bc25]" />
                            {exp.location}
                          </span>
                          <span>·</span>
                          <span className="text-slate-400">
                            {exp.clientSector}
                          </span>
                        </div>
                      </div>

                      {/* Expand / Collapse Tactile Water Pill Toggle */}
                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <div className="px-3 py-1.5 rounded-full water-pill text-xs font-semibold text-slate-300 flex items-center gap-1.5 group-hover:border-[#86bc25]/50 transition-colors">
                          <span className="text-[11px] hidden sm:inline">
                            {isExpanded ? 'Hide Details' : 'View Scope'}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown className="w-4 h-4 text-[#86bc25]" />
                          </motion.div>
                        </div>
                      </div>

                    </div>

                    {/* Brief description teaser */}
                    {!isExpanded && (
                      <p className="mt-3 text-xs text-[#9ca3af] line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>

                  {/* Expandable Body with Framer Motion AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-7 pt-1 border-t border-white/10 space-y-6">
                          
                          {/* Role Overview */}
                          <div className="space-y-1.5 pt-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00a3e0]">
                              Operational Scope & Leadership Summary
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                              {exp.description}
                            </p>
                          </div>

                          {/* Key Responsibilities */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
                              Key Deliverables & Responsibilities
                            </h4>
                            <ul className="space-y-2.5">
                              {exp.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#9ca3af]">
                                  <div className="w-4 h-4 rounded-full bg-[#86bc25]/20 text-[#86bc25] flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="leading-relaxed text-slate-200">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Metrics Grid with Glassmorphic Inset */}
                          {exp.metrics && exp.metrics.length > 0 && (
                            <div className="space-y-2.5 pt-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                Measurable Outcomes & ROI
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {exp.metrics.map((metric, mIdx) => (
                                  <div
                                    key={mIdx}
                                    className="p-3.5 rounded-2xl frosted-glass-inset text-center space-y-0.5"
                                  >
                                    <div className="text-xl font-extrabold font-mono text-[#00a3e0] tabular-nums">
                                      {metric.value}
                                    </div>
                                    <div className="text-xs font-bold text-white">
                                      {metric.label}
                                    </div>
                                    {metric.subtext && (
                                      <div className="text-[11px] text-[#9ca3af]">
                                        {metric.subtext}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Frameworks & Technologies with water pill chips */}
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-white/10">
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-[#86bc25]" />
                                Key Frameworks, Methodologies & Systems
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full text-xs font-mono text-slate-200 water-pill"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Deloitte Practice Recognition Banner */}
      <MotionReveal delay={0.2} direction="up" distance={20}>
        <div className="p-6 rounded-3xl frosted-glass border border-[#86bc25]/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full water-drop flex items-center justify-center shrink-0 mt-0.5">
            <Award className="w-5 h-5 text-[#86bc25]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Deloitte Practice Honors & Cross-Border Delivery</span>
              <span className="w-2 h-2 rounded-full bg-[#86bc25]" />
            </h4>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Recognized as practice lead for Public Pricing (driving a 15% team productivity increase) and ServiceNow Knowledge Management implementation. Served as trusted reviewer for private pricing and collaborated directly with Directors and Partners on high-stakes acquisition and audit support engagements across US and Canada business units.
            </p>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
};
