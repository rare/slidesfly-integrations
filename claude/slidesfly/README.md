# Slidesfly for Claude Code

Claude Code plugin package for publishing and managing **existing HTML presentations** with
[Slidesfly](https://slidesfly.com).

This plugin does not generate presentations. Create or export an `.html` deck first, then use the
bundled Skill and hosted MCP tools to publish or manage it.

## Package contents

- `.claude-plugin/plugin.json` — plugin metadata and sensitive API-key configuration.
- `.mcp.json` — remote HTTP connection to `https://slidesfly.com/api/mcp`.
- `skills/slidesfly/SKILL.md` — the canonical Slidesfly publishing workflow.

The manifest, MCP configuration, and Skill are generated from the private Slidesfly release
contract and must not be edited independently. This README is maintained with the public package.

## Validate locally

From the repository root:

```bash
claude plugin validate ./claude/slidesfly --strict
node scripts/validate-claude-package.mjs
```

For a local development session:

```bash
claude --plugin-dir ./claude/slidesfly
```

When the plugin requests configuration, enter a Slidesfly API key. The `api_key` option is marked
sensitive and is substituted only into the hosted MCP `Authorization` header.

Use a read-only smoke prompt before publishing:

> Use the Slidesfly status tool to check authentication. Do not publish or modify any deck.

## Distribution status

This is a public, locally validated package source. It has not yet been submitted to or accepted by
the Claude Code Plugins Directory. Do not describe
`slidesfly@claude-plugins-official` as installable until an exact directory receipt is verified.

## Security

- Never commit a Slidesfly API key, claim token, deck password, or customer content.
- Review MCP tool calls before allowing write operations such as publish, restore, or visibility
  changes.
- Report vulnerabilities through [SECURITY.md](../../SECURITY.md).
