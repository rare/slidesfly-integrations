import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifestPath = new URL('../gemini-extension.json', import.meta.url);
const skillPath = new URL('../skills/slidesfly/SKILL.md', import.meta.url);
const runnerPath = new URL('../skills/slidesfly/scripts/slidesfly.mjs', import.meta.url);

const [manifestText, skill, runner] = await Promise.all([
  readFile(manifestPath, 'utf8'),
  readFile(skillPath, 'utf8'),
  readFile(runnerPath, 'utf8'),
]);
const manifest = JSON.parse(manifestText);

assert.deepEqual(manifest, {
  name: 'slidesfly',
  version: '0.3.0',
  description: 'Publish and manage existing HTML presentation files with Slidesfly.',
  settings: [
    {
      name: 'Slidesfly API Key',
      description: 'API key used by the hosted Slidesfly MCP server.',
      envVar: 'SLIDESFLY_API_KEY',
      sensitive: true,
    },
  ],
  mcpServers: {
    slidesfly: {
      httpUrl: 'https://slidesfly.com/api/mcp',
      headers: {
        Authorization: 'Bearer $SLIDESFLY_API_KEY',
      },
    },
  },
});

assert.match(skill, /^name: slidesfly$/m);
assert.match(skill, /^version: 0\.2\.0$/m);
assert.match(runner, /^#!\/usr\/bin\/env node/);
assert.match(runner, /\.name\("slidesfly"\)/);

const credentialPattern = /\bsk_[A-Za-z0-9_-]{16,}\b/;
assert.equal(
  credentialPattern.test(`${manifestText}\n${skill}\n${runner}`),
  false,
  'Gemini package must not contain a credential-shaped Slidesfly API key',
);

console.log('Gemini CLI extension package is valid.');
