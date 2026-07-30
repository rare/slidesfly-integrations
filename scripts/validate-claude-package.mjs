#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packageRoot = new URL('../claude/slidesfly/', import.meta.url);
const publicSkill = await readFile(new URL('../skills/slidesfly/SKILL.md', import.meta.url), 'utf8');
const pluginSkill = await readFile(new URL('skills/slidesfly/SKILL.md', packageRoot), 'utf8');
const manifestText = await readFile(new URL('.claude-plugin/plugin.json', packageRoot), 'utf8');
const mcpText = await readFile(new URL('.mcp.json', packageRoot), 'utf8');
const readme = await readFile(new URL('README.md', packageRoot), 'utf8');

const manifest = JSON.parse(manifestText);
const mcp = JSON.parse(mcpText);

assert.equal(manifest.name, 'slidesfly');
assert.equal(manifest.version, '0.1.1');
assert.equal(manifest.repository, 'https://github.com/rare/slidesfly-integrations');
assert.equal(manifest.userConfig.api_key.type, 'string');
assert.equal(manifest.userConfig.api_key.required, true);
assert.equal(manifest.userConfig.api_key.sensitive, true);

assert.equal(mcp.mcpServers.slidesfly.type, 'http');
assert.equal(mcp.mcpServers.slidesfly.url, 'https://slidesfly.com/api/mcp');
assert.equal(
  mcp.mcpServers.slidesfly.headers.Authorization,
  'Bearer ${user_config.api_key}',
);

assert.equal(pluginSkill, publicSkill, 'Claude package Skill drifted from the public Skill mirror.');
assert.match(readme, /has not yet been submitted to or accepted by/);

const packageContent = [manifestText, mcpText, pluginSkill, readme].join('\n');
assert.doesNotMatch(
  packageContent,
  /\bsk_[A-Za-z0-9_-]{12,}\b/,
  'Credential-shaped Slidesfly API key found in the public Claude package.',
);

console.log('Claude package validation passed.');
