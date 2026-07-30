# Slidesfly distribution ledger

Last verified: 2026-07-30

This ledger separates a submitted placement from a live backlink. A channel is marked `live` only
after its public URL is reachable and contains a Slidesfly link or active registry record.

## Current placements

| Channel | Status | Public receipt | Verification |
|---|---|---|---|
| Official MCP Registry | `live` | [`com.slidesfly/slidesfly`](https://registry.modelcontextprotocol.io/v0.1/servers?search=com.slidesfly/slidesfly) | Active remote-server record; links to the MCP docs and hosted endpoint |
| Marp community | `live` | [Show and tell #622](https://github.com/orgs/marp-team/discussions/622) | Public post links the live demo, source fixture, and Marp guide |
| Awesome Presentation Tools | `under_review` | [PR #9](https://github.com/runablehq/Awesome-presentation-tools/pull/9) | Main entry plus all six localized READMEs and seven translation catalogs are present at commit `a783675` |
| Awesome MCP Servers | `under_review` | [PR #11095](https://github.com/punkpeye/awesome-mcp-servers/pull/11095) | Submission check passed; maintainer still requires an eligible Glama server score badge |
| skills.sh | `live` | [Slidesfly Skill](https://www.skills.sh/rare/slidesfly-integrations/slidesfly) | Public page returns HTTP 200 and links the repository, install command, and Slidesfly website |
| GitHub Marketplace | `live` | [Publish HTML presentation to Slidesfly](https://github.com/marketplace/actions/publish-html-presentation-to-slidesfly) | Public `v0.2.0` listing links the repository, Slidesfly website, guides, and docs |
| Smithery | `blocked` | — | Requires a new Smithery account authorization before URL publishing |
| Glama | `live` | [Slidesfly Connector](https://glama.ai/mcp/connectors/com.slidesfly/slidesfly) | Public page returns HTTP 200, reports `Healthy`, and shows `Ownership verified`; domain proof is served from `/.well-known/glama.json` |

## Live evidence assets

| Artifact | Reader |
|---|---|
| Plain HTML | <https://slidesfly.xyz/d/hPTjZDoztFZRUFkbDzGbgz> |
| Codex-generated HTML | <https://slidesfly.xyz/d/n9d4qxI5r3qGOBg637y2BK> |
| Marp 4.5.0 | <https://slidesfly.xyz/d/0IL3JvWNsXBEpXA342r9ug> |
| Reveal.js 6.0.1 | <https://slidesfly.xyz/d/nlTgWEixO2Ik0wYT9KsLDg> |
| Slidev 52.18.0 | <https://slidesfly.xyz/d/EPt8Npfya1DZNBm3cfFPHW> |

All five reader shells returned HTTP 200 on 2026-07-29.

## Measurement and search readiness

- Both `slidesfly.com` and `slidesfly.xyz` serve robots and sitemap responses.
- Both production domains expose Google site-verification metadata.
- The production client bundle contains PostHog, `landing_view`, and
  `anonymous_publish_started`. After analytics consent, a browser delivery test received two HTTP
  200 responses from the PostHog event collector; a dashboard-side event query has not been run.
- No current IndexNow production receipt is recorded.

These readiness checks are not counted as backlinks or search-console submissions.

## Admission decisions

- `awesome-agent-skills`: deferred because its policy rejects brand-new Skills without demonstrated
  community usage.
- `awesome-ai-ppt`: deferred because its main-list policy normally requires at least 10 repository
  stars.
- `awesome-marp`: a community Show and tell was submitted first because its list asks new projects
  to establish community value before requesting inclusion.

## Next update rule

Change a row only when there is a public receipt or a directly verified external state. Keep
rejected, closed, or superseded submissions in the ledger instead of deleting their history.
