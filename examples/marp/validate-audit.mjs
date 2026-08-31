import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const expectedAdvisories = new Set([
  'https://github.com/advisories/GHSA-jmr9-qjv8-65gv',
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
  'Marp dependency advisories changed; review the new graph before updating this allowlist',
);
assert.deepEqual(
  report.metadata?.vulnerabilities,
  { info: 0, low: 0, moderate: 0, high: 4, critical: 0, total: 4 },
  'Marp vulnerability counts changed; review the new graph before updating this allowlist',
);

console.log('Known Marp dependency advisory set is unchanged (1 advisory).');
