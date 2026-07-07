import type { ToolDefinition } from './types';
import { TIMELINE_TOOL_DEFINITION } from '../tools/timeline/definition';

// Metadata-only registry of known tools. This is NOT a gating mechanism —
// nothing here decides what a user can access. Runtime Pro access is decided
// exclusively by entitlements.hasProAccess(); this registry is not consulted
// for that decision and never will be by design.
export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  [TIMELINE_TOOL_DEFINITION.id]: TIMELINE_TOOL_DEFINITION,
};

export function getToolDefinition(id: string): ToolDefinition | undefined {
  return TOOL_REGISTRY[id];
}

export function listToolDefinitions(): ToolDefinition[] {
  return Object.values(TOOL_REGISTRY);
}
