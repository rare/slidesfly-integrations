# Frontend Slides compatibility fixture

This directory contains an independent, reproducible compatibility case for publishing a finished
[`frontend-slides`](https://github.com/zarazhangrui/frontend-slides) HTML presentation with
[Slidesfly](https://slidesfly.com).

It does not modify the upstream project and does not imply endorsement by its maintainers. The
result applies to the pinned source revision and this exact fixture, not to every deck that an Agent
might generate.

## Evidence boundary

| Item | Value |
|---|---|
| Upstream source | `zarazhangrui/frontend-slides` |
| Pinned revision | [`9906a34d640d2111f724544cbc50f7f130569ae1`](https://github.com/zarazhangrui/frontend-slides/tree/9906a34d640d2111f724544cbc50f7f130569ae1) |
| Source license at review time | MIT |
| Reviewed on | 2026-08-01 |
| Mode | New presentation |
| Purpose | Technical compatibility walkthrough |
| Length | 5 slides |
| Density | Low density / speaker-led |
| Style | Swiss Modern safe preset |
| Images | None; CSS-generated geometry only |
| Artifact | One `deck.html` file with inline CSS and JavaScript |
| Editing | Locked fixture; inline editing is intentionally omitted to keep the evidence deterministic |
| Source/live SHA-256 | `57d37de0293a47fe63d44af583e64dab6f93cd05caa4e52109d88a56a15061b9` |

The full upstream `viewport-base.css` from the pinned revision is included in `deck.html`. The deck
uses a fixed 1920×1080 stage, uniformly scales the stage to the viewport, keeps slide switching on
`.active` / `.visible`, supports reduced motion, and includes keyboard, touch, wheel, and Slidesfly
reader-message navigation.

The Google Fonts stylesheet is the only remote presentation asset. The core layout, styling,
navigation, and compatibility bridge remain inline in the HTML artifact. If the font request is
blocked, the browser uses the declared generic fallback without changing the stage geometry.

## Validate locally

Run the deterministic source checks:

```bash
node examples/frontend-slides/validate.mjs
```

Then open `deck.html` in a browser and verify:

1. Slides stay 16:9 at desktop and phone viewport sizes.
2. Arrow keys, Space, Page Up/Down, Home/End, wheel, and horizontal swipe work.
3. Every slide remains inside the 1920×1080 stage.
4. No text overflows its element and no visible panels overlap.
5. A `{ source: 'slidesfly', action: 'next' }` message advances the presentation.

## Publish

Single-file fixtures fit the anonymous publishing path:

```bash
slidesfly publish examples/frontend-slides/deck.html \
  --title "Frontend Slides compatibility fixture" \
  --json
```

Live reader: [open the public Slidesfly proof](https://slidesfly.xyz/d/QyhWAHMa6BU9iYQb8cmmsH).

The source artifact was published, claimed to the Slidesfly project account, switched to `public`,
and live-reader checked on 2026-08-01. Version 1 at
`r.slidesfly.xyz/QyhWAHMa6BU9iYQb8cmmsH/1/index.html` byte-matched the committed source. The
reader rendered all five slides at 1440×900, preserved a 16:9 stage at 390×844, and advanced from
slide 1 to slide 2 with the reader keyboard path. The live proof keeps the same deck ID for later
controlled updates.

The fixture itself produced no browser console errors locally. In the live opaque-origin reader,
Cloudflare's injected `/cdn-cgi/rum` request produced two CORS errors; the deck content and
navigation continued to work. This infrastructure telemetry noise is recorded here rather than
attributed to the upstream deck runtime.

See the [Slidesfly HTML publishing guide](https://slidesfly.com/guides/publish-html-presentation-online)
for the general workflow and current limits.
