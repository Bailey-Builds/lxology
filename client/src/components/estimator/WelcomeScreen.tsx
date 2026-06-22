interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <span
              className="inline-block px-4 py-2 bg-[#FD6A02]/10 text-sm font-semibold text-[#FD6A02] mb-4"
              style={{ borderRadius: '4px' }}
            >
              Beta — Free Planning Tool
            </span>
            <h1
              className="font-bold text-[#26006B] leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Lxology Timeline<br />
              <span className="text-[#FD6A02]">Estimator™</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            A deadline is not the same thing as a realistic timeline.
          </p>
          <p className="text-base text-gray-500 max-w-xl">
            Estimate a realistic planning range for your learning initiative, project,
            program, or change effort, before you commit to a deadline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={onStart}
              className="bg-[#FD6A02] text-white px-7 py-3 font-semibold text-base hover:bg-[#e55a00] transition-colors duration-200"
              style={{ borderRadius: '4px' }}
            >
              Start My Estimate
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Takes approximately <strong className="text-gray-700">5–10 minutes</strong> • No account required • Free to use
          </p>
        </div>

        {/* What you'll get */}
        <div className="lg:w-80 xl:w-96 bg-[#26006B]/5 border border-[#26006B]/10 p-6 space-y-4" style={{ borderRadius: '8px' }}>
          <p className="text-sm font-semibold text-[#26006B] uppercase tracking-wide">What you'll get</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {[
              'Estimated timeline range',
              'Estimate confidence level',
              'Initiative complexity level',
              'Timeline risks and assumptions',
              'Main timeline drivers',
              'Suggested phase breakdown',
              'Recommended next steps',
              'PDF, PowerPoint, and Word downloads',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[#FD6A02] font-bold flex-shrink-0 mt-0.5">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-sm text-gray-500 border-t border-gray-100 pt-6 max-w-3xl">
        Timeline estimates are directional and intended for planning conversations, not guaranteed delivery dates. This Beta does not calculate team capacity, staffing levels, or organization-specific work velocity.
      </p>
    </div>
  );
}
