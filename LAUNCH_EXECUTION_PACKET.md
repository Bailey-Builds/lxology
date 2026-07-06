# LXOLOGY Launch-Readiness Execution Packet

Instructions for a coding agent completing the remaining launch tasks. Read this entire
file before starting Task 1.

## Project context

- Static React SPA: React 19 + Vite 7 + Tailwind 4 + wouter (routing), deployed on Vercel
  (`vercel.json` rewrites all routes to `index.html`; `server/index.ts` is unused on Vercel).
- The core product is the **Timeline Estimator** at `/timeline-estimator`:
  wizard in `client/src/components/estimator/`, logic in `client/src/lib/estimator/`.
- The scoring engine (`scoring.ts`, `questions.ts`) was just fixed and is covered by
  31 passing tests in `client/src/lib/estimator/scoring.test.ts`.
- Business context: the free estimator is the funnel into a paid suite,
  **Workplace Capability Tools Pro** — Project Pass $9.97 / 30 days / up to 5 projects,
  Annual Pro $49.97 / year / higher project limit. Same features, different duration/limits.
  No payments are being built yet — only a waitlist.

## Environment / commands

Node 24 is installed. pnpm runs through corepack (corepack shims are not globally enabled
on this machine):

```
corepack pnpm install        # already done
corepack pnpm check          # tsc --noEmit
corepack pnpm test           # vitest run
corepack pnpm dev            # dev server (vite --host)
corepack pnpm build          # production build
```

## Global rules (apply to every task)

1. **Never modify scoring logic.** `client/src/lib/estimator/scoring.ts` and
   `questions.ts` may only be touched where a task explicitly says so (export-only changes).
   If a scoring test fails after your change, your change is wrong — revert it; do not
   "fix" the test.
2. **Do not commit, push, deploy, merge, or install packages** beyond what a task
   explicitly lists.
3. After every task: run `corepack pnpm check` and `corepack pnpm test`. Both must pass
   before moving on.
4. Brand tokens: purple `#26006B`, orange `#FD6A02` (hover `#e55a00`), light blue
   `#D7E7FF`. Cards use inline `borderRadius: '8px'`, buttons/inputs `'4px'`. Match the
   existing hand-written Tailwind style of the estimator components; do not introduce new
   UI libraries.
5. Do not refactor, rename, reformat, or delete anything a task doesn't name. Leave
   unused components (`Solutions.tsx`, `Map.tsx`, `ManusDialog.tsx`, etc.) alone.
6. Rollback for any task: `git status` to list changes, then `git checkout -- <file>` for
   modified files and delete any new files the task created. Nothing is committed, so the
   working tree diff is the complete change.

Recommended order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. Task 6 depends on Task 1. Task 3
creates links that go live in Task 6 (acceptable to build in this order).

---

## Free vs Pro gating rules (read before any task)

Three product names. They are not interchangeable — use each exactly as defined:

| Name | Meaning | Where it appears |
|------|---------|------------------|
| **Free Timeline Estimator** | The live free tool at `/timeline-estimator` (the free Timeline Calculator). The UI keeps its current name "Lxology Timeline Estimator™" — do not rename it (owner naming decision pending). | Everywhere the free tool is referenced |
| **Timeline Calculator Pro** | The FUTURE paid version of this tool: saved projects, richer stakeholder-ready reports, stronger recommendations, project limits. Not built yet. | Only on `/pricing`, as a locked/coming-soon item |
| **Workplace Capability Tools Pro** | The paid SUITE containing Timeline Calculator Pro plus the other Pro tools. | Pricing page, upgrade CTAs |

Never write "Lxology Pro" — that is legacy copy being removed in Task 3.

### What is FREE at this launch (build/keep all of it, no gating, no account)

- The full estimator wizard, end to end, no login
- Complete results: estimate range, complexity, confidence, drivers, risks, assumptions,
  next steps, phase bar
- "Your Answers" review/edit (Task 4) and "How this estimate was calculated" (Task 5)
- All three existing downloads (PDF, PPTX, Word) — they already exist; they stay free.
  Do NOT gate them, relabel them "Pro", or add any new report format
- localStorage resume (Task 2) — a single temporary draft. This is NOT "saved projects"
- Email capture (Task 1) and upgrade CTAs (Tasks 3, 5, 6)

