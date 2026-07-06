import {
  InitiativeType,
  ComplexityLevel,
  ConfidenceLevel,
  AdjustmentTier,
  ScoringResult,
  Responses,
} from './types';
import { getQuestionsForInitiative } from './questions';
import {
  bandForPercent,
  levelForCount,
  applyUpperBoundMultiplier,
  categoryScoreTotals,
  topDriverLabels,
  triggeredCategories,
} from '../tool-engine/scoring-utils';

/**
 * Identifier for the scoring methodology that produced a result. Bump this
 * whenever question scores, bands, ranges, or adjustment rules change, so
 * stored or downloaded results can be traced to the logic that made them.
 */
export const METHODOLOGY_VERSION = 'timeline-estimator-v1';

export const UNIVERSAL_MAX = 37;
export const PATH_MAX: Record<InitiativeType, number> = {
  learning: 53,
  project: 51,
  program: 53,
  change: 60,
};

const BASE_RANGES: Record<InitiativeType, [number, number][]> = {
  learning: [
    [1, 3],    // Low
    [3, 5],    // Low-Moderate
    [5, 8],    // Moderate
    [8, 12],   // Medium-High
    [12, 18],  // High
    [18, 26],  // Very High
  ],
  project: [
    [1, 2],
    [2, 4],
    [4, 7],
    [7, 10],
    [10, 16],
    [16, 24],
  ],
  program: [
    [6, 10],
    [8, 12],
    [12, 18],
    [18, 26],
    [26, 36],
    [36, 52],
  ],
  change: [
    [4, 8],
    [6, 10],
    [10, 16],
    [16, 24],
    [24, 36],
    [36, 52],
  ],
};

// Contiguous inclusive upper bounds — every percent (including fractional
// values between old band edges) maps to exactly one level.
export const COMPLEXITY_THRESHOLDS: [number, ComplexityLevel][] = [
  [0.2, 'Low'],
  [0.4, 'Low-Moderate'],
  [0.6, 'Moderate'],
  [0.75, 'Medium-High'],
  [0.9, 'High'],
];

const COMPLEXITY_INDEX: Record<ComplexityLevel, number> = {
  'Low': 0,
  'Low-Moderate': 1,
  'Moderate': 2,
  'Medium-High': 3,
  'High': 4,
  'Very High': 5,
};

export function getComplexityLevel(pct: number): ComplexityLevel {
  return bandForPercent(COMPLEXITY_THRESHOLDS, 'Very High', pct);
}

// Timeline confidence policy: how many confidence risks map to each level.
const CONFIDENCE_THRESHOLDS: [number, ConfidenceLevel][] = [
  [1, 'High'],
  [3, 'Moderate-High'],
  [5, 'Moderate'],
  [7, 'Low-Moderate'],
];

export function getConfidenceLevel(count: number): ConfidenceLevel {
  return levelForCount(CONFIDENCE_THRESHOLDS, 'Low', count);
}

export function getAdjustmentTier(flagCount: number, criticalCount: number): AdjustmentTier {
  if (flagCount === 0) return 'none';
  // Major: 6+ flags OR 2+ critical OR 4+ flags and 1 critical
  if (flagCount >= 6 || criticalCount >= 2 || (flagCount >= 4 && criticalCount >= 1)) return 'Major';
  // Moderate: 3-5 flags and 0-1 critical
  if (flagCount >= 3 && flagCount <= 5 && criticalCount <= 1) return 'Moderate';
  // Minor: 1-2 flags; a critical flag always triggers at least Minor
  if (flagCount <= 2) return 'Minor';
  return 'none';
}

export const ADJUSTMENT_MULTIPLIERS: Record<AdjustmentTier, number> = {
  none: 1,
  Minor: 1.1,
  Moderate: 1.2,
  Major: 1.35,
};

export function applyAdjustment(baseRange: [number, number], tier: AdjustmentTier): [number, number] {
  return applyUpperBoundMultiplier(baseRange, ADJUSTMENT_MULTIPLIERS[tier]);
}

/** Risk flag categories (one count per category max). */
const RISK_CATEGORIES = [
  'Scope / clarity risk',
  'Stakeholder / coordination risk',
  'Review / approval risk',
  'SME / decision-maker availability risk',
  'Content / materials readiness risk',
  'Dependency / governance risk',
  'Quality / compliance / accessibility risk',
  'Implementation / rollout / handoff risk',
  'Adoption / resistance / saturation risk',
  'Timeline pressure risk',
  'Unknowns / planning uncertainty risk',
  'Operational disruption risk',
];

