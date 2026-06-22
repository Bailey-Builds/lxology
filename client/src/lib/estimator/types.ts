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

export interface Question {
  id: string;
  question: string;
  fieldType: 'text' | 'single-select';
  required: 'required' | 'optional' | 'conditional';
  /** Which initiative types this question applies to (undefined = universal) */
  initiativeTypes?: InitiativeType[];
  /** Conditional display: show this question if these question IDs have any of these answer indices selected */
  showWhen?: { questionId: string; answerIndices: number[] }[];
  options?: AnswerOption[];
  /** Score category for driver mapping */
  category?: string;
}

export interface Responses {
  [questionId: string]: number | string | undefined;
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
}

export interface Phase {
  name: string;
  percent: number;
}

export interface WizardStep {
  id: string;
  label: string;
}
