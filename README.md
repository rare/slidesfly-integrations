# Slidesfly integrations and examples

Public, reproducible integration assets for
[Slidesfly](https://slidesfly.com), the publishing layer for existing HTML presentations.

This repository intentionally excludes the private Slidesfly SaaS application, infrastructure,
credentials, customer data, and billing implementation. It contains only integration surfaces that
developers can inspect, test, and reuse.

## Contents

| Path | Status | Purpose |
|---|---|---|
| [`action.yml`](action.yml) | Public beta; production-smoke verified | Marketplace-ready root Action for publishing or updating an HTML deck |
| [`actions/publish`](actions/publish) | Backwards-compatible | Existing subdirectory entry point for the publish Action |
| [`skills/slidesfly`](skills/slidesfly) | Installable | Official Slidesfly Agent Skill |
| [`examples/plain-html`](examples/plain-html) | Live-verified fixture | One self-contained HTML deck |
| [`examples/codex-generated`](examples/codex-generated) | Live-verified fixture | Agent-generated single-file deck |
| [`examples/revealjs`](examples/revealjs) | Live-verified fixture | Reveal.js 6.0.1 multi-file build |
| [`examples/slidev`](examples/slidev) | Live-verified fixture | Slidev 52.18.0 static build |
| [`examples/marp`](examples/marp) | Live-verified fixture | Marp CLI 4.5.0 single-file export |
| [`mcp/server.json`](mcp/server.json) | Published v0.1.0 | Active official MCP Registry metadata for the hosted server |
| [`mcp/server-card.json`](mcp/server-card.json) | Discovery metadata | Static capability card for auth-walled scans |

## Start here

- [Publish an HTML presentation](https://slidesfly.com/guides/publish-html-presentation-online)
- [Framework compatibility matrix](https://slidesfly.com/guides/html-presentation-framework-compatibility)
- [CLI documentation](https://slidesfly.com/docs/cli)
- [Hosted MCP documentation](https://slidesfly.com/docs/mcp)
- [Security architecture](https://slidesfly.com/security)
- [Canonical Slidesfly Skill](https://slidesfly.com/SKILL.md)
- [Distribution ledger](docs/distribution-ledger.md)

Install the public Skill source with:

```bash
npx skills add rare/slidesfly-integrations --skill slidesfly
```

Publish a deck from GitHub Actions with:

```yaml
- id: deck
  uses: rare/slidesfly-integrations@v0.2.0
  with:
    file: deck.html
    api-key: ${{ secrets.SLIDESFLY_API_KEY }}
    visibility: unlisted
```

The root Action is the Marketplace entry point. The existing
`rare/slidesfly-integrations/actions/publish@v0.1.1` path remains available for workflows already
using it.

## Current boundaries

- The website installer is the supported public CLI distribution.
- The hosted MCP endpoint is `https://slidesfly.com/api/mcp` and requires a Slidesfly API key.
- Public npm packages are not assumed by this repository.
- Multi-file zip publishing requires an eligible authenticated plan.
- Every example links to a public reader URL verified on 2026-07-29.

## Releases

Integration releases use semantic version tags. The root Action is released from the same public
repository as the MCP, Skill, and framework fixtures. Pin a commit SHA for the strongest
supply-chain stability, or use a reviewed release tag when a moving major tag is not available.

See [MAINTENANCE.md](MAINTENANCE.md), [CONTRIBUTING.md](CONTRIBUTING.md), and
[SECURITY.md](SECURITY.md) before relying on a public-beta integration in production.

## License

MIT
