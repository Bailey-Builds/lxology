import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ResumePrompt {
  savedAt: number;
  onResume: () => void;
  onStartFresh: () => void;
}

interface WelcomeScreenProps {
  onStart: () => void;
  resumePrompt?: ResumePrompt;
}

const WHAT_LEFT = [
  'Estimated timeline range',
  'Initiative complexity level',
  'Main timeline drivers',
  'Recommended next steps',
];

const WHAT_RIGHT = [
  'Estimate confidence level',
  'Timeline risks and assumptions',
  'Suggested phase breakdown',
  'PDF, PowerPoint, and Word summaries',
];

export default function WelcomeScreen({ onStart, resumePrompt }: WelcomeScreenProps) {
  return (
    <div className="space-y-10">
      {/* Two-column layout: columns own their outer edges */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-20">

        {/* Left 60% — left edge padding lives here */}
        <div className="lg:w-[60%] flex-shrink-0 space-y-6 py-2">
          <div>
            <span
              className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02] mb-4"
              style={{ borderRadius: '4px' }}
            >
              Beta — Free Planning Tool
            </span>
            <h1
              className="font-bold text-[#26006B] leading-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)' }}
            >
              Lxology Timeline<br />
              <span className="text-[#FD6A02]">Estimator™</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            A deadline is not the same thing as a realistic timeline.
          </p>
          <p className="text-base text-gray-500" style={{ maxWidth: '640px' }}>
            Estimate a realistic planning range for your learning initiative, project,
            program, or change effort before you commit to a deadline.
          </p>
          {resumePrompt && (
            <div
              className="border border-[#26006B]/20 bg-[#D7E7FF]/40 p-4 space-y-3"
              style={{ borderRadius: '8px', maxWidth: '640px' }}
            >
              <p className="text-sm text-[#26006B]">
                <strong>You have an unfinished estimate</strong> from{' '}
                {new Date(resumePrompt.savedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                .
              </p>
              <div className="flex gap-3">
                <button
                  onClick={resumePrompt.onResume}
                  aria-label="Resume your unfinished estimate"
                  className="px-4 py-2 bg-[#26006B] text-white text-sm font-semibold hover:bg-[#3d0099] transition-colors duration-200"
                  style={{ borderRadius: '4px' }}
                >
                  Resume
                </button>
                <button
                  onClick={resumePrompt.onStartFresh}
                  aria-label="Discard the unfinished estimate and start fresh"
                  className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                  style={{ borderRadius: '4px' }}
                >
                  Start fresh
                </button>
              </div>
            </div>
          )}
          <div>
            <button
              onClick={onStart}
              className="bg-[#FD6A02] text-white px-7 py-3 font-semibold text-base hover:bg-[#e55a00] transition-colors duration-200"
              style={{ borderRadius: '4px' }}
            >
              Start My Estimate
            </button>
          </div>
          <p className="text-sm text-[#26006B]">
            Takes approximately <strong>5–10 minutes</strong> • No account required • Free to use
          </p>
          <div className="text-sm text-gray-500 border-t border-gray-100 pt-4 space-y-1">
            <p>Timeline estimates are directional and intended for planning conversations, not guaranteed delivery dates.</p>
            <p>This Beta does not calculate team capacity, staffing levels, or organization-specific work velocity.</p>
          </div>
        </div>

        {/* Right 40% — right edge padding lives here */}
        <div className="flex-1 lg:self-center">
          <div className="bg-[#26006B]/5 border border-[#26006B]/10 p-8 space-y-6" style={{ borderRadius: '8px' }}>
            <p className="text-sm font-semibold text-[#26006B] uppercase tracking-wide">What you'll get</p>
            <div className="space-y-3">
              {[...WHAT_LEFT, ...WHAT_RIGHT].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <FontAwesomeIcon icon={faCheck} className="text-[#FD6A02] flex-shrink-0 text-xs mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