/** Map question categories to risk flag categories */
const CATEGORY_TO_RISK: Record<string, string> = {
  'Scope / clarity risk': 'Scope / clarity risk',
  'Scope size': 'Scope / clarity risk',
  'Stakeholder and review complexity': 'Stakeholder / coordination risk',
  'Review / approval risk': 'Review / approval risk',
  'SME / decision-maker availability risk': 'SME / decision-maker availability risk',
  'Content / materials readiness risk': 'Content / materials readiness risk',
  'Dependency / governance risk': 'Dependency / governance risk',
  'Quality / compliance / accessibility risk': 'Quality / compliance / accessibility risk',
  'Compliance, accessibility, or quality expectations': 'Quality / compliance / accessibility risk',
  'Implementation / rollout / handoff risk': 'Implementation / rollout / handoff risk',
  'Adoption complexity': 'Adoption / resistance / saturation risk',
  'Resistance and saturation risk': 'Adoption / resistance / saturation risk',
  'Sponsorship and alignment risk': 'Adoption / resistance / saturation risk',
  'Timeline pressure risk': 'Timeline pressure risk',
  'Platform or technology requirements': 'Quality / compliance / accessibility risk',
  'Delivery or production effort': 'Content / materials readiness risk',
  'Sustainment or reinforcement needs': 'Implementation / rollout / handoff risk',
  'Communication and enablement effort': 'Implementation / rollout / handoff risk',
  'Reinforcement and measurement effort': 'Implementation / rollout / handoff risk',
  'Impact and readiness clarity': 'Scope / clarity risk',
  'Operational disruption risk': 'Operational disruption risk',
};

/** Driver categories -> user-facing plain language */
export const DRIVER_LABELS: Record<string, string> = {
  'Scope size': 'Scope size and volume may require more planning and development time.',
  'Complexity level': 'Overall complexity may add coordination, design, and review time.',
  'Content / materials readiness risk': 'Content readiness may affect how much work is needed before development can begin.',
  'Stakeholder and review complexity': 'Multiple stakeholders and review cycles may increase coordination, feedback, and revision effort.',
  'Review / approval risk': 'Review and approval cycles may add scheduling, feedback, and revision time.',
  'SME / decision-maker availability risk': 'Limited decision-maker availability may create scheduling delays and slow down approvals.',
  'Delivery or production effort': 'Delivery format and production needs may significantly affect development time.',
  'Platform or technology requirements': 'Platform and technology requirements may add publishing, testing, and integration time.',
  'Compliance, accessibility, or quality expectations': 'Compliance, accessibility, or quality expectations may require additional review and documentation.',
  'Quality / compliance / accessibility risk': 'Quality standards and compliance requirements may extend review, refinement, and approval time.',
  'Dependency / governance risk': 'Dependencies or governance needs may create coordination risk or sequencing delays.',
  'Implementation / rollout / handoff risk': 'Rollout and implementation support may add meaningful time beyond the core development work.',
  'Adoption complexity': 'The complexity of driving adoption and behavior change may extend the timeline significantly.',
  'Sponsorship and alignment risk': 'Stakeholder alignment and leadership sponsorship gaps may slow decisions and create rework.',
  'Resistance and saturation risk': 'Change resistance or saturation may require additional communication, engagement, and reinforcement effort.',
  'Communication and enablement effort': 'Communication and enablement planning may add substantial time, especially for multi-audience or phased rollouts.',
  'Reinforcement and measurement effort': 'Post-launch reinforcement and measurement activities may extend the timeline beyond launch.',
  'Timeline pressure risk': 'Timeline pressure does not reduce the amount of work required, and may create additional risk.',
  'Sustainment or reinforcement needs': 'Ongoing sustainment and program management needs may extend the timeline beyond initial launch.',
  'Impact and readiness clarity': 'Unclear change impact or undefined readiness activities may require additional discovery time.',
  'Operational disruption risk': 'Operational disruption risk may require more careful rollout planning, communication, and support.',
  'Scope / clarity risk': 'Scope clarity gaps or rescue-stage work may add discovery, alignment, and rework time.',
};

