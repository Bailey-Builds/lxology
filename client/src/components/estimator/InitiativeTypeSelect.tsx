import { InitiativeType } from '@/lib/estimator/types';

interface InitiativeTypeSelectProps {
  selected: InitiativeType | null;
  onSelect: (type: InitiativeType) => void;
  onBack: () => void;
  onContinue: () => void;
}

const TYPES: {
  type: InitiativeType;
  label: string;
  question: string;
  examples: string;
  icon: string;
}[] = [
  {
    type: 'learning',
    label: 'Learning Initiative',
    question: 'How long will it take to design, develop, review, and finalize this learning experience?',
    examples: 'Courses, workshops, eLearning, job aids, microlearning, learning paths',
    icon: '🎓',
  },
  {
    type: 'project',
    label: 'Project',
    question: 'How long will it take to complete this defined deliverable or body of work?',
    examples: 'Documents, reports, trackers, process updates, pilots, resource libraries, campaigns',
    icon: '📋',
  },
  {
    type: 'program',
    label: 'Program',
    question: 'How long will it take to design, coordinate, develop, and launch a multi-part initiative?',
    examples: 'Capability programs, academies, onboarding, multi-course curricula, transformation programs',
    icon: '🗂',
  },
  {
    type: 'change',
    label: 'Change Initiative',
    question: 'How long will it take to prepare people for this change and support adoption?',
    examples: 'Technology rollouts, process changes, policy changes, operating model changes, culture shifts',
    icon: '🔄',
  },
];

export default function InitiativeTypeSelect({
  selected,
  onSelect,
  onBack,
  onContinue,
}: InitiativeTypeSelectProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-[#26006B]">What type of timeline do you need to estimate?</h2>
        <p className="text-sm text-gray-500">
          Select the option that best describes the work you are planning. Each path uses different
          timeline factors to create a more relevant estimate.
        </p>
      </div>

      <div className="space-y-3">
        {TYPES.map(({ type, label, question, examples, icon }) => {
          const isSelected = selected === type;
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-150 ${
                isSelected
                  ? 'border-[#26006B] bg-[#26006B]/5'
                  : 'border-gray-200 hover:border-[#26006B]/40 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">{icon}</span>
                <div className="space-y-1 min-w-0">
                  <p className={`font-semibold ${isSelected ? 'text-[#26006B]' : 'text-gray-800'}`}>
                    {label}
                  </p>
                  <p className="text-sm text-gray-600 italic">{question}</p>
                  <p className="text-xs text-gray-400">{examples}</p>
                </div>
                <div className={`ml-auto flex-shrink-0 w-5 h-5 rounded-full border-2 mt-1 ${
                  isSelected ? 'border-[#26006B] bg-[#26006B]' : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selected}
          className="flex-1 sm:flex-none sm:min-w-[140px] px-6 py-2.5 bg-[#26006B] hover:bg-[#3d0099] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
