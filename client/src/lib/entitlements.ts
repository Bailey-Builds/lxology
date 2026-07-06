/**
 * Central Pro-access check for Workplace Capability Tools Pro.
 * Hardcoded false at launch: no auth or payments exist yet. When Pro access
 * ships, ONLY this module changes — components must never gate Pro features
 * any other way.
 */
export function hasProAccess(): boolean {
  return false;
}
