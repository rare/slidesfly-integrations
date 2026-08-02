import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  buildReleasePredicate,
  validateReleaseManifest,
  verifyReleaseAssets,
} from './release-attestation-lib.mjs';

function digest(algorithm, bytes) {
  return createHash(algorithm).update(bytes).digest('hex');
}

function fixtureManifest(bytes) {
  return {
    schema_version: 1,
    github_repository: 'rare/slidesfly-integrations',
    release_tag: 'v1.2.3',
    packages: [
      {
        filename: 'example.tgz',
        sha256: digest('sha256', bytes),
        sha512: digest('sha512', bytes),
      },
    ],
  };
}

async function writeFixture(directory, bytes, manifest = fixtureManifest(bytes)) {
  await writeFile(path.join(directory, 'example.tgz'), bytes);
  await writeFile(
    path.join(directory, 'SHA256SUMS'),
    `${manifest.packages[0].sha256}  example.tgz\n`,
  );
  await writeFile(
    path.join(directory, 'SHA512SUMS'),
    `${manifest.packages[0].sha512}  example.tgz\n`,
  );
  return manifest;
}

test('validates release assets and builds the scoped release predicate', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'slidesfly-release-attestation-'));
  const bytes = Buffer.from('verified release artifact');
  const manifest = await writeFixture(directory, bytes);

  const result = await verifyReleaseAssets(manifest, directory);

  assert.deepEqual(result, {
    releaseTag: 'v1.2.3',
    repository: 'rare/slidesfly-integrations',
    subjectChecksumsPath: path.join(directory, 'SHA256SUMS'),
  });
  assert.deepEqual(buildReleasePredicate(manifest), {
    purl: 'pkg:github/rare/slidesfly-integrations@v1.2.3',
  });
});

test('rejects a release asset that does not match the manifest', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'slidesfly-release-attestation-'));
  const expectedBytes = Buffer.from('expected');
  const manifest = await writeFixture(directory, expectedBytes);
  await writeFile(path.join(directory, 'example.tgz'), 'tampered');

  await assert.rejects(
    verifyReleaseAssets(manifest, directory),
    /release asset SHA-256 mismatch: example.tgz/,
  );
});

test('rejects path traversal and malformed release metadata', () => {
  const bytes = Buffer.from('artifact');
  const manifest = fixtureManifest(bytes);
  manifest.packages[0].filename = '../example.tgz';

  assert.throws(() => validateReleaseManifest(manifest), /package filename must not contain a path/);
  assert.throws(
    () => validateReleaseManifest({ ...fixtureManifest(bytes), release_tag: 'main' }),
    /release_tag must be a semantic version tag/,
  );
});
