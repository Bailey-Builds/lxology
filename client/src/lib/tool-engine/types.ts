// Generic, tool-agnostic question and result models for the Lxology tool
// engine. Tool-specific shapes (e.g. the timeline estimator's initiative
// types and ScoringResult) extend these in their own tool module.

export type FieldType = 'text' | 'single-select';

export type RequiredMode = 'required' | 'optional' | 'conditional';

export interface ShowWhenRule {
  questionId: string;
  answerIndices: number[];
}

export interface AnswerOption {
  label: string;
  helperText?: string;
  score: number;
  lowerConfidence?: boolean;
  isUnknown?: boolean;
  isRiskFlag?: boolean;
  isCriticalRisk?: boolean;
  /** Extra complexity points added to separate category */
  extraComplexity?: number;
}

export interface QuestionBase {
  id: string;
  question: string;
  fieldType: FieldType;
  required: RequiredMode;
  /** Conditional display: show this question if these question IDs have any of these answer indices selected */
  showWhen?: ShowWhenRule[];
  options?: AnswerOption[];
  /** Score category for driver mapping */
  category?: string;
}

export interface Responses {
  [questionId: string]: number | string | undefined;
}

/** Minimal envelope every tool's computed result must satisfy. */
export interface ToolResultBase {
  /** Identifier of the scoring methodology that produced this result. */
  methodologyVersion: string;
  totalScore: number;
  maxScore: number;
  scorePercent: number;
}

export type ToolAccess = 'free' | 'pro';

/**
 * Descriptive metadata about a tool. This is NOT a gating mechanism —
 * `access` is informational only. Runtime Pro access is decided exclusively
 * by entitlements.hasProAccess(); nothing may read `access` to gate a route,
 * a feature, or UI visibility.
 */
export interface ToolDefinition {
  id: string;
  /** Branded tool name (unrelated to the marketing/category label). */
  name: string;
  /** Plain-language marketing label, e.g. "Free Timeline Calculator". */
  marketingName: string;
  access: ToolAccess;
  methodologyVersion: string;
  route?: string;
}
