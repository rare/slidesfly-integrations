#!/usr/bin/env node

import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const repositoryRoot = new URL('../', import.meta.url);
const pluginRoot = new URL('../cursor/slidesfly/', import.meta.url);

const [marketplaceText, manifestText, publicSkill, pluginSkill, publicRunner, pluginRunner, readme] =
  await Promise.all([
    readFile(new URL('.cursor-plugin/marketplace.json', repositoryRoot), 'utf8'),
    readFile(new URL('.cursor-plugin/plugin.json', pluginRoot), 'utf8'),
    readFile(new URL('skills/slidesfly/SKILL.md', repositoryRoot), 'utf8'),
    readFile(new URL('skills/slidesfly/SKILL.md', pluginRoot), 'utf8'),
    readFile(new URL('skills/slidesfly/scripts/slidesfly.mjs', repositoryRoot), 'utf8'),
    readFile(new URL('skills/slidesfly/scripts/slidesfly.mjs', pluginRoot), 'utf8'),
    readFile(new URL('README.md', pluginRoot), 'utf8'),
  ]);

const marketplace = JSON.parse(marketplaceText);
const manifest = JSON.parse(manifestText);

assert.equal(marketplace.name, 'slidesfly-integrations');
assert.equal(marketplace.owner.name, 'Slidesfly');
assert.equal(marketplace.plugins.length, 1);
assert.deepEqual(marketplace.plugins[0], {
  name: 'slidesfly',
  source: './cursor/slidesfly',
  description: 'Publish and manage existing HTML presentation files with Slidesfly.',
});
await access(new URL(`${marketplace.plugins[0].source}/.cursor-plugin/plugin.json`, repositoryRoot));

assert.equal(manifest.name, 'slidesfly');
assert.equal(manifest.displayName, 'Slidesfly');
assert.equal(manifest.version, '0.2.0');
assert.equal(manifest.repository, 'https://github.com/rare/slidesfly-integrations');
assert.equal(manifest.license, 'MIT');
assert.equal(manifest.skills, './skills/');
assert.equal('mcpServers' in manifest, false);

assert.equal(pluginSkill, publicSkill, 'Cursor package Skill drifted from the public Skill mirror.');
assert.equal(
  pluginRunner,
  publicRunner,
  'Cursor package runner drifted from the public Skill mirror.',
);
assert.match(pluginRunner, /^#!\/usr\/bin\/env node/);
assert.match(pluginRunner, /\.name\("slidesfly"\)/);

await assert.rejects(
  access(new URL('mcp.json', pluginRoot)),
  /ENOENT/,
  'Cursor package must not bundle an API-key-only hosted MCP config.',
);
assert.match(readme, /submitted on 2026-08-01/);
assert.match(readme, /has not\s+been accepted or published by Cursor/);
assert.match(readme, /no stable install-time secret-input flow/);
assert.match(readme, /https:\/\/slidesfly\.com\/privacy/);
assert.match(readme, /https:\/\/slidesfly\.com\/terms/);

const packageContent = [marketplaceText, manifestText, pluginSkill, pluginRunner, readme].join('\n');
assert.doesNotMatch(
  packageContent,
  /\bsk_[A-Za-z0-9_-]{12,}\b/,
  'Credential-shaped Slidesfly API key found in the public Cursor package.',
);

console.log('Cursor Marketplace plugin package validation passed.');
