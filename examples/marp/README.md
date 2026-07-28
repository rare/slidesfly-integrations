# Marp → Slidesfly example

This example pins `@marp-team/marp-cli` 4.5.0 and exports one self-contained HTML presentation.
It is a local compatibility fixture, not a live public demo.

## Build

```bash
npm install
npm run build
test -f build/index.html
```

## Inspect

Open `build/index.html` in a browser and verify:

- left/right keyboard navigation;
- all four slides render;
- no external network requests are required;
- there are no console errors.

## Publish

```bash
slidesfly publish ./build/index.html --title "Marp publishing example" --json
```

The generated file is expected to fit the single-file publishing path. Check its actual size
against the current anonymous or account limit before publishing.
