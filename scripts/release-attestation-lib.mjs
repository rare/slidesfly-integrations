import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const RELEASE_TAG_PATTERN = /^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function assertCondition(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateReleaseManifest(manifest) {
  assertCondition(manifest?.schema_version === 1, 'manifest schema_version must be 1');
  assertCondition(
    typeof manifest.github_repository === 'string' &&
      REPOSITORY_PATTERN.test(manifest.github_repository),
    'manifest github_repository must be an owner/repository slug',
  );
  assertCondition(
    typeof manifest.release_tag === 'string' && RELEASE_TAG_PATTERN.test(manifest.release_tag),
    'manifest release_tag must be a semantic version tag such as v1.2.3',
  );
  assertCondition(
    Array.isArray(manifest.packages) && manifest.packages.length > 0,
    'packages required',
  );

  const filenames = new Set();
  for (const entry of manifest.packages) {
    assertCondition(
      typeof entry.filename === 'string' && path.basename(entry.filename) === entry.filename,
      'package filename must not contain a path',
    );
    assertCondition(!filenames.has(entry.filename), `duplicate package filename: ${entry.filename}`);
    filenames.add(entry.filename);
    assertCondition(/^[0-9a-f]{64}$/.test(entry.sha256), `invalid SHA-256 for ${entry.filename}`);
    assertCondition(/^[0-9a-f]{128}$/.test(entry.sha512), `invalid SHA-512 for ${entry.filename}`);
  }

  return manifest;
}

function parseChecksums(source, algorithm, expectedLength) {
  const checksums = new Map();
  const lines = source.trim().split('\n');

  for (const [index, line] of lines.entries()) {
    const match = line.match(new RegExp(`^([0-9a-f]{${expectedLength}}) [ *](\\S+)$`));
    assertCondition(match, `${algorithm} checksum line ${index + 1} is malformed`);
    assertCondition(!checksums.has(match[2]), `${algorithm} checksum duplicates ${match[2]}`);
    checksums.set(match[2], match[1]);
  }

  return checksums;
}

function assertChecksumSet(checksums, packages, key, algorithm) {
  assertCondition(
    checksums.size === packages.length,
    `${algorithm} checksum file must list exactly the release packages`,
  );
  for (const entry of packages) {
    assertCondition(
      checksums.get(entry.filename) === entry[key],
      `${algorithm} checksum mismatch for ${entry.filename}`,
    );
  }
}

export async function verifyReleaseAssets(manifestInput, directory) {
  const manifest = validateReleaseManifest(manifestInput);
  const sha256Source = await readFile(path.join(directory, 'SHA256SUMS'), 'utf8');
  const sha512Source = await readFile(path.join(directory, 'SHA512SUMS'), 'utf8');
  const sha256Checksums = parseChecksums(sha256Source, 'SHA-256', 64);
  const sha512Checksums = parseChecksums(sha512Source, 'SHA-512', 128);

  assertChecksumSet(sha256Checksums, manifest.packages, 'sha256', 'SHA-256');
  assertChecksumSet(sha512Checksums, manifest.packages, 'sha512', 'SHA-512');

  for (const entry of manifest.packages) {
    const bytes = await readFile(path.join(directory, entry.filename));
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const sha512 = createHash('sha512').update(bytes).digest('hex');
    assertCondition(sha256 === entry.sha256, `release asset SHA-256 mismatch: ${entry.filename}`);
    assertCondition(sha512 === entry.sha512, `release asset SHA-512 mismatch: ${entry.filename}`);
  }

  return {
    releaseTag: manifest.release_tag,
    repository: manifest.github_repository,
    subjectChecksumsPath: path.join(directory, 'SHA256SUMS'),
  };
}

export function buildReleasePredicate(manifestInput) {
  const manifest = validateReleaseManifest(manifestInput);
  return {
    purl: `pkg:github/${manifest.github_repository}@${manifest.release_tag}`,
  };
}
