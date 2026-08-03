import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { validateAssessment } from './validate-openssf-assessment.mjs';

const assessment = readFileSync(
  new URL('../docs/openssf-passing-assessment.md', import.meta.url),
  'utf8',
);

test('accepts the complete submission draft', () => {
  assert.deepEqual(validateAssessment(assessment), { criterionCount: 67 });
});

test('rejects unresolved owner and merge markers', () => {
  for (const marker of ['Owner confirm', 'Merge fix', '→']) {
    assert.throws(
      () => validateAssessment(`${assessment}\n${marker}`),
      new RegExp(`Unresolved OpenSSF assessment marker: ${marker}`),
    );
  }
});

test('rejects duplicate criterion identifiers', () => {
  const duplicated = assessment.replace('`interact`', '`description_good`');
  assert.throws(
    () => validateAssessment(duplicated),
    /Duplicate OpenSSF criteria: description_good/,
  );
});

test('rejects a missing pre-award claim boundary', () => {
  const withoutBoundary = assessment.replace('does not\nclaim that', 'claims that');
  assert.throws(
    () => validateAssessment(withoutBoundary),
    /The assessment must preserve the pre-award claim boundary/,
  );
});
