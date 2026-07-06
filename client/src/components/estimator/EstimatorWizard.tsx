import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { InitiativeType, Responses, ScoringResult } from '@/lib/tools/timeline/types';
import { UNIVERSAL_QUESTIONS, getQuestionsForInitiative } from '@/lib/tools/timeline/questions';
import { calculateScore } from '@/lib/tools/timeline/scoring';
import WelcomeScreen from './WelcomeScreen';
import InitiativeTypeSelect from './InitiativeTypeSelect';
import QuestionStep from './QuestionStep';
import ResultsPage from './ResultsPage';

type Step = 'welcome' | 'type' | 'universal' | 'path' | 'results';

// ─── In-progress draft persistence (Free Timeline Calculator only) ─────────
// Single temporary localStorage draft for resuming an in-progress estimate
// after a refresh. This is NOT account-based saved projects and is not a Pro
// feature — it is cleared the moment the estimate completes (results shown)
// or the user intentionally starts over.
const DRAFT_KEY = 'lxology-estimator-draft-v1';
const DRAFT_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

interface EstimatorDraft {
  version: 1;
  step: Step;
  initiativeType: InitiativeType | null;
  responses: Responses;
  savedAt: number;
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Private browsing / storage disabled — nothing to clear.
  }
}

function readDraft(): EstimatorDraft | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const isValid =
      parsed &&
      parsed.version === 1 &&
      typeof parsed.savedAt === 'number' &&
      Date.now() - parsed.savedAt <= DRAFT_MAX_AGE_MS &&
      parsed.responses &&
      typeof parsed.responses === 'object' &&
      typeof parsed.step === 'string';
    if (isValid) return parsed as EstimatorDraft;
    clearDraft();
    return null;
  } catch {
    clearDraft();
    return null;
  }
}

function writeDraft(draft: EstimatorDraft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Private browsing / storage full — autosave silently no-ops.
  }
}

const STEP_LABELS: Record<Step, string> = {
  welcome: 'Welcome',
  type: 'Choose Type',
  universal: 'Shared Questions',
  path: 'Path Questions',
  results: 'Results',
};

const PROGRESS_STEPS: Step[] = ['type', 'universal', 'path', 'results'];

