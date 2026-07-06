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
import {
  LEARNING_MODERATE,
  PROJECT_GAP_REGRESSION,
  PROGRAM_HIGH_RISK,
  CHANGE_UNKNOWN_HEAVY,
  LEARNING_VERY_SMALL,
} from './fixtures';
import { ComplexityLevel } from './types';
import { maxScoreOf } from '../tool-engine/scoring-utils';

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
// (maxScoreOf itself now lives in the tool engine.)

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
// Fixture response sets live in fixtures.ts, shared with the full-object
// freeze in golden-results.test.ts. Assertions below are unchanged.

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
