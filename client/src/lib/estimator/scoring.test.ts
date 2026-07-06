import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  getComplexityLevel,
  getConfidenceLevel,
  getAdjustmentTier,
  applyAdjustment,
  UNIVERSAL_MAX,
  PATH_MAX,
  DRIVER_LABELS,
  METHODOLOGY_VERSION,
} from './scoring';
import {
  UNIVERSAL_QUESTIONS,
  LEARNING_QUESTIONS,
  PROJECT_QUESTIONS,
  PROGRAM_QUESTIONS,
  CHANGE_QUESTIONS,
  ALL_QUESTIONS,
} from './questions';
import { ComplexityLevel, Question, Responses } from './types';

// ─── Complexity band boundaries ─────────────────────────────────────────────
// Regression guard for the original gap bug: percents between the old band
// edges (0.20–0.21, 0.40–0.41, 0.60–0.61, 0.75–0.76, 0.90–0.91) fell through
// every band and were misclassified as 'Very High'.

describe('getComplexityLevel', () => {
  const cases: [number, ComplexityLevel][] = [
    [0, 'Low'],
    [0.1, 'Low'],
    [0.2, 'Low'],
    [0.201, 'Low-Moderate'],
    [18 / 88, 'Low-Moderate'], // 0.2045… — reachable project score, was 'Very High'
    [0.4, 'Low-Moderate'],
    [0.405, 'Moderate'],
    [0.5, 'Moderate'],
    [0.6, 'Moderate'],
    [59 / 97, 'Medium-High'], // 0.6082… — reachable change score, was 'Very High'
    [0.75, 'Medium-High'],
    [68 / 90, 'High'], // 0.7556… — reachable learning score, was 'Very High'
    [0.9, 'High'],
    [0.905, 'Very High'],
    [1, 'Very High'],
    [1.01, 'Very High'],
  ];

  it.each(cases)('maps %f to %s', (pct, expected) => {
    expect(getComplexityLevel(pct)).toBe(expected);
  });

  it('clamps out-of-range inputs defensively', () => {
    expect(getComplexityLevel(-0.05)).toBe('Low');
    expect(getComplexityLevel(2)).toBe('Very High');
  });
});

// ─── Risk adjustment tiers ──────────────────────────────────────────────────

describe('getAdjustmentTier', () => {
  it('follows the documented ladder', () => {
    expect(getAdjustmentTier(0, 0)).toBe('none');
    expect(getAdjustmentTier(1, 0)).toBe('Minor');
    expect(getAdjustmentTier(2, 0)).toBe('Minor');
    expect(getAdjustmentTier(3, 0)).toBe('Moderate');
    expect(getAdjustmentTier(5, 0)).toBe('Moderate');
    expect(getAdjustmentTier(3, 1)).toBe('Moderate');
    expect(getAdjustmentTier(6, 0)).toBe('Major');
    expect(getAdjustmentTier(4, 1)).toBe('Major'); // 4+ flags with a critical outranks Moderate
    expect(getAdjustmentTier(5, 1)).toBe('Major');
    expect(getAdjustmentTier(3, 2)).toBe('Major');
  });

  it('a lone critical risk always triggers at least a Minor adjustment', () => {
    // Owner decision (2026-07-05): a critical risk must never leave the
    // timeline unadjusted, even with only 1-2 total flag categories.
    expect(getAdjustmentTier(1, 1)).toBe('Minor');
    expect(getAdjustmentTier(2, 1)).toBe('Minor');
  });

  it('never returns none when any risk flag is present', () => {
    for (let flags = 1; flags <= 8; flags++) {
      for (let criticals = 0; criticals <= flags; criticals++) {
        expect(getAdjustmentTier(flags, criticals)).not.toBe('none');
      }
    }
  });
});

describe('applyAdjustment', () => {
  it('multiplies only the upper bound', () => {
    expect(applyAdjustment([10, 20], 'none')).toEqual([10, 20]);
    expect(applyAdjustment([10, 20], 'Minor')).toEqual([10, 22]);
    expect(applyAdjustment([10, 20], 'Moderate')).toEqual([10, 24]);
    expect(applyAdjustment([10, 20], 'Major')).toEqual([10, 27]);
  });
});

