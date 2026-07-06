# Tool Engine Extraction Plan

Design document for extracting the Timeline Estimator's logic into a reusable
tool engine, so Workplace Capability Tools Pro tools (Timeline Calculator Pro,
Knowledge Transfer Sprint™ Planner, AI Readiness Assessment, LaunchReady
Planner, Manager Message Kit Builder, Change Readiness Assessment, Learning
Needs Diagnostic) can be built without forking logic.

**Hard constraint: the Free Timeline Calculator's behavior must be preserved
exactly.** Every number, every sentence of generated copy, every download,
byte-for-byte. The refactor moves code; it does not change what the code does.

**Guiding architectural stance:** the engine provides *mechanisms*; each tool
provides *policy and content*. We deliberately do NOT build a generic
"interpreter" that runs any tool from config. The timeline methodology has
bespoke steps (post-launch scoring keyed to specific question ids, the
very-small-learning override, the universal/path score split) that do not
generalize cleanly today. Timeline's `calculateScore` stays a hand-written
function that *composes* engine primitives. Future tools write their own
compute functions from the same primitives. If, after two or three tools, a
common interpreter shape emerges, extract it then — rule of three, not
speculation.

---

## 0. Pre-work (before any refactor)

1. **Commit the current launch-ready tree.** The entire launch effort is
   uncommitted. A refactor stacked on an uncommitted tree has no rollback
   floor. Baseline commit first (owner approval), then one commit per phase,
   on a branch (`engine-extraction`).
2. Decide `.claude/` and the planning `.md` docs: commit or gitignore.
3. Preferably: launch (deploy) the current state before refactoring, so the
   refactor is not blocking the funnel going live. The extraction is
   architecture prep, not a launch gate.

---

## 1. Target folder structure

```
client/src/lib/tool-engine/            # generic, tool-agnostic
  types.ts          # FieldType, RequiredMode, ShowWhenRule, AnswerOption,
                    # Question, Responses, BandThreshold<T>,
                    # ToolResultBase, ToolDefinition, ToolAccess
  visibility.ts     # isQuestionVisible (moved verbatim from questions.ts)
  scoring-utils.ts  # bandForPercent, levelForCount, applyUpperBoundMultiplier,
                    # categoryScoreTotals, topDriverLabels,
                    # triggeredCategories, maxScoreOf
  registry.ts       # TOOL_REGISTRY: Record<string, ToolDefinition>, getToolDefinition
  report.ts         # (Phase 7, optional) ReportModel types
  index.ts          # public barrel — components import from '@/lib/tool-engine'

client/src/lib/tools/timeline/         # the Free Timeline Calculator, first consumer
  types.ts          # InitiativeType, ComplexityLevel, ConfidenceLevel,
                    # AdjustmentTier, Phase, ScoringResult
  questions.ts      # all 5 question banks + getQuestionsForInitiative (verbatim)
  scoring.ts        # calculateScore + ALL timeline policy tables + METHODOLOGY_VERSION
  phases.ts         # PHASE_ALLOCATIONS (verbatim)
  downloads.ts      # moved; only import paths change, zero internal edits
  fixtures.ts       # golden fixture response sets (exported for both test files)
  scoring.test.ts   # the 32 existing tests, assertions byte-identical
  golden-results.test.ts  # Phase 0 full-object freeze (see §4)
  definition.ts     # timeline's ToolDefinition registry entry

client/src/lib/estimator/              # DELETED at end of Phase 5
```

UI components stay in `client/src/components/estimator/` — they are
timeline-specific UI and renaming them is cosmetic churn with no architectural
payoff. Only their imports change. (They can move to
`components/tools/timeline/` in a later cosmetic pass if desired.)

`lib/subscribe.ts`, `lib/entitlements.ts`, `api/` — untouched.

---

## 2. What becomes generic (moves to `tool-engine/`)

