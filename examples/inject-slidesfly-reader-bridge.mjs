import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';

const [outputPath, framework = 'marp'] = process.argv.slice(2);
if (!outputPath) {
  throw new Error(
    'Usage: node inject-slidesfly-reader-bridge.mjs <built-index.html> [marp|open-slide|quarto|slidev]',
  );
}
if (!['marp', 'open-slide', 'quarto', 'slidev'].includes(framework)) {
  throw new Error('Reader bridge framework must be marp, open-slide, quarto, or slidev');
}

const marker = 'data-slidesfly-reader-bridge';
const storageMarker = 'data-slidesfly-storage-shim';
const nestedBaseMarker = 'data-open-slide-nested-base';
const navigation =
  framework === 'slidev'
    ? `var currentMatch = location.hash.match(/^#\\/(\\d+)/);
    var pageMatch = document.body.innerText.match(/\\b\\d+\\s*\\/\\s*\\d+\\b/);
    if (!currentMatch || !pageMatch) return;
    var current = Number(currentMatch[1]);
    var total = Number(pageMatch[0].split('/')[1].trim());
    var nextByAction = {
      next: Math.min(total, current + 1),
      prev: Math.max(1, current - 1),
      first: 1,
      last: total
    };
    var next = nextByAction[data.action];
    if (!next) return;
    location.hash = '#/' + next;`
    : `var keyByAction = {
      next: 'ArrowRight',
      prev: 'ArrowLeft',
      first: 'Home',
      last: 'End'
    };
    var key = keyByAction[data.action];
    if (!key) return;
    ${(framework === 'open-slide' ? 'window' : 'document')}.dispatchEvent(new KeyboardEvent('keydown', {
      key: key,
      bubbles: false,
      cancelable: true
    }));`;
const bridge = `<script ${marker}>
(function () {
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.source !== 'slidesfly') return;
    ${navigation}
  });
})();
</script>`;
const storageShim = `<script ${storageMarker}>
(function () {
  function createMemoryStorage() {
    var values = Object.create(null);
    var keys = [];
    return {
      get length() {
        return keys.length;
      },
      key: function (index) {
        return keys[index] ?? null;
      },
      getItem: function (key) {
        key = String(key);
        return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : null;
      },
      setItem: function (key, value) {
        key = String(key);
        if (!Object.prototype.hasOwnProperty.call(values, key)) keys.push(key);
        values[key] = String(value);
      },
      removeItem: function (key) {
        key = String(key);
        if (!Object.prototype.hasOwnProperty.call(values, key)) return;
        delete values[key];
        keys = keys.filter(function (entry) {
          return entry !== key;
        });
      },
      clear: function () {
        values = Object.create(null);
        keys = [];
      }
    };
  }

  function installFallback(name) {
    try {
      var storage = window[name];
      var probe = '__slidesfly_storage_probe__';
      storage.setItem(probe, probe);
      storage.removeItem(probe);
      return;
    } catch (error) {
      Object.defineProperty(window, name, {
        configurable: true,
        value: createMemoryStorage()
      });
    }
  }

  installFallback('localStorage');
  installFallback('sessionStorage');
})();
</script>`;
const nestedBaseShim = `<script ${nestedBaseMarker}>
(function () {
  var pathname = window.location.pathname;
  var slash = pathname.lastIndexOf('/');
  var base = pathname.slice(0, slash + 1) || '/';
  window.__OPEN_SLIDE_BASE__ = base;
  var baseElement = document.createElement('base');
  baseElement.href = base;
  document.head.prepend(baseElement);
  if (pathname !== base) {
    window.history.replaceState(null, '', base + window.location.search + window.location.hash);
  }
})();
</script>`;

const html = await readFile(outputPath, 'utf8');
let nextHtml = html;
if (framework === 'open-slide' && !nextHtml.includes(nestedBaseMarker)) {
  const moduleSource = nextHtml.match(
    /<script[^>]+type=["']module["'][^>]+src=["']([^"']+)["']/i,
  )?.[1];
  if (!moduleSource) {
    throw new Error(`Cannot patch open-slide nested base: ${outputPath} has no module script`);
  }
  if (!moduleSource.startsWith('./')) {
    throw new Error(`Cannot patch open-slide nested base: module path must be relative`);
  }
  const outputDirectory = resolve(dirname(outputPath));
  const modulePath = resolve(outputDirectory, moduleSource);
  if (!modulePath.startsWith(`${outputDirectory}${sep}`)) {
    throw new Error(`Cannot patch open-slide nested base: module path leaves the build directory`);
  }
  const moduleSourceText = await readFile(modulePath, 'utf8');
  const basenameNeedle = 'basename:"./"';
  const matches = moduleSourceText.split(basenameNeedle).length - 1;
  if (matches !== 1) {
    throw new Error(
      `Cannot patch open-slide nested base: expected one ${basenameNeedle} in ${modulePath}, found ${matches}`,
    );
  }
  await writeFile(
    modulePath,
    moduleSourceText.replace(basenameNeedle, 'basename:window.__OPEN_SLIDE_BASE__'),
  );
  if (!/<head(?:\s[^>]*)?>/i.test(nextHtml)) {
    throw new Error(`Cannot inject open-slide nested base: ${outputPath} has no <head>`);
  }
  nextHtml = nextHtml.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n${nestedBaseShim}`);
}
if (
  (framework === 'open-slide' || framework === 'quarto' || framework === 'slidev') &&
  !nextHtml.includes(storageMarker)
) {
  if (!/<head(?:\s[^>]*)?>/i.test(nextHtml)) {
    throw new Error(`Cannot inject ${framework} storage shim: ${outputPath} has no <head>`);
  }
  // Slidev and Quarto/Reveal.js initialize storage-backed navigation state early.
  // Install the fallback before any framework script executes in the opaque-origin
  // reader sandbox. Real browser storage remains untouched when available.
  nextHtml = nextHtml.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n${storageShim}`);
}
const closingBodies = [...nextHtml.matchAll(/<\/body>/gi)];
if (!nextHtml.includes(marker) && closingBodies.length === 0) {
  throw new Error(`Cannot inject Slidesfly reader bridge: ${outputPath} has no </body>`);
}
if (!nextHtml.includes(marker)) {
  const closingBodyIndex = closingBodies.at(-1).index;
  nextHtml = `${nextHtml.slice(0, closingBodyIndex)}${bridge}\n${nextHtml.slice(closingBodyIndex)}`;
}

if (nextHtml !== html) {
  await writeFile(outputPath, nextHtml);
}