// ─── Confidence mapping ─────────────────────────────────────────────────────

describe('getConfidenceLevel', () => {
  it('maps confidence-risk counts to levels', () => {
    expect(getConfidenceLevel(0)).toBe('High');
    expect(getConfidenceLevel(1)).toBe('High');
    expect(getConfidenceLevel(2)).toBe('Moderate-High');
    expect(getConfidenceLevel(3)).toBe('Moderate-High');
    expect(getConfidenceLevel(4)).toBe('Moderate');
    expect(getConfidenceLevel(5)).toBe('Moderate');
    expect(getConfidenceLevel(6)).toBe('Low-Moderate');
    expect(getConfidenceLevel(7)).toBe('Low-Moderate');
    expect(getConfidenceLevel(8)).toBe('Low');
    expect(getConfidenceLevel(15)).toBe('Low');
  });
});

// ─── Max-score constants stay in sync with question data ────────────────────
// UNIVERSAL_MAX / PATH_MAX are hand-maintained. If a question or option score
// changes, these tests fail so the constants get updated with it.

function maxScoreOf(questions: Question[]): number {
  return questions.reduce((sum, q) => {
    if (q.fieldType === 'text' || !q.options) return sum;
    return sum + Math.max(...q.options.map((o) => o.score));
  }, 0);
}

// ─── Driver label completeness ──────────────────────────────────────────────
// Every scored question category must map to user-facing driver copy;
// otherwise a raw internal category name leaks into "Main Timeline Drivers"
// (the original 'Review / approval risk' gap).

describe('driver labels', () => {
  it('every scored question category has user-facing copy', () => {
    const categories = new Set(
      ALL_QUESTIONS.filter(
        (q) => q.fieldType !== 'text' && q.category && q.category !== 'meta',
      ).map((q) => q.category as string),
    );
    for (const cat of categories) {
      expect(DRIVER_LABELS[cat], `missing DRIVER_LABELS entry for "${cat}"`).toBeTruthy();
    }
  });
});

describe('score maxima consistency', () => {
  it('UNIVERSAL_MAX matches the universal question data', () => {
    expect(maxScoreOf(UNIVERSAL_QUESTIONS)).toBe(UNIVERSAL_MAX);
  });

  it('PATH_MAX matches each path question set', () => {
    expect(maxScoreOf(LEARNING_QUESTIONS)).toBe(PATH_MAX.learning);
    expect(maxScoreOf(PROJECT_QUESTIONS)).toBe(PATH_MAX.project);
    expect(maxScoreOf(PROGRAM_QUESTIONS)).toBe(PATH_MAX.program);
    expect(maxScoreOf(CHANGE_QUESTIONS)).toBe(PATH_MAX.change);
  });
});

// ─── Golden fixtures ────────────────────────────────────────────────────────
// Full end-to-end calculateScore runs with hand-verified expected outputs.
// Responses map question id -> selected option index (or text for UQ1).

// Learning: moderate eLearning course, no risk flags, no unknowns.
const LEARNING_MODERATE: Responses = {
  UQ1: 'Compliance eLearning Refresh',
  UQ2: 0,
  UQ3: 1, // Initial planning started (1)
  UQ4: 2, // Medium (3)
  UQ5: 2, // Moderately complex (3)
  UQ6: 1, // 2–3 stakeholder groups (1)
  UQ7: 1, // Two review cycles (1)
  UQ8: 1, // Somewhat available (1)
  UQ9: 1, // Some useful materials (0)
  UQ10: 1, // Preferred deadline (1)
  UQ11: 2, // Professional quality (1)
  UQ12: 2, // Basic rollout support (2)
  LQ1: 3, // Full course (4)
  LQ2: 3, // eLearning (4)
  LQ3: 2, // Medium content volume (3)
  LQ4: 2, // Needs restructuring (1)
  LQ5: 2, // Moderate instructional design (3)
  LQ6: 2, // Moderate interaction (3)
  LQ7: 1, // Basic visual design (1)
  LQ8: 1, // Simple knowledge checks (1) — visible via LQ1=3
  LQ9: 0, // One audience (0)
  LQ10: 3, // SCORM publishing (3)
  LQ11: 2, // Standard accessibility review (2)
  LQ12: 3, // Pilot session (3) — visible via LQ1=3
};