function StepProgress({ current }: { current: Step }) {
  const idx = PROGRESS_STEPS.indexOf(current);
  return (
    <div className="flex items-center gap-1 mb-10 max-w-lg" aria-label="Estimate progress">
      {PROGRESS_STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step} className="flex items-center gap-1" aria-current={active ? 'step' : undefined}>
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors flex-shrink-0 ${
                active
                  ? 'bg-[#26006B] text-white'
                  : done
                    ? 'bg-[#FD6A02] text-white'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {done ? <FontAwesomeIcon icon={faCheck} className="text-xs" aria-hidden="true" /> : i + 1}
              <span className="sr-only">
                {' '}
                {STEP_LABELS[step]}
                {done ? ' (completed)' : active ? ' (current step)' : ''}
              </span>
            </div>
            <span
              aria-hidden="true"
              className={`text-xs font-medium hidden sm:inline ${
                active ? 'text-[#26006B]' : done ? 'text-[#FD6A02]' : 'text-gray-400'
              }`}
            >
              {STEP_LABELS[step]}
            </span>
            {i < PROGRESS_STEPS.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${done ? 'bg-[#FD6A02]' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Universal questions excluding UQ1 (text, handled inline) and UQ2 (handled by type screen)
const UNIVERSAL_SCORED = UNIVERSAL_QUESTIONS.filter((q) => q.id !== 'UQ1' && q.id !== 'UQ2');

export default function EstimatorWizard() {
  const [step, setStep] = useState<Step>('welcome');
  const [initiativeType, setInitiativeType] = useState<InitiativeType | null>(null);
  const [responses, setResponses] = useState<Responses>({});
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [resumeDraft, setResumeDraft] = useState<EstimatorDraft | null>(null);

  // Check once on mount for a resumable in-progress draft. Drafts saved at
  // 'welcome' (nothing answered yet) or 'results' (already completed) are not
  // resumable and are cleared rather than offered.
  useEffect(() => {
    const draft = readDraft();
    if (draft && draft.step !== 'welcome' && draft.step !== 'results') {
      setResumeDraft(draft);
    } else if (draft) {
      clearDraft();
    }
  }, []);

  // Autosave the in-progress draft. Nothing is persisted at 'welcome' (no
  // progress yet) or 'results' (estimate is complete — draft is cleared
  // explicitly in handlePathSubmit instead).
  useEffect(() => {
    if (step === 'welcome' || step === 'results') return;
    writeDraft({ version: 1, step, initiativeType, responses, savedAt: Date.now() });
  }, [step, initiativeType, responses]);

  function handleResumeDraft() {
    if (!resumeDraft) return;
    setResponses(resumeDraft.responses);
    setInitiativeType(resumeDraft.initiativeType);
    // Guard against a saved 'universal'/'path' step with no initiative type
    // (should not happen in practice, but fall back safely rather than crash).
    const canResumeAtSavedStep =
      resumeDraft.step === 'type' || resumeDraft.initiativeType !== null;
    setStep(canResumeAtSavedStep ? resumeDraft.step : 'type');
    setResumeDraft(null);
  }

  function handleStartFresh() {
    clearDraft();
    setResumeDraft(null);
  }

  function updateResponse(id: string, value: number | string) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  function handleTypeSelect(type: InitiativeType) {
    // Answers for other types' path questions are intentionally retained:
    // scoring and the answers review only read the current type's questions,
    // and retained answers restore if the user switches back to that type.
    setInitiativeType(type);
    updateResponse('UQ2', INITIATIVE_TYPE_INDEX[type]);
  }

  function handleUniversalSubmit() {
    setStep('path');
  }

  function handlePathSubmit() {
    if (!initiativeType) return;
    const scored = calculateScore(responses, initiativeType);
    setResult(scored);
    setStep('results');
    clearDraft();
  }

  function handleReset() {
    clearDraft();
    setStep('welcome');
    setInitiativeType(null);
    setResponses({});
    setResult(null);
    setResumeDraft(null);
  }

  const pathQuestions = initiativeType
    ? getQuestionsForInitiative(initiativeType).filter(
        (q) => q.initiativeTypes?.includes(initiativeType),
      )
    : [];

  return (
    <div>
      {step === 'welcome' && (
        <WelcomeScreen
          onStart={() => setStep('type')}
          resumePrompt={
            resumeDraft
              ? {
                  savedAt: resumeDraft.savedAt,
                  onResume: handleResumeDraft,
                  onStartFresh: handleStartFresh,
                }
              : undefined
          }
        />
      )}

      {step === 'type' && (
        <>
          <StepProgress current="type" />
          <InitiativeTypeSelect
            selected={initiativeType}
            onSelect={handleTypeSelect}
            onBack={() => setStep('welcome')}
            onContinue={() => {
              if (initiativeType) setStep('universal');
            }}
          />
        </>
      )}

      {step === 'universal' && (
        <>
          <StepProgress current="universal" />
          <QuestionStep
            questions={[
              UNIVERSAL_QUESTIONS[0], // UQ1 text field
              ...UNIVERSAL_SCORED,
            ]}
            responses={responses}
            onUpdateResponse={updateResponse}
            onSubmit={handleUniversalSubmit}
            onBack={() => setStep('type')}
            initiativeType={initiativeType!}
            sectionTitle="About Your Initiative"
          />
        </>
      )}

      {step === 'path' && initiativeType && (
        <>
          <StepProgress current="path" />
          <QuestionStep
            questions={pathQuestions}
            responses={responses}
            onUpdateResponse={updateResponse}
            onSubmit={handlePathSubmit}
            onBack={() => setStep('universal')}
            initiativeType={initiativeType}
            sectionTitle={`${initiativeTypeLabel(initiativeType)} Questions`}
          />
        </>
      )}

      {step === 'results' && result && (
        <>
          <StepProgress current="results" />
          <ResultsPage
            result={result}
            responses={responses}
            onReset={handleReset}
            onEditUniversal={() => setStep('universal')}
            onEditPath={() => setStep('path')}
          />
        </>
      )}
    </div>
  );
}

const INITIATIVE_TYPE_INDEX: Record<InitiativeType, number> = {
  learning: 0,
  project: 1,
  program: 2,
  change: 3,
};

function initiativeTypeLabel(type: InitiativeType): string {
  const labels: Record<InitiativeType, string> = {
    learning: 'Learning Initiative',
    project: 'Project',
    program: 'Program',
    change: 'Change Initiative',
  };
  return labels[type];
}
