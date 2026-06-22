import { useState } from 'react';
import { InitiativeType, Responses, ScoringResult } from '@/lib/estimator/types';
import { UNIVERSAL_QUESTIONS, getQuestionsForInitiative } from '@/lib/estimator/questions';
import { calculateScore } from '@/lib/estimator/scoring';
import WelcomeScreen from './WelcomeScreen';
import InitiativeTypeSelect from './InitiativeTypeSelect';
import QuestionStep from './QuestionStep';
import ResultsPage from './ResultsPage';

type Step = 'welcome' | 'type' | 'universal' | 'path' | 'results';

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
    <div className="flex items-center justify-center gap-1 mb-8">
      {PROGRESS_STEPS.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step} className="flex items-center gap-1">
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                active
                  ? 'bg-[#26006B] text-white'
                  : done
                    ? 'bg-[#FD6A02] text-white'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {done ? '✓' : i + 1}
            </div>
            <span
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
  const [pendingTypeChange, setPendingTypeChange] = useState<InitiativeType | null>(null);

  function updateResponse(id: string, value: number | string) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  function handleTypeSelect(type: InitiativeType) {
    if (initiativeType && type !== initiativeType && step !== 'type') {
      // Warn about resetting path questions
      setPendingTypeChange(type);
    } else {
      setInitiativeType(type);
      updateResponse('UQ2', INITIATIVE_TYPE_INDEX[type]);
    }
  }

  function confirmTypeChange() {
    if (!pendingTypeChange) return;
    // Clear path-specific responses
    const pathPrefix = { learning: 'LQ', project: 'PQ', program: 'PRQ', change: 'CQ' };
    const clearedResponses: Responses = { ...responses };
    for (const key of Object.keys(clearedResponses)) {
      for (const prefix of Object.values(pathPrefix)) {
        if (key.startsWith(prefix)) {
          delete clearedResponses[key];
          break;
        }
      }
    }
    setResponses(clearedResponses);
    setInitiativeType(pendingTypeChange);
    updateResponse('UQ2', INITIATIVE_TYPE_INDEX[pendingTypeChange]);
    setPendingTypeChange(null);
  }

  function handleUniversalSubmit() {
    setStep('path');
  }

  function handlePathSubmit() {
    if (!initiativeType) return;
    const scored = calculateScore(responses, initiativeType);
    setResult(scored);
    setStep('results');
  }

  function handleReset() {
    setStep('welcome');
    setInitiativeType(null);
    setResponses({});
    setResult(null);
    setPendingTypeChange(null);
  }

  const pathQuestions = initiativeType
    ? getQuestionsForInitiative(initiativeType).filter(
        (q) => q.initiativeTypes?.includes(initiativeType),
      )
    : [];

  return (
    <div>
      {/* Type change confirmation dialog */}
      {pendingTypeChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="font-bold text-[#26006B] text-lg">Change initiative type?</h3>
            <p className="text-sm text-gray-600">
              Changing the initiative type will reset the path-specific questions. Your shared
              responses will remain saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPendingTypeChange(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmTypeChange}
                className="flex-1 px-4 py-2 bg-[#26006B] text-white rounded-xl text-sm font-semibold hover:bg-[#3d0099]"
              >
                Yes, change type
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'welcome' && (
        <WelcomeScreen onStart={() => setStep('type')} />
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
          <ResultsPage result={result} onReset={handleReset} />
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
