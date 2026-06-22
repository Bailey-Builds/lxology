interface WelcomeScreenProps {
  onStart: () => void;
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
  'PDF, PowerPoint, and Word downloads',
];

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="space-y-10">
      {/* Hero — text left, panel right, full viewport width */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">

        {/* Left: headline + copy + CTA — 60% */}
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
          <p className="text-base text-gray-500">
            Estimate a realistic planning range for your learning initiative, project,
            program, or change effort, before you commit to a deadline.
          </p>
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
        </div>

        {/* Right: What you'll get — 40% */}
        <div className="flex-1 bg-[#26006B]/5 border border-[#26006B]/10 p-8 space-y-6" style={{ borderRadius: '8px' }}>
          <p className="text-sm font-semibold text-[#26006B] uppercase tracking-wide">What you'll get</p>
          {/* Two explicit columns so items never wrap mid-label */}
          <div className="flex gap-8">
            <div className="flex-1 space-y-4">
              {WHAT_LEFT.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-700 whitespace-nowrap">
                  <span className="text-[#FD6A02] font-bold flex-shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-4">
              {WHAT_RIGHT.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-gray-700 whitespace-nowrap">
                  <span className="text-[#FD6A02] font-bold flex-shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-sm text-gray-500 border-t border-gray-100 pt-6">
        Timeline estimates are directional and intended for planning conversations, not guaranteed delivery dates. This Beta does not calculate team capacity, staffing levels, or organization-specific work velocity.
      </p>
    </div>
  );
}
