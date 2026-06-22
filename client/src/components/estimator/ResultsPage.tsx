import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { ScoringResult } from '@/lib/estimator/types';
import { PHASE_ALLOCATIONS } from '@/lib/estimator/phases';
import PhaseBar from './PhaseBar';
import DownloadButtons from './DownloadButtons';
import CommunityCapture from './CommunityCapture';

interface ResultsPageProps {
  result: ScoringResult;
  onReset: () => void;
}

function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-[#26006B]">{title}</span>
        <span className="text-gray-400 text-lg">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-5 pb-5 space-y-2 border-t border-gray-100">{children}</div>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-gray-700">
          <FontAwesomeIcon icon={faCircle} className="mt-1 text-[#FD6A02] flex-shrink-0 text-[6px]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    learning: 'Learning Initiative',
    project: 'Project',
    program: 'Program',
    change: 'Change Initiative',
  };
  return labels[type] ?? type;
}

export default function ResultsPage({ result, onReset }: ResultsPageProps) {
  const phases = PHASE_ALLOCATIONS[result.initiativeType];
  const isLowConfidence = result.confidenceLevel === 'Low' || result.confidenceLevel === 'Low-Moderate';
  const isHighRisk = result.riskFlagCount >= 6 || result.criticalRiskCount >= 2;
  const hasUrgentDeadline = result.riskFlags.some((r) => r.includes('urgent') || r.includes('fixed'));

  const rangeDisplay = result.isVerySmallLearning
    ? '2–5 business days'
    : `${result.adjustedRange[0]}–${result.adjustedRange[1]} weeks`;

  return (
    <div className="space-y-6 pb-16">
      {/* Initiative header */}
      <div className="space-y-1">
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
          {typeLabel(result.initiativeType)} · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <h1 className="text-3xl font-bold text-[#26006B]">{result.initiativeName}</h1>
      </div>

      {/* ── Top row: Timeline card + Complexity/Confidence ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Timeline — takes 2 cols */}
        <div className="lg:col-span-2 bg-[#26006B] p-6 text-white space-y-4" style={{ borderRadius: '8px' }}>
          <p className="text-[#D7E7FF] text-sm font-medium uppercase tracking-wide">
            Estimated Timeline to Launch
          </p>
          <p className="text-5xl font-bold text-[#FD6A02]">{rangeDisplay}</p>
          {result.postLaunchWindow && (
            <p className="text-[#D7E7FF] text-sm">
              + Recommended post-launch support:{' '}
              <span className="font-semibold text-white">{result.postLaunchWindow}</span>
            </p>
          )}
        </div>

        {/* Complexity + Confidence stacked */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-[#26006B]/5 border border-[#26006B]/15 p-5" style={{ borderRadius: '8px' }}>
            <p className="text-[#26006B] text-xs uppercase tracking-wide font-medium mb-1">Complexity</p>
            <p className="text-[#26006B] font-bold text-xl">{result.complexityLevel}</p>
            <p className="text-gray-500 text-xs mt-1">{Math.round(result.scorePercent * 100)}% of max score</p>
          </div>
          <div className="flex-1 bg-[#D7E7FF]/50 border border-[#26006B]/15 p-5" style={{ borderRadius: '8px' }}>
            <p className="text-[#26006B] text-xs uppercase tracking-wide font-medium mb-1">Planning Confidence</p>
            <p className="text-[#26006B] font-bold text-xl">{result.confidenceLevel}</p>
            <p className="text-gray-500 text-xs mt-1">
              {result.confidenceRiskCount} confidence risk{result.confidenceRiskCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Alert banners */}
      {isLowConfidence && (
        <div className="bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800" style={{ borderRadius: '8px' }}>
          <strong>Low confidence note:</strong> Several planning details are not yet defined. This estimate should be treated as an early directional range. Clarifying scope, decision-makers, review cycles, materials, dependencies, or rollout expectations may significantly improve accuracy.
        </div>
      )}
      {isHighRisk && (
        <div className="bg-orange-50 border border-orange-200 px-5 py-4 text-sm text-orange-800" style={{ borderRadius: '8px' }}>
          <strong>High risk note:</strong> Several risk factors may expand the timeline if not managed early. Review the risk section and recommended next steps before committing to a delivery date.
        </div>
      )}
      {hasUrgentDeadline && (
        <div className="bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-800" style={{ borderRadius: '8px' }}>
          <strong>Urgent deadline note:</strong> A fixed or urgent deadline does not reduce the amount of work required. Compressing planning time may increase delivery risk.
        </div>
      )}

      {/* ── Main content: two-column on large screens ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main drivers */}
        <div className="bg-white border border-gray-200 p-6 space-y-3" style={{ borderRadius: '8px' }}>
          <h2 className="font-bold text-[#26006B] text-lg">Main Timeline Drivers</h2>
          <BulletList items={result.topDrivers} />
        </div>

        {/* Recommended next steps */}
        <div className="bg-white border border-gray-200 p-6 space-y-3" style={{ borderRadius: '8px' }}>
          <h2 className="font-bold text-[#26006B] text-lg">Recommended Next Steps</h2>
          <BulletList items={result.recommendedNextSteps} />
        </div>
      </div>

      {/* Expandable details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExpandableSection title="Timeline Risks">
          <BulletList items={result.riskFlags} />
        </ExpandableSection>
        <ExpandableSection title="Planning Assumptions">
          <BulletList items={result.planningAssumptions} />
        </ExpandableSection>
      </div>

      {/* Phase bar — full width */}
      <div className="bg-white border border-gray-200 p-6 space-y-4" style={{ borderRadius: '8px' }}>
        <div>
          <h2 className="font-bold text-[#26006B] text-lg">Suggested Timeline Phases</h2>
          <p className="text-sm text-gray-500 mt-1">
            Approximate effort distribution. Use as a starting point for planning conversations, not a fixed schedule.
          </p>
        </div>
        <PhaseBar phases={phases} />
        {result.postLaunchWindow && (
          <p className="text-xs text-gray-500 border-t pt-3 mt-3">
            Some initiatives do not end at launch. Additional time may be needed for reinforcement, sustainment, reporting, adoption support, or post-launch updates.
          </p>
        )}
      </div>

      {/* Downloads */}
      <div className="bg-white border border-gray-200 p-6 space-y-4" style={{ borderRadius: '8px' }}>
        <div>
          <h2 className="font-bold text-[#26006B] text-lg">Download Your Planning Summary</h2>
          <p className="text-sm text-gray-500 mt-1">
            No account required. Download your results in the format that works for your team.
          </p>
        </div>
        <DownloadButtons result={result} />
      </div>

      {/* Community CTA */}
      <CommunityCapture />

      {/* Methodology + disclaimer */}
      <div className="text-xs text-gray-400 space-y-2 px-1 border-t border-gray-100 pt-6">
        <p>
          <strong>Methodology:</strong> This estimate is based on Lxology's planning framework, professional
          practitioner experience, and common timeline factors. It does not calculate team capacity, staffing
          levels, or organization-specific work velocity.
        </p>
        <p>
          <strong>Disclaimer:</strong> Timeline estimates are directional and intended for planning
          conversations, not guaranteed delivery dates. Actual timelines may vary based on resource
          availability, decision-making speed, scope changes, and implementation constraints.
        </p>
      </div>

      {/* Start another */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="text-sm text-[#26006B] underline underline-offset-2 hover:text-[#5C2D91] transition-colors"
        >
          Start Another Estimate
        </button>
      </div>
    </div>
  );
}
