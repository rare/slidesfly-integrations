# Slidesfly distribution ledger

Last verified: 2026-07-29

This ledger separates a submitted placement from a live backlink. A channel is marked `live` only
after its public URL is reachable and contains a Slidesfly link or active registry record.

## Current placements

| Channel | Status | Public receipt | Verification |
|---|---|---|---|
| Official MCP Registry | `live` | [`com.slidesfly/slidesfly`](https://registry.modelcontextprotocol.io/v0.1/servers?search=com.slidesfly/slidesfly) | Active remote-server record; links to the MCP docs and hosted endpoint |
| Marp community | `live` | [Show and tell #622](https://github.com/orgs/marp-team/discussions/622) | Public post links the live demo, source fixture, and Marp guide |
| Awesome Presentation Tools | `under_review` | [PR #9](https://github.com/runablehq/Awesome-presentation-tools/pull/9) | One factual entry in the web-based sharing section |
| Awesome MCP Servers | `under_review` | [PR #11095](https://github.com/punkpeye/awesome-mcp-servers/pull/11095) | Submission check passed; Glama listing and badge still requested |
| skills.sh | `verified_not_indexed` | `npx skills add rare/slidesfly-integrations --skill slidesfly` | Isolated install returned Skill v0.1.1; directory search has not indexed it yet |
| Smithery | `blocked` | — | Requires a new Smithery account authorization before URL publishing |
| Glama | `blocked` | — | Requires account access and connector submission before the Awesome MCP badge can be added |

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
  `anonymous_publish_started`; a project-side event receipt has not yet been independently queried.
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
