import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const expectedAdvisories = new Set([
  'https://github.com/advisories/GHSA-5p2g-fcmc-qvqq',
  'https://github.com/advisories/GHSA-w3rx-r6r6-pgpr',
]);

const result = spawnSync('npm', ['audit', '--json'], { encoding: 'utf8' });
assert.ok(result.stdout, `npm audit returned no JSON output: ${result.stderr}`);

const report = JSON.parse(result.stdout);
const actualAdvisories = new Set();
for (const vulnerability of Object.values(report.vulnerabilities ?? {})) {
  for (const cause of vulnerability.via ?? []) {
    if (typeof cause === 'object' && cause.url) actualAdvisories.add(cause.url);
  }
}

assert.deepEqual(
  [...actualAdvisories].sort(),
  [...expectedAdvisories].sort(),
  'Slidev dependency advisories changed; review the new graph before updating this allowlist',
);
assert.deepEqual(
  report.metadata?.vulnerabilities,
  { info: 0, low: 0, moderate: 0, high: 4, critical: 0, total: 4 },
  'Slidev vulnerability counts changed; review the new graph before updating this allowlist',
);

console.log('Known Slidev dependency advisory set is unchanged (2 advisories).');
