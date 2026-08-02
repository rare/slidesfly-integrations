import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const manifestUrl = new URL('../releases/npm-packages.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));

assert.equal(manifest.schema_version, 1);
assert.equal(Array.isArray(manifest.packages), true);
assert.equal(manifest.packages.length, 2);

for (const entry of manifest.packages) {
  const response = await fetch(entry.tarball, { redirect: 'follow' });
  assert.equal(response.status, 200, `${entry.name}@${entry.version} tarball must return HTTP 200`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const sha1 = createHash('sha1').update(bytes).digest('hex');
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const sha512 = createHash('sha512').update(bytes).digest('hex');
  const integrity = `sha512-${createHash('sha512').update(bytes).digest('base64')}`;

  assert.equal(sha1, entry.shasum, `${entry.name} npm shasum drift`);
  assert.equal(sha256, entry.sha256, `${entry.name} SHA-256 drift`);
  assert.equal(sha512, entry.sha512, `${entry.name} SHA-512 drift`);
  assert.equal(integrity, entry.integrity, `${entry.name} npm integrity drift`);
  console.log(`PASS ${entry.name}@${entry.version} ${entry.filename}`);
}