function getTopDrivers(responses: Responses, type: InitiativeType): string[] {
  const totals = categoryScoreTotals(getQuestionsForInitiative(type), responses);
  return topDriverLabels(totals, DRIVER_LABELS, 5);
}

function getRiskFlagText(responses: Responses, type: InitiativeType): string[] {
  const questions = getQuestionsForInitiative(type);
  const risks: string[] = [];
  const triggered = triggeredCategories(questions, responses, CATEGORY_TO_RISK);

  const riskMessages: Partial<Record<string, string>> = {
    'Scope / clarity risk': 'Scope or planning clarity gaps may create rework, misalignment, or timeline expansion.',
    'Stakeholder / coordination risk': 'Multiple stakeholders or cross-functional coordination may slow decisions and increase review cycles.',
    'Review / approval risk': 'Unknown or undefined review and approval cycles create scheduling risk.',
    'SME / decision-maker availability risk': 'Limited or unknown decision-maker availability may delay progress at key milestones.',
    'Content / materials readiness risk': 'Content gaps or changing source materials may significantly increase development time.',
    'Dependency / governance risk': 'Critical dependencies outside your control may delay work regardless of team readiness.',
    'Quality / compliance / accessibility risk': 'Compliance, regulatory, or accessibility requirements may require additional review, testing, and documentation.',
    'Implementation / rollout / handoff risk': 'Rollout complexity or undefined handoff needs may add meaningful time after core work is complete.',
    'Adoption / resistance / saturation risk': 'Resistance, change saturation, or unclear adoption expectations may extend the timeline and require additional support.',
    'Timeline pressure risk': 'A fixed or urgent deadline does not reduce the amount of work needed, and may increase risk if planning time is compressed.',
    'Unknowns / planning uncertainty risk': 'Several planning details are not yet defined, which reduces estimate reliability.',
    'Operational disruption risk': 'High operational disruption risk may require more careful rollout coordination and additional stakeholder support.',
  };

  for (const cat of Array.from(triggered)) {
    const msg = riskMessages[cat];
    if (msg) risks.push(msg);
  }

  // Add unknown flag if many unknowns
  const unknownCount = questions.reduce((acc, q) => {
    if (!q.options) return acc;
    const idx = responses[q.id];
    if (typeof idx !== 'number') return acc;
    return q.options[idx]?.isUnknown ? acc + 1 : acc;
  }, 0);
  if (unknownCount >= 3 && !risks.some(r => r.includes('planning details'))) {
    risks.push('Several planning details are not yet defined, which reduces estimate reliability.');
  }

  return risks.slice(0, 5);
}

function getPlanningAssumptions(type: InitiativeType, complexity: ComplexityLevel): string[] {
  const base = [
    'This estimate is based on the planning details provided. Actual timelines depend on team availability, organizational decision-making speed, and scope stability.',
    'Review and approval cycles are included in the estimate, but actual durations may vary based on stakeholder responsiveness.',
  ];

  const typeAssumptions: Record<InitiativeType, string[]> = {
    learning: [
      'Design, development, review, and launch preparation time are included. Ongoing facilitation or post-launch delivery is not included in this estimate.',
      'Content development assumes reasonable access to subject matter experts for input, review, and validation.',
    ],
    project: [
      'Project scope is assumed to be generally stable. Significant scope changes may require re-estimation.',
      'Key project resources are assumed to be identified and available within the timeframe.',
    ],
    program: [
      'Program workstreams are assumed to be sequential or partially parallel. Fully sequential workstreams may extend the timeline.',
      'Governance and decision-making structures are assumed to be established before core work begins.',
    ],
    change: [
      'Timeline begins at change discovery and ends at launch or go-live. Post-launch reinforcement and adoption support are tracked separately.',
      'Leadership sponsorship is assumed to be at least partially secured before formal change planning begins.',
    ],
  };

  const highRisk =
    complexity === 'High' || complexity === 'Very High'
      ? ['High complexity initiatives often require additional buffer for unexpected delays, stakeholder changes, or scope revisions.']
      : [];

  return [...base, ...typeAssumptions[type], ...highRisk].slice(0, 5);
}

