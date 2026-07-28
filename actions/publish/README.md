# Slidesfly Publish Action

Status: experimental public integration.

## What it does

- sets up Node.js 22;
- downloads the official hosted Slidesfly CLI bundle;
- verifies the CLI reports the expected version;
- stores the API key in an isolated temporary config rather than a process argument;
- publishes or updates the deck;
- returns `url`, `deck-id`, and the non-secret JSON `result`;
- removes the temporary CLI and credential file on exit.

The API origin, CLI origin, and expected CLI version are fixed in the action metadata. They are not
caller-controlled inputs because the downloaded program receives access to the API credential.

## Usage

```yaml
name: Publish deck preview

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - id: deck
        uses: rare/slidesfly-integrations/actions/publish@v0.1.0
        with:
          file: examples/plain-html/deck.html
          api-key: ${{ secrets.SLIDESFLY_API_KEY }}
          title: Workflow preview
          visibility: unlisted
      - run: echo "Reader URL is $SLIDESFLY_READER_URL"
        env:
          SLIDESFLY_READER_URL: ${{ steps.deck.outputs.url }}
```

To update an owned deck without changing its reader URL, add `deck-id`. For stronger supply-chain
stability, replace the release tag with the reviewed commit SHA.

## Current limitations

The action's fixture verifies secret isolation, CLI version checks, argument construction, output
mapping, and cleanup. A real Slidesfly test-deck run is still required before this integration is
promoted from experimental. The current version check detects a mismatched hosted CLI version but
does not prove byte-level artifact integrity. PR comments are outside this action's scope; it writes
a job summary and exposes outputs for a separately permissioned comment step.
