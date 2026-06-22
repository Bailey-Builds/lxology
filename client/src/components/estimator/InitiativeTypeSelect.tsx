import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faClipboard, faLayerGroup, faArrowsRotate, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  icon: IconDefinition;
}[] = [
  {
    type: 'learning',
    label: 'Learning Initiative',
    question: 'How long will it take to design, develop, review, and finalize this learning experience?',
    examples: 'Courses, workshops, eLearning, job aids, microlearning, learning paths',
    icon: faGraduationCap,
  },
  {
    type: 'project',
    label: 'Project',
    question: 'How long will it take to complete this defined deliverable or body of work?',
    examples: 'Documents, reports, trackers, process updates, pilots, resource libraries, campaigns',
    icon: faClipboard,
  },
  {
    type: 'program',
    label: 'Program',
    question: 'How long will it take to design, coordinate, develop, and launch a multi-part initiative?',
    examples: 'Capability programs, academies, onboarding, multi-course curricula, transformation programs',
    icon: faLayerGroup,
  },
  {
    type: 'change',
    label: 'Change Initiative',
    question: 'How long will it take to prepare people for this change and support adoption?',
    examples: 'Technology rollouts, process changes, policy changes, operating model changes, culture shifts',
    icon: faArrowsRotate,
  },
];

export default function InitiativeTypeSelect({
  selected,
  onSelect,
  onBack,
  onContinue,
}: InitiativeTypeSelectProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-2xl">
        <h2 className="text-2xl font-bold text-[#26006B]">What type of timeline do you need to estimate?</h2>
        <p className="text-sm text-gray-500">
          Select the option that best describes the work you are planning. Each path uses different
          timeline factors to create a more relevant estimate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TYPES.map(({ type, label, question, examples, icon }) => {
          const isSelected = selected === type;
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`w-full text-left p-5 border-2 transition-all duration-150 ${
                isSelected
                  ? 'border-[#26006B] bg-[#26006B]/5'
                  : 'border-gray-200 hover:border-[#26006B]/40 hover:bg-gray-50'
              }`}
              style={{ borderRadius: '8px' }}
            >
              <div className="flex items-start gap-4">
                <FontAwesomeIcon
                  icon={icon}
                  className={`text-xl mt-0.5 flex-shrink-0 ${isSelected ? 'text-[#26006B]' : 'text-gray-400'}`}
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <p className={`font-semibold ${isSelected ? 'text-[#26006B]' : 'text-gray-800'}`}>
                    {label}
                  </p>
                  <p className="text-sm text-gray-600 italic">{question}</p>
                  <p className="text-xs text-gray-400 mt-1">{examples}</p>
                </div>
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 ${
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

      <div className="flex gap-4 pt-2">
        <button
          onClick={onBack}
          className="px-7 py-3 border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors duration-200"
          style={{ borderRadius: '4px' }}
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selected}
          className="bg-[#26006B] text-white px-7 py-3 font-semibold text-base hover:bg-[#1a0047] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          style={{ borderRadius: '4px' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
