import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

function extractFunction(source, name) {
  const signature = `function ${name}(action) {`;
  const start = source.indexOf(signature);
  assert.notEqual(start, -1, `${name} must exist`);

  const openingBrace = source.indexOf('{', start);
  let depth = 0;
  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }

  throw new Error(`${name} has no closing brace`);
}

function loadHandler(source, context) {
  const handlerSource = extractFunction(source, 'handleSlidesflyAction');
  return vm.runInNewContext(`(${handlerSource})`, context);
}

const unsafeActions = ['constructor', 'hasOwnProperty', 'toString', '__defineSetter__', '__proto__'];

test('plain HTML bridge dispatches only allowlisted actions', async () => {
  const source = await readFile(new URL('./plain-html/deck.html', import.meta.url), 'utf8');
  const calls = [];
  const handler = loadHandler(source, {
    index: 2,
    show: (value) => calls.push(value),
    slides: { length: 5 },
  });

  for (const action of ['next', 'prev', 'first', 'last']) handler(action);
  assert.deepEqual(calls, [3, 1, 0, 4]);

  for (const action of unsafeActions) handler(action);
  assert.deepEqual(calls, [3, 1, 0, 4]);
});

test('Reveal.js bridge dispatches only allowlisted actions', async () => {
  const source = await readFile(new URL('./revealjs/index.html', import.meta.url), 'utf8');
  const calls = [];
  const handler = loadHandler(source, {
    deck: {
      getTotalSlides: () => 5,
      next: () => calls.push('next'),
      prev: () => calls.push('prev'),
      slide: (value) => calls.push(`slide:${value}`),
    },
  });

  for (const action of ['next', 'prev', 'first', 'last']) handler(action);
  assert.deepEqual(calls, ['next', 'prev', 'slide:0', 'slide:4']);

  for (const action of unsafeActions) handler(action);
  assert.deepEqual(calls, ['next', 'prev', 'slide:0', 'slide:4']);
});