| Current code | Engine form | Notes |
|---|---|---|
| `Question`, `AnswerOption`, `Responses`, field/required types, `showWhen` | `types.ts`, moved verbatim | Already tool-agnostic. The option flags (`score`, `lowerConfidence`, `isUnknown`, `isRiskFlag`, `isCriticalRisk`, `extraComplexity`, `helperText`) generalize to every planned assessment tool |
| `isQuestionVisible` | `visibility.ts`, moved verbatim | Already pure and generic |
| `getComplexityLevel` + threshold walk | `bandForPercent<T>(thresholds: [number, T][], fallback: T, pct: number): T` | Mechanism generic; timeline passes its own thresholds + `'Very High'` fallback |
| `getConfidenceLevel` | `levelForCount<T>(thresholds: [number, T][], fallback: T, count: number): T` | Same threshold-walk mechanism; timeline passes `[[1,'High'],[3,'Moderate-High'],[5,'Moderate'],[7,'Low-Moderate']]`, fallback `'Low'` |
| `applyAdjustment`'s multiplication | `applyUpperBoundMultiplier(range: [number,number], multiplier: number): [number,number]` | Multiplier *values* stay timeline policy |
| `getTopDrivers` internals | `categoryScoreTotals(questions, responses)` + `topDriverLabels(totals, labels, limit)` | Mechanism generic; `DRIVER_LABELS` content and limit 5 stay timeline |
| Risk-flag triggering loop (duplicated today in `calculateScore` and `getRiskFlagText`) | `triggeredCategories(questions, responses, categoryMap): Set<string>` | One engine function, called from both places. Consolidates a duplication; logic identical, goldens prove it |
| `maxScoreOf` (currently test-only) | Promoted to `scoring-utils.ts` | Timeline **keeps** its hardcoded `UNIVERSAL_MAX`/`PATH_MAX` — the consistency tests keep guarding them. Do NOT switch `calculateScore` to derived maxes during extraction (equal values, but zero-change discipline) |
| `methodologyVersion` concept | `ToolResultBase` requires it; each tool exports its own constant | Version *string* stays per-tool |
| Result envelope | `ToolResultBase = { methodologyVersion, totalScore, maxScore, scorePercent }` | `ScoringResult` already structurally satisfies this. **Do not add `toolId` or any new field during extraction** — additive fields change JSON output and violate the freeze. Extend when Pro actually needs it |
| Tool metadata | `ToolDefinition = { id, name, marketingName, access: 'free' \| 'pro', methodologyVersion, route? }` | `access` is metadata only — runtime gating still flows exclusively through `entitlements.hasProAccess()` |

**Validation utilities:** the wizard's only validation is "required question
answered" (a one-line check in `QuestionStep`) and email regexes. Nothing worth
generalizing yet — explicitly out of scope. Don't invent a validation
framework for one `if`.

## 3. What stays timeline-specific (`tools/timeline/`)

- `InitiativeType` and all four question paths + universal bank (1,100 lines of content, moved verbatim)
- `BASE_RANGES` (week ranges per band per type)
- `COMPLEXITY_THRESHOLDS` *values* and `COMPLEXITY_INDEX`
- `getAdjustmentTier` — the flag/critical ladder is irregular policy (6+ OR 2-critical OR 4+&1-critical…), not a generalizable mechanism. Stays as-is
- `ADJUSTMENT_MULTIPLIERS` values
- `RISK_CATEGORIES`, `CATEGORY_TO_RISK`, `riskMessages`, `DRIVER_LABELS` (all content)
- `getPlanningAssumptions`, `getRecommendedNextSteps` (copy tables)
- `getPostLaunchScore` / `getPostLaunchWindow` (hardcoded question-id maps — pure timeline methodology)
- `checkVerySmallLearning` (hardcoded question ids)
- `PHASE_ALLOCATIONS`
- `METHODOLOGY_VERSION = 'timeline-estimator-v1'`
- `ScoringResult`'s timeline fields (baseRange, adjustedRange, postLaunchWindow, isVerySmallLearning, initiativeType, …)
- `downloads.ts` — moves with the tool, internally untouched (report-model generalization is Phase 7, optional)
- All wizard/results UI components

