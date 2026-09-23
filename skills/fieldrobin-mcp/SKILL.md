---
name: fieldrobin-mcp
description: Connect Claude, ChatGPT, Cursor, or Gemini to one FieldRobin workspace over Streamable HTTP MCP and call authenticated job, customer, and invoice tools. FieldRobin is field service software for home-service businesses. Use when connecting an MCP client to FieldRobin, or when the user mentions Streamable HTTP or authenticated FieldRobin tools.
---

# FieldRobin MCP server

What it is: how to attach an MCP client to **one authenticated FieldRobin
workspace** and call tools.

What it does: gives the Streamable HTTP endpoint, well-known alias, and server
card; shows Claude / Gemini / ChatGPT connect commands; explains read vs write
scopes and consent; keeps public discovery separate
(`fieldrobin-public-discovery`). Use `fieldrobin-oauth` if the client still
needs registration or scopes.

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices).

## Endpoints

- Streamable HTTP: `https://fieldrobin.com/api/v1/mcp`
- Standard alias: `https://fieldrobin.com/.well-known/mcp`
- Server card: `https://fieldrobin.com/.well-known/mcp/server-card.json`
- Auth guide: `https://fieldrobin.com/auth.md`

## Connect

- Claude Code: `claude mcp add --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- Gemini CLI: `gemini mcp add --scope user --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- ChatGPT / Codex: add the Streamable HTTP URL as a remote MCP server, then complete OAuth.

When direct writes are enabled, new OAuth registrations request
`mcp:read mcp:customers:write mcp:jobs:write`; read-only deployments request
`mcp:read`. The consent page lets the user grant read-only access, customer
writes, job writes, or both when those scopes are available.

## Tool policy

- Refresh `tools/list` in a new session. Catalog revision/hash metadata tells you
  whether the contract changed.
- Read tools advertise `readOnlyHint: true`.
- `create-customer` and `create-job` persist only when the matching write scope
  is granted. A missing scope returns `MCP_WRITE_SCOPE_REQUIRED`.
- Do not send tenant data to public discovery endpoints. This skill is for the
  authenticated MCP transport only.
