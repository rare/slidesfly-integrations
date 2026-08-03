#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const assessmentPath = new URL('../docs/openssf-passing-assessment.md', import.meta.url);

export function validateAssessment(source) {
  const criterionRows = [
    ...source.matchAll(
      /^\| `([a-z0-9_]+)` \| (MUST|SHOULD|SUGGESTED) \| (Met|N\/A|Unmet) \|/gm,
    ),
  ];
  const criterionIds = criterionRows.map((match) => match[1]);
  const duplicateIds = criterionIds.filter((id, index) => criterionIds.indexOf(id) !== index);

  if (criterionRows.length !== 67) {
    throw new Error(`Expected 67 OpenSSF criteria rows, found ${criterionRows.length}`);
  }

  if (duplicateIds.length > 0) {
    throw new Error(`Duplicate OpenSSF criteria: ${[...new Set(duplicateIds)].join(', ')}`);
  }

  for (const unresolvedMarker of ['Owner confirm', 'Merge fix', '→']) {
    if (source.includes(unresolvedMarker)) {
      throw new Error(`Unresolved OpenSSF assessment marker: ${unresolvedMarker}`);
    }
  }

  if (!/does not\s+claim that `rare\/slidesfly-integrations`/.test(source)) {
    throw new Error('The assessment must preserve the pre-award claim boundary');
  }

  return { criterionCount: criterionRows.length };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const source = readFileSync(assessmentPath, 'utf8');
  const result = validateAssessment(source);
  console.log(
    `OpenSSF assessment: ${result.criterionCount} unique criteria; no unresolved markers`,
  );
}
