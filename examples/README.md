# Slidesfly publishing examples

These fixtures demonstrate the artifact shapes accepted by Slidesfly.

| Directory | Artifact | Validation | Live reader |
|---|---|---|---|
| `plain-html/` | One self-contained HTML file | Open `deck.html` directly | [Open](https://slidesfly.xyz/d/hPTjZDoztFZRUFkbDzGbgz) |
| `codex-generated/` | One self-contained Agent-generated deck | Open `deck.html` directly | [Open](https://slidesfly.xyz/d/n9d4qxI5r3qGOBg637y2BK) |
| `frontend-slides/` | One pinned Frontend Slides compatibility fixture | `node examples/frontend-slides/validate.mjs` | [Open](https://slidesfly.xyz/d/QyhWAHMa6BU9iYQb8cmmsH) |
| `revealjs/` | Reveal.js multi-file output | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/nlTgWEixO2Ik0wYT9KsLDg) |
| `slidev/` | Slidev multi-file output | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/EPt8Npfya1DZNBm3cfFPHW) |
| `marp/` | Marp self-contained HTML output | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/0IL3JvWNsXBEpXA342r9ug) |
| `quarto/` | Quarto self-contained Reveal.js output | `quarto render slides.qmd --output-dir build && node ../inject-slidesfly-reader-bridge.mjs build/index.html quarto && node validate.mjs build/index.html` | [Open](https://slidesfly.xyz/d/CccBkNgODjjYOFcp7vABJV) |

Single-file examples can use anonymous publishing when they fit the current limit:

```bash
slidesfly publish examples/plain-html/deck.html --title "Plain HTML example" --json
```

Framework directories contain their exact packaging instructions. Multi-file zip publishing
requires an eligible authenticated plan and `index.html` at the archive root.

The seven linked reader URLs are public, owned decks. The first six framework source/reader pairs were rebuilt,
byte-matched, and browser-checked on 2026-08-01. The Frontend Slides fixture records its separate
pinned-source and live-reader evidence in its directory. The Quarto fixture records its separate
2026-08-03 build, local-browser, and live-reader evidence in its directory.

See the
[framework compatibility matrix](https://slidesfly.com/guides/html-presentation-framework-compatibility)
for current evidence and reader constraints.
