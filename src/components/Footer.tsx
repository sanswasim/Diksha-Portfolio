import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ConsultantProfile } from '../types/portfolio';
import { DeloitteLogo } from './DeloitteLogo';
import { PageId } from './Navbar';

interface FooterProps {
  profile: ConsultantProfile;
  onNavigate: (page: PageId, projectId?: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; id: PageId }[] = [
    { label: 'Overview', id: 'overview' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Case Studies', id: 'projects' },
    { label: 'Offices & Contact', id: 'contact' },
  ];

  return (
    <footer className="pt-16 pb-12 bg-black border-t border-[#1e2636] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-[#1e2636]">
          {/* Exact Deloitte Brand Lockup */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <DeloitteLogo size="sm" />
              <span className="h-4 w-px bg-[#2a3449]" />
              <span className="text-xs font-semibold text-[#9ca3af]">
                Offices of US-India · Enterprise Knowledge & Governance
              </span>
            </div>
            <p className="text-xs text-[#6b7280]">
              Personal work portfolio & executive showcase for {profile.name}, {profile.designation}.
            </p>
          </div>

          {/* Quick Page Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#9ca3af]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  scrollToTop();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-[#0e131d] border border-[#1e2636] flex items-center justify-center text-white hover:text-[#86bc25] transition-colors cursor-pointer"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright and Standards */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span>·</span>
            <span>{profile.firm}</span>
            <span>·</span>
            <span>All professional rights reserved</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-[#9ca3af]">
            <span>Hyderabad Campus · Bengaluru · Mumbai · Gurugram · London · New York</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
