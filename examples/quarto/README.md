# Quarto → Slidesfly example

This example renders a Quarto Reveal.js presentation as one self-contained HTML file, then
publishes that generated artifact to Slidesfly.

- Validated Quarto CLI: `1.10.18`
- Artifact: `build/index.html`
- Live reader: <https://slidesfly.xyz/d/CccBkNgODjjYOFcp7vABJV>
- Current reader index: <https://r.slidesfly.xyz/CccBkNgODjjYOFcp7vABJV/5/index.html>
- Evidence state: build, local browser, and live reader verified
- Last tested: 2026-08-03
- Verified artifact: 5 slides, 3,463,302 bytes; SHA-256
  `bc56b6fa5c214bf7d13658911c3e8e27dfb50e9d8c2eee1ecd55d6a9d2066313`.

## Build

Install Quarto `1.10.18` from the official release, verify its published checksum, then run:

```bash
quarto render slides.qmd --output-dir build
test -f build/index.html
node ../inject-slidesfly-reader-bridge.mjs build/index.html quarto
node validate.mjs build/index.html
```

The validator requires at least five rendered slide sections, rejects remote script and stylesheet
dependencies, checks for obvious Slidesfly credential material, enforces the current Free 5 MiB
limit, requires the reader bridge and opaque-origin storage fallback, and prints the artifact size
and SHA-256 checksum.

## Inspect

Serve `build/` with a local static server and verify:

- all five slides render at desktop and mobile viewport sizes;
- Left/Right keys advance and reverse the deck;
- fullscreen works when initiated by the viewer;
- no blocking browser-console error appears;
- no fixture-authored remote script or stylesheet request occurs.

Quarto documents `embed-resources: true` as a way to create a standalone HTML file, but dynamically
loaded resources and some advanced Reveal.js features may still be incompatible. This fixture does
not use math rendering, Chalkboard, multiplex, speaker-view dependencies, remote scripts, or remote
media. `html-math-method: plain` prevents Quarto's default MathJax runtime from loading dynamically.
The shared injector installs in-memory `localStorage` and `sessionStorage` only when real browser
storage throws in the reader sandbox; it leaves normal browser storage unchanged.

## Publish

Run the bundled public Slidesfly runner from this repository:

```bash
node ../../skills/slidesfly/scripts/slidesfly.mjs publish \
  ./build/index.html \
  --title "Quarto publishing example" \
  --visibility public \
  --json
```

Do not commit the JSON receipt, claim token, API key, or local Slidesfly configuration. Record only
the stable reader URL, verification date, non-secret artifact checksum, and observed limitations.
Use `--visibility unlisted` instead when the deck should not appear in public discovery surfaces.

The Quarto `1.10.18` artifact verified on 2026-08-03 is about 3.3 MiB. It exceeds the current 1 MiB
anonymous limit but fits the authenticated Free 5 MiB limit. The public reader returned HTTP 200,
and browser proof advanced the sandboxed presentation from slide 1 to slide 5. Desktop navigation
and a 390x844 mobile viewport rendered without fixture-authored console errors or remote runtime
dependencies.

Cloudflare Browser Insights injected a platform-level RUM request on the reader content domain. Its
opaque-origin POST failed CORS and can emit a two-message console error pair on load or navigation;
it did not block the deck and is not a dependency authored by this fixture.
