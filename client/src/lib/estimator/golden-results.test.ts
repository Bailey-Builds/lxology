import { describe, it, expect } from 'vitest';
import { calculateScore } from './scoring';
import { GOLDEN_FIXTURES } from './fixtures';
import { EXPECTED_RESULTS } from './golden-results.expected';

// ─── Full-object golden freeze ──────────────────────────────────────────────
// Behavior-preservation net for the tool-engine extraction (and any future
// refactor): the COMPLETE calculateScore output for each fixture — every
// number and every generated sentence — must deep-equal the frozen literals
// in golden-results.expected.ts.
//
// If this fails during a refactor, the refactor changed behavior: revert the
// refactor. Regenerate the expected file ONLY for a deliberate, owner-approved
// methodology change (and bump METHODOLOGY_VERSION when you do).

describe('golden freeze: full calculateScore output', () => {
  for (const fixture of GOLDEN_FIXTURES) {
    it(`${fixture.name} output is frozen`, () => {
      const actual = JSON.parse(JSON.stringify(calculateScore(fixture.responses, fixture.type)));
      expect(actual).toEqual(EXPECTED_RESULTS[fixture.name]);
    });
  }
});
