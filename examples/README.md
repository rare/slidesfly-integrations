# Slidesfly publishing examples

These fixtures demonstrate the artifact shapes accepted by Slidesfly.

| Directory | Artifact | Validation | Live reader |
|---|---|---|---|
| `plain-html/` | One self-contained HTML file | Open `deck.html` directly | [Open](https://slidesfly.xyz/d/hPTjZDoztFZRUFkbDzGbgz) |
| `codex-generated/` | One self-contained Agent-generated deck | Open `deck.html` directly | [Open](https://slidesfly.xyz/d/n9d4qxI5r3qGOBg637y2BK) |
| `revealjs/` | Reveal.js multi-file output | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/nlTgWEixO2Ik0wYT9KsLDg) |
| `slidev/` | Slidev multi-file output | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/EPt8Npfya1DZNBm3cfFPHW) |
| `marp/` | Marp self-contained HTML output | `npm ci && npm run build` | [Open](https://slidesfly.xyz/d/0IL3JvWNsXBEpXA342r9ug) |

Single-file examples can use anonymous publishing when they fit the current limit:

```bash
slidesfly publish examples/plain-html/deck.html --title "Plain HTML example" --json
```

Framework directories contain their exact packaging instructions. Multi-file zip publishing
requires an eligible authenticated plan and `index.html` at the archive root.

All five reader URLs were published as public, owned decks. The framework source/reader pairs were
rebuilt, byte-matched, and browser-checked on 2026-08-01.

See the
[framework compatibility matrix](https://slidesfly.com/guides/html-presentation-framework-compatibility)
for current evidence and reader constraints.
