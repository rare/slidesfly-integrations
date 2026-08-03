import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const artifact = resolve(process.argv[2] ?? 'build/index.html');
const source = await readFile(artifact);
const html = source.toString('utf8');

const failures = [];
const slideCount = (html.match(/<section(?:\s|>)/g) ?? []).length;

if (!html.includes('reveal.js')) failures.push('Reveal.js runtime marker is missing');
if (!html.includes('Quarto → Slidesfly')) failures.push('expected deck title is missing');
if (slideCount < 5) failures.push(`expected at least 5 slide sections, found ${slideCount}`);
if (source.length > 5 * 1024 * 1024) failures.push('artifact exceeds the current Free 5 MiB limit');
if (/<script\b[^>]*\bsrc=["']https?:\/\//i.test(html)) {
  failures.push('remote script dependency found');
}
if (/<link\b[^>]*\bhref=["']https?:\/\//i.test(html)) {
  failures.push('remote stylesheet dependency found');
}
if (/MathJax|cdn\.jsdelivr\.net\/npm\/mathjax/i.test(html)) {
  failures.push('dynamically loaded MathJax dependency found');
}
if (!html.includes('data-slidesfly-storage-shim')) {
  failures.push('Slidesfly opaque-origin storage fallback is missing');
}
if (!html.includes('data-slidesfly-reader-bridge')) {
  failures.push('Slidesfly reader navigation bridge is missing');
}
if (/\b(?:claim_token|SLIDESFLY_API_KEY)\s*[=:]\s*["'][^"']+/i.test(html)) {
  failures.push('possible Slidesfly credential found');
}

if (failures.length > 0) {
  console.error(`Quarto artifact validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

const sha256 = createHash('sha256').update(source).digest('hex');
console.log(`Validated ${artifact}`);
console.log(`slides=${slideCount} bytes=${source.length} sha256=${sha256}`);
