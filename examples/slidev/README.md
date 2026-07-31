# Slidev example

Validated dependency targets: `@slidev/cli` 52.18.1 and `@slidev/theme-default` 0.25.0.
The committed dependency graph requires Node `>=22.18.0 <23`.

- Live reader: <https://slidesfly.xyz/d/EPt8Npfya1DZNBm3cfFPHW>
- Current reader index: <https://r.slidesfly.xyz/EPt8Npfya1DZNBm3cfFPHW/4/index.html>
- Last tested: 2026-08-01
- Verified artifact: 49 files, 803,544 uncompressed bytes, 343,533-byte zip.
- `index.html`: 3,596 bytes; SHA-256
  `03e4d5ee614917178784854b1775c73066f4610127bdddbac022a1b1ef7fbad4`.

```bash
npm install
npm run build
test -f dist/index.html
cd dist && zip -r ../slidev-example.zip . && cd ..
```

Before publishing:

- serve `dist/` with a local static server;
- verify all three slides;
- verify Arrow keys and fullscreen;
- verify a Slidesfly `postMessage` navigation action advances the deck;
- confirm required runtime files are inside `dist/`;
- inspect the zip and confirm `index.html` is at its root.

The build command injects two compatibility helpers into `dist/index.html`:

- an early in-memory `localStorage` / `sessionStorage` fallback for Slidesfly's opaque-origin
  sandbox (real browser storage remains untouched when available);
- the Slidesfly reader navigation bridge.

Publish the generated archive, not an unpatched Slidev build.

The final zip is a multi-file deck and requires an eligible logged-in Pro account.

Browser proof advanced the production reader from slide 1 to slide 2. Cloudflare Browser Insights
also injected a platform-level beacon whose opaque-origin RUM POST failed CORS; it did not block the
deck and is not a fixture-authored dependency.