function getRecommendedNextSteps(
  type: InitiativeType,
  complexity: ComplexityLevel,
  confidence: ConfidenceLevel,
  responses: Responses,
): string[] {
  const steps: string[] = [];

  if (confidence === 'Low' || confidence === 'Low-Moderate') {
    steps.push('Clarify unknowns before committing to a timeline. Defining scope, decision-makers, review cycles, and materials needs will improve estimate accuracy.');
  }

  const typeSteps: Record<InitiativeType, string[]> = {
    learning: [
      'Define the learning output type, delivery format, and content sources before scoping the timeline with stakeholders.',
      'Align with SMEs early on content availability, review availability, and platform or technology requirements.',
    ],
    project: [
      'Confirm scope, deliverables, and boundaries with key stakeholders before starting work.',
      'Identify and communicate any critical dependencies that could delay the project timeline.',
    ],
    program: [
      'Map workstreams, phasing, and governance needs before aligning stakeholders on a delivery timeline.',
      'Confirm rollout strategy and cross-functional coordination needs early to avoid sequencing delays.',
    ],
    change: [
      'Secure leadership sponsorship and align key stakeholders on change purpose, timing, and expectations before planning communications.',
      'Conduct or confirm a change impact assessment before committing to a launch date.',
    ],
  };

  steps.push(...typeSteps[type]);

  if (complexity === 'High' || complexity === 'Very High') {
    steps.push('Consider breaking the work into phases with defined milestones to maintain visibility and reduce delivery risk.');
  }

  steps.push('Share this planning summary with stakeholders to set realistic expectations and support early timeline conversations.');

  return steps.slice(0, 5);
}

// Post-launch scoring per initiative type
function getPostLaunchScore(responses: Responses, type: InitiativeType): number {
  let score = 0;

  // Universal UQ12 contribution
  const uq12 = responses['UQ12'];
  if (typeof uq12 === 'number') {
    const uq12Map = [0, 0, 1, 2, 3]; // no support, simple handoff, basic rollout, coordinated, full
    score += uq12Map[uq12] ?? 0;
  }

  if (type === 'learning') {
    const lq12 = responses['LQ12'];
    if (typeof lq12 === 'number') {
      const map = [0, 0, 1, 2, 3, 2]; // none, internal, facilitator, pilot, full, unknown
      score += map[lq12] ?? 0;
    }
  }

  if (type === 'project') {
    const pq10 = responses['PQ10'];
    if (typeof pq10 === 'number') {
      const map = [0, 0, 1, 2, 3, 4, 2]; // none, simple, walkthrough, rollout, coordinated, ongoing, unknown
      score += map[pq10] ?? 0;
    }
  }

  if (type === 'program') {
    const prq10 = responses['PRQ10'];
    if (typeof prq10 === 'number') {
      const rolloutMap = [0, 0, 2, 3, 4, 3, 2]; // simple launch, basic comms, phased, coordinated, enterprise, undefined, unknown
      score += rolloutMap[prq10] ?? 0;
    }
    const prq11 = responses['PRQ11'];
    if (typeof prq11 === 'number') {
      const measMap = [0, 0, 0, 1, 2, 0]; // none, basic, standard, outcomes, dashboard, unknown
      score += measMap[prq11] ?? 0;
    }
    const prq12 = responses['PRQ12'];
    if (typeof prq12 === 'number') {
      const sustMap = [0, 1, 2, 3, 4, 1]; // none, light, short-term, ongoing, long-term, unknown
      score += sustMap[prq12] ?? 0;
    }
  }

  if (type === 'change') {
    const cq11 = responses['CQ11'];
    if (typeof cq11 === 'number') {
      const readMap = [0, 0, 1, 2, 3, 1]; // none, basic, stakeholder, audience, formal, unknown
      score += readMap[cq11] ?? 0;
    }
    const cq12 = responses['CQ12'];
    if (typeof cq12 === 'number') {
      const reinMap = [0, 1, 2, 3, 4, 1]; // none, light, short-term, ongoing, long-term, unknown
      score += reinMap[cq12] ?? 0;
    }
    const cq13 = responses['CQ13'];
    if (typeof cq13 === 'number') {
      const measMap = [0, 0, 0, 2, 3, 1]; // none, basic, feedback, behavior, executive, unknown
      score += measMap[cq13] ?? 0;
    }
  }

  return score;
}

