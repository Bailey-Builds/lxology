import { Phase } from '@/lib/estimator/types';

interface PhaseBarProps {
  phases: Phase[];
}

const PHASE_COLORS = [
  { bg: 'bg-[#26006B]', text: 'text-white' },
  { bg: 'bg-[#5C2D91]', text: 'text-white' },
  { bg: 'bg-[#8B5CF6]', text: 'text-white' },
  { bg: 'bg-[#FD6A02]', text: 'text-white' },
  { bg: 'bg-[#F59E0B]', text: 'text-white' },
  { bg: 'bg-[#D7E7FF]', text: 'text-[#26006B]' },
];

export default function PhaseBar({ phases }: PhaseBarProps) {
  return (
    <div className="space-y-3">
      {/* Bar */}
      <div className="flex rounded-lg overflow-hidden h-8 w-full">
        {phases.map((phase, i) => (
          <div
            key={phase.name}
            className={`${PHASE_COLORS[i % PHASE_COLORS.length].bg} flex items-center justify-center`}
            style={{ width: `${phase.percent}%` }}
            title={`${phase.name}: ${phase.percent}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {phases.map((phase, i) => (
          <div key={phase.name} className="flex items-center gap-1.5 min-w-0">
            <div
              className={`w-3 h-3 rounded-sm flex-shrink-0 ${PHASE_COLORS[i % PHASE_COLORS.length].bg}`}
            />
            <span className="text-xs text-gray-600 truncate">
              <span className="font-semibold text-[#FD6A02]">{phase.percent}%</span> {phase.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
