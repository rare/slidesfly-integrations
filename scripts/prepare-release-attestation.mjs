import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { buildReleasePredicate, verifyReleaseAssets } from './release-attestation-lib.mjs';

const [assetsDirectory, predicatePath] = process.argv.slice(2);
if (!assetsDirectory || !predicatePath) {
  console.error(
    'Usage: node scripts/prepare-release-attestation.mjs <assets-directory> <predicate-path>',
  );
  process.exit(2);
}

const manifestPath = path.resolve('releases/npm-packages.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const result = await verifyReleaseAssets(manifest, path.resolve(assetsDirectory));
await writeFile(
  path.resolve(predicatePath),
  `${JSON.stringify(buildReleasePredicate(manifest), null, 2)}\n`,
);

console.log(`PASS release assets match ${result.repository}@${result.releaseTag}`);
console.log(`PASS release predicate written to ${path.resolve(predicatePath)}`);
