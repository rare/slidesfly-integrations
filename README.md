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
| [`gemini-extension.json`](gemini-extension.json) | Installable | Gemini CLI extension with the Skill and hosted MCP |
| [`actions/publish`](actions/publish) | Backwards-compatible | Existing subdirectory entry point for the publish Action |
| [`skills/slidesfly`](skills/slidesfly) | Installable | Official Slidesfly Agent Skill |
| [`claude/slidesfly`](claude/slidesfly) | Package-ready | Claude Code plugin with the Skill and hosted MCP |
| [`cursor/slidesfly`](cursor/slidesfly) | Submitted; review pending | Cursor plugin with the Skill and bundled CLI runner |
| [`examples/plain-html`](examples/plain-html) | Live-verified fixture | One self-contained HTML deck |
| [`examples/codex-generated`](examples/codex-generated) | Live-verified fixture | Agent-generated single-file deck |
| [`examples/frontend-slides`](examples/frontend-slides) | Live-verified fixture | Pinned Frontend Slides single-file compatibility fixture |
| [`examples/revealjs`](examples/revealjs) | Live-verified fixture | Reveal.js 6.0.1 multi-file build |
| [`examples/slidev`](examples/slidev) | Live-verified fixture | Slidev 52.18.1 static build |
| [`examples/marp`](examples/marp) | Live-verified fixture | Marp CLI 4.5.0 single-file export |
| [`mcp/server.json`](mcp/server.json) | Published v0.1.0 | Active official MCP Registry metadata for the hosted server |
| [`mcp/server-card.json`](mcp/server-card.json) | Discovery metadata | Static capability card for auth-walled scans |

## Start here

- [GitHub Marketplace Action](https://github.com/marketplace/actions/publish-html-presentation-to-slidesfly)
- [Publish an HTML presentation](https://slidesfly.com/guides/publish-html-presentation-online)
- [Framework compatibility matrix](https://slidesfly.com/guides/html-presentation-framework-compatibility)
- [CLI documentation](https://slidesfly.com/docs/cli)
- [Hosted MCP documentation](https://slidesfly.com/docs/mcp)
- [Gemini CLI extension manifest](gemini-extension.json)
- [Claude Code plugin package](claude/slidesfly)
- [Cursor plugin package](cursor/slidesfly)
- [Security architecture](https://slidesfly.com/security)
- [Canonical Slidesfly Skill](https://slidesfly.com/SKILL.md)

Install the public Skill source with:

```bash
npx skills add rare/slidesfly-integrations --skill slidesfly
```

Install the Gemini CLI extension from the public repository:

```bash
gemini extensions install https://github.com/rare/slidesfly-integrations --ref v0.3.0
```

Gemini CLI requests `SLIDESFLY_API_KEY` as a sensitive setting and stores it in the system
keychain. Create a key in the Slidesfly dashboard when you are ready to use the hosted MCP; never
commit the key to this repository.

The Cursor package intentionally does not bundle the API-key-only hosted MCP. Cursor Marketplace
plugins currently have no stable install-time secret-input flow for that configuration, while the
bundled Slidesfly runner already supports anonymous publishing and the user's existing CLI login.
See the package README for the exact boundary. The package was submitted on 2026-08-01 and has not
been accepted or published by Cursor.

Publish a deck from GitHub Actions with:

```yaml
- id: deck
  uses: rare/slidesfly-integrations@v0.3.0
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
- Every example marked live links to a reader URL; each fixture records its own verification date
  and evidence boundary.

## Releases

Integration releases use semantic version tags. The root Action is released from the same public
repository as the MCP, Skill, and framework fixtures. Pin a commit SHA for the strongest
supply-chain stability, or use a reviewed release tag when a moving major tag is not available.

See [MAINTENANCE.md](MAINTENANCE.md), [CONTRIBUTING.md](CONTRIBUTING.md), and
[SECURITY.md](SECURITY.md) before relying on a public-beta integration in production.

## License

MIT
