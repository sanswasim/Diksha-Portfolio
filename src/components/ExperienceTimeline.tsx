import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight, Award, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { MotionReveal } from './MotionReveal';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(experiences[0]?.id || '');

  const activeExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <MotionReveal direction="up" distance={20} className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00558f] dark:text-[#00a3e0] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
            Career Trajectory & Deloitte Engagements
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0f1c30] dark:text-[#f0f4fa]">
            Professional History
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4b5d78] dark:text-[#8fa3c0]">
            Track record of driving mission-critical technology modernizations, client advisory, and platform delivery for Tier-1 enterprise organizations.
          </p>
        </MotionReveal>

        {/* Dual Layout: Left timeline selector, Right detailed card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timeline Navigation Items */}
          <div className="lg:col-span-5 space-y-4">
            {experiences.map((exp, idx) => {
              const isSelected = exp.id === selectedExpId;
              return (
                <MotionReveal key={exp.id} delay={idx * 0.08} direction="up" distance={16}>
                  <div
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`p-5 rounded-2xl cursor-pointer text-left transition-all duration-200 border border-transparent ${
                      isSelected
                        ? 'neu-pressed bg-[#e8edf5] dark:bg-[#101c31] border-[#00558f]/20 dark:border-[#00a3e0]/30'
                        : 'neu-raised bg-[#e8edf5] dark:bg-[#101c31] hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#002c6c]/10 dark:bg-[#00558f]/20 text-[#002c6c] dark:text-[#00a3e0]">
                            {exp.startDate} – {exp.endDate}
                          </span>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#86bc25]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25] animate-ping" />
                              Current Role
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-base text-[#0f1c30] dark:text-[#f0f4fa] leading-snug">
                          {exp.role.split('·')[0]}
                        </h3>
                        <div className="text-xs font-medium text-[#4b5d78] dark:text-[#8fa3c0] flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-[#00558f]" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-[#00558f] transition-transform duration-200 ${
                          isSelected ? 'translate-x-1 text-[#86bc25]' : 'opacity-40'
                        }`}
                      />
                    </div>

                    <p className="mt-2 text-xs text-[#4b5d78] dark:text-[#8fa3c0] line-clamp-2">
                      {exp.description}
                    </p>
                  </div>
                </MotionReveal>
              );
            })}

            {/* Deloitte Recognition Callout Card */}
            <MotionReveal delay={0.35} direction="up" distance={16}>
              <div className="p-4 rounded-2xl neu-raised-sm bg-[#e8edf5] dark:bg-[#101c31] border-l-4 border-[#86bc25] flex items-start gap-3 text-left">
                <Award className="w-5 h-5 text-[#86bc25] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#002c6c] dark:text-[#f0f4fa]">
                    Deloitte Practice Leadership & Enterprise Impact
                  </div>
                  <div className="text-[11px] text-[#4b5d78] dark:text-[#8fa3c0] mt-0.5">
                    Recognized lead for Public Pricing (driving +15% productivity) & ServiceNow initiatives, reviewer for expedited private pricing, and trusted advisor across global US-India operations.
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Detailed Experience Showcase */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.15} direction="up" distance={24}>
              <AnimatePresence mode="wait">
                {activeExp && (
                  <motion.div
                    key={activeExp.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 sm:p-8 rounded-3xl neu-raised bg-[#e8edf5] dark:bg-[#101c31] space-y-6 text-left border border-white/40 dark:border-slate-800/40"
                  >
                    {/* Header */}
                    <div className="border-b border-[#c3cbd8]/60 dark:border-[#182844] pb-5 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#00558f] dark:text-[#00a3e0]">
                          {activeExp.department}
                        </span>
                        <span className="text-xs text-[#4b5d78] dark:text-[#8fa3c0] flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {activeExp.startDate} – {activeExp.endDate}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1c30] dark:text-[#f0f4fa]">
                        {activeExp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#4b5d78] dark:text-[#8fa3c0]">
                        <span className="font-semibold text-[#002c6c] dark:text-[#f0f4fa]">
                          {activeExp.company}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#86bc25]" />
                          {activeExp.location}
                        </span>
                        <span>·</span>
                        <span className="px-2 py-0.5 rounded neu-pressed-sm text-[11px]">
                          {activeExp.clientSector}
                        </span>
                      </div>
                    </div>

                    {/* Key Deliverables & Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f1c30] dark:text-[#f0f4fa]">
                        Core Deliverables & Architectural Leadership
                      </h4>
                      <ul className="space-y-2.5">
                        {activeExp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4b5d78] dark:text-[#8fa3c0]">
                            <CheckCircle2 className="w-4 h-4 text-[#86bc25] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Grid */}
                    {activeExp.metrics.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f1c30] dark:text-[#f0f4fa] mb-3">
                          Demonstrated Impact & Measurable Value
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {activeExp.metrics.map((metric, idx) => (
                            <div key={idx} className="p-3 rounded-xl neu-pressed-sm bg-[#e8edf5] dark:bg-[#0b1424] text-center">
                              <div className="text-lg sm:text-xl font-bold font-mono text-[#002c6c] dark:text-[#00a3e0] tabular-nums">
                                {metric.value}
                              </div>
                              <div className="text-[11px] font-semibold text-[#0f1c30] dark:text-[#f0f4fa] mt-0.5">
                                {metric.label}
                              </div>
                              {metric.subtext && (
                                <div className="text-[10px] text-[#4b5d78] dark:text-[#8fa3c0] mt-0.5 truncate">
                                  {metric.subtext}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies Stack */}
                    <div className="pt-2 border-t border-[#c3cbd8]/60 dark:border-[#182844]">
                      <div className="text-xs font-bold text-[#0f1c30] dark:text-[#f0f4fa] mb-2">
                        Technologies & Enterprise Standards
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeExp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium neu-raised-sm bg-[#e8edf5] dark:bg-[#101c31] text-[#002c6c] dark:text-[#8fa3c0]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </MotionReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
