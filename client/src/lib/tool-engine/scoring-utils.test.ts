import { describe, it, expect } from 'vitest';
import {
  bandForPercent,
  levelForCount,
  applyUpperBoundMultiplier,
  categoryScoreTotals,
  topDriverLabels,
  triggeredCategories,
  maxScoreOf,
} from './scoring-utils';
import type { QuestionBase } from './types';

// Generic-shape tests for the engine primitives. Timeline-specific behavior
// (real thresholds, ladders, labels) is covered by the timeline tool's own
// suite and golden freeze.

const BANDS: [number, string][] = [
  [0.2, 'low'],
  [0.6, 'mid'],
];

describe('bandForPercent', () => {
  it('returns the first band whose inclusive upper bound is >= pct', () => {
    expect(bandForPercent(BANDS, 'high', 0)).toBe('low');
    expect(bandForPercent(BANDS, 'high', 0.2)).toBe('low');
    expect(bandForPercent(BANDS, 'high', 0.201)).toBe('mid');
    expect(bandForPercent(BANDS, 'high', 0.6)).toBe('mid');
    expect(bandForPercent(BANDS, 'high', 0.61)).toBe('high');
  });
});

describe('levelForCount', () => {
  it('returns the first level whose inclusive maximum is >= count', () => {
    const levels: [number, string][] = [
      [1, 'a'],
      [3, 'b'],
    ];
    expect(levelForCount(levels, 'c', 0)).toBe('a');
    expect(levelForCount(levels, 'c', 1)).toBe('a');
    expect(levelForCount(levels, 'c', 2)).toBe('b');
    expect(levelForCount(levels, 'c', 3)).toBe('b');
    expect(levelForCount(levels, 'c', 4)).toBe('c');
  });
});

describe('applyUpperBoundMultiplier', () => {
  it('rounds the widened upper bound and keeps the lower bound', () => {
    expect(applyUpperBoundMultiplier([10, 20], 1)).toEqual([10, 20]);
    expect(applyUpperBoundMultiplier([10, 20], 1.1)).toEqual([10, 22]);
    expect(applyUpperBoundMultiplier([26, 36], 1.35)).toEqual([26, 49]); // 48.6 -> 49
  });
});

const QUESTIONS: QuestionBase[] = [
  {
    id: 'Q1',
    question: 'One',
    fieldType: 'single-select',
    required: 'required',
    category: 'alpha',
    options: [
      { label: 'none', score: 0 },
      { label: 'some', score: 2 },
      { label: 'risky', score: 3, isRiskFlag: true },
    ],
  },
  {
    id: 'Q2',
    question: 'Two',
    fieldType: 'single-select',
    required: 'required',
    category: 'beta',
    options: [
      { label: 'credit', score: -1 },
      { label: 'critical', score: 4, isCriticalRisk: true },
    ],
  },
  {
    id: 'Q3',
    question: 'Name',
    fieldType: 'text',
    required: 'optional',
    category: 'meta',
  },
];

describe('categoryScoreTotals', () => {
  it('sums positive answered scores per category, ignoring credits and unanswered', () => {
    expect(categoryScoreTotals(QUESTIONS, { Q1: 1, Q2: 0 })).toEqual({ alpha: 2 });
    expect(categoryScoreTotals(QUESTIONS, { Q1: 2, Q2: 1 })).toEqual({ alpha: 3, beta: 4 });
    expect(categoryScoreTotals(QUESTIONS, {})).toEqual({});
  });
});

describe('topDriverLabels', () => {
  it('ranks descending, applies labels, and falls back to raw category names', () => {
    const totals = { alpha: 3, beta: 7, gamma: 1 };
    expect(topDriverLabels(totals, { alpha: 'Alpha label', beta: 'Beta label' }, 2)).toEqual([
      'Beta label',
      'Alpha label',
    ]);
    expect(topDriverLabels(totals, {}, 3)).toEqual(['beta', 'alpha', 'gamma']);
  });
});

describe('triggeredCategories', () => {
  const MAP = { alpha: 'group-a', beta: 'group-b' };

  it('collects mapped groups for flagged answers only', () => {
    expect(triggeredCategories(QUESTIONS, { Q1: 2, Q2: 1 }, MAP)).toEqual(
      new Set(['group-a', 'group-b']),
    );
    expect(triggeredCategories(QUESTIONS, { Q1: 1, Q2: 0 }, MAP)).toEqual(new Set());
  });

  it('ignores flagged answers whose category is unmapped', () => {
    expect(triggeredCategories(QUESTIONS, { Q1: 2 }, { beta: 'group-b' })).toEqual(new Set());
  });
});

describe('maxScoreOf', () => {
  it('sums the max option score per scored question, skipping text questions', () => {
    expect(maxScoreOf(QUESTIONS)).toBe(7); // 3 (Q1) + 4 (Q2), Q3 text skipped
  });
});
