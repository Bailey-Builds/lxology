import { useState } from 'react';
import { ScoringResult } from '@/lib/estimator/types';
import { PHASE_ALLOCATIONS } from '@/lib/estimator/phases';
import PhaseBar from './PhaseBar';
import DownloadButtons from './DownloadButtons';
import CommunityCapture from './CommunityCapture';

interface ResultsPageProps {
  result: ScoringResult;
  onReset: () => void;
}

function confidenceColor(level: string) {
  if (level === 'High') return 'text-green-700 bg-green-50 border-green-200';
  if (level === 'Moderate-High') return 'text-blue-700 bg-blue-50 border-blue-200';
  if (level === 'Moderate') return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  if (level === 'Low-Moderate') return 'text-orange-700 bg-orange-50 border-orange-200';
  return 'text-red-700 bg-red-50 border-red-200';
}

function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
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
          <span className="mt-1 text-[#FD6A02] flex-shrink-0">•</span>
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
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Initiative header */}
      <div className="text-center space-y-1 pt-2">
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
          {typeLabel(result.initiativeType)} · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <h1 className="text-2xl font-bold text-[#26006B]">{result.initiativeName}</h1>
      </div>

      {/* ── Always open: Timeline / Complexity / Confidence ── */}
      <div className="bg-[#26006B] rounded-2xl p-6 text-white space-y-4">
        <div>
          <p className="text-[#D7E7FF] text-sm font-medium uppercase tracking-wide mb-1">
            Estimated Timeline to Launch
          </p>
          <p className="text-4xl font-bold text-[#FD6A02]">{rangeDisplay}</p>
          {result.postLaunchWindow && (
            <p className="text-[#D7E7FF] text-sm mt-2">
              + Recommended post-launch support:{' '}
              <span className="font-semibold text-white">{result.postLaunchWindow}</span>
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/20">
          <div>
            <p className="text-[#D7E7FF] text-xs uppercase tracking-wide mb-0.5">Complexity</p>
            <p className="text-white font-bold text-lg">{result.complexityLevel}</p>
            <p className="text-[#D7E7FF] text-xs">{Math.round(result.scorePercent * 100)}% of max score</p>
          </div>
          <div>
            <p className="text-[#D7E7FF] text-xs uppercase tracking-wide mb-0.5">Planning Confidence</p>
            <p className="text-white font-bold text-lg">{result.confidenceLevel}</p>
            <p className="text-[#D7E7FF] text-xs">
              {result.confidenceRiskCount} confidence risk{result.confidenceRiskCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Alert banners */}
      {isLowConfidence && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800">
          <strong>Low confidence note:</strong> Several planning details are not yet defined. This estimate should be treated as an early directional range. Clarifying scope, decision-makers, review cycles, materials, dependencies, or rollout expectations may significantly improve accuracy.
        </div>
      )}
      {isHighRisk && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 text-sm text-orange-800">
          <strong>High risk note:</strong> Several risk factors may expand the timeline if not managed early. Review the risk section and recommended next steps before committing to a delivery date.
        </div>
      )}
      {hasUrgentDeadline && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-800">
          <strong>Urgent deadline note:</strong> A fixed or urgent deadline does not reduce the amount of work required. Compressing planning time may increase delivery risk.
        </div>
      )}

      {/* ── Main timeline drivers ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
        <h2 className="font-bold text-[#26006B] text-lg">Main Timeline Drivers</h2>
        <BulletList items={result.topDrivers} />
      </div>

      {/* ── Expandable sections ── */}
      <ExpandableSection title="Timeline Risks">
        <BulletList items={result.riskFlags} />
      </ExpandableSection>

      <ExpandableSection title="Planning Assumptions">
        <BulletList items={result.planningAssumptions} />
      </ExpandableSection>

      {/* ── Action details ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
        <h2 className="font-bold text-[#26006B] text-lg">Recommended Next Steps</h2>
        <BulletList items={result.recommendedNextSteps} />
      </div>

      {/* Phase bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-[#26006B] text-lg">Suggested Timeline Phases</h2>
        <p className="text-sm text-gray-500">
          Approximate effort distribution across this initiative type. Use as a starting point for planning conversations, not a fixed schedule.
        </p>
        <PhaseBar phases={phases} />
        {result.postLaunchWindow && (
          <p className="text-xs text-gray-500 border-t pt-3 mt-3">
            Some initiatives do not end at launch. Additional time may be needed for reinforcement, sustainment, reporting, adoption support, or post-launch updates.
          </p>
        )}
      </div>

      {/* Downloads */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
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
      <div className="text-xs text-gray-400 space-y-2 px-1">
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
      <div className="text-center pt-2">
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
