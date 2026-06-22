import { ScoringResult } from './types';
import { PHASE_ALLOCATIONS } from './phases';

const BRAND_PURPLE = '#26006B';
const BRAND_ORANGE = '#FD6A02';

function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 40);
}

function getDateStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function buildFileName(result: ScoringResult, ext: string): string {
  const nameSlug = sanitizeFileName(result.initiativeName) || 'Timeline_Estimate';
  return `Lxology_Timeline_Estimate_${nameSlug}_${getDateStr()}.${ext}`;
}

function formatRange(result: ScoringResult): string {
  if (result.isVerySmallLearning) return '2–5 business days';
  const [lo, hi] = result.adjustedRange;
  return `${lo}–${hi} weeks`;
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    learning: 'Learning Initiative',
    project: 'Project',
    program: 'Program',
    change: 'Change Initiative',
  };
  return labels[type] ?? type;
}

// ─── PDF ────────────────────────────────────────────────────────────────────

export async function downloadPDF(result: ScoringResult): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });

  const W = 612;
  const margin = 48;
  const contentWidth = W - margin * 2;
  let y = margin;

  function addText(
    text: string,
    x: number,
    yPos: number,
    opts: { size?: number; bold?: boolean; color?: string; maxWidth?: number } = {},
  ): number {
    doc.setFontSize(opts.size ?? 10);
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    const rgb = hexToRgb(opts.color ?? '#1a1a1a');
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
    const lines = doc.splitTextToSize(text, opts.maxWidth ?? contentWidth);
    doc.text(lines, x, yPos);
    return yPos + lines.length * (opts.size ?? 10) * 1.4;
  }

  function hexToRgb(hex: string) {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16),
    };
  }

  function rule(yPos: number, color = '#D7E7FF') {
    const rgb = hexToRgb(color);
    doc.setDrawColor(rgb.r, rgb.g, rgb.b);
    doc.line(margin, yPos, W - margin, yPos);
    return yPos + 8;
  }

  function addBullets(items: string[], x: number, startY: number, indent = 8): number {
    let curY = startY;
    for (const item of items) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const rgb = hexToRgb('#333333');
      doc.setTextColor(rgb.r, rgb.g, rgb.b);
      const lines = doc.splitTextToSize(`• ${item}`, contentWidth - indent);
      doc.text(lines, x + indent, curY);
      curY += lines.length * 13 + 3;
    }
    return curY;
  }

  // ── Header ─────────────────────────────────────────────────────────
  const headerRgb = hexToRgb(BRAND_PURPLE);
  doc.setFillColor(headerRgb.r, headerRgb.g, headerRgb.b);
  doc.rect(0, 0, W, 56, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('LXOLOGY', margin, 24);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Timeline Estimator™', margin, 39);
  doc.setFontSize(9);
  doc.text(getDateStr(), W - margin, 24, { align: 'right' });

  y = 72;

  // ── Initiative card ────────────────────────────────────────────────
  y = addText(result.initiativeName, margin, y, { size: 16, bold: true, color: BRAND_PURPLE });
  y += 2;
  y = addText(typeLabel(result.initiativeType), margin, y, { size: 10, color: '#666666' });
  y += 14;
  y = rule(y);
  y += 8;

  // ── Timeline range ─────────────────────────────────────────────────
  y = addText('Estimated Timeline to Launch', margin, y, { size: 11, bold: true, color: BRAND_PURPLE });
  y += 2;
  y = addText(formatRange(result), margin, y, { size: 20, bold: true, color: BRAND_ORANGE });
  if (result.postLaunchWindow) {
    y += 2;
    y = addText(`Recommended post-launch support: ${result.postLaunchWindow}`, margin, y, { size: 9, color: '#555555' });
  }
  y += 12;

  // ── Complexity / Confidence ────────────────────────────────────────
  const colW = contentWidth / 2 - 8;
  const boxY = y;

  // Complexity box
  doc.setFillColor(240, 236, 247);
  doc.roundedRect(margin, boxY, colW, 52, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(headerRgb.r, headerRgb.g, headerRgb.b);
  doc.text('COMPLEXITY', margin + 10, boxY + 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(result.complexityLevel, margin + 10, boxY + 33);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`${Math.round(result.scorePercent * 100)}% of maximum score`, margin + 10, boxY + 47);

  // Confidence box
  const col2 = margin + colW + 16;
  doc.setFillColor(215, 231, 255);
  doc.roundedRect(col2, boxY, colW, 52, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(headerRgb.r, headerRgb.g, headerRgb.b);
  doc.text('PLANNING CONFIDENCE', col2 + 10, boxY + 16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(result.confidenceLevel, col2 + 10, boxY + 33);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  const confNote =
    result.confidenceLevel === 'High' || result.confidenceLevel === 'Moderate-High'
      ? 'Strong planning clarity'
      : result.confidenceLevel === 'Moderate'
        ? 'Some details to clarify'
        : 'Several details to define';
  doc.text(confNote, col2 + 10, boxY + 47);

  y = boxY + 68;

  // ── Main drivers ───────────────────────────────────────────────────
  y = addText('Main Timeline Drivers', margin, y, { size: 11, bold: true, color: BRAND_PURPLE });
  y += 4;
  y = addBullets(result.topDrivers, margin, y);
  y += 10;

  // ── Page 2 ─────────────────────────────────────────────────────────
  if (y > 680) {
    doc.addPage();
    y = margin;
  } else {
    y = rule(y);
    y += 8;
  }

  // Timeline risks
  y = addText('Timeline Risks', margin, y, { size: 11, bold: true, color: BRAND_PURPLE });
  y += 4;
  y = addBullets(result.riskFlags, margin, y);
  y += 10;

  if (y > 650) { doc.addPage(); y = margin; }

  // Planning assumptions
  y = addText('Planning Assumptions', margin, y, { size: 11, bold: true, color: BRAND_PURPLE });
  y += 4;
  y = addBullets(result.planningAssumptions, margin, y);
  y += 10;

  if (y > 650) { doc.addPage(); y = margin; }

  // Recommended next steps
  y = addText('Recommended Next Steps', margin, y, { size: 11, bold: true, color: BRAND_PURPLE });
  y += 4;
  y = addBullets(result.recommendedNextSteps, margin, y);
  y += 14;

  // Phase bar (text list)
  if (y > 630) { doc.addPage(); y = margin; }
  y = rule(y);
  y += 8;
  y = addText('Suggested Timeline Phases', margin, y, { size: 11, bold: true, color: BRAND_PURPLE });
  y += 6;

  const phases = PHASE_ALLOCATIONS[result.initiativeType];
  const barWidth = contentWidth;
  const barHeight = 20;
  let barX = margin;

  const phaseColors = ['#26006B', '#5C2D91', '#8B5CF6', '#FD6A02', '#F59E0B', '#D7E7FF'];
  phases.forEach((phase, i) => {
    const segW = (phase.percent / 100) * barWidth;
    const rgb = hexToRgb(phaseColors[i % phaseColors.length]);
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
    doc.rect(barX, y, segW, barHeight, 'F');
    barX += segW;
  });
  y += barHeight + 6;

  phases.forEach((phase, i) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const rgb = hexToRgb('#333333');
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
    doc.text(`${phase.percent}% ${phase.name}`, margin + 8, y);
    y += 13;
  });

  y += 10;

  // Methodology note
  y = rule(y, '#eeeeee');
  y += 6;
  y = addText(
    'Methodology: This estimate is based on Lxology\'s planning framework, professional practitioner experience, and common timeline factors. It does not calculate team capacity, staffing levels, or organization-specific work velocity.',
    margin, y, { size: 8, color: '#888888', maxWidth: contentWidth },
  );
  y += 6;
  y = addText(
    'Disclaimer: This estimate is directional and intended for planning conversations, not as a guaranteed delivery date. Actual timelines may vary.',
    margin, y, { size: 8, color: '#888888', maxWidth: contentWidth },
  );

  doc.save(buildFileName(result, 'pdf'));
}

// ─── PowerPoint ─────────────────────────────────────────────────────────────

export async function downloadPPTX(result: ScoringResult): Promise<void> {
  const pptxgen = (await import('pptxgenjs')).default;
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';

  const purpleHex = '26006B';
  const orangeHex = 'FD6A02';
  const lightBlueHex = 'D7E7FF';

  const titleStyle = { color: purpleHex, fontSize: 28, bold: true, fontFace: 'Arial' };
  const headingStyle = { color: purpleHex, fontSize: 18, bold: true, fontFace: 'Arial' };
  const bodyStyle = { color: '333333', fontSize: 12, fontFace: 'Arial' };
  const subtitleStyle = { color: '666666', fontSize: 13, fontFace: 'Arial' };

  // Slide 1: Title + summary
  const s1 = pptx.addSlide();
  s1.background = { color: 'FFFFFF' };
  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: purpleHex } });
  s1.addText('LXOLOGY — Timeline Estimator™', { x: 0.4, y: 0.1, w: 9, h: 0.6, color: 'FFFFFF', fontSize: 14, bold: true, fontFace: 'Arial' });

  s1.addText(result.initiativeName, { x: 0.4, y: 1.1, w: 12, h: 0.7, ...titleStyle });
  s1.addText(typeLabel(result.initiativeType), { x: 0.4, y: 1.8, w: 10, h: 0.35, ...subtitleStyle });
  s1.addText(`Generated: ${getDateStr()}`, { x: 0.4, y: 2.15, w: 6, h: 0.3, color: '999999', fontSize: 10, fontFace: 'Arial' });

  s1.addShape(pptx.ShapeType.rect, { x: 0.4, y: 2.65, w: 5.5, h: 1.4, fill: { color: 'F3EEFF' }, line: { color: purpleHex, width: 1 } });
  s1.addText('Estimated Timeline', { x: 0.6, y: 2.75, w: 5, h: 0.3, color: purpleHex, fontSize: 11, bold: true, fontFace: 'Arial' });
  s1.addText(formatRange(result), { x: 0.6, y: 3.05, w: 5, h: 0.65, color: orangeHex, fontSize: 30, bold: true, fontFace: 'Arial' });
  if (result.postLaunchWindow) {
    s1.addText(`Post-launch support: ${result.postLaunchWindow}`, { x: 0.6, y: 3.75, w: 5.2, h: 0.25, color: '555555', fontSize: 10, fontFace: 'Arial' });
  }

  // Slide 2: Complexity + Confidence
  const s2 = pptx.addSlide();
  s2.background = { color: 'FFFFFF' };
  s2.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: purpleHex } });
  s2.addText('Complexity and Confidence', { x: 0.4, y: 0.1, w: 12, h: 0.4, color: 'FFFFFF', fontSize: 14, bold: true, fontFace: 'Arial' });

  s2.addShape(pptx.ShapeType.rect, { x: 0.4, y: 0.9, w: 5.8, h: 2.2, fill: { color: 'F0ECF7' } });
  s2.addText('COMPLEXITY LEVEL', { x: 0.6, y: 1.05, w: 5.4, h: 0.3, color: purpleHex, fontSize: 10, bold: true, fontFace: 'Arial' });
  s2.addText(result.complexityLevel, { x: 0.6, y: 1.4, w: 5.4, h: 0.65, color: purpleHex, fontSize: 28, bold: true, fontFace: 'Arial' });
  s2.addText(`${Math.round(result.scorePercent * 100)}% of maximum complexity score`, { x: 0.6, y: 2.1, w: 5.4, h: 0.3, ...bodyStyle, fontSize: 10 });
  s2.addText('Complexity is based on scope, stakeholder involvement, review cycles, materials readiness, and implementation requirements.', { x: 0.6, y: 2.45, w: 5.4, h: 0.5, color: '666666', fontSize: 9, fontFace: 'Arial' });

  s2.addShape(pptx.ShapeType.rect, { x: 6.8, y: 0.9, w: 5.8, h: 2.2, fill: { color: lightBlueHex } });
  s2.addText('PLANNING CONFIDENCE', { x: 7.0, y: 1.05, w: 5.4, h: 0.3, color: purpleHex, fontSize: 10, bold: true, fontFace: 'Arial' });
  s2.addText(result.confidenceLevel, { x: 7.0, y: 1.4, w: 5.4, h: 0.65, color: purpleHex, fontSize: 28, bold: true, fontFace: 'Arial' });
  s2.addText('Confidence is based on how many planning details are defined vs. unknown.', { x: 7.0, y: 2.1, w: 5.4, h: 0.5, color: '666666', fontSize: 9, fontFace: 'Arial' });

  if (result.confidenceLevel === 'Low' || result.confidenceLevel === 'Low-Moderate') {
    s2.addText('⚠  Several planning details are not yet defined. Clarifying scope, stakeholders, and review cycles will improve accuracy.', {
      x: 0.4, y: 3.4, w: 12, h: 0.5, color: '854F0B', fontSize: 10, fontFace: 'Arial'
    });
  }

  // Slide 3: Main drivers
  const s3 = pptx.addSlide();
  s3.background = { color: 'FFFFFF' };
  s3.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: purpleHex } });
  s3.addText('Main Timeline Drivers', { x: 0.4, y: 0.1, w: 12, h: 0.4, color: 'FFFFFF', fontSize: 14, bold: true, fontFace: 'Arial' });

  let dy3 = 0.95;
  result.topDrivers.forEach((driver) => {
    s3.addShape(pptx.ShapeType.rect, { x: 0.4, y: dy3, w: 0.12, h: 0.12, fill: { color: orangeHex } });
    s3.addText(driver, { x: 0.7, y: dy3 - 0.04, w: 12, h: 0.45, ...bodyStyle });
    dy3 += 0.58;
  });

  // Slide 4: Risks + assumptions
  const s4 = pptx.addSlide();
  s4.background = { color: 'FFFFFF' };
  s4.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: purpleHex } });
  s4.addText('Risks and Planning Assumptions', { x: 0.4, y: 0.1, w: 12, h: 0.4, color: 'FFFFFF', fontSize: 14, bold: true, fontFace: 'Arial' });

  s4.addText('Timeline Risks', { x: 0.4, y: 0.85, w: 6, h: 0.35, ...headingStyle });
  let dy4a = 1.3;
  result.riskFlags.forEach((risk) => {
    s4.addText(`• ${risk}`, { x: 0.5, y: dy4a, w: 6.2, h: 0.55, ...bodyStyle, fontSize: 10 });
    dy4a += 0.6;
  });

  s4.addText('Planning Assumptions', { x: 7.0, y: 0.85, w: 6, h: 0.35, ...headingStyle });
  let dy4b = 1.3;
  result.planningAssumptions.slice(0, 4).forEach((a) => {
    s4.addText(`• ${a}`, { x: 7.1, y: dy4b, w: 5.8, h: 0.55, ...bodyStyle, fontSize: 10 });
    dy4b += 0.6;
  });

  // Slide 5: Next steps + phase bar
  const s5 = pptx.addSlide();
  s5.background = { color: 'FFFFFF' };
  s5.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: purpleHex } });
  s5.addText('Next Steps and Timeline Phases', { x: 0.4, y: 0.1, w: 12, h: 0.4, color: 'FFFFFF', fontSize: 14, bold: true, fontFace: 'Arial' });

  s5.addText('Recommended Next Steps', { x: 0.4, y: 0.85, w: 12, h: 0.35, ...headingStyle });
  let dy5 = 1.3;
  result.recommendedNextSteps.forEach((step) => {
    s5.addText(`• ${step}`, { x: 0.5, y: dy5, w: 12, h: 0.45, ...bodyStyle, fontSize: 10 });
    dy5 += 0.5;
  });

  // Phase bar
  const barStartY = dy5 + 0.3;
  s5.addText('Suggested Timeline Phases', { x: 0.4, y: barStartY, w: 12, h: 0.35, ...headingStyle });

  const phases = PHASE_ALLOCATIONS[result.initiativeType];
  const barY = barStartY + 0.55;
  const barTotalW = 12.0;
  const segColors = [purpleHex, '5C2D91', '8B5CF6', orangeHex, 'F59E0B', 'D7E7FF'];
  let bx = 0.4;
  phases.forEach((phase, i) => {
    const segW = (phase.percent / 100) * barTotalW;
    s5.addShape(pptx.ShapeType.rect, { x: bx, y: barY, w: segW, h: 0.35, fill: { color: segColors[i % segColors.length] } });
    bx += segW;
  });
  bx = 0.4;
  let labelY = barY + 0.45;
  phases.forEach((phase, i) => {
    const segW = (phase.percent / 100) * barTotalW;
    s5.addText(`${phase.percent}% — ${phase.name}`, { x: bx, y: labelY, w: segW + 0.5, h: 0.28, color: '333333', fontSize: 8, fontFace: 'Arial' });
    bx += segW;
  });

  // Methodology note
  s5.addText(
    'Methodology: Based on Lxology\'s planning framework and professional practitioner experience. Does not calculate team capacity or staffing levels. This estimate is directional.',
    { x: 0.4, y: 6.8, w: 12, h: 0.4, color: 'AAAAAA', fontSize: 8, fontFace: 'Arial' },
  );

  await pptx.writeFile({ fileName: buildFileName(result, 'pptx') });
}