// Project: low-moderate scope. totalScore 18 / max 88 = 0.2045…, which the
// old gap-based bands misclassified as 'Very High' (16–24 weeks).
const PROJECT_GAP_REGRESSION: Responses = {
  UQ1: 'Onboarding Checklist Update',
  UQ2: 1,
  UQ3: 2, // Scope mostly defined (0)
  UQ4: 0, // Very small (1)
  UQ5: 0, // Simple (1)
  UQ6: 0, // One group (0)
  UQ7: 0, // One quick review (0)
  UQ8: 0, // Very available (0)
  UQ9: 1, // Some useful materials (0)
  UQ10: 0, // Flexible (0)
  UQ11: 1, // Internal-use quality (0)
  UQ12: 1, // Simple handoff (1)
  PQ1: 0, // Document/guide (1)
  PQ2: 1, // Mostly clear (1)
  PQ3: 1, // Two workstreams (2)
  PQ4: 2, // Medium volume (3)
  PQ5: 1, // A few internal dependencies (1)
  PQ6: 1, // Part-time resources (1)
  PQ7: 1, // Small group decides (1)
  // PQ8, PQ9 hidden by showWhen conditions
  PQ10: 2, // Handoff with documentation (2)
  PQ11: 2, // Some changes likely (2)
  PQ12: 1, // Team-level visibility (1)
};

// Program: high complexity, 4 risk categories, 1 critical -> Major adjustment.
const PROGRAM_HIGH_RISK: Responses = {
  UQ1: 'Enterprise Onboarding Academy',
  UQ2: 2,
  UQ3: 0, // Early idea (2)
  UQ4: 4, // Enterprise size (5)
  UQ5: 4, // Very complex (5)
  UQ6: 4, // Executive/legal approval (4, risk flag)
  UQ7: 3, // Four or more review cycles (3)
  UQ8: 2, // Limited availability (2)
  UQ9: 3, // Very little exists (2, risk flag)
  UQ10: 2, // Important deadline (2)
  UQ11: 3, // Executive-ready (2)
  UQ12: 4, // Full implementation support (4)
  PRQ1: 6, // Transformation program (5)
  PRQ2: 3, // Five to six workstreams (4)
  PRQ3: 3, // 11–20 deliverables (4)
  PRQ4: 3, // Multiple differing audiences (3)
  PRQ5: 3, // Four or more phases (4)
  PRQ6: 3, // Formal governance (3)
  PRQ7: 3, // Internal teams + external partners (3)
  PRQ8: 4, // Critical external dependencies (4, critical risk)
  PRQ9: 5, // Formal pilot required (5, risk flag) — visible via PRQ10=3
  PRQ10: 3, // Coordinated rollout (4)
  PRQ11: 3, // Outcome measurement (3) — visible via PRQ1=6
  PRQ12: 3, // Ongoing program management (3)
};

// Change: unknown-heavy answers -> Low confidence, 3 critical flags -> Major.
const CHANGE_UNKNOWN_HEAVY: Responses = {
  UQ1: 'CRM Platform Migration',
  UQ2: 3,
  UQ3: 0, // Early idea (2)
  UQ4: 2, // Medium (3)
  UQ5: 2, // Moderately complex (3)
  UQ6: 2, // 4–5 stakeholder groups (2)
  UQ7: 4, // Unknown review cycles (3, unknown + critical)
  UQ8: 4, // Unknown decision-makers (3, unknown + critical)
  UQ9: 2, // Materials need significant updates (1)
  UQ10: 0, // Flexible (0)
  UQ11: 2, // Professional quality (1)
  UQ12: 2, // Basic rollout support (2)
  CQ1: 7, // Not sure yet (4, unknown)
  CQ2: 6, // Unknown audience size (4, unknown)
  CQ3: 5, // Unknown behavior change (4, unknown)
  CQ4: 5, // Unknown impacts (3, unknown)
  CQ5: 5, // Unknown sponsorship (3, unknown)
  CQ6: 5, // Unknown alignment (3, unknown)
  CQ7: 5, // Unknown resistance (3, unknown)
  // CQ8 hidden (no trigger answers selected)
  CQ9: 5, // Unknown communication needs (3, unknown)
  CQ10: 5, // Unknown training needs (3, unknown)
  // CQ11, CQ13 hidden
  CQ12: 5, // Unknown reinforcement (2, unknown + critical)
  CQ14: 5, // Unknown disruption (3, unknown)
};