## 4. Behavior-preservation strategy

**The existing 32 tests are the equivalence proof.** They move with the tool;
their assertions must remain byte-identical. If any assertion "needs" updating,
the refactor is wrong — revert, don't edit tests.

**Phase 0 adds a stronger net before anything moves:** a full-object golden
freeze. Export the five fixture response sets to `fixtures.ts`, then add
`golden-results.test.ts` which asserts `JSON.parse(JSON.stringify(calculateScore(fixture, type)))`
deep-equals a committed JSON literal of the *complete* result — every numeric
field AND every generated sentence (drivers, risks, assumptions, next steps).
Generate the literals from current code once, paste, commit. The selective
assertions in `scoring.test.ts` cover key fields; the freeze covers everything,
including narrative copy that a careless move could silently reword.

**New tests added during extraction (additive only):**
- Engine unit tests for `bandForPercent`, `levelForCount`,
  `applyUpperBoundMultiplier` — largely re-pointing existing boundary/ladder
  tests at engine exports, plus generic-shape cases
- `triggeredCategories` unit test (input → expected category set)
- Registry test: exactly one entry, id `timeline-estimator`, `access: 'free'`,
  version matches `METHODOLOGY_VERSION`

**Manual QA after Phase 6 (same live-browser passes used all session):**
all four initiative paths to results; all three downloads open with correct
content; resume-after-refresh; edit-answers → recalculate; "How this estimate
was calculated" numbers match cards; homepage CTAs; pricing page + waitlist
error state; mobile menu.

## 5. Implementation sequence

Each phase ends with `corepack pnpm check` + `corepack pnpm test` green and a
commit. Phases are ordered so the working tree is never broken between them.

- **Phase 0 — Freeze.** Export fixtures, add `golden-results.test.ts` with
  full-object literals generated from *current* code. No other changes.
- **Phase 1 — Engine types + visibility.** Create `tool-engine/types.ts` and
  `visibility.ts` by moving the generic types and `isQuestionVisible`.
  `lib/estimator/types.ts` and `questions.ts` re-export them (shims), so no
  other file changes yet. Diff = pure moves + two re-export lines.
- **Phase 2 — Scoring primitives.** ⚠️ Highest-risk phase (the only one that
  transforms code rather than moving it). Extract the seven `scoring-utils`
  functions; rewrite timeline `scoring.ts` internals to call them with its
  policy tables. Tables themselves are cut/pasted verbatim, never retyped.
  One helper at a time, tests after each.
- **Phase 3 — Move the tool.** `git mv lib/estimator → lib/tools/timeline`
  (including tests), create `definition.ts`. Update the ~9 import sites
  (components, downloads-internal, tests); `tsc` finds every miss.
- **Phase 4 — Registry.** `tool-engine/registry.ts` with the single timeline
  entry. At most one consumer for now (the estimator page may resolve its own
  metadata); do NOT wire Pricing to it yet — Pricing's copy is
  launch-approved and a second source of truth invites drift.
- **Phase 5 — Shim removal.** Delete the Phase-1 re-export shims and the empty
  `lib/estimator/`. Grep proves zero remaining `lib/estimator` imports.
- **Phase 6 — Full verification.** check + test + build; manual QA list from
  §4; grep audits: `hasProAccess` still only in `entitlements.ts`, no new
  routes in `App.tsx`, `DRAFT_KEY` unchanged.
- **Phase 7 — Optional report-model prep.** `tool-engine/report.ts`
  (`ReportModel`: title, meta, keyStats, sections of heading+bullets,
  disclaimer, methodologyVersion) + timeline `buildReportModel(result)`.
  Renderers keep working as-is; converting PDF/PPTX/Word to consume the model
  is deferred to the Pro-reports work where it pays for itself. Skippable
  without weakening Phases 0–6.

