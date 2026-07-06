import type { QuestionBase, Responses } from './types';

// Generic scoring mechanisms shared by all tools. These carry NO policy:
// thresholds, multipliers, ladders, category maps, and label copy are supplied
// by each tool. Tool compute functions (e.g. the timeline estimator's
// calculateScore) compose these primitives with their own policy tables.

/**
 * Map a percentage (0..1) to the first band whose inclusive upper bound is
 * >= pct; `fallback` when pct exceeds every bound.
 */
export function bandForPercent<T>(
  thresholds: readonly (readonly [number, T])[],
  fallback: T,
  pct: number,
): T {
  for (const [upperBound, level] of thresholds) {
    if (pct <= upperBound) return level;
  }
  return fallback;
}

/**
 * Map an integer count to the first level whose inclusive maximum is
 * >= count; `fallback` when count exceeds every maximum.
 */
export function levelForCount<T>(
  thresholds: readonly (readonly [number, T])[],
  fallback: T,
  count: number,
): T {
  for (const [maxCount, level] of thresholds) {
    if (count <= maxCount) return level;
  }
  return fallback;
}

/**
 * Widen a range's upper bound by a multiplier (rounded); the lower bound is
 * unchanged. Used for risk adjustments that increase uncertainty upward.
 */
export function applyUpperBoundMultiplier(
  range: readonly [number, number],
  multiplier: number,
): [number, number] {
  return [range[0], Math.round(range[1] * multiplier)];
}

/**
 * Sum answered option scores per question category. Only positive option
 * scores contribute (readiness credits don't offset drivers).
 */
export function categoryScoreTotals(
  questions: readonly QuestionBase[],
  responses: Responses,
): Record<string, number> {
  const totals: Record<string, number> = {};

  for (const q of questions) {
    if (!q.options || !q.category) continue;
    const answerIdx = responses[q.id];
    if (typeof answerIdx !== 'number') continue;
    const opt = q.options[answerIdx];
    if (!opt || opt.score <= 0) continue;

    totals[q.category] = (totals[q.category] ?? 0) + opt.score;
  }

  return totals;
}

/**
 * Rank category totals descending and map the top `limit` categories to
 * user-facing labels (falling back to the raw category name if unmapped —
 * tools should test label completeness).
 */
export function topDriverLabels(
  totals: Record<string, number>,
  labels: Record<string, string>,
  limit: number,
): string[] {
  return Object.entries(totals)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([category]) => labels[category] ?? category);
}

/**
 * Collect the deduplicated risk groups triggered by flagged answers
 * (isRiskFlag or isCriticalRisk), mapping each question's category through
 * `categoryMap`. Insertion order follows question order.
 */
export function triggeredCategories(
  questions: readonly QuestionBase[],
  responses: Responses,
  categoryMap: Record<string, string>,
): Set<string> {
  const triggered = new Set<string>();

  for (const q of questions) {
    if (!q.options) continue;
    const idx = responses[q.id];
    if (typeof idx !== 'number') continue;
    const opt = q.options[idx];
    if (!opt) continue;

    if (opt.isRiskFlag || opt.isCriticalRisk) {
      const group = categoryMap[q.category ?? ''];
      if (group) triggered.add(group);
    }
  }

  return triggered;
}

/** Maximum achievable score across a question set (text questions excluded). */
export function maxScoreOf(questions: readonly QuestionBase[]): number {
  return questions.reduce((sum, q) => {
    if (q.fieldType === 'text' || !q.options) return sum;
    return sum + Math.max(...q.options.map((o) => o.score));
  }, 0);
}
