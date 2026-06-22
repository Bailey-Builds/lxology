import { InitiativeType, Phase } from './types';

export const PHASE_ALLOCATIONS: Record<InitiativeType, Phase[]> = {
  learning: [
    { name: 'Discovery / Planning', percent: 15 },
    { name: 'Design', percent: 20 },
    { name: 'Development', percent: 40 },
    { name: 'Review / Revision', percent: 15 },
    { name: 'Final Production / Launch Prep', percent: 10 },
  ],
  project: [
    { name: 'Planning / Scoping', percent: 20 },
    { name: 'Execution / Development', percent: 40 },
    { name: 'Review / Validation', percent: 20 },
    { name: 'Finalization', percent: 10 },
    { name: 'Handoff / Implementation', percent: 10 },
  ],
  program: [
    { name: 'Discovery / Program Planning', percent: 15 },
    { name: 'Program Design / Architecture', percent: 15 },
    { name: 'Workstream Development', percent: 35 },
    { name: 'Governance / Review / Validation', percent: 15 },
    { name: 'Rollout Preparation', percent: 10 },
    { name: 'Launch / Rollout', percent: 10 },
  ],
  change: [
    { name: 'Change Discovery / Impact Assessment', percent: 15 },
    { name: 'Stakeholder Alignment / Sponsorship', percent: 15 },
    { name: 'Communication and Enablement Planning', percent: 20 },
    { name: 'Readiness Preparation', percent: 20 },
    { name: 'Launch / Implementation Support', percent: 20 },
    { name: 'Measurement Planning', percent: 10 },
  ],
};
