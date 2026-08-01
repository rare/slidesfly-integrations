# Slidesfly for Cursor

This is the public source for a free Cursor Marketplace plugin submitted on 2026-08-01. It has not
been accepted or published by Cursor.

## Included

- The canonical Slidesfly Agent Skill.
- The complete dependency-free Slidesfly CLI runner bundled with that Skill.
- No bundled hosted-MCP configuration and no credential.

The Skill publishes an existing HTML presentation and returns a shareable Slidesfly URL. Anonymous
first publish is supported. Authenticated management uses the user's existing Slidesfly CLI config
or an API key the user deliberately provides to the CLI.

## Why the hosted MCP is not bundled

The hosted endpoint at `https://slidesfly.com/api/mcp` requires a bearer API key. Cursor Marketplace
plugins currently have no stable install-time secret-input flow for API-key-only remote MCP
servers. Shipping a placeholder header would leave normal desktop installs disconnected, while
shipping a real key would be unsafe. Users may configure the hosted MCP separately after following
the [MCP documentation](https://slidesfly.com/docs/mcp).

## Disclosures

The plugin package is free and MIT-licensed. Slidesfly service limits and any optional paid plan are
separate from installing this plugin. See [support](https://slidesfly.com/docs),
[security](https://slidesfly.com/security), [privacy](https://slidesfly.com/privacy), and
[terms](https://slidesfly.com/terms).
