// Timeline-specific types. The generic question/answer/result models now
// live in the tool engine; this module re-exports them so existing imports
// keep working until the tool moves to lib/tools/timeline/ (extraction
// Phase 3).
import type { QuestionBase } from '../../tool-engine/types';

export type {
  AnswerOption,
  FieldType,
  RequiredMode,
  Responses,
  ShowWhenRule,
  ToolResultBase,
} from '../../tool-engine/types';

export type InitiativeType = 'learning' | 'project' | 'program' | 'change';

export type ComplexityLevel =
  | 'Low'
  | 'Low-Moderate'
  | 'Moderate'
  | 'Medium-High'
  | 'High'
  | 'Very High';

export type ConfidenceLevel =
  | 'High'
  | 'Moderate-High'
  | 'Moderate'
  | 'Low-Moderate'
  | 'Low';

export type AdjustmentTier = 'none' | 'Minor' | 'Moderate' | 'Major';

export interface Question extends QuestionBase {
  /** Which initiative types this question applies to (undefined = universal) */
  initiativeTypes?: InitiativeType[];
}

export interface ScoringResult {
  universalScore: number;
  initiativeScore: number;
  totalScore: number;
  maxScore: number;
  scorePercent: number;
  complexityLevel: ComplexityLevel;
  baseRange: [number, number];
  riskFlagCount: number;
  criticalRiskCount: number;
  adjustmentTier: AdjustmentTier;
  adjustedRange: [number, number];
  lowerConfidenceCount: number;
  unknownCount: number;
  unknownBonus: number;
  confidenceRiskCount: number;
  confidenceLevel: ConfidenceLevel;
  postLaunchScore: number;
  postLaunchWindow: string | null;
  topDrivers: string[];
  riskFlags: string[];
  planningAssumptions: string[];
  recommendedNextSteps: string[];
  isVerySmallLearning: boolean;
  initiativeName: string;
  initiativeType: InitiativeType;
  /** Identifier of the scoring methodology that produced this result. */
  methodologyVersion: string;
}

export interface Phase {
  name: string;
  percent: number;
}

export interface WizardStep {
  id: string;
  label: string;
}
