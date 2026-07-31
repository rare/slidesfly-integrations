# Slidev example

Validated dependency targets: `@slidev/cli` 52.18.0 and `@slidev/theme-default` 0.25.0.
The committed dependency graph requires Node `>=22.18.0 <23`.

- Live reader: <https://slidesfly.xyz/d/EPt8Npfya1DZNBm3cfFPHW>
- Last tested: 2026-07-31

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