## 6. Risk analysis

**What could break, and where:**
- `scoring.ts` (Phase 2) — a transcription slip in any table silently changes
  estimates. Mitigations: verbatim cut/paste (never retype numbers), one
  helper per step, the Phase-0 freeze catches any drift including copy text.
- `questions.ts` — 1,100 lines of scored content. Mitigation: file moves
  whole; content is never opened for editing.
- `downloads.ts` — 590 lines. Mitigation: import-path edits only; manual
  download QA in Phase 6.
- `EstimatorWizard.tsx` — **`DRAFT_KEY = 'lxology-estimator-draft-v1'` must
  not change.** A user mid-draft when the refactor deploys must still resume.
  The key names the product, not the module path — leave it.
- Import-path churn (Phase 3/5) — mechanical; `tsc --noEmit` is the net.
- Practical papercut: the repo lives in a OneDrive-synced folder; bulk
  `git mv` can hit file locks. Pause sync or retry if a move fails oddly.

**Must not be touched:** any methodology number or generated sentence;
`DRAFT_KEY`; `entitlements.ts`; `api/`; `vercel.json`; Pricing/homepage copy;
the known conditional-question max-score quirk (users who never see
conditional questions score against the full path max — this is a *methodology
decision to revisit deliberately*, not something the refactor may "fix" in
passing, because fixing it changes outputs).

**Rollback:** baseline commit before Phase 0; one commit per phase; any phase
reverts cleanly with `git revert` / branch reset. If the freeze test fails at
any point and the cause isn't an obvious import slip, stop and revert the
phase rather than debugging forward.

**How scoring drift is structurally prevented:** three independent nets —
(1) 32 byte-identical assertions, (2) full-object golden freeze including all
narrative text, (3) the rule that tables move by cut/paste only. A change
would have to slip past all three.

## 7. Acceptance criteria

The extraction is successful only if ALL hold:

1. `corepack pnpm check` — clean
2. `corepack pnpm test` — all tests green; the original 32 with
   **byte-identical assertions**, plus the freeze test and new engine tests
3. `corepack pnpm build` — succeeds (only the pre-existing chunk-size note)
4. Golden freeze: complete `calculateScore` output for all five fixtures is
   deep-equal to the pre-refactor literals — numbers *and* generated copy
5. No Pro feature exposed: no new routes, no functional Pro UI;
   `ToolDefinition.access` is inert metadata
6. Free vs Pro boundary intact: `hasProAccess` exists only in
   `entitlements.ts` (grep-verified); registry has exactly one (free) entry
7. Pricing page, waitlist, homepage, downloads, resume flow: behavior
   unchanged (manual QA list)
8. `lib/estimator/` no longer exists; zero imports reference it
9. `DRAFT_KEY` unchanged; an in-progress draft written before the refactor
   resumes correctly after it

## 8. Recommendation: who implements

**Hybrid, mirroring the division of labor that worked for the launch packet:**

- **Fable implements Phase 2 personally.** It is the only phase that
  transforms logic rather than moving it, and it sits directly on the scoring
  methodology — the same "highest-risk methodology work" category assigned to
  Fable originally. It is small (~200 lines touched) and an hour of careful
  work.
- **The lower-cost executor implements Phases 0, 1, 3, 4, 5, 6 (and 7 if
  wanted)** from this document. They are mechanical — file moves, re-exports,
  import updates, test relocation — and triple-netted by the freeze. The
  executor demonstrated exactly this discipline across the launch packet,
  including live verification and honest deviation-flagging.
- Fable reviews the final diff before merge (same as the launch review).

Sequencing recommendation: commit the current launch-ready tree first, ship
the launch, then run this extraction on a branch. The refactor is Pro
preparation; it should not sit between the finished free product and its
launch.
