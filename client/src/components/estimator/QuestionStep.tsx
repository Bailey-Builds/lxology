import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Question, Responses, InitiativeType } from '@/lib/estimator/types';

interface QuestionStepProps {
  questions: Question[];
  responses: Responses;
  onUpdateResponse: (id: string, value: number | string) => void;
  onSubmit: () => void;
  onBack: () => void;
  initiativeType: InitiativeType;
  sectionTitle: string;
}

function isVisible(q: Question, responses: Responses): boolean {
  if (q.required !== 'conditional' || !q.showWhen || q.showWhen.length === 0) return true;
  return q.showWhen.some(({ questionId, answerIndices }) => {
    const val = responses[questionId];
    return typeof val === 'number' && answerIndices.includes(val);
  });
}

export default function QuestionStep({
  questions,
  responses,
  onUpdateResponse,
  onSubmit,
  onBack,
  sectionTitle,
}: QuestionStepProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [error, setError] = useState(false);
  const [fading, setFading] = useState(false);

  const textQ = questions.find((q) => q.fieldType === 'text');
  const scoredQ = questions.filter((q) => q.fieldType !== 'text' && isVisible(q, responses));
  const questionsInOrder: Question[] = [...(textQ ? [textQ] : []), ...scoredQ];

  const safeIdx = Math.min(currentIdx, questionsInOrder.length - 1);
  const currentQ = questionsInOrder[safeIdx];
  const isLast = safeIdx === questionsInOrder.length - 1;
  const progress = questionsInOrder.length > 0 ? (safeIdx + 1) / questionsInOrder.length : 0;

  function transition(nextIdx: number) {
    setFading(true);
    setTimeout(() => {
      setCurrentIdx(nextIdx);
      setError(false);
      setFading(false);
    }, 200);
  }

  function handleContinue() {
    if (!currentQ) return;
    if (
      currentQ.fieldType !== 'text' &&
      currentQ.required === 'required' &&
      typeof responses[currentQ.id] !== 'number'
    ) {
      setError(true);
      return;
    }
    if (isLast) {
      onSubmit();
    } else {
      transition(safeIdx + 1);
    }
  }

  function handleBack() {
    if (safeIdx > 0) {
      transition(safeIdx - 1);
    } else {
      onBack();
    }
  }

  if (!currentQ) return null;

  return (
    <div className="space-y-8 pb-12">

      {/* Section header + progress bar */}
      <div className="space-y-3 max-w-2xl">
        <h2 className="text-2xl font-bold text-[#26006B]">{sectionTitle}</h2>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-xs">
            <div
              className="bg-[#FD6A02] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {safeIdx + 1} of {questionsInOrder.length}
          </span>
        </div>
      </div>

      {/* Question — fades between transitions */}
      <div
        className="max-w-2xl transition-opacity duration-200"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {currentQ.fieldType === 'text' ? (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              {currentQ.question}
              <span className="ml-2 text-xs text-gray-400 font-normal">optional</span>
            </label>
            <input
              type="text"
              value={(responses[currentQ.id] as string) ?? ''}
              onChange={(e) => onUpdateResponse(currentQ.id, e.target.value)}
              placeholder="e.g., CRM Adoption Rollout"
              className="w-full px-4 py-2.5 border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 text-sm"
              style={{ borderRadius: '4px' }}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                {currentQ.question}
                {currentQ.required === 'required' && (
                  <span className="ml-1.5 text-[#FD6A02]">*</span>
                )}
              </label>
              {error && (
                <p className="text-xs text-red-500 mt-1">Please select an option to continue.</p>
              )}
            </div>
            <div className="space-y-2">
              {currentQ.options?.map((opt, idx) => {
                const selected = responses[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => { onUpdateResponse(currentQ.id, idx); setError(false); }}
                    className={`w-full text-left px-4 py-3 border-2 transition-all duration-150 ${
                      selected
                        ? 'border-[#26006B] bg-[#26006B]/5 text-[#26006B]'
                        : 'border-gray-200 hover:border-[#26006B]/40 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ borderRadius: '4px' }}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                    {opt.helperText && (
                      <span className="block text-xs text-gray-500 mt-0.5">{opt.helperText}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 max-w-2xl">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#26006B] transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-[#26006B] text-white px-7 py-3 font-semibold text-base hover:bg-[#FD6A02] transition-colors duration-200"
          style={{ borderRadius: '4px' }}
        >
          {isLast ? 'See My Results' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