### What is PRO (must never be publicly accessible or appear functional at this launch)

- Saved projects and project limits (up to 5 on Project Pass, higher on Annual Pro)
- Richer/stakeholder-ready reports and stronger recommendations
- The suite tools: AI Readiness Assessment, Knowledge Transfer Sprint™ Planner,
  LaunchReady Planner, Manager Message Kit Builder, Change Readiness Assessment,
  Learning Needs Diagnostic, and the template/resource library
- **Project Pass ($9.97 / 30 days / 5 projects) and Annual Pro ($49.97 / year / higher
  limit) have IDENTICAL feature access.** The only differences are duration and project
  limit. No copy may imply one plan has features the other lacks.

### Pro representation rules

1. **Pro access is uniformly `false` at this launch.** There are no Pro users. If any
   instruction seems to require rendering working Pro functionality, you are misreading
   it — represent Pro only as locked cards, "Coming soon" labels, and waitlist CTAs.
2. **No routes, pages, or components that render Pro tool functionality.** Pro tools
   exist only as names + descriptions in marketing copy on `/pricing`. Do not create
   `/tools/ai-readiness` or similar routes, even as placeholders.
3. **All gating logic lives in ONE module:** `client/src/lib/entitlements.ts` (created in
   Task 6), exporting `hasProAccess(): boolean` hardcoded to `false`. Never write inline
   `isPro` checks, other flag variables, or env-based toggles in components. If a
   component needs to know Pro status, it imports this function — nothing else.
