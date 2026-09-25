import React, { useState } from 'react';
import { Menu, X, Download, Loader2, ArrowUpRight } from 'lucide-react';
import { ConsultantProfile } from '../types/portfolio';
import { DeloitteLogo } from './DeloitteLogo';

export type PageId = 'overview' | 'experience' | 'skills' | 'projects' | 'contact';

interface NavbarProps {
  profile: ConsultantProfile;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onExportPDF: () => void;
  isExportingPDF?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activePage,
  onNavigate,
  onExportPDF,
  isExportingPDF = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; id: PageId; href: string }[] = [
    { label: 'Overview', id: 'overview', href: '#/overview' },
    { label: 'Experience', id: 'experience', href: '#/experience' },
    { label: 'Skills', id: 'skills', href: '#/skills' },
    { label: 'Case Studies', id: 'projects', href: '#/projects' },
    { label: 'Offices & Contact', id: 'contact', href: '#/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: PageId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3.5 frosted-glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Zone 1: Exact Deloitte Brand Logo + Practitioner Identity */}
        <div
          onClick={(e) => handleLinkClick(e, 'overview')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <DeloitteLogo size="md" />
          <span className="h-4 w-px bg-white/25 hidden sm:block" />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold tracking-tight text-white leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {profile.name}
            </span>
            <span className="text-[10px] text-white/70 font-medium leading-none mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Offices of US-India
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links for Distinct Pages */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`relative text-xs font-semibold tracking-wide transition-all duration-150 py-1 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#86bc25] shadow-[0_0_8px_rgba(134,188,37,0.8)] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (PDF Report + Contact CTA) */}
        <div className="flex items-center gap-3">
          {/* Export PDF Report Button */}
          <button
            onClick={onExportPDF}
            disabled={isExportingPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#0e131d] hover:bg-[#141b29] text-white hover:text-[#86bc25] transition-all cursor-pointer whitespace-nowrap border border-[#1e2636] hover:border-[#86bc25]/40 disabled:opacity-60 shadow-sm"
            title="Export Profile & Case Studies as Formatted PDF Report"
          >
            {isExportingPDF ? (
              <Loader2 className="w-3.5 h-3.5 text-[#86bc25] animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5 text-[#86bc25]" />
            )}
            <span className="hidden md:inline">{isExportingPDF ? 'Exporting...' : 'PDF Report'}</span>
          </button>

          {/* Quick Contact Page Button */}
          <button
            onClick={(e) => handleLinkClick(e, 'contact')}
            className={`hidden sm:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activePage === 'contact'
                ? 'bg-[#0076a8] text-white border border-[#00a3e0]'
                : 'bg-white text-black hover:bg-slate-200'
            }`}
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-[#0e131d] border border-[#1e2636] text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 mt-2 bg-black border-b border-[#1e2636] space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === link.id
                  ? 'bg-[#111722] text-[#00a3e0] font-semibold border-l-2 border-[#86bc25]'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExportPDF();
              }}
              disabled={isExportingPDF}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-[#0e131d] text-white border border-[#86bc25]/40"
            >
              <Download className="w-3.5 h-3.5 text-[#86bc25]" />
              <span>{isExportingPDF ? 'Generating PDF...' : 'Download Formatted PDF Report'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
