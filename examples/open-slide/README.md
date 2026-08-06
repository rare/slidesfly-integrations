# open-slide example

This fixture demonstrates a reproducible multi-file build from
[`open-slide`](https://github.com/1weiho/open-slide) to a public
[Slidesfly](https://slidesfly.com) reader URL.

It does not modify open-slide and does not imply endorsement by its maintainers. The result applies
to the pinned release and this fixture, not to every deck that an Agent might generate.

## Evidence boundary

| Item | Value |
|---|---|
| Upstream source | `1weiho/open-slide` |
| Reviewed upstream revision | [`2dc2b910eef38068e9ddb71c13e3c12ea84d6d1e`](https://github.com/1weiho/open-slide/tree/2dc2b910eef38068e9ddb71c13e3c12ea84d6d1e) |
| Source license at review time | MIT |
| Validated dependency | `@open-slide/core` 1.17.1 |
| Node.js | 22.23.2 |
| Reviewed and live-tested | 2026-08-06 |
| Artifact | 10 files, 1,065,017 uncompressed bytes; 348,893-byte zip |
| Zip SHA-256 | `41553951caa13b842c1f651977f069871aa1bc76148ac22e0f742942f171ffe5` |
| `index.html` SHA-256 | `e6d6bf27260ce8db448964392b92c6a63ddafe4bb736677b64f9919ef6a777eb` |

The standard `open-slide build` output uses relative asset paths but compiles React Router with a
relative basename. The shared post-build helper makes that output work at a nested artifact path,
adds an opaque-origin storage fallback, and maps Slidesfly reader messages to open-slide's window
keyboard navigation. Its fail-closed checks are covered by the repository's bridge tests.

## Build and validate

```bash
npm ci
npm run build
cd dist && zip -r ../open-slide-example.zip . && cd ..
```

The validator checks that `index.html` is at the archive root, assets are relative, the build is
multi-file, and all three compatibility patches are present. Generated `dist/` and zip files are
not committed.

`open-slide` 1.17.1 emits Vite's chunk-size warning for its 840,560-byte main runtime chunk. The
fixture records that upstream build characteristic instead of suppressing it. The build still
completes and the browser loads the generated chunk.

At review time, `npm audit` also reports five inherited advisories through open-slide's Vite 5 and
React Router dependencies; npm currently surfaces them across seven packages. This fixture
publishes static files only: it exposes neither the Vite development server nor React Router server
actions, so the reviewed exploit paths are not active in the published deck. The Slidesfly
integrations maintainer owns re-running the audit on each open-slide upgrade; dependency overrides
require a separate compatibility review. CI pins the current advisory URL set with
`npm run audit:known`, so any new or removed advisory requires review.

## Publish and live evidence

The final zip is a multi-file deck and requires an eligible authenticated plan:

```bash
slidesfly publish open-slide-example.zip \
  --title "open-slide compatibility fixture" \
  --visibility public \
  --json
```

- Live reader: <https://slidesfly.xyz/d/G38P7MGbJ2eMyFMmITVWc2>
- Versioned artifact: <https://r.slidesfly.xyz/G38P7MGbJ2eMyFMmITVWc2/1/index.html>
- Published format: `multi_file`; version 1; 10 files; 1,065,017 bytes

The versioned artifact byte-matched the local `index.html`. Browser checks covered both `/` and a
simulated nested `/proof/1/` path before publication. In production, the reader rendered all three
pages and its Arrow Right path advanced from page 1 to page 2 through the injected message bridge.

The opaque-origin reader logged Cloudflare's injected `/cdn-cgi/rum` CORS failure and an expected
fullscreen permissions-policy violation from the open-slide runtime. Neither request is authored by
the fixture, and both content rendering and reader navigation continued to work.

See the [Slidesfly HTML publishing guide](https://slidesfly.com/guides/publish-html-presentation-online)
for the general workflow and current limits.
