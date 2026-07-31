import { readFile, writeFile } from 'node:fs/promises';

const [outputPath, framework = 'marp'] = process.argv.slice(2);
if (!outputPath) {
  throw new Error(
    'Usage: node inject-slidesfly-reader-bridge.mjs <built-index.html> [marp|slidev]',
  );
}
if (framework !== 'marp' && framework !== 'slidev') {
  throw new Error('Reader bridge framework must be marp or slidev');
}

const marker = 'data-slidesfly-reader-bridge';
const storageMarker = 'data-slidesfly-storage-shim';
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
    document.dispatchEvent(new KeyboardEvent('keydown', {
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

const html = await readFile(outputPath, 'utf8');
let nextHtml = html;
if (framework === 'slidev' && !nextHtml.includes(storageMarker)) {
  if (!/<head(?:\s[^>]*)?>/i.test(nextHtml)) {
    throw new Error(`Cannot inject Slidev storage shim: ${outputPath} has no <head>`);
  }
  // Slidev initializes storage-backed navigation state from its first module.
  // Install the fallback before any module script executes in the opaque-origin
  // reader sandbox. Real browser storage remains untouched when it is available.
  nextHtml = nextHtml.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}\n${storageShim}`);
}
if (!nextHtml.includes(marker) && !/<\/body>/i.test(nextHtml)) {
  throw new Error(`Cannot inject Slidesfly reader bridge: ${outputPath} has no </body>`);
}
if (!nextHtml.includes(marker)) {
  nextHtml = nextHtml.replace(/<\/body>/i, `${bridge}\n</body>`);
}

if (nextHtml !== html) {
  await writeFile(outputPath, nextHtml);
}
