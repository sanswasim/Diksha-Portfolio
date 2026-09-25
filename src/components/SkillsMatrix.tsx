import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldCheck, Compass, Check, Users, Award, DollarSign, Sparkles } from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { MotionReveal } from './MotionReveal';

interface SkillsMatrixProps {
  skills: SkillItem[];
  certifications: string[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills, certifications }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Core Competencies' },
    { id: 'servicenow', label: 'ServiceNow KM & Admin', icon: Layers },
    { id: 'consulting', label: 'Stakeholder Consulting', icon: Compass },
    { id: 'agile', label: 'Training, Adoption & Agile (PSM)', icon: Users },
    { id: 'pricing', label: 'Pricing & Governance', icon: DollarSign },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-12 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <MotionReveal direction="up" distance={20} className="max-w-3xl mb-10 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#00a3e0] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
            Deloitte Core Competencies & Governance Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Core Skills & Competencies
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#9ca3af]">
            Comprehensive mastery across ServiceNow Knowledge Base administration, User Criteria access governance, enterprise training enablement, and strategic pricing execution.
          </p>
        </MotionReveal>

        {/* Interactive Filter Tabs in Frosted Glass */}
        <MotionReveal delay={0.1} direction="up" distance={16}>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#0076a8] text-white border border-[#00a3e0] shadow-[0_0_15px_rgba(0,163,224,0.4)]'
                      : 'frosted-glass text-[#9ca3af] hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* Skills Grid in Frosted Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: (idx % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedSkill(skill)}
                  className="p-6 rounded-3xl frosted-glass text-left space-y-4 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#00a3e0]">
                        {skill.category.toUpperCase()} · {skill.years} YRS EXP
                      </span>
                      <h3 className="font-bold text-base text-white group-hover:text-[#00a3e0] transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="text-right font-mono text-sm font-extrabold text-[#86bc25] tabular-nums">
                      {skill.proficiency}%
                    </div>
                  </div>

                  {/* Progress Gauge */}
                  <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 p-0.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00558f] via-[#00a3e0] to-[#86bc25] shadow-[0_0_8px_rgba(134,188,37,0.5)]"
                    />
                  </div>

                  <p className="text-xs text-[#9ca3af] leading-relaxed">
                    {skill.highlight}
                  </p>

                  {/* Tags in Water Pill Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/10">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono water-pill text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Enterprise Certifications & Credentials */}
        <MotionReveal delay={0.2} direction="up" distance={24}>
          <div className="mt-14 p-6 sm:p-8 rounded-3xl frosted-glass text-left relative">
            <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full water-pill flex items-center gap-1.5 text-[11px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86bc25]" />
              <span>Verified Qualifications</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#00a3e0] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#86bc25]" />
                  Industry Validated Architecture & Agile Credentials
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Global Professional Certifications
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-300 px-3 py-1 rounded-full water-pill">
                Active & Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-3.5 rounded-2xl frosted-glass border border-white/10 flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-full water-drop text-[#86bc25] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 leading-snug">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionReveal>

      </div>
    </section>
  );
};
