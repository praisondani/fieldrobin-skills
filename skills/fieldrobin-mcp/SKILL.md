---
name: fieldrobin-mcp
description: Connect an MCP client to one FieldRobin workspace and call authenticated tools for jobs, customers, and invoices over Streamable HTTP. FieldRobin is field service software for home-service businesses. Use when connecting Claude, ChatGPT, Cursor, or Gemini to FieldRobin MCP, or when the user mentions Streamable HTTP or authenticated job tools.
---

# FieldRobin MCP server

## What this skill is

How to attach an MCP client to **one authenticated FieldRobin workspace** and
call tools. FieldRobin is field service software for home-service businesses
(customers, jobs, scheduling, invoices).

## What it does

- Give the Streamable HTTP endpoint, well-known alias, and server card
- Show Claude / Gemini / ChatGPT connect commands
- Explain read vs write scopes and when consent offers customer or job writes
- Keep public discovery separate (`fieldrobin-public-discovery`); use
  `fieldrobin-oauth` if the client still needs registration or scopes

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
