# Slidesfly publishing examples

These fixtures demonstrate the artifact shapes accepted by Slidesfly.

| Directory | Artifact | Validation | Live reader |
|---|---|---|---|
| `plain-html/` | One self-contained HTML file | Open `deck.html` directly | [Open](https://slidesfly.xyz/d/hPTjZDoztFZRUFkbDzGbgz) |
| `codex-generated/` | One self-contained Agent-generated deck | Open `deck.html` directly | [Open](https://slidesfly.xyz/d/n9d4qxI5r3qGOBg637y2BK) |
| `frontend-slides/` | One pinned Frontend Slides compatibility fixture | `node examples/frontend-slides/validate.mjs` | [Open](https://slidesfly.xyz/d/QyhWAHMa6BU9iYQb8cmmsH) |
| `open-slide/` | open-slide multi-file static build | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/G38P7MGbJ2eMyFMmITVWc2) |
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

The eight linked reader URLs are public, owned decks. The first six framework source/reader pairs
were rebuilt, byte-matched, and browser-checked on 2026-08-01. The Frontend Slides, Quarto, and
open-slide fixtures record their separate build and live-reader evidence in their directories.

See the
[framework compatibility matrix](https://slidesfly.com/guides/html-presentation-framework-compatibility)
for current evidence and reader constraints.
