# Reveal.js example

Validated dependency target: Reveal.js 6.0.1.

```bash
npm install
npm run build
test -f build/index.html
cd build && zip -r ../revealjs-example.zip . && cd ..
```

Before publishing:

- serve `build/` with a local static server;
- verify all three slides;
- verify Arrow keys and fullscreen;
- confirm the browser makes no remote script request;
- inspect the zip and confirm `index.html` is at its root.

The final zip is a multi-file deck and requires an eligible logged-in Pro account.
