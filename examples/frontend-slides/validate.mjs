import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const deckUrl = new URL('./deck.html', import.meta.url);
const readmeUrl = new URL('./README.md', import.meta.url);
const html = await readFile(deckUrl, 'utf8');
const readme = await readFile(readmeUrl, 'utf8');

assert.match(html, /<!doctype html>/i);
assert.equal((html.match(/<section class="slide/g) ?? []).length, 5);
assert.match(html, /width: 1920px;/);
assert.match(html, /height: 1080px;/);
assert.match(html, /classList\.toggle\('active', active\)/);
assert.match(html, /classList\.toggle\('visible', active\)/);
assert.match(html, /prefers-reduced-motion: reduce/);
assert.match(html, /setupKeyboardNav\(\)/);
assert.match(html, /setupTouchNav\(\)/);
assert.match(html, /setupWheelNav\(\)/);
assert.match(html, /data\.source !== 'slidesfly'/);
assert.match(html, /data\.action === 'next'/);
assert.doesNotMatch(html, /<script[^>]+src=/i);
assert.match(
  readme,
  /9906a34d640d2111f724544cbc50f7f130569ae1/,
  'README must pin the tested upstream revision',
);
assert.match(readme, /does not imply endorsement/);

console.log('Frontend Slides compatibility source checks: PASS');
