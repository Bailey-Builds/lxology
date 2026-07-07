import { describe, it, expect } from 'vitest';
import { TOOL_REGISTRY, getToolDefinition, listToolDefinitions } from './registry';
import { METHODOLOGY_VERSION } from '../tools/timeline/scoring';

// Registry is metadata only. These tests guard its shape and contents —
// never runtime access control, which belongs solely to entitlements.ts.

describe('tool registry', () => {
  it('has exactly one entry', () => {
    expect(Object.keys(TOOL_REGISTRY)).toHaveLength(1);
    expect(listToolDefinitions()).toHaveLength(1);
  });

  it('registers the timeline estimator with the expected metadata', () => {
    const timeline = getToolDefinition('timeline-estimator');
    expect(timeline).toBeDefined();
    expect(timeline?.id).toBe('timeline-estimator');
    expect(timeline?.access).toBe('free');
    expect(timeline?.methodologyVersion).toBe(METHODOLOGY_VERSION);
    expect(timeline?.route).toBe('/timeline-estimator');
  });

  it('returns undefined for an unknown id', () => {
    expect(getToolDefinition('does-not-exist')).toBeUndefined();
  });
});
