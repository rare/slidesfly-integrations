# Slidesfly hosted MCP

Slidesfly exposes a hosted Streamable HTTP MCP server:

```text
https://slidesfly.com/api/mcp
```

It requires an `Authorization: Bearer sk_…` header using an API key created in Slidesfly account
settings. See <https://slidesfly.com/docs/mcp> for tools and configuration.

`server.json` is the schema-valid metadata candidate for the official MCP Registry.
`server-card.json` mirrors the static discovery card served from
<https://slidesfly.com/.well-known/mcp/server-card.json> for authenticated scanners.

This repository does not claim that a public stdio npm package is currently available.
