/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './pages/OverviewPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import {
  DEFAULT_PROFILE,
  DEFAULT_EXPERIENCES,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
} from './data/defaultPortfolio';
import { generatePortfolioPDF } from './utils/exportPdfReport';
import { InteractiveScrollTracker } from './components/InteractiveScrollTracker';

export default function App() {
  const profile = DEFAULT_PROFILE;
  const experiences = DEFAULT_EXPERIENCES;
  const skills = DEFAULT_SKILLS;
  const projects = DEFAULT_PROJECTS;

  // Determine initial page from URL hash
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash === 'experience') return 'experience';
    if (hash === 'skills') return 'skills';
    if (hash === 'projects') return 'projects';
    if (hash === 'contact') return 'contact';
    return 'overview';
  };

  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  // Sync hash change for browser Back/Forward
  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      await generatePortfolioPDF({
        profile,
        experiences,
        skills,
        projects,
      });
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#86bc25]/20 selection:text-white">
      {/* Interactive Global Scroll Tracker & Floating Dock */}
      <InteractiveScrollTracker />

      {/* Top Bar Navigation */}
      <Navbar
        profile={profile}
        activePage={activePage}
        onNavigate={handleNavigate}
        onExportPDF={handleExportPDF}
        isExportingPDF={isExportingPDF}
      />

      <main className="min-h-[85vh]">
        {activePage === 'overview' && (
          <OverviewPage
            profile={profile}
            experiences={experiences}
            projects={projects}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'experience' && (
          <ExperiencePage
            profile={profile}
            experiences={experiences}
            onNavigate={handleNavigate}
            onExportPDF={handleExportPDF}
            isExportingPDF={isExportingPDF}
          />
        )}

        {activePage === 'skills' && (
          <SkillsPage
            profile={profile}
            skills={skills}
            onNavigate={handleNavigate}
            onExportPDF={handleExportPDF}
            isExportingPDF={isExportingPDF}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsPage
            profile={profile}
            projects={projects}
            onNavigate={handleNavigate}
            onExportPDF={handleExportPDF}
            isExportingPDF={isExportingPDF}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            profile={profile}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer profile={profile} onNavigate={handleNavigate} />
    </div>
  );
}
