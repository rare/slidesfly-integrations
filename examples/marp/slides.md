---
marp: true
theme: default
paginate: true
title: Marp to Slidesfly
description: A self-contained Marp HTML publishing example for Slidesfly.
---

<!-- _class: lead -->

# Marp → Slidesfly

Export Markdown as one HTML presentation, then publish the file.

---

## Why this path is different

- Marp CLI can emit a self-contained HTML file.
- A single file can use Slidesfly's anonymous or Free publishing path.
- No framework runtime directory needs to be zipped for this example.

---

## Build

```bash
npm install
npm run build
```

The result is `build/index.html`.

---

## Publish

```bash
slidesfly publish ./build/index.html \
  --title "Marp publishing example" \
  --json
```

Test keyboard navigation and sizing before sharing the reader URL.