function getPostLaunchWindow(score: number): string | null {
  if (score <= 1) return null;
  if (score <= 3) return '1–2 additional weeks';
  if (score <= 5) return '2–4 additional weeks';
  if (score <= 7) return '4–8 additional weeks';
  return '8–12 additional weeks';
}

function checkVerySmallLearning(responses: Responses): boolean {
  // LQ1 = 0 (job aid), UQ5 = 0 (simple), UQ9 = 0 (strong existing materials), UQ7 = 0 (one quick review)
  return (
    responses['LQ1'] === 0 && // job aid
    (responses['UQ5'] === 0 || responses['UQ5'] === 1) && // simple or somewhat complex
    (responses['UQ9'] === 0 || responses['UQ9'] === 1) && // strong or some materials
    (responses['UQ7'] === 0 || responses['UQ7'] === 1) // one or two review cycles
  );
}

export function calculateScore(responses: Responses, type: InitiativeType): ScoringResult {
  const questions = getQuestionsForInitiative(type);

  let universalScore = 0;
  let initiativeScore = 0;
  let lowerConfidenceCount = 0;
  let unknownCount = 0;
  const triggeredCriticalFlags = new Set<string>();

  for (const q of questions) {
    if (q.fieldType === 'text') continue;
    if (!q.options || !q.category) continue;
    const idx = responses[q.id];
    if (typeof idx !== 'number') continue;
    const opt = q.options[idx];
    if (!opt) continue;

    const isUniversal = !q.initiativeTypes;
    const pts = opt.score;

    if (isUniversal) {
      universalScore += pts;
    } else {
      initiativeScore += pts;
    }

    if (opt.lowerConfidence) lowerConfidenceCount++;
    if (opt.isUnknown) unknownCount++;

    if (opt.isCriticalRisk) {
      triggeredCriticalFlags.add(`${q.id}:${idx}`);
    }
  }

  const triggeredRiskCategories = triggeredCategories(questions, responses, CATEGORY_TO_RISK);

  const maxScore = UNIVERSAL_MAX + PATH_MAX[type];
  const totalScore = universalScore + initiativeScore;
  const scorePercent = totalScore / maxScore;

  const complexityLevel = getComplexityLevel(scorePercent);
  const complexityIdx = COMPLEXITY_INDEX[complexityLevel];
  const baseRange = BASE_RANGES[type][complexityIdx];

  const riskFlagCount = triggeredRiskCategories.size;
  const criticalRiskCount = triggeredCriticalFlags.size;
  const adjustmentTier = getAdjustmentTier(riskFlagCount, criticalRiskCount);
  const adjustedRange = applyAdjustment(baseRange, adjustmentTier);

  // Confidence
  const unknownBonus = unknownCount >= 5 ? 2 : unknownCount >= 3 ? 1 : 0;
  const confidenceRiskCount = lowerConfidenceCount + unknownBonus;
  const confidenceLevel = getConfidenceLevel(confidenceRiskCount);

  // Post-launch
  const postLaunchScore = getPostLaunchScore(responses, type);
  const postLaunchWindow = getPostLaunchWindow(postLaunchScore);

  // Drivers, risks, assumptions, next steps
  const topDrivers = getTopDrivers(responses, type);
  const riskFlags = getRiskFlagText(responses, type);
  const planningAssumptions = getPlanningAssumptions(type, complexityLevel);
  const recommendedNextSteps = getRecommendedNextSteps(type, complexityLevel, confidenceLevel, responses);

  const isVerySmallLearning = type === 'learning' && checkVerySmallLearning(responses);

  const initiativeName = (responses['UQ1'] as string | undefined) || 'Your Timeline Estimate';

  return {
    universalScore,
    initiativeScore,
    totalScore,
    maxScore,
    scorePercent,
    complexityLevel,
    baseRange,
    riskFlagCount,
    criticalRiskCount,
    adjustmentTier,
    adjustedRange,
    lowerConfidenceCount,
    unknownCount,
    unknownBonus,
    confidenceRiskCount,
    confidenceLevel,
    postLaunchScore,
    postLaunchWindow,
    topDrivers,
    riskFlags,
    planningAssumptions,
    recommendedNextSteps,
    isVerySmallLearning,
    initiativeName,
    initiativeType: type,
    methodologyVersion: METHODOLOGY_VERSION,
  };
}
