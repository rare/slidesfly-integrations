import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const outputDirectory = path.resolve(process.argv[2] ?? 'dist');
const indexPath = path.join(outputDirectory, 'index.html');
const html = await readFile(indexPath, 'utf8');

assert.match(html, /data-slidesfly-storage-shim/, 'storage fallback is missing');
assert.match(html, /data-slidesfly-reader-bridge/, 'reader navigation bridge is missing');
assert.match(html, /data-open-slide-nested-base/, 'nested-path base shim is missing');
assert.match(html, /document\.createElement\('base'\)/, 'runtime base element is missing');
assert.match(html, /window\.dispatchEvent\(new KeyboardEvent\('keydown'/, 'bridge must target window');
assert.doesNotMatch(html, /(?:src|href)=["']\/(?!\/)/, 'root-relative assets break nested readers');

const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else files.push(absolute);
  }
}
await walk(outputDirectory);

assert.ok(files.length > 1, 'expected a multi-file static build');
assert.ok(files.some((file) => file.includes(`${path.sep}assets${path.sep}`)), 'assets directory is missing');

const javascriptFiles = files.filter((file) => file.endsWith('.js'));
const javascriptSource = (
  await Promise.all(javascriptFiles.map((file) => readFile(file, 'utf8')))
).join('\n');
assert.match(
  javascriptSource,
  /basename:window\.__OPEN_SLIDE_BASE__/,
  'open-slide router is not patched for nested artifact paths',
);
assert.doesNotMatch(javascriptSource, /basename:"\.\/"/, 'relative basename still breaks the router');

const totalBytes = (
  await Promise.all(files.map(async (file) => (await stat(file)).size))
).reduce((sum, size) => sum + size, 0);

console.log(
  JSON.stringify(
    {
      artifact: path.relative(process.cwd(), outputDirectory),
      files: files.length,
      bytes: totalBytes,
      indexBytes: Buffer.byteLength(html),
      storageShim: true,
      nestedBaseShim: true,
      readerBridge: true,
    },
    null,
    2,
  ),
);