// Learning: very-small override — job aid, simple, strong materials, 1 review.
const LEARNING_VERY_SMALL: Responses = {
  UQ1: 'Expense Policy Job Aid',
  UQ2: 0,
  UQ3: 2, // Scope mostly defined (0)
  UQ4: 0, // Very small (1)
  UQ5: 0, // Simple (1)
  UQ6: 0, // One group (0)
  UQ7: 0, // One quick review (0)
  UQ8: 0, // Very available (0)
  UQ9: 0, // Strong existing materials (-1)
  UQ10: 0, // Flexible (0)
  UQ11: 1, // Internal-use quality (0)
  UQ12: 0, // No launch support (0)
  LQ1: 0, // Job aid (1)
  LQ2: 0, // PDF/static resource (1)
  LQ3: 0, // Very small volume (1)
  LQ4: 1, // Light editing (0)
  LQ5: 0, // Minimal design (1)
  LQ6: 0, // Mostly informational (1)
  LQ7: 0, // Minimal formatting (0)
  // LQ8, LQ12 hidden
  LQ9: 0, // One audience (0)
  LQ10: 0, // No platform setup (0)
  LQ11: 0, // No special requirements (0)
};

describe('calculateScore golden fixtures', () => {
  it('learning / moderate eLearning course', () => {
    const r = calculateScore(LEARNING_MODERATE, 'learning');
    expect(r.universalScore).toBe(14);
    expect(r.initiativeScore).toBe(28);
    expect(r.totalScore).toBe(42);
    expect(r.maxScore).toBe(90);
    expect(r.scorePercent).toBeCloseTo(42 / 90, 10);
    expect(r.complexityLevel).toBe('Moderate');
    expect(r.baseRange).toEqual([5, 8]);
    expect(r.riskFlagCount).toBe(0);
    expect(r.criticalRiskCount).toBe(0);
    expect(r.adjustmentTier).toBe('none');
    expect(r.adjustedRange).toEqual([5, 8]);
    expect(r.lowerConfidenceCount).toBe(0);
    expect(r.unknownCount).toBe(0);
    expect(r.confidenceLevel).toBe('High');
    expect(r.postLaunchScore).toBe(3);
    expect(r.postLaunchWindow).toBe('1–2 additional weeks');
    expect(r.isVerySmallLearning).toBe(false);
    expect(r.initiativeName).toBe('Compliance eLearning Refresh');
    expect(r.methodologyVersion).toBe(METHODOLOGY_VERSION);
    expect(METHODOLOGY_VERSION).toBe('timeline-estimator-v1');
    // Top drivers: delivery/production (12 pts) then scope size (10 pts)
    expect(r.topDrivers[0]).toContain('Delivery format');
    expect(r.topDrivers[1]).toContain('Scope size');
    expect(r.riskFlags).toEqual([]);
  });

  it('project / gap regression: 18 of 88 is Low-Moderate, not Very High', () => {
    const r = calculateScore(PROJECT_GAP_REGRESSION, 'project');
    expect(r.totalScore).toBe(18);
    expect(r.maxScore).toBe(88);
    expect(r.scorePercent).toBeCloseTo(18 / 88, 10);
    expect(r.complexityLevel).toBe('Low-Moderate'); // was 'Very High' pre-fix
    expect(r.baseRange).toEqual([2, 4]); // was [16, 24] pre-fix
    expect(r.riskFlagCount).toBe(0);
    expect(r.adjustmentTier).toBe('none');
    expect(r.adjustedRange).toEqual([2, 4]);
    expect(r.confidenceLevel).toBe('High');
    expect(r.postLaunchScore).toBe(1);
    expect(r.postLaunchWindow).toBeNull();
  });

  it('program / high complexity with Major risk adjustment', () => {
    const r = calculateScore(PROGRAM_HIGH_RISK, 'program');
    expect(r.universalScore).toBe(31);
    expect(r.initiativeScore).toBe(45);
    expect(r.totalScore).toBe(76);
    expect(r.maxScore).toBe(90);
    expect(r.complexityLevel).toBe('High');
    expect(r.baseRange).toEqual([26, 36]);
    expect(r.riskFlagCount).toBe(4); // stakeholder, content, dependency, review
    expect(r.criticalRiskCount).toBe(1); // PRQ8
    expect(r.adjustmentTier).toBe('Major'); // 4+ flags with a critical
    expect(r.adjustedRange).toEqual([26, 49]); // round(36 * 1.35) = 49
    expect(r.lowerConfidenceCount).toBe(1); // PRQ8 only
    expect(r.unknownCount).toBe(0);
    expect(r.confidenceLevel).toBe('High');
    expect(r.postLaunchScore).toBe(10); // 3 + 3 + 1 + 3
    expect(r.postLaunchWindow).toBe('8–12 additional weeks');
    expect(r.riskFlags.length).toBeGreaterThanOrEqual(4);
  });

  it('change / unknown-heavy answers produce Low confidence and Major tier', () => {
    const r = calculateScore(CHANGE_UNKNOWN_HEAVY, 'change');
    expect(r.universalScore).toBe(20);
    expect(r.initiativeScore).toBe(35);
    expect(r.totalScore).toBe(55);
    expect(r.maxScore).toBe(97);
    expect(r.scorePercent).toBeCloseTo(55 / 97, 10);
    expect(r.complexityLevel).toBe('Moderate');
    expect(r.baseRange).toEqual([10, 16]);
    expect(r.riskFlagCount).toBe(3); // review, SME, reinforcement->implementation
    expect(r.criticalRiskCount).toBe(3); // UQ7, UQ8, CQ12
    expect(r.adjustmentTier).toBe('Major'); // 2+ criticals
    expect(r.adjustedRange).toEqual([10, 22]); // round(16 * 1.35) = 22
    expect(r.unknownCount).toBe(13);
    expect(r.unknownBonus).toBe(2);
    expect(r.lowerConfidenceCount).toBe(13);
    expect(r.confidenceRiskCount).toBe(15);
    expect(r.confidenceLevel).toBe('Low');
    expect(r.postLaunchScore).toBe(2);
    expect(r.postLaunchWindow).toBe('1–2 additional weeks');
  });

  it('learning / very-small override triggers for a simple job aid', () => {
    const r = calculateScore(LEARNING_VERY_SMALL, 'learning');
    expect(r.totalScore).toBe(6);
    expect(r.complexityLevel).toBe('Low');
    expect(r.baseRange).toEqual([1, 3]);
    expect(r.isVerySmallLearning).toBe(true);
    expect(r.riskFlagCount).toBe(0);
    expect(r.confidenceLevel).toBe('High');
    expect(r.postLaunchWindow).toBeNull();
  });

  it('is deterministic: identical inputs produce identical results', () => {
    const a = calculateScore(PROGRAM_HIGH_RISK, 'program');
    const b = calculateScore(PROGRAM_HIGH_RISK, 'program');
    expect(JSON.parse(JSON.stringify(a))).toEqual(JSON.parse(JSON.stringify(b)));
  });

  it('handles an empty response set without crashing', () => {
    const r = calculateScore({}, 'learning');
    expect(r.totalScore).toBe(0);
    expect(r.complexityLevel).toBe('Low');
    expect(r.initiativeName).toBe('Your Timeline Estimate');
    expect(r.topDrivers).toEqual([]);
    expect(r.riskFlags).toEqual([]);
  });
});
