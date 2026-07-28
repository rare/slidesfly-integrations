# Slidev example

Validated dependency targets: `@slidev/cli` 52.18.0 and `@slidev/theme-default` 0.25.0.

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
- confirm required runtime files are inside `dist/`;
- inspect the zip and confirm `index.html` is at its root.

The final zip is a multi-file deck and requires an eligible logged-in Pro account.
