import { InitiativeType, Responses } from './types';

// Golden fixture response sets — complete wizard answer maps with
// hand-verified expected outputs. Shared by scoring.test.ts (selective
// assertions) and golden-results.test.ts (full-object freeze).
// Responses map question id -> selected option index (or text for UQ1).

// Learning: moderate eLearning course, no risk flags, no unknowns.
export const LEARNING_MODERATE: Responses = {
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
export const PROJECT_GAP_REGRESSION: Responses = {
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
export const PROGRAM_HIGH_RISK: Responses = {
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
export const CHANGE_UNKNOWN_HEAVY: Responses = {
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
export const LEARNING_VERY_SMALL: Responses = {
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

export interface GoldenFixture {
  name: string;
  type: InitiativeType;
  responses: Responses;
}

export const GOLDEN_FIXTURES: GoldenFixture[] = [
  { name: 'learning-moderate', type: 'learning', responses: LEARNING_MODERATE },
  { name: 'project-gap-regression', type: 'project', responses: PROJECT_GAP_REGRESSION },
  { name: 'program-high-risk', type: 'program', responses: PROGRAM_HIGH_RISK },
  { name: 'change-unknown-heavy', type: 'change', responses: CHANGE_UNKNOWN_HEAVY },
  { name: 'learning-very-small', type: 'learning', responses: LEARNING_VERY_SMALL },
];
