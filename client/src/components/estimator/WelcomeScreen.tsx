interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[#D7E7FF] text-[#26006B] text-xs font-semibold px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FD6A02] animate-pulse" />
        Beta — Free Planning Tool
      </div>

      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#26006B] leading-tight">
          Lxology Timeline<br />
          <span className="text-[#FD6A02]">Estimator™</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          A deadline is not the same thing as a realistic timeline.
        </p>
        <p className="text-base text-gray-500 max-w-lg mx-auto">
          Generate a realistic planning timeline for your learning initiative, project,
          program, or change effort — before you commit to a delivery date.
        </p>
      </div>

      {/* What you'll get */}
      <div className="bg-[#26006B]/5 border border-[#26006B]/10 rounded-2xl p-6 text-left space-y-3">
        <p className="text-sm font-semibold text-[#26006B] uppercase tracking-wide">What you'll get</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Realistic timeline range',
            'Planning confidence level',
            'Main timeline drivers',
            'Risk factors and assumptions',
            'Recommended next steps',
            'Phase allocation breakdown',
            'PDF, PowerPoint, and Word downloads',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-[#FD6A02] font-bold">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-500">
        <p>Takes approximately <strong className="text-gray-700">5–10 minutes</strong> · No account required · Free to use</p>
        <p>
          Supports four paths: Learning Initiative, Project, Program, and Change Initiative.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="px-10 py-4 bg-[#FD6A02] hover:bg-[#e05a00] text-white font-bold text-lg rounded-2xl transition-colors shadow-lg shadow-[#FD6A02]/30"
      >
        Start My Estimate
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 max-w-md mx-auto">
        Timeline estimates are directional and intended for planning conversations, not as guaranteed
        delivery dates. This Beta version does not calculate team capacity, staffing levels, or
        organization-specific work velocity.
      </p>
    </div>
  );
}