4. Upgrade CTAs always link to `/pricing` and use waitlist language ("Join the
   waitlist"), never purchase language ("Buy", "Upgrade now", "Unlock").

## Do NOT build (out of scope — no exceptions)

- Stripe, checkout, or any payment collection
- Auth, accounts, or login of any kind
- A paid dashboard or members area
- Saved-project storage: no database, no API for projects, no multi-draft localStorage
- Pro report generation — not even hidden, stubbed, or commented out
- Free/lite versions of any Pro suite tool (no "AI Readiness quick check", etc.)
- Team access, client folders, corporate dashboards, custom branding, or an
  unlimited-projects tier — these are FUTURE higher-tier features and must not appear
  anywhere, including marketing copy
- Admin panels or feature-flag services (the entitlements stub is the only flag)

If completing a task appears to require any of the above, stop and report the conflict
instead of building it.

---

## Task 1 — Real email capture endpoint

**Goal:** The community signup form currently fakes success and discards the email
(`console.log` in `CommunityCapture.tsx`). Replace it with a real API endpoint so no
signup is silently lost.

**Files affected:**
- NEW `api/subscribe.ts` (repo root — Vercel serverless functions directory)
- `client/src/components/estimator/CommunityCapture.tsx`
- `vercel.json`
- `package.json` (one devDependency)

**Implementation:**
1. `corepack pnpm add -D @vercel/node` (types for the handler).
2. Create `api/subscribe.ts`:
   - Accept POST only (405 otherwise).
   - Body: `{ email: string, firstName?: string, role?: string, source?: string }`.
   - Validate email with a simple regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`); 400 if invalid.
   - If `process.env.SUBSCRIBE_WEBHOOK_URL` is set, `fetch` POST the JSON payload
     (plus a server-side `submittedAt` ISO timestamp) to that URL; return 502 if the
     webhook responds non-2xx.
   - If the env var is NOT set, return 503 with
     `{ error: 'Subscription service not configured' }`. Never fake success.
   - Wrap in try/catch; 500 on unexpected errors. No logging of full emails to console.
3. Update `vercel.json` rewrite so API routes are never swallowed by the SPA fallback:
   change `"source": "/(.*)"` to `"source": "/((?!api/).*)"`.
4. Update `CommunityCapture.tsx` `handleSubmit`:
   - `async`; POST to `/api/subscribe` with
     `{ email, firstName, role, source: 'community' }`.
   - Add a `submitting` state (disable button, show "Joining…").
   - Only `setSubmitted(true)` on a 2xx response.
   - On failure show an inline error: "Something went wrong — please try again in a
     moment." Keep the form values so the user can retry. Remove the `console.log`.

**What not to touch:** the form's layout/copy, the success panel, anything else in the
estimator.

**Gating note:** email capture is a FREE-tier feature — no account, no gating. The
`source` field (`'community'` here, `'pro-waitlist'` in Task 6) is how the owner
distinguishes list intent; do not add any other segmentation.

**Acceptance criteria:**
- No `console.log` of user data remains.
- Non-2xx responses show the error message and do NOT show the success panel.
- `vercel.json` rewrite excludes `/api/`.
- `corepack pnpm check` and `corepack pnpm test` pass.

**Test steps:**
1. `corepack pnpm dev`, open `/timeline-estimator`, complete an estimate.
2. Submit the form. Vite's dev server does not serve `/api`, so the fetch fails — verify
   the inline error appears and the success panel does NOT.
3. Verify invalid email ("foo") shows the existing validation error without a network call.
4. (Owner follow-up, not this agent: set `SUBSCRIBE_WEBHOOK_URL` in Vercel env — e.g. a
   Zapier/Make webhook or email-provider endpoint — and verify on a preview deployment.)

**Risk:** Medium — new serverless surface; misconfigured rewrite could break the SPA.
Double-check the regex in `vercel.json` and test that `/` and `/timeline-estimator` still
load in the dev build.

**Rollback:** delete `api/subscribe.ts`; `git checkout -- vercel.json package.json pnpm-lock.yaml "client/src/components/estimator/CommunityCapture.tsx"`.

---

## Task 2 — Wizard persistence (autosave + resume)

**Goal:** A refresh mid-wizard currently destroys up to 10 minutes of answers. Autosave
to localStorage and offer to resume.

**Files affected:**
- `client/src/components/estimator/EstimatorWizard.tsx`
- `client/src/components/estimator/WelcomeScreen.tsx` (resume prompt UI)

**Implementation:**
1. In `EstimatorWizard.tsx`, define key `const DRAFT_KEY = 'lxology-estimator-draft-v1'`.
2. Autosave with `useEffect` on `[step, initiativeType, responses]`: when step is not
   `'welcome'`, write `JSON.stringify({ version: 1, step, initiativeType, responses,
   savedAt: Date.now() })`. Wrap all localStorage access in try/catch (private browsing
   throws) — failures are silent no-ops.
3. On first mount, read the draft. Valid = parses, `version === 1`, `savedAt` within
   14 days, `responses` is an object. If valid, set `resumeDraft` state.
4. Pass an optional `resumePrompt` element into `WelcomeScreen` (new optional prop
   rendered above the CTA button): a small card — "You have an unfinished estimate from
   {date}." with two buttons: **Resume** and **Start fresh**.
   - Resume: restore `responses`, `initiativeType`, and `step`. If the saved step was
     `'results'`, recompute via `calculateScore(responses, initiativeType)` and set the
     result before showing the results step. If the saved step is `'path'` or `'results'`
     but `initiativeType` is null, fall back to `'type'`.
   - Start fresh: remove the key, clear the prompt.
5. Clear the key in `handleReset` (the "Start Another Estimate" path).

**What not to touch:** `calculateScore` and question components; the step flow itself.

**Gating note:** this is a SINGLE temporary draft — the free tier's only persistence.
Do not build multiple drafts, named drafts, a draft list, or anything resembling
"saved projects" (that is Timeline Calculator Pro, not built at this launch). One key,
one draft, overwritten on every change.

**Acceptance criteria:**
- Answer 5+ questions, hard-refresh: the welcome screen shows the resume prompt; Resume
  restores the same step with all answers intact.
- "Start fresh" and "Start Another Estimate" both clear the draft (verify in DevTools →
  Application → Local Storage).
- Corrupted draft (manually set the key to `"garbage"`) does not crash — the wizard
  starts normally.
- Type-check and tests pass.

**Test steps:** the three scenarios above in `corepack pnpm dev`, plus one full run
through to results, refresh on results, Resume → results reappear with the same range.

**Risk:** Low-Medium — state restore ordering; guard every parse.

**Rollback:** `git checkout -- client/src/components/estimator/EstimatorWizard.tsx client/src/components/estimator/WelcomeScreen.tsx`.

---

## Task 3 — Homepage estimator placement

**Goal:** The estimator — the only live product — is invisible on the homepage. Surface
it prominently.

**Files affected:**
- `client/src/pages/Home.tsx`
- `client/src/components/LxologyTools.tsx` (currently orphaned — never imported)
- `client/src/components/Header.tsx`

**Implementation:**
1. In `LxologyTools.tsx`:
   - "Launch Timeline Estimator" button: replace `href="#"` with a wouter `<Link
     href="/timeline-estimator">` wrapping the styled `<a>` (match the pattern used in
     `Header.tsx`).
   - The second button (currently "Join the Lxology Pro Waitlist"): relabel to
     "Join the Workplace Capability Tools Pro Waitlist" and link it with
     `<Link href="/pricing">` (page created in Task 6).
   - DELETE the entire "Coming Soon card" block (lines with the `Lxology Pro` card —
     its copy about "AI-powered workflows, prompt libraries" is off-strategy and is
     superseded by the pricing page).
   - Add a small badge above the h2: `Free Planning Tool` styled like the
     "Beta — Free Planning Tool" badge in `WelcomeScreen.tsx`.
2. In `Home.tsx`: import `LxologyTools` and render it between `<ThreeWaysWeHelp />` and
   `<FeaturedOfferings />`.
3. In `Header.tsx`: rename the nav label "Tools" to "Timeline Estimator" (desktop and
   mobile menus).

**What not to touch:** Hero, ThreeWaysWeHelp, FeaturedOfferings internals; other nav items.

**Gating note:** the primary CTA promotes the FREE tool ("Launch Timeline Estimator" —
free, no account). The secondary CTA is waitlist-only: label it "Join the Workplace
Capability Tools Pro Waitlist" (not "Lxology Pro", not "Upgrade"). Nothing on the
homepage may state or imply that any Pro feature is available today.

**Acceptance criteria:**
- Homepage shows the estimator section with a working link to `/timeline-estimator`
  (client-side navigation, no full page reload).
- The secondary CTA uses waitlist language and the exact suite name "Workplace
  Capability Tools Pro"; no "Lxology Pro" copy remains anywhere in the file.
- No dead `href="#"` remains in `LxologyTools.tsx`.
- Nav reads "Timeline Estimator" on desktop and mobile.

**Test steps:** `corepack pnpm dev`; click through homepage → estimator; check mobile
menu (narrow the window below `lg`); verify no console errors.

**Risk:** Low.

**Rollback:** `git checkout -- client/src/pages/Home.tsx client/src/components/LxologyTools.tsx client/src/components/Header.tsx`.

---

## Task 4 — "Your Answers" review/edit on results

**Goal:** Users can't see or revise what they answered. Add a review section and a way
back into each question section without losing answers.

**Files affected:**
- `client/src/lib/estimator/questions.ts` (move + export one pure helper — allowed)
- `client/src/components/estimator/QuestionStep.tsx` (import that helper)
- `client/src/components/estimator/ResultsPage.tsx`
- `client/src/components/estimator/EstimatorWizard.tsx`

**Implementation:**
1. Move the `isVisible(q, responses)` function from `QuestionStep.tsx` into
   `questions.ts` as an exported function `isQuestionVisible(q: Question, responses:
   Responses): boolean` (identical body). Update `QuestionStep.tsx` to import it. This is
   a pure relocation — the scoring tests must still pass untouched.
2. In `EstimatorWizard.tsx`, pass to `ResultsPage`: `responses`, and two callbacks —
   `onEditUniversal={() => setStep('universal')}` and `onEditPath={() => setStep('path')}`.
   Responses already persist in state, so re-entering a step keeps prior selections; the
   user clicks Continue back through to results, which recomputes the score
   (`handlePathSubmit` already does this).
3. In `ResultsPage.tsx`, add an `ExpandableSection` titled **"Your Answers"** (place it in
   the same grid as Timeline Risks / Planning Assumptions, or full-width below — match
   existing styles). Inside:
   - Two groups: "Shared questions" (universal, excluding UQ1/UQ2) and
     "{type label} questions".
   - For each *visible* answered question (use `isQuestionVisible` and skip
     `fieldType === 'text'`): question text in gray, selected option label in
     purple/semibold on the next line.
   - Each group header has a small "Edit" button wired to the matching callback.

**What not to touch:** scoring internals; the question flow; `calculateScore` signature.

**Gating note:** review/edit is a FREE feature. Do not gate it, watermark it, or tease a
"Pro" version of it.

**Acceptance criteria:**
- Every question the user answered (and only visible ones) appears with the exact option
  label they chose.
- "Edit" returns to that step with all selections still highlighted; continuing returns
  to results and the estimate updates if answers changed.
- All 31 scoring tests still pass (the helper move must not change behavior).

**Test steps:** complete a Learning estimate; open Your Answers; verify labels; Edit
shared answers → change UQ7 from "One quick review" to "Unknown or likely to change" →
continue to results → confidence drops and the risk section gains the review-cycle risk.

**Risk:** Medium — touches the wizard's step wiring; keep changes additive.

**Rollback:** `git checkout --` the four listed files.

---

## Task 5 — "How this estimate was calculated" section

**Goal:** Show the methodology at the moment of judgment. All data already exists in
`ScoringResult`; this is a read-only presentation task.

**Files affected:**
- `client/src/lib/estimator/scoring.ts` (export-only changes — allowed)
- `client/src/components/estimator/ResultsPage.tsx`

**Implementation:**
1. In `scoring.ts` (no logic changes):
   - Export the existing `COMPLEXITY_THRESHOLDS` constant.
   - Lift the `multipliers` map inside `applyAdjustment` to a module-level
     `export const ADJUSTMENT_MULTIPLIERS: Record<AdjustmentTier, number>` and reference
     it inside the function. Behavior identical; tests must pass unchanged.
2. In `ResultsPage.tsx`, add an `ExpandableSection` titled
   **"How this estimate was calculated"** below the phase bar, rendering a numbered list:
   1. "Your answers were scored across complexity factors: **{totalScore} of
      {maxScore} points ({round(scorePercent*100)}%)**."
   2. "That places this initiative in the **{complexityLevel}** complexity band, with a
      base planning range of **{baseRange[0]}–{baseRange[1]} weeks** for a
      {type label}."
   3. If `adjustmentTier !== 'none'`: "**{riskFlagCount}** risk factor(s)
      {criticalRiskCount > 0 ? `(including ${criticalRiskCount} critical)` : ''} triggered
      a **{adjustmentTier}** adjustment, extending the upper bound by
      ×{ADJUSTMENT_MULTIPLIERS[tier]} to **{adjustedRange[0]}–{adjustedRange[1]}
      weeks**." Else: "No risk adjustment was applied."
   4. "Planning confidence is **{confidenceLevel}**, based on {lowerConfidenceCount}
      lower-confidence answer(s) and {unknownCount} unknown(s)."
   5. If `postLaunchWindow`: "Post-launch support scored {postLaunchScore} points,
      adding a recommended **{postLaunchWindow}**."
   - Footer line in small gray text: "Lxology Timeline Methodology v1".
3. Add a Pro upgrade CTA card to `ResultsPage.tsx`, placed between the Downloads card
   and `<CommunityCapture />`:
   - Light purple card (match the Complexity card style: `bg-[#26006B]/5`, purple border).
   - Heading: "Planning more than one initiative?"
   - Body: "Workplace Capability Tools Pro adds Timeline Calculator Pro — saved
     projects, richer stakeholder-ready reports, and the full planning toolkit — plus
     six more workplace planning tools."
   - Button: "See plans & join the waitlist" → wouter `<Link href="/pricing">`. Orange
     button style.

**Gating note:** the methodology explanation (steps 1–2 above) is a FREE feature — the
free tier includes the basic complexity/confidence explanation. The existing PDF/PPTX/
Word downloads also remain fully free: do not gate, watermark, or relabel them, and do
not add new report formats (richer reports are Timeline Calculator Pro, not built now).
The CTA card is waitlist language only — no "unlock"/"buy" copy, no functional gating.

**What not to touch:** any computation; the existing methodology/disclaimer block at the
bottom of the results page (keep it); `DownloadButtons.tsx` and `downloads.ts`.

**Acceptance criteria:**
- The numbers shown exactly match the result card values on the same page.
- Section renders correctly for: no-risk result, Major-adjustment result, and a
  `isVerySmallLearning` result (for that case, prepend: "This initiative matched the
  very-small learning profile, so a 2–5 business day range is shown instead of the
  standard band.").
- The upgrade CTA card appears on every result, links to `/pricing`, and contains no
  purchase language.
- All three downloads still work exactly as before, ungated.
- Tests pass unchanged.

**Test steps:** run the three fixture-like scenarios manually (simple job aid; a
moderate course; an unknown-heavy change initiative) and eyeball number consistency.

**Risk:** Low — display only. The export lift is the only scoring.ts touch; verify with
tests.

**Rollback:** `git checkout -- client/src/lib/estimator/scoring.ts client/src/components/estimator/ResultsPage.tsx`.

---

## Task 6 — Pricing / Pro waitlist page

**Goal:** Create `/pricing` announcing Workplace Capability Tools Pro with a waitlist,
so launch traffic produces willingness-to-pay signal before billing exists.

**Files affected:**
- NEW `client/src/pages/Pricing.tsx`
- NEW `client/src/lib/subscribe.ts` (shared submit helper)
- NEW `client/src/lib/entitlements.ts` (Pro gating stub — see step 5)
- `client/src/App.tsx` (route)
- `client/src/components/Header.tsx`, `client/src/components/Footer.tsx` (nav/footer link)
- `client/src/components/estimator/CommunityCapture.tsx` (switch to the shared helper)

**Implementation:**
1. `client/src/lib/subscribe.ts`: export
   `async function subscribe(payload: { email: string; firstName?: string; role?: string;
   source: string }): Promise<{ ok: boolean }>` wrapping the `/api/subscribe` fetch from
   Task 1. Refactor `CommunityCapture.tsx` to use it.
2. `Pricing.tsx` (use Header + Footer like other pages):
   - Hero: badge "Coming Soon"; h1 "Workplace Capability Tools Pro"; subhead: "The free
     Timeline Estimator is just the beginning. Tools Pro brings the full planning toolkit
     for learning, project, program, and change work."
   - Two price cards, visually side-by-side, purple card style:
     - **Project Pass — $9.97 / 30 days.** "Full Pro access for a single planning push.
       Up to 5 saved projects. All Pro tools included."
     - **Annual Pro — $49.97 / year.** Badge "Best value". "Everything in Project Pass,
       for a full year, with a higher project limit."
     - Under both: "Same tools in both plans — you choose the duration."
     - CTA on both cards: "Join the waitlist" (scrolls to the waitlist form).
   - Comparison table. Column headers: **"Free Timeline Estimator"** and **"Workplace
     Capability Tools Pro"**. Rows:
     - Timeline estimates (Free: ✓ unlimited one-off estimates; Pro: ✓ Timeline
       Calculator Pro — saved projects with revision history)
     - Downloadable summaries — PDF, PowerPoint, Word (✓ / ✓)
     - Stakeholder-ready Pro reports (— / ✓ Coming soon)
     - Saved projects (— / ✓ 5 with Project Pass, more with Annual Pro)
     - AI Readiness Assessment (— / ✓ Coming soon)
     - Knowledge Transfer Sprint™ Planner (— / ✓ Coming soon)
     - LaunchReady Planner (— / ✓ Coming soon)
     - Manager Message Kit Builder (— / ✓ Coming soon)
     - Change Readiness Assessment (— / ✓ Coming soon)
     - Learning Needs Diagnostic (— / ✓ Coming soon)
     - Template & resource library (— / ✓ Coming soon)
     Every Pro tool name is PLAIN TEXT with a "Coming soon" label — no links, no routes,
     no click handlers. Footnote: "Pro tools launch progressively; waitlist members get
     first access."
   - Waitlist form (`id="waitlist"`): email (required) + first name (optional), submits
     via `subscribe({ ..., source: 'pro-waitlist' })`; same loading/error/success
     behavior as Task 1. Success copy: "You're on the list — we'll email you when Tools
     Pro opens."
   - Small print: "Prices shown are planned launch pricing and may change. No payment is
     collected today."
3. `App.tsx`: add `<Route path={"/pricing"} component={Pricing} />`.
4. `Header.tsx`: add nav item "Pricing" (desktop + mobile) linking via wouter `<Link>`.
   `Footer.tsx`: add a "Pricing" link wherever the footer lists pages.
5. Create `client/src/lib/entitlements.ts` — the single future gating point:
   ```ts
   /**
    * Central Pro-access check for Workplace Capability Tools Pro.
    * Hardcoded false at launch: no auth or payments exist yet. When Pro access
    * ships, ONLY this module changes — components must never gate Pro features
    * any other way.
    */
   export function hasProAccess(): boolean {
     return false;
   }
   ```
   Nothing needs to consume it yet (this launch renders no functional Pro UI). It exists
   so any future Pro-gated component has exactly one import to use.

**Gating notes:**
- The two plans differ ONLY in duration and project limit. Re-read every sentence of
  card copy against that rule — no feature may appear on one card and not the other.
- This page is marketing + waitlist only. No purchase buttons, no checkout, no "Sign
  up", no account creation, no promised dates.
- The higher-tier future features (custom branding, unlimited projects, client folders,
  team access, corporate dashboards) must NOT appear anywhere on this page, even as
  "coming later" teasers.

**What not to touch:** no Stripe, no auth, no feature-flag systems beyond the
entitlements stub above. Do not promise dates.

**Acceptance criteria:**
- `/pricing` renders with both plans, exact prices $9.97 and $49.97, the comparison
  table, and a working waitlist form (error state in dev, per Task 1).
- Navigation from header, footer, and the Task 3 homepage CTA all reach it client-side.
- Mobile layout stacks cleanly at 375px width.
- No link, route, or button anywhere on the page leads to Pro functionality; every Pro
  item is plain text + "Coming soon".
- Both plan cards list identical features; only duration and project limit differ.
- `entitlements.ts` exists, exports `hasProAccess` returning `false`, and a project-wide
  search for `isPro`/`proAccess`/`hasPro` finds gating logic in no other file.
- The words "custom branding", "unlimited", "client folders", "team", and "dashboard"
  do not appear on the page.

**Test steps:** dev server → visit `/pricing` directly (deep link must work), submit
waitlist with valid/invalid email, resize to mobile, `corepack pnpm check`.

**Risk:** Low — additive page.

**Rollback:** delete the two new files; `git checkout -- client/src/App.tsx client/src/components/Header.tsx client/src/components/Footer.tsx client/src/components/estimator/CommunityCapture.tsx`.

---

## Task 7 — Analytics & template-leftover cleanup

**Goal:** Remove the Manus template's dev tooling and the broken analytics tag that ships
placeholder text (`%VITE_ANALYTICS_ENDPOINT%`) to production.

**Files affected:**
- `client/index.html`
- `vite.config.ts`
- `package.json` (remove one dependency)
- DELETE `client/public/__manus__/` (directory)

**Implementation:**
1. `client/index.html`: delete the entire `<script defer src="%VITE_ANALYTICS_ENDPOINT%/umami" ...>`
   block. In its place leave an HTML comment: `<!-- TODO(owner): add analytics snippet
   (provider not yet chosen) -->`. Do not add any third-party analytics yourself — the
   provider is the owner's decision.
2. `vite.config.ts` — surgical removal only:
   - Remove the `vitePluginManusRuntime` import and its entry in the `plugins` array.
   - Remove the custom plugin definitions named `manus-debug-collector` and
     `manus-storage-proxy` and their registrations.
   - Remove the `.manus-logs` / `LOG_DIR` code that only those plugins used.
   - In `allowedHosts`, remove the `.manus*` host entries; keep localhost/default entries.
   - KEEP: react plugin, tailwindcss plugin, jsx-loc plugin, aliases, build options.
3. `corepack pnpm remove vite-plugin-manus-runtime`.
4. Delete `client/public/__manus__/debug-collector.js` and its directory.
5. Leave `client/public/_redirects`, `ManusDialog.tsx`, `Map.tsx`, and all hooks alone.

**What not to touch:** anything else in vite.config.ts (aliases, build outDir, server
options unrelated to manus); no component deletions.

**Acceptance criteria:**
- `corepack pnpm dev` boots and serves the site; `corepack pnpm build` completes; the
  built `dist/` `index.html` contains no `%VITE_` placeholder and no `__manus__`
  references.
- `grep -ri manus vite.config.ts client/index.html` returns nothing.
- Type-check and tests pass.

**Test steps:** full `dev` smoke test (home, estimator end-to-end, downloads) and a
`build` + `corepack pnpm preview` smoke test.

**Risk:** Medium-High — build config surgery. Work in small steps: after each removal,
re-run `corepack pnpm dev`. If the config breaks in a way you cannot fix in two attempts,
restore with `git checkout -- vite.config.ts` and report exactly which removal failed.

**Rollback:** `git checkout -- vite.config.ts client/index.html package.json pnpm-lock.yaml`;
restore `client/public/__manus__/` from git (`git checkout -- client/public`).

---

## Task 8 — Accessibility pass on the wizard

**Goal:** The answer options are plain buttons with no semantics; errors aren't announced;
expandables and the modal lack ARIA. Bring the core flow to keyboard/screen-reader
usability.

**Files affected:**
- `client/src/components/estimator/QuestionStep.tsx`
- `client/src/components/estimator/ResultsPage.tsx` (ExpandableSection)
- `client/src/components/estimator/EstimatorWizard.tsx` (type-change modal)
- `client/src/components/Header.tsx` (mobile menu button)

**Implementation:**
1. `QuestionStep.tsx`:
   - Give the question label an `id` (e.g. `q-label-${currentQ.id}`).
   - Wrap the options list in `role="radiogroup"` + `aria-labelledby` pointing at it.
   - Each option button: `role="radio"`, `aria-checked={selected}`.
   - Error message `<p>`: add `role="alert"`.
   - Progress bar container: `role="progressbar"`, `aria-valuemin={1}`,
     `aria-valuemax={questionsInOrder.length}`, `aria-valuenow={safeIdx + 1}`,
     `aria-label="Question progress"`.
2. `ResultsPage.tsx` `ExpandableSection`: give the content div an `id`; the toggle button
   gets `aria-expanded={open}` and `aria-controls` of that id. The `+`/`−` character span
   gets `aria-hidden="true"`.
3. `EstimatorWizard.tsx` type-change modal: `role="dialog"`, `aria-modal="true"`,
   `aria-labelledby` on the h3; on open, focus the Cancel button (ref + useEffect);
   Escape key closes (treat as Cancel).
4. `Header.tsx` mobile toggle button: `aria-label={isOpen ? 'Close menu' : 'Open menu'}`,
   `aria-expanded={isOpen}`.

**What not to touch:** visual styles, layout, or the selection logic. Keep native
`<button>` elements (they already handle Enter/Space) — do not convert to divs or add a
custom roving-tabindex implementation.

**Acceptance criteria:**
- Entire wizard is completable with keyboard only (Tab + Enter).
- Skipping a required question announces the error (role="alert" present in DOM).
- Modal: Escape closes it, focus lands on Cancel when it opens.
- No visual regressions; type-check and tests pass.

**Test steps:** keyboard-only run-through of a full estimate; inspect DOM for the ARIA
attributes; open/close each expandable; trigger the type-change modal (pick a type,
advance, go back and pick a different type) and press Escape.

**Risk:** Low — attribute-level changes.

**Rollback:** `git checkout --` the four listed files.

---

## Final verification (after all tasks)

1. `corepack pnpm check` — clean.
2. `corepack pnpm test` — 31/31 passing.
3. `corepack pnpm build` — succeeds; `corepack pnpm preview` smoke test: home →
   pricing → estimator end-to-end (all four initiative types at least to the results
   page) → all three downloads → refresh-resume → community form error state.
4. **Gating verification (all must hold):**
   - A visitor with no account can complete the entire free flow: wizard → full results
     → all three downloads → resume after refresh. Nothing prompts for login or payment.
   - Upgrade CTAs are present in all three places: homepage (Task 3), results page
     (Task 5), pricing page (Task 6) — all linking to `/pricing`, all waitlist language.
   - `/pricing` is the ONLY page where Pro is described; every Pro tool there is plain
     text with a "Coming soon" label — no route in `App.tsx` serves any Pro
     functionality, report, or tool page.
   - Copy audit: "Workplace Capability Tools Pro" is the suite name everywhere;
     "Timeline Calculator Pro" appears only as the Pro version of the estimator on
     `/pricing`; "Lxology Pro" appears nowhere; both plans are described with identical
     features (duration and project limit are the only stated differences).
   - Project-wide grep: `hasProAccess` exists only in `client/src/lib/entitlements.ts`
     (plus imports, if any); no other `isPro`-style flags exist; no Stripe, auth,
     account, or saved-project code exists anywhere.
   - The free tier's copy nowhere promises Pro features as available today, and no
     future higher-tier features (custom branding, unlimited projects, client folders,
     team access, corporate dashboards) are mentioned anywhere on the site.
5. Report: list every file changed per task, any deviations from this packet and why,
   and anything you could not verify locally (e.g. the live `/api/subscribe` webhook).
6. Do not commit or push. Leave the working tree for human review.
