import { useId, useState } from 'react';
import { Link } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Question, Responses, ScoringResult } from '@/lib/estimator/types';
import { PHASE_ALLOCATIONS } from '@/lib/estimator/phases';
import { UNIVERSAL_QUESTIONS, getQuestionsForInitiative, isQuestionVisible } from '@/lib/estimator/questions';
import { ADJUSTMENT_MULTIPLIERS } from '@/lib/estimator/scoring';
import PhaseBar from './PhaseBar';
import DownloadButtons from './DownloadButtons';
import CommunityCapture from './CommunityCapture';

interface ResultsPageProps {
  result: ScoringResult;
  responses: Responses;
  onReset: () => void;
  onEditUniversal: () => void;
  onEditPath: () => void;
}

function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  return (
    <div className="border border-gray-200" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
      >
        <span className="font-semibold text-[#26006B]">{title}</span>
        <span className="text-gray-400 text-lg" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id={contentId} className="px-5 pb-5 space-y-2 border-t border-gray-100">
          {children}
        </div>
      )}
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

// Free-tier answer review: shows the current answers that produced this
// estimate and lets the user jump back to that section to change one. This is
// NOT scenario comparison or saved history — there is exactly one live set of
// responses, and editing recalculates the same estimate in place.
function AnswerGroup({
  title,
  questions,
  responses,
  onEdit,
}: {
  title: string;
  questions: Question[];
  responses: Responses;
  onEdit: () => void;
}) {
  const answered = questions.filter(
    (q) =>
      q.fieldType !== 'text' &&
      isQuestionVisible(q, responses) &&
      typeof responses[q.id] === 'number',
  );

  if (answered.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[#26006B] uppercase tracking-wide">{title}</h3>
        <button
          onClick={onEdit}
          className="text-xs font-semibold text-[#FD6A02] hover:text-[#e55a00] transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2.5">
        {answered.map((q) => {
          const idx = responses[q.id] as number;
          const label = q.options?.[idx]?.label;
          if (!label) return null;
          return (
            <div key={q.id}>
              <p className="text-xs text-gray-500">{q.question}</p>
              <p className="text-sm font-semibold text-[#26006B]">{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Free-tier methodology explanation: a concise, plain-language walkthrough of
// how THIS estimate was produced, built entirely from existing ScoringResult
// fields. This is not a detailed scoring breakdown, scenario comparison, or
// stakeholder-ready methodology appendix — those are reserved for Pro.
function buildMethodologyLines(result: ScoringResult): string[] {
  const lines: string[] = [];

  if (result.isVerySmallLearning) {
    lines.push(
      'This initiative matched the very-small learning profile, so a 2–5 business day range is shown instead of the standard band.',
    );
  }

  lines.push(
    `Your answers were scored across complexity factors: ${result.totalScore} of ${result.maxScore} points (${Math.round(result.scorePercent * 100)}%).`,
  );
  lines.push(
    `That places this ${typeLabel(result.initiativeType)} in the ${result.complexityLevel} complexity band, with a base planning range of ${result.baseRange[0]}–${result.baseRange[1]} weeks.`,
  );

  if (result.topDrivers.length > 0) {
    lines.push(`The biggest contributors to this score: ${result.topDrivers.slice(0, 2).join(' ')}`);
  }

  if (result.adjustmentTier !== 'none') {
    const criticalNote =
      result.criticalRiskCount > 0 ? ` (including ${result.criticalRiskCount} critical)` : '';
    lines.push(
      `${result.riskFlagCount} risk factor(s)${criticalNote} triggered a ${result.adjustmentTier} adjustment, extending the upper bound by ×${ADJUSTMENT_MULTIPLIERS[result.adjustmentTier]} to ${result.adjustedRange[0]}–${result.adjustedRange[1]} weeks.`,
    );
  } else {
    lines.push('No risk adjustment was applied — your answers did not trigger any flagged risk categories.');
  }

  lines.push(
    `Planning confidence is ${result.confidenceLevel}, based on ${result.lowerConfidenceCount} lower-confidence answer(s) and ${result.unknownCount} unknown(s).`,
  );

  if (result.postLaunchWindow) {
    lines.push(
      `Post-launch support scored ${result.postLaunchScore} points, adding a recommended ${result.postLaunchWindow}.`,
    );
  }

  lines.push('This is planning guidance to support your conversations, not a guaranteed delivery date.');

  return lines;
}

export default function ResultsPage({
  result,
  responses,
  onReset,
  onEditUniversal,
  onEditPath,
}: ResultsPageProps) {
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

      {/* Your Answers — review and edit the current estimate's inputs */}
      <ExpandableSection title="Your Answers">
        <div className="space-y-6 pt-2">
          <p className="text-xs text-gray-500">
            Review what you answered. Edit a section to change your answers and
            recalculate this estimate.
          </p>
          <AnswerGroup
            title="Shared questions"
            questions={UNIVERSAL_QUESTIONS.filter((q) => q.id !== 'UQ1' && q.id !== 'UQ2')}
            responses={responses}
            onEdit={onEditUniversal}
          />
          <AnswerGroup
            title={`${typeLabel(result.initiativeType)} questions`}
            questions={getQuestionsForInitiative(result.initiativeType).filter((q) =>
              q.initiativeTypes?.includes(result.initiativeType),
            )}
            responses={responses}
            onEdit={onEditPath}
          />
        </div>
      </ExpandableSection>

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

      {/* How this estimate was calculated — free-tier methodology transparency */}
      <ExpandableSection title="How this estimate was calculated">
        <div className="space-y-4 pt-2">
          <BulletList items={buildMethodologyLines(result)} />
          <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
            Lxology Timeline Methodology · {result.methodologyVersion}
          </p>
        </div>
      </ExpandableSection>

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

      {/* Pro upgrade CTA — waitlist only, no purchase or functional Pro access */}
      <div className="bg-[#26006B]/5 border border-[#26006B]/20 p-6 space-y-3" style={{ borderRadius: '8px' }}>
        <h2 className="font-bold text-[#26006B] text-lg">Planning more than one initiative?</h2>
        <p className="text-sm text-gray-600">
          You're using the free Timeline Calculator. Workplace Capability Tools Pro adds Timeline
          Calculator Pro — saved projects, richer stakeholder-ready reports, and the full
          planning toolkit — plus six more workplace planning tools.
        </p>
        <Link href="/pricing" asChild>
          <a
            className="inline-block bg-[#FD6A02] text-white px-6 py-3 font-semibold hover:bg-[#e55a00] transition-colors duration-200"
            style={{ borderRadius: '4px' }}
          >
            See plans & join the waitlist
          </a>
        </Link>
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
