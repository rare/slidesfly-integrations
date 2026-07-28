# Slidesfly publishing examples

These fixtures demonstrate the artifact shapes accepted by Slidesfly.

| Directory | Artifact | Validation |
|---|---|---|
| `plain-html/` | One self-contained HTML file | Open `deck.html` directly |
| `codex-generated/` | One self-contained Agent-generated deck | Open `deck.html` directly |
| `revealjs/` | Reveal.js multi-file output | `npm ci && npm run build` |
| `slidev/` | Slidev multi-file output | `npm ci && npm run build` |
| `marp/` | Marp self-contained HTML output | `npm ci && npm run build` |

Single-file examples can use anonymous publishing when they fit the current limit:

```bash
slidesfly publish examples/plain-html/deck.html --title "Plain HTML example" --json
```

Framework directories contain their exact packaging instructions. Multi-file zip publishing
requires an eligible authenticated plan and `index.html` at the archive root.

See the
[framework compatibility matrix](https://slidesfly.com/guides/html-presentation-framework-compatibility)
for current evidence and reader constraints.
