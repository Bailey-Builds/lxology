import type { ToolDefinition } from '../../tool-engine/types';
import { METHODOLOGY_VERSION } from './scoring';

// Registry entry for the Free Timeline Calculator. `access` is descriptive
// metadata only — it does not gate anything. Runtime Pro access is decided
// exclusively by entitlements.hasProAccess(); nothing reads this field for
// gating purposes.
export const TIMELINE_TOOL_DEFINITION: ToolDefinition = {
  id: 'timeline-estimator',
  name: 'Lxology Timeline Estimator™',
  marketingName: 'Free Timeline Calculator',
  access: 'free',
  methodologyVersion: METHODOLOGY_VERSION,
  route: '/timeline-estimator',
};
