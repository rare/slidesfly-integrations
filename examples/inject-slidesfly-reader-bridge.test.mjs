import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import vm from 'node:vm';

const script = new URL('./inject-slidesfly-reader-bridge.mjs', import.meta.url);
const fixture = `<!doctype html>
<html>
  <head>
    <script type="module" src="./app.js"></script>
    <script>window.templateClosingBody = '</body>';</script>
  </head>
  <body><div id="app"></div></body>
</html>`;

async function runInjector(framework) {
  const directory = await mkdtemp(join(tmpdir(), 'slidesfly-bridge-'));
  const output = join(directory, 'index.html');
  await writeFile(output, fixture);
  await writeFile(join(directory, 'app.js'), 'const router = { basename:"./" };\n');
  const result = spawnSync(process.execPath, [script.pathname, output, framework], {
    encoding: 'utf8',
  });
  return { directory, output, result };
}

test('injects the Slidev storage fallback before module scripts and the navigation bridge', async () => {
  const { directory, output, result } = await runInjector('slidev');
  try {
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(output, 'utf8');
    const shimIndex = html.indexOf('data-slidesfly-storage-shim');
    const moduleIndex = html.indexOf('type="module"');
    const bridgeIndex = html.indexOf('data-slidesfly-reader-bridge');

    assert.ok(shimIndex > -1);
    assert.ok(moduleIndex > shimIndex);
    assert.ok(bridgeIndex > moduleIndex);
    assert.match(html, /installFallback\('localStorage'\)/);
    assert.match(html, /installFallback\('sessionStorage'\)/);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('injects the Quarto storage fallback before framework scripts and the navigation bridge', async () => {
  const { directory, output, result } = await runInjector('quarto');
  try {
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(output, 'utf8');
    const shimIndex = html.indexOf('data-slidesfly-storage-shim');
    const shimEndIndex = html.indexOf('</script>', shimIndex);
    const scriptIndex = html.indexOf('<script', shimEndIndex + '</script>'.length);
    const bridgeIndex = html.indexOf('data-slidesfly-reader-bridge');

    assert.ok(shimIndex > -1);
    assert.ok(scriptIndex > shimIndex);
    assert.ok(bridgeIndex > scriptIndex);
    assert.match(html, /installFallback\('localStorage'\)/);
    assert.match(html, /installFallback\('sessionStorage'\)/);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('injects the open-slide storage fallback and dispatches navigation on window', async () => {
  const { directory, output, result } = await runInjector('open-slide');
  try {
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(output, 'utf8');
    const moduleSource = await readFile(join(directory, 'app.js'), 'utf8');
    const nestedBaseIndex = html.indexOf('data-open-slide-nested-base');
    const shimIndex = html.indexOf('data-slidesfly-storage-shim');
    const moduleIndex = html.indexOf('type="module"');
    const bridgeIndex = html.indexOf('data-slidesfly-reader-bridge');

    assert.ok(nestedBaseIndex > -1);
    assert.ok(shimIndex > -1);
    assert.ok(nestedBaseIndex < moduleIndex);
    assert.ok(moduleIndex > shimIndex);
    assert.ok(bridgeIndex > moduleIndex);
    assert.match(moduleSource, /basename:window\.__OPEN_SLIDE_BASE__/);
    assert.doesNotMatch(moduleSource, /basename:"\.\/"/);
    assert.match(html, /document\.createElement\('base'\)/);
    assert.match(html, /window\.dispatchEvent\(new KeyboardEvent\('keydown'/);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('is idempotent for an already patched open-slide build', async () => {
  const { directory, output, result } = await runInjector('open-slide');
  try {
    assert.equal(result.status, 0, result.stderr);
    const firstHtml = await readFile(output, 'utf8');
    const firstModule = await readFile(join(directory, 'app.js'), 'utf8');
    const secondResult = spawnSync(process.execPath, [script.pathname, output, 'open-slide'], {
      encoding: 'utf8',
    });
    assert.equal(secondResult.status, 0, secondResult.stderr);
    assert.equal(await readFile(output, 'utf8'), firstHtml);
    assert.equal(await readFile(join(directory, 'app.js'), 'utf8'), firstModule);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('rejects an open-slide module path outside the build directory', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'slidesfly-bridge-'));
  const output = join(directory, 'index.html');
  try {
    await writeFile(output, fixture.replace('./app.js', './../outside.js'));
    const result = spawnSync(process.execPath, [script.pathname, output, 'open-slide'], {
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /module path leaves the build directory/);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('replaces throwing storage accessors with in-memory Storage-compatible values', async () => {
  const { directory, output, result } = await runInjector('slidev');
  try {
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(output, 'utf8');
    const shim = html.match(/<script data-slidesfly-storage-shim>([\s\S]*?)<\/script>/)?.[1];
    assert.ok(shim);

    const window = {};
    for (const name of ['localStorage', 'sessionStorage']) {
      Object.defineProperty(window, name, {
        configurable: true,
        get() {
          throw new DOMException('Blocked in opaque origin', 'SecurityError');
        },
      });
    }

    vm.runInNewContext(shim, { DOMException, Object, String, window });
    window.localStorage.setItem('slide', '2');
    assert.equal(window.localStorage.getItem('slide'), '2');
    assert.equal(window.localStorage.length, 1);
    window.localStorage.removeItem('slide');
    assert.equal(window.localStorage.getItem('slide'), null);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('is idempotent for an already patched Slidev build', async () => {
  const { directory, output, result } = await runInjector('slidev');
  try {
    assert.equal(result.status, 0, result.stderr);
    const first = await readFile(output, 'utf8');
    const secondResult = spawnSync(process.execPath, [script.pathname, output, 'slidev'], {
      encoding: 'utf8',
    });
    assert.equal(secondResult.status, 0, secondResult.stderr);
    assert.equal(await readFile(output, 'utf8'), first);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('is idempotent for an already patched Quarto build', async () => {
  const { directory, output, result } = await runInjector('quarto');
  try {
    assert.equal(result.status, 0, result.stderr);
    const first = await readFile(output, 'utf8');
    const secondResult = spawnSync(process.execPath, [script.pathname, output, 'quarto'], {
      encoding: 'utf8',
    });
    assert.equal(secondResult.status, 0, secondResult.stderr);
    assert.equal(await readFile(output, 'utf8'), first);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('does not add the storage fallback to Marp output', async () => {
  const { directory, output, result } = await runInjector('marp');
  try {
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(output, 'utf8');
    assert.doesNotMatch(html, /data-slidesfly-storage-shim/);
    assert.match(html, /data-slidesfly-reader-bridge/);
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('injects the bridge before the final closing body, not a script string', async () => {
  const { directory, output, result } = await runInjector('quarto');
  try {
    assert.equal(result.status, 0, result.stderr);
    const html = await readFile(output, 'utf8');
    const scriptSentinelIndex = html.indexOf("window.templateClosingBody = '</body>'");
    const bridgeIndex = html.indexOf('data-slidesfly-reader-bridge');
    const finalClosingBodyIndex = html.lastIndexOf('</body>');

    assert.ok(scriptSentinelIndex > -1);
    assert.ok(bridgeIndex > scriptSentinelIndex);
    assert.ok(finalClosingBodyIndex > bridgeIndex);
  } finally {
    await rm(directory, { recursive: true });
  }
});
