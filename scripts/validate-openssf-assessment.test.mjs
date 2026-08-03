import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { validateAssessment } from './validate-openssf-assessment.mjs';

const assessment = readFileSync(
  new URL('../docs/openssf-passing-assessment.md', import.meta.url),
  'utf8',
);

test('accepts the complete submitted assessment', () => {
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

test('rejects missing official passing-status evidence', () => {
  const withoutBoundary = assessment.replace(
    '[official OpenSSF project page](https://www.bestpractices.dev/projects/13940)',
    'OpenSSF project page',
  );
  assert.throws(
    () => validateAssessment(withoutBoundary),
    /The assessment must preserve the official passing-status evidence/,
  );
});
