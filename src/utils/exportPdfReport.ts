import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConsultantProfile, ExperienceItem, ProjectItem, SkillItem } from '../types/portfolio';

export interface ExportPdfOptions {
  profile: ConsultantProfile;
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
}

export const generatePortfolioPDF = async ({
  profile,
  experiences,
  skills,
  projects,
}: ExportPdfOptions): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Deloitte Brand Color Palette
  const colorNavy = [0, 44, 108] as const;      // #002C6C
  const colorBlue = [0, 85, 143] as const;      // #00558F
  const colorGreen = [134, 188, 37] as const;   // #86BC25 (Signature Dot)
  const colorDark = [15, 28, 48] as const;      // #0F1C30
  const colorMuted = [75, 93, 120] as const;    // #4B5D78
  const colorLightBg = [240, 244, 250] as const;// #F0F4FA
  const colorLine = [210, 218, 230] as const;

  let currentY = margin;

  // Helper to draw section header
  const drawSectionHeader = (title: string, yPos: number): number => {
    // Check page overflow
    if (yPos > pageHeight - 35) {
      doc.addPage();
      yPos = margin + 5;
    }

    doc.setFillColor(...colorNavy);
    doc.rect(margin, yPos, 3, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...colorNavy);
    doc.text(title.toUpperCase(), margin + 6, yPos + 4.5);

    // Deloitte signature green dot next to header
    doc.setFillColor(...colorGreen);
    const titleWidth = doc.getTextWidth(title.toUpperCase());
    doc.circle(margin + 6 + titleWidth + 3, yPos + 3.5, 1, 'F');

    // Horizontal hairline rule
    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.3);
    doc.line(margin + 6 + titleWidth + 6, yPos + 3.5, pageWidth - margin, yPos + 3.5);

    return yPos + 9;
  };

  // -------------------------------------------------------------
  // PAGE 1: HEADER & EXECUTIVE SUMMARY & CORE STATS & COMPETENCIES
  // -------------------------------------------------------------

  // Top Deloitte Brand Bar
  doc.setFillColor(...colorNavy);
  doc.rect(0, 0, pageWidth, 5, 'F');

  // Deloitte Wordmark with green dot
  currentY = margin + 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...colorNavy);
  doc.text('Deloitte', margin, currentY);

  // Green Dot
  const deloitteTextWidth = doc.getTextWidth('Deloitte');
  doc.setFillColor(...colorGreen);
  doc.circle(margin + deloitteTextWidth + 1.8, currentY - 1.2, 1.4, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorMuted);
  doc.text('|  Executive Portfolio & Case Study Dossier', margin + deloitteTextWidth + 5.5, currentY);

  doc.setFontSize(8);
  doc.text('Offices of US-India', pageWidth - margin, currentY, { align: 'right' });

  currentY += 8;

  // Candidate Name & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...colorDark);
  doc.text(profile.name, margin, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...colorBlue);
  doc.text(profile.designation, margin, currentY);

  currentY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorMuted);
  const contactText = `${profile.location}  |  ${profile.email}  |  ${profile.linkedin.replace('https://', '')}`;
  doc.text(contactText, margin, currentY);

  currentY += 7;

  // Stat Highlights Box Strip (4 Metric Cards)
  const statBoxWidth = (contentWidth - 9) / 4;
  const statBoxHeight = 16;
  const stats = profile.statHighlights || [];

  stats.slice(0, 4).forEach((stat, i) => {
    const x = margin + i * (statBoxWidth + 3);
    doc.setFillColor(...colorLightBg);
    doc.roundedRect(x, currentY, statBoxWidth, statBoxHeight, 2, 2, 'F');
    doc.setDrawColor(...colorLine);
    doc.roundedRect(x, currentY, statBoxWidth, statBoxHeight, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...colorNavy);
    doc.text(stat.value, x + statBoxWidth / 2, currentY + 5.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...colorDark);
    doc.text(stat.label, x + statBoxWidth / 2, currentY + 10, { align: 'center' });

    if (stat.subtext) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(...colorMuted);
      doc.text(stat.subtext, x + statBoxWidth / 2, currentY + 13.5, { align: 'center' });
    }
  });

  currentY += statBoxHeight + 8;

  // 1. PROFESSIONAL SUMMARY
  currentY = drawSectionHeader('Professional Summary', currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorDark);
  const summaryLines = doc.splitTextToSize(profile.summary, contentWidth);
  doc.text(summaryLines, margin, currentY);
  currentY += summaryLines.length * 4.2 + 5;

  // 2. CORE COMPETENCIES (Structured Grid)
  currentY = drawSectionHeader('Core Competencies & Functional Matrix', currentY);

  const competencyData = skills.map((s) => [
    s.name,
    `${s.proficiency}%`,
    `${s.years} Yrs`,
    s.highlight,
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Competency Area', 'Mastery', 'Tenure', 'Key Scope & Deliverable Focus']],
    body: competencyData,
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: {
      fillColor: [...colorNavy],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: 'bold', textColor: [...colorDark], fontSize: 7.5 },
      1: { cellWidth: 16, halign: 'center', fontStyle: 'bold', textColor: [...colorBlue], fontSize: 7.5 },
      2: { cellWidth: 16, halign: 'center', textColor: [...colorMuted], fontSize: 7.5 },
      3: { cellWidth: 'auto', textColor: [...colorDark], fontSize: 7 },
    },
    styles: {
      cellPadding: 2,
      overflow: 'linebreak',
      lineColor: [...colorLine],
      lineWidth: 0.2,
    },
    alternateRowStyles: {
      fillColor: [...colorLightBg],
    },
  });

  // @ts-expect-error - jsPDF autoTable mutates doc with lastAutoTable
  currentY = doc.lastAutoTable.finalY + 6;

  // 3. KEY ACHIEVEMENTS (Summary Highlights)
  if (profile.keyAchievements && profile.keyAchievements.length > 0) {
    currentY = drawSectionHeader('Selected Key Achievements at Deloitte', currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...colorDark);

    const topAchievements = profile.keyAchievements.slice(0, 6);
    topAchievements.forEach((ach) => {
      // Bullet dot
      doc.setFillColor(...colorGreen);
      doc.circle(margin + 2, currentY - 1, 0.8, 'F');

      const achLines = doc.splitTextToSize(ach, contentWidth - 6);
      doc.text(achLines, margin + 5, currentY);
      currentY += achLines.length * 3.8 + 1.5;
    });
  }

  // -------------------------------------------------------------
  // PAGE 2: PROFESSIONAL EXPERIENCE HISTORY (DELOITTE 7+ YEARS)
  // -------------------------------------------------------------
  doc.addPage();
  currentY = margin + 2;

  currentY = drawSectionHeader('Professional Experience — Deloitte (7+ Years)', currentY);

  experiences.forEach((exp, idx) => {
    // Check page break
    if (currentY > pageHeight - 45) {
      doc.addPage();
      currentY = margin + 5;
    }

    // Role Title & Tenure
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...colorNavy);
    doc.text(exp.role, margin, currentY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colorBlue);
    doc.text(`${exp.startDate} – ${exp.endDate}`, pageWidth - margin, currentY, { align: 'right' });

    currentY += 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...colorMuted);
    doc.text(`${exp.company}  ·  ${exp.location}  ·  ${exp.department}`, margin, currentY);

    currentY += 4;

    // Description / Responsibilities (bullets)
    doc.setFontSize(7.5);
    doc.setTextColor(...colorDark);

    const bullets = exp.responsibilities.slice(0, 4);
    bullets.forEach((bullet) => {
      doc.setFillColor(...colorNavy);
      doc.circle(margin + 2, currentY - 1, 0.6, 'F');

      const lines = doc.splitTextToSize(bullet, contentWidth - 6);
      doc.text(lines, margin + 5, currentY);
      currentY += lines.length * 3.4 + 1.2;
    });

    // Tech / Tools Pill text
    if (exp.technologies && exp.technologies.length > 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.8);
      doc.setTextColor(...colorMuted);
      doc.text(`Key Frameworks & Tools: ${exp.technologies.join(', ')}`, margin + 5, currentY);
      currentY += 4;
    }

    // Divider between experiences
    if (idx < experiences.length - 1) {
      doc.setDrawColor(...colorLine);
      doc.setLineWidth(0.2);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 4.5;
    }
  });

  // -------------------------------------------------------------
  // PAGE 3: ENTERPRISE PROJECTS & CASE STUDIES + EDUCATION & CERTS
  // -------------------------------------------------------------
  doc.addPage();
  currentY = margin + 2;

  currentY = drawSectionHeader('Enterprise Projects & Case Study Blueprints', currentY);

  projects.forEach((proj, pIdx) => {
    if (currentY > pageHeight - 55) {
      doc.addPage();
      currentY = margin + 5;
    }

    // Project Card Container
    doc.setFillColor(...colorLightBg);
    const cardTop = currentY;
    
    // Header line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...colorNavy);
    doc.text(proj.title, margin + 4, currentY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorGreen);
    doc.text(proj.deloitteRole, pageWidth - margin - 4, currentY + 5, { align: 'right' });

    currentY += 9;

    // Challenge & Solution text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorDark);
    doc.text('Challenge: ', margin + 4, currentY);
    doc.setFont('helvetica', 'normal');
    const chLines = doc.splitTextToSize(proj.challenge, contentWidth - 28);
    doc.text(chLines, margin + 22, currentY);
    currentY += chLines.length * 3.4 + 2;

    doc.setFont('helvetica', 'bold');
    doc.text('Solution: ', margin + 4, currentY);
    doc.setFont('helvetica', 'normal');
    const solLines = doc.splitTextToSize(proj.solution, contentWidth - 28);
    doc.text(solLines, margin + 22, currentY);
    currentY += solLines.length * 3.4 + 3;

    // Metrics mini-row
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorNavy);
    const metricText = proj.outcomes.map((m) => `${m.label}: ${m.value}`).join('  |  ');
    doc.text(`Key Outcomes: ${metricText}`, margin + 4, currentY);

    currentY += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(...colorMuted);
    doc.text(`Technology Stack: ${proj.techStack.join(', ')}`, margin + 4, currentY);

    currentY += 4;
    const cardHeight = currentY - cardTop;
    doc.setDrawColor(...colorLine);
    doc.roundedRect(margin, cardTop, contentWidth, cardHeight, 1.5, 1.5, 'S');

    currentY += 5;
  });

  // EDUCATION & CERTIFICATIONS & LANGUAGES
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = margin + 5;
  }

  currentY = drawSectionHeader('Certifications, Education & Languages', currentY);

  // Left: Certifications
  const colWidth = (contentWidth - 6) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 6;
  const sectionTop = currentY;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorNavy);
  doc.text('Professional Certifications', col1X, currentY);
  currentY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...colorDark);
  profile.certifications.forEach((cert) => {
    doc.setFillColor(...colorGreen);
    doc.circle(col1X + 2, currentY - 1, 0.7, 'F');
    doc.text(cert, col1X + 5, currentY);
    currentY += 3.8;
  });

  // Right: Education & Languages
  let rightY = sectionTop;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorNavy);
  doc.text('Education & Academic Background', col2X, rightY);
  rightY += 4;

  if (profile.education && profile.education.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorDark);
    doc.text(profile.education[0].degree, col2X, rightY);
    rightY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...colorMuted);
    doc.text(`${profile.education[0].institution}  ·  ${profile.education[0].years}`, col2X, rightY);
    rightY += 6;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorNavy);
  doc.text('Languages', col2X, rightY);
  rightY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...colorDark);
  const langList = profile.languages ? profile.languages.join('  ·  ') : 'English, Hindi, Telugu';
  doc.text(langList, col2X, rightY);

  // -------------------------------------------------------------
  // FOOTER (Applied to every page)
  // -------------------------------------------------------------
  const totalPages = doc.getNumberOfPages();
  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Bottom hairline divider
    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    // Left footnote: Deloitte Confidential
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...colorMuted);
    doc.text(`Deloitte Executive Report  ·  ${profile.name}  ·  Generated ${todayStr}`, margin, pageHeight - 6);

    // Right footnote: Page X of Y with Deloitte green dot
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 4, pageHeight - 6, { align: 'right' });
    doc.setFillColor(...colorGreen);
    doc.circle(pageWidth - margin - 1, pageHeight - 7, 0.9, 'F');
  }

  // Save the PDF file
  const sanitizedName = profile.name.replace(/\s+/g, '_');
  doc.save(`Deloitte_Executive_Report_${sanitizedName}.pdf`);
};
