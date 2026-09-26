/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageLoader } from './components/PageLoader';
import {
  DEFAULT_PROFILE,
  DEFAULT_EXPERIENCES,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
} from './data/defaultPortfolio';
import { InteractiveScrollTracker } from './components/InteractiveScrollTracker';
import { parseHash, buildHash } from './utils/routing';

const OverviewPage = lazy(() =>
  import('./pages/OverviewPage').then((m) => ({ default: m.OverviewPage }))
);
const ExperiencePage = lazy(() =>
  import('./pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage }))
);
const SkillsPage = lazy(() =>
  import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage }))
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

export default function App() {
  const profile = DEFAULT_PROFILE;
  const experiences = DEFAULT_EXPERIENCES;
  const skills = DEFAULT_SKILLS;
  const projects = DEFAULT_PROJECTS;

  const initial = parseHash();
  const [activePage, setActivePage] = useState<PageId>(initial.page);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(initial.projectId);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const { page, projectId } = parseHash();
      setActivePage(page);
      setActiveProjectId(projectId);
    };
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleNavigate = useCallback((page: PageId, projectId?: string | null) => {
    const nextProjectId = page === 'projects' ? projectId ?? null : null;
    setActivePage(page);
    setActiveProjectId(nextProjectId);
    window.location.hash = buildHash(page, nextProjectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenProject = useCallback((projectId: string) => {
    setActivePage('projects');
    setActiveProjectId(projectId);
    window.location.hash = buildHash('projects', projectId);
  }, []);

  const handleCloseProject = useCallback(() => {
    setActiveProjectId(null);
    if (parseHash().page === 'projects') {
      window.location.hash = buildHash('projects');
    }
  }, []);

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      const { generatePortfolioPDF } = await import('./utils/exportPdfReport');
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
      <InteractiveScrollTracker />

      <Navbar
        profile={profile}
        activePage={activePage}
        onNavigate={handleNavigate}
        onExportPDF={handleExportPDF}
        isExportingPDF={isExportingPDF}
      />

      <main className="min-h-[85vh]">
        <Suspense fallback={<PageLoader />}>
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
              initialProjectId={activeProjectId}
              onOpenProject={handleOpenProject}
              onCloseProject={handleCloseProject}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage profile={profile} onNavigate={handleNavigate} />
          )}
        </Suspense>
      </main>

      <Footer profile={profile} onNavigate={handleNavigate} />
    </div>
  );
}
