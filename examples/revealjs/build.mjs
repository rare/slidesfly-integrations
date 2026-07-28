import { cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = import.meta.dirname;
const output = join(root, 'build');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, 'index.html'), join(output, 'index.html'));
await cp(join(root, 'node_modules', 'reveal.js', 'dist'), join(output, 'dist'), {
  recursive: true,
});

console.log(`Built Reveal.js example at ${output}`);
