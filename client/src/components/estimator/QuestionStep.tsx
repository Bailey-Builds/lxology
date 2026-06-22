import { useState, useEffect } from 'react';
import { Question, Responses, InitiativeType } from '@/lib/estimator/types';
import { getQuestionsForInitiative } from '@/lib/estimator/questions';

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
  // Show if ANY condition group matches
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
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [attempted, setAttempted] = useState(false);

  const visibleQuestions = questions.filter((q) => q.fieldType !== 'text' && isVisible(q, responses));
  const textQ = questions.find((q) => q.fieldType === 'text');

  function validate(): boolean {
    const missing = new Set<string>();
    for (const q of visibleQuestions) {
      if (q.required === 'required' && typeof responses[q.id] !== 'number') {
        missing.add(q.id);
      }
    }
    setErrors(missing);
    return missing.size === 0;
  }

  function handleSubmit() {
    setAttempted(true);
    if (validate()) onSubmit();
  }

  // Revalidate on response change after first attempt
  useEffect(() => {
    if (attempted) validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses, attempted]);

  const allRequired = visibleQuestions.filter((q) => q.required === 'required');
  const answered = allRequired.filter((q) => typeof responses[q.id] === 'number');
  const progress = allRequired.length > 0 ? answered.length / allRequired.length : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#26006B]">{sectionTitle}</h2>
        {allRequired.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-[#FD6A02] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {answered.length} / {allRequired.length}
            </span>
          </div>
        )}
      </div>

      {/* Optional text field (initiative name) */}
      {textQ && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800">
            {textQ.question}
            <span className="ml-2 text-xs text-gray-400 font-normal">optional</span>
          </label>
          <input
            type="text"
            value={(responses[textQ.id] as string) ?? ''}
            onChange={(e) => onUpdateResponse(textQ.id, e.target.value)}
            placeholder="e.g., CRM Adoption Rollout"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#26006B] focus:outline-none focus:ring-2 focus:ring-[#26006B]/20 text-sm"
          />
        </div>
      )}

      {/* Single-select questions */}
      {visibleQuestions.map((q) => (
        <div key={q.id} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              {q.question}
              {q.required === 'required' && (
                <span className="ml-1.5 text-[#FD6A02]">*</span>
              )}
            </label>
            {errors.has(q.id) && (
              <p className="text-xs text-red-500 mt-1">Please select an option to continue.</p>
            )}
          </div>
          <div className="space-y-2">
            {q.options?.map((opt, idx) => {
              const selected = responses[q.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => onUpdateResponse(q.id, idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 ${
                    selected
                      ? 'border-[#26006B] bg-[#26006B]/5 text-[#26006B]'
                      : 'border-gray-200 hover:border-[#26006B]/40 hover:bg-gray-50 text-gray-700'
                  }`}
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
      ))}

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 sm:flex-none sm:min-w-[140px] px-6 py-2.5 bg-[#26006B] hover:bg-[#3d0099] text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
