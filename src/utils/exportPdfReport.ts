import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConsultantProfile, ExperienceItem, ProjectItem, SkillItem } from '../types/portfolio';

export interface ExportPdfOptions {
  profile: ConsultantProfile;
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
}

const loadImageDataUrl = async (src: string): Promise<string | null> => {
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const blob = await res.blob();

    // Re-encode via canvas at 2x for crisp print/PDF rasterization
    const bitmap = await createImageBitmap(blob);
    const maxEdge = 900;
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    return canvas.toDataURL('image/jpeg', 0.95);
  } catch {
    return null;
  }
};

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
    compress: true,
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  const colorNavy = [0, 44, 108] as const;
  const colorBlue = [0, 85, 143] as const;
  const colorCyan = [0, 163, 224] as const;
  const colorGreen = [134, 188, 37] as const;
  const colorDark = [15, 28, 48] as const;
  const colorMuted = [75, 93, 120] as const;
  const colorLightBg = [244, 247, 252] as const;
  const colorLine = [210, 218, 230] as const;
  const colorWhite = [255, 255, 255] as const;

  const portraitDataUrl = profile.avatarUrl
    ? await loadImageDataUrl(profile.avatarUrl)
    : null;

  let currentY = margin;

  const ensureSpace = (needed: number): void => {
    if (currentY > pageHeight - needed) {
      doc.addPage();
      currentY = margin + 4;
    }
  };

  const drawSectionHeader = (title: string): void => {
    ensureSpace(28);
    doc.setFillColor(...colorNavy);
    doc.roundedRect(margin, currentY, 3.2, 7, 0.6, 0.6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...colorNavy);
    doc.text(title.toUpperCase(), margin + 6.5, currentY + 5.2);

    const titleWidth = doc.getTextWidth(title.toUpperCase());
    doc.setFillColor(...colorGreen);
    doc.circle(margin + 6.5 + titleWidth + 3.2, currentY + 4, 1.15, 'F');

    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.35);
    doc.line(margin + 6.5 + titleWidth + 6.5, currentY + 4, pageWidth - margin, currentY + 4);

    currentY += 12;
  };

  // ── Cover header band ─────────────────────────────────────────
  doc.setFillColor(...colorNavy);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Accent stripe
  doc.setFillColor(...colorGreen);
  doc.rect(0, 42, pageWidth, 1.6, 'F');
  doc.setFillColor(...colorCyan);
  doc.rect(0, 43.6, pageWidth, 0.7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...colorWhite);
  doc.text('Deloitte', margin, 14);
  const deloitteW = doc.getTextWidth('Deloitte');
  doc.setFillColor(...colorGreen);
  doc.circle(margin + deloitteW + 2.2, 12.4, 1.6, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 214, 232);
  doc.text('Executive Portfolio & Case Study Dossier', margin + deloitteW + 6, 14);
  doc.text('Offices of US-India', pageWidth - margin, 14, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...colorWhite);
  doc.text(profile.name, margin, 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(186, 210, 232);
  doc.text(profile.designation, margin, 35.5);

  // Portrait
  if (portraitDataUrl) {
    const photoSize = 28;
    const photoX = pageWidth - margin - photoSize;
    const photoY = 7;
    doc.setFillColor(...colorWhite);
    doc.roundedRect(photoX - 1, photoY - 1, photoSize + 2, photoSize + 2, 2, 2, 'F');
    doc.addImage(portraitDataUrl, 'JPEG', photoX, photoY, photoSize, photoSize, undefined, 'NONE');
  }

  currentY = 52;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colorMuted);
  const contactText = `${profile.location}  ·  ${profile.email}  ·  ${profile.linkedin.replace('https://', '')}`;
  doc.text(contactText, margin, currentY);
  currentY += 8;

  // Stat cards
  const stats = profile.statHighlights || [];
  const statBoxWidth = (contentWidth - 9) / 4;
  const statBoxHeight = 20;

  stats.slice(0, 4).forEach((stat, i) => {
    const x = margin + i * (statBoxWidth + 3);
    doc.setFillColor(...colorLightBg);
    doc.roundedRect(x, currentY, statBoxWidth, statBoxHeight, 2.5, 2.5, 'F');
    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, currentY, statBoxWidth, statBoxHeight, 2.5, 2.5, 'S');

    // Top accent
    doc.setFillColor(...colorCyan);
    doc.roundedRect(x, currentY, statBoxWidth, 1.2, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...colorNavy);
    doc.text(stat.value, x + statBoxWidth / 2, currentY + 8, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorDark);
    doc.text(stat.label, x + statBoxWidth / 2, currentY + 13, { align: 'center', maxWidth: statBoxWidth - 4 });

    if (stat.subtext) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...colorMuted);
      doc.text(stat.subtext, x + statBoxWidth / 2, currentY + 17, { align: 'center', maxWidth: statBoxWidth - 4 });
    }
  });

  currentY += statBoxHeight + 10;

  // Professional Summary
  drawSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...colorDark);
  const summaryLines = doc.splitTextToSize(profile.summary, contentWidth);
  doc.text(summaryLines, margin, currentY);
  currentY += summaryLines.length * 4.8 + 8;

  // Competencies
  drawSectionHeader('Core Competencies & Functional Matrix');

  autoTable(doc, {
    startY: currentY,
    head: [['Competency Area', 'Mastery', 'Tenure', 'Key Scope & Deliverable Focus']],
    body: skills.map((s) => [s.name, `${s.proficiency}%`, `${s.years} Yrs`, s.highlight]),
    theme: 'grid',
    margin: { left: margin, right: margin },
    headStyles: {
      fillColor: [...colorNavy],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 44, fontStyle: 'bold', textColor: [...colorDark], fontSize: 8.5 },
      1: { cellWidth: 18, halign: 'center', fontStyle: 'bold', textColor: [...colorBlue], fontSize: 8.5 },
      2: { cellWidth: 18, halign: 'center', textColor: [...colorMuted], fontSize: 8.5 },
      3: { cellWidth: 'auto', textColor: [...colorDark], fontSize: 8 },
    },
    styles: {
      cellPadding: 3,
      overflow: 'linebreak',
      lineColor: [...colorLine],
      lineWidth: 0.25,
      minCellHeight: 8,
    },
    alternateRowStyles: {
      fillColor: [...colorLightBg],
    },
  });

  // @ts-expect-error - jsPDF autoTable mutates doc with lastAutoTable
  currentY = doc.lastAutoTable.finalY + 8;

  // Achievements
  if (profile.keyAchievements?.length) {
    drawSectionHeader('Selected Key Achievements at Deloitte');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...colorDark);

    profile.keyAchievements.slice(0, 6).forEach((ach) => {
      ensureSpace(18);
      doc.setFillColor(...colorGreen);
      doc.circle(margin + 2.2, currentY - 1.1, 1, 'F');
      const achLines = doc.splitTextToSize(ach, contentWidth - 8);
      doc.text(achLines, margin + 6, currentY);
      currentY += achLines.length * 4.4 + 2.5;
    });
  }

  // Experience
  doc.addPage();
  currentY = margin + 2;
  drawSectionHeader('Professional Experience — Deloitte (7+ Years)');

  experiences.forEach((exp, idx) => {
    ensureSpace(42);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...colorNavy);
    doc.text(exp.role, margin, currentY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...colorBlue);
    doc.text(`${exp.startDate} – ${exp.endDate}`, pageWidth - margin, currentY, { align: 'right' });

    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...colorMuted);
    doc.text(`${exp.company}  ·  ${exp.location}  ·  ${exp.department}`, margin, currentY);
    currentY += 5.5;

    doc.setFontSize(8.5);
    doc.setTextColor(...colorDark);
    exp.responsibilities.slice(0, 4).forEach((bullet) => {
      ensureSpace(16);
      doc.setFillColor(...colorNavy);
      doc.circle(margin + 2.2, currentY - 1, 0.75, 'F');
      const lines = doc.splitTextToSize(bullet, contentWidth - 8);
      doc.text(lines, margin + 6, currentY);
      currentY += lines.length * 4 + 2;
    });

    if (exp.technologies?.length) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(...colorMuted);
      doc.text(`Key Frameworks & Tools: ${exp.technologies.join(', ')}`, margin + 6, currentY);
      currentY += 5;
    }

    if (idx < experiences.length - 1) {
      doc.setDrawColor(...colorLine);
      doc.setLineWidth(0.3);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 6;
    }
  });

  // Projects
  doc.addPage();
  currentY = margin + 2;
  drawSectionHeader('Enterprise Projects & Case Study Blueprints');

  projects.forEach((proj) => {
    ensureSpace(52);
    const cardTop = currentY;

    doc.setFillColor(...colorLightBg);
    // Placeholder fill; border drawn after measuring height
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...colorNavy);
    const titleLines = doc.splitTextToSize(proj.title, contentWidth - 8);
    doc.text(titleLines, margin + 4, currentY + 6);
    currentY += titleLines.length * 4.8 + 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...colorGreen);
    doc.text(proj.deloitteRole, margin + 4, currentY);
    currentY += 5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...colorDark);
    doc.text('Challenge', margin + 4, currentY);
    currentY += 4;
    doc.setFont('helvetica', 'normal');
    const chLines = doc.splitTextToSize(proj.challenge, contentWidth - 10);
    doc.text(chLines, margin + 4, currentY);
    currentY += chLines.length * 4 + 3;

    doc.setFont('helvetica', 'bold');
    doc.text('Solution', margin + 4, currentY);
    currentY += 4;
    doc.setFont('helvetica', 'normal');
    const solLines = doc.splitTextToSize(proj.solution, contentWidth - 10);
    doc.text(solLines, margin + 4, currentY);
    currentY += solLines.length * 4 + 3.5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...colorNavy);
    const metricText = proj.outcomes.map((m) => `${m.label}: ${m.value}`).join('   ·   ');
    const metricLines = doc.splitTextToSize(`Outcomes — ${metricText}`, contentWidth - 10);
    doc.text(metricLines, margin + 4, currentY);
    currentY += metricLines.length * 4 + 2.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorMuted);
    const stackLines = doc.splitTextToSize(`Technology: ${proj.techStack.join(', ')}`, contentWidth - 10);
    doc.text(stackLines, margin + 4, currentY);
    currentY += stackLines.length * 3.6 + 4;

    const cardHeight = currentY - cardTop;
    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, cardTop, contentWidth, cardHeight, 2, 2, 'S');
    doc.setFillColor(...colorCyan);
    doc.roundedRect(margin, cardTop, 1.6, cardHeight, 0.5, 0.5, 'F');

    currentY += 6;
  });

  // Certs / Education
  ensureSpace(50);
  drawSectionHeader('Certifications, Education & Languages');

  const colWidth = (contentWidth - 8) / 2;
  const col1X = margin;
  const col2X = margin + colWidth + 8;
  const sectionTop = currentY;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...colorNavy);
  doc.text('Professional Certifications', col1X, currentY);
  currentY += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorDark);
  profile.certifications.forEach((cert) => {
    doc.setFillColor(...colorGreen);
    doc.circle(col1X + 2, currentY - 1, 0.85, 'F');
    const certLines = doc.splitTextToSize(cert, colWidth - 8);
    doc.text(certLines, col1X + 5.5, currentY);
    currentY += certLines.length * 4 + 1.5;
  });

  let rightY = sectionTop;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...colorNavy);
  doc.text('Education', col2X, rightY);
  rightY += 5.5;

  if (profile.education?.[0]) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...colorDark);
    const degLines = doc.splitTextToSize(profile.education[0].degree, colWidth);
    doc.text(degLines, col2X, rightY);
    rightY += degLines.length * 4 + 1.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...colorMuted);
    doc.text(`${profile.education[0].institution}  ·  ${profile.education[0].years}`, col2X, rightY);
    rightY += 7;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...colorNavy);
  doc.text('Languages', col2X, rightY);
  rightY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...colorDark);
  doc.text(profile.languages?.join('  ·  ') || 'English, Hindi, Telugu', col2X, rightY);

  currentY = Math.max(currentY, rightY) + 4;

  // Footers
  const totalPages = doc.getNumberOfPages();
  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setDrawColor(...colorLine);
    doc.setLineWidth(0.35);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...colorMuted);
    doc.text(
      `Deloitte Executive Report  ·  ${profile.name}  ·  Generated ${todayStr}`,
      margin,
      pageHeight - 7
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 4, pageHeight - 7, { align: 'right' });
    doc.setFillColor(...colorGreen);
    doc.circle(pageWidth - margin - 1, pageHeight - 8, 1, 'F');
  }

  const sanitizedName = profile.name.replace(/\s+/g, '_');
  doc.save(`Deloitte_Executive_Report_${sanitizedName}.pdf`);
};