// ─── Word ────────────────────────────────────────────────────────────────────

export async function downloadWord(result: ScoringResult): Promise<void> {
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
    BorderStyle, LevelFormat, Table, TableRow, TableCell, WidthType, ShadingType,
  } = await import('docx');

  const phases = PHASE_ALLOCATIONS[result.initiativeType];

  function h1(text: string) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 100 },
      children: [new TextRun({ text, font: 'Arial', size: 28, bold: true, color: '26006B' })],
    });
  }
  function h2(text: string) {
    return new Paragraph({
      spacing: { before: 200, after: 60 },
      children: [new TextRun({ text, font: 'Arial', size: 22, bold: true, color: '26006B' })],
    });
  }
  function body(text: string) {
    return new Paragraph({
      spacing: { before: 0, after: 100 },
      children: [new TextRun({ text, font: 'Arial', size: 20, color: '333333' })],
    });
  }
  function bullet(text: string) {
    return new Paragraph({
      numbering: { reference: 'bullets', level: 0 },
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text, font: 'Arial', size: 20, color: '333333' })],
    });
  }
  function meta(text: string) {
    return new Paragraph({
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text, font: 'Arial', size: 18, color: '888888' })],
    });
  }
  function divider() {
    return new Paragraph({
      spacing: { before: 160, after: 160 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D7E7FF', space: 1 } },
      children: [],
    });
  }

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    styles: { default: { document: { run: { font: 'Arial', size: 20 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          // Header
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: [new TextRun({ text: 'LXOLOGY', font: 'Arial', size: 24, bold: true, color: '26006B', allCaps: true })],
          }),
          new Paragraph({
            spacing: { before: 0, after: 60 },
            children: [new TextRun({ text: 'Timeline Estimator™ — Planning Summary', font: 'Arial', size: 30, bold: true, color: '26006B' })],
          }),
          meta(`${result.initiativeName}  ·  ${typeLabel(result.initiativeType)}  ·  Generated: ${getDateStr()}`),

          divider(),

          // Executive summary
          h1('Executive Summary'),
          body(`This planning summary provides a directional timeline estimate for the ${result.initiativeName} initiative based on the planning details provided. The estimate reflects scope, complexity, stakeholder involvement, review cycles, materials readiness, and implementation requirements.`),
          body(`Estimated timeline to launch: ${formatRange(result)}.${result.postLaunchWindow ? ` Recommended post-launch support window: ${result.postLaunchWindow}.` : ''}`),
          body(`Complexity level: ${result.complexityLevel}. Planning confidence: ${result.confidenceLevel}.`),

          divider(),

          // Timeline estimate
          h1('Timeline Estimate'),
          h2('Estimated Range'),
          body(formatRange(result)),
          ...(result.postLaunchWindow
            ? [h2('Post-Launch Support Window'), body(result.postLaunchWindow)]
            : []),
          h2('Complexity Level'),
          body(`${result.complexityLevel} (${Math.round(result.scorePercent * 100)}% of maximum complexity score)`),
          h2('Planning Confidence'),
          body(result.confidenceLevel),
          ...(result.confidenceLevel === 'Low' || result.confidenceLevel === 'Low-Moderate'
            ? [body('Several planning details are not yet defined. Clarifying scope, decision-makers, review cycles, materials, dependencies, or rollout expectations will improve estimate accuracy.')]
            : []),

          divider(),

          // Drivers
          h1('Main Timeline Drivers'),
          ...result.topDrivers.map(bullet),

          divider(),

          // Risks
          h1('Timeline Risks'),
          ...result.riskFlags.map(bullet),

          divider(),

          // Assumptions
          h1('Planning Assumptions'),
          ...result.planningAssumptions.map(bullet),

          divider(),

          // Next steps
          h1('Recommended Next Steps'),
          ...result.recommendedNextSteps.map(bullet),

          divider(),

          // Phases
          h1('Suggested Timeline Phases'),
          body('The approximate phase allocation below represents how effort is typically distributed across this type of initiative. Use this as a starting point for planning conversations, not as a fixed project schedule.'),
          new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),
          ...phases.map((p) =>
            new Paragraph({
              spacing: { before: 60, after: 60 },
              children: [
                new TextRun({ text: `${p.percent}%`, font: 'Arial', size: 20, bold: true, color: 'FD6A02' }),
                new TextRun({ text: ` ${p.name}`, font: 'Arial', size: 20, color: '333333' }),
              ],
            }),
          ),

          divider(),

          // Questions to clarify
          h1('Questions to Clarify Before Finalizing the Timeline'),
          body('Use this section as a planning checklist to confirm key details before committing to a delivery date.'),
          new Paragraph({ spacing: { before: 80, after: 0 }, children: [] }),
          bullet('Is the scope of this initiative clearly defined and agreed upon by key stakeholders?'),
          bullet('Have the people responsible for reviews, approvals, and decisions been identified and confirmed?'),
          bullet('Is source content, existing materials, or technical information available and accessible?'),
          bullet('Are dependencies that could affect the timeline known and managed?'),
          bullet('Has the rollout or implementation strategy been defined?'),
          ...(result.initiativeType === 'change'
            ? [
                bullet('Has a change impact assessment been completed or scheduled?'),
                bullet('Is leadership sponsorship confirmed for the change initiative?'),
              ]
            : []),

          divider(),

          // Methodology + disclaimer
          h1('Methodology'),
          body('This estimate is based on Lxology’s planning framework, professional practitioner experience, and common timeline factors that affect learning, project, program, and change work.'),
          body('This Beta estimate does not calculate team capacity, staffing levels, individual productivity, or organization-specific work velocity. Two initiatives with similar scope may move faster or slower depending on the size, availability, and experience of the team doing the work.'),
          new Paragraph({ spacing: { before: 100, after: 0 }, children: [] }),
          new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [new TextRun({ text: 'Disclaimer: ', font: 'Arial', size: 18, bold: true, color: '888888' }), new TextRun({ text: 'Timeline estimates are directional and should be used for planning conversations, not as guaranteed delivery dates. Actual timelines may vary based on resource availability, organizational decision-making, stakeholder responsiveness, scope changes, and implementation constraints.', font: 'Arial', size: 18, color: '888888' })],
          }),
          new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun({ text: 'Generated by Lxology Timeline Estimator™ Beta · lxology.com', font: 'Arial', size: 16, color: 'AAAAAA' })] }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = buildFileName(result, 'docx');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
