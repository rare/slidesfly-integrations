import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const expectedAdvisories = new Set([
  'https://github.com/advisories/GHSA-4w7w-66w2-5vf9',
  'https://github.com/advisories/GHSA-67mh-4wv8-2f99',
  'https://github.com/advisories/GHSA-fx2h-pf6j-xcff',
  'https://github.com/advisories/GHSA-qwww-vcr4-c8h2',
  'https://github.com/advisories/GHSA-v6wh-96g9-6wx3',
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
  'open-slide dependency advisories changed; review the new graph before updating this allowlist',
);
assert.equal(report.metadata?.vulnerabilities?.critical, 0, 'critical advisory detected');

console.log('Known open-slide dependency advisory set is unchanged (5 advisories).');
