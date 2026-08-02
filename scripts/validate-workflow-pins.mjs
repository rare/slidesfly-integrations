import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const workflowDirectory = path.resolve('.github/workflows');
const workflowFiles = (await readdir(workflowDirectory))
  .filter((file) => /\.ya?ml$/.test(file))
  .sort();
const failures = [];

for (const file of workflowFiles) {
  const source = await readFile(path.join(workflowDirectory, file), 'utf8');
  for (const [index, line] of source.split('\n').entries()) {
    const match = line.match(/^\s*uses:\s*([^\s#]+)/);
    if (!match || match[1].startsWith('./')) continue;

    const reference = match[1];
    if (!/@[0-9a-f]{40}$/.test(reference)) {
      failures.push(`${file}:${index + 1} is not pinned to a full commit: ${reference}`);
      continue;
    }

    if (!/#\s*\S+/.test(line)) {
      failures.push(`${file}:${index + 1} must record the corresponding release tag in a comment`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Validated commit pins in ${workflowFiles.length} workflow files.`);
