---
name: fieldrobin-mcp
description: Connect an MCP client to FieldRobin, field service software for home-service businesses, and call workspace tools for jobs, customers, and invoices. Use when connecting Claude, ChatGPT, Cursor, or Gemini to a FieldRobin workspace, or when the user mentions FieldRobin MCP, Streamable HTTP, or authenticated job tools.
---

# FieldRobin MCP server

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices). This skill connects an MCP client to one
FieldRobin workspace and calls authenticated tools.

Use when connecting Claude, ChatGPT, Cursor, or Gemini to FieldRobin. Use
`fieldrobin-oauth` if the client still needs registration or scopes. Product
facts: `fieldrobin-public-discovery` or
https://fieldrobin.com/api/ai?section=product

## Endpoints

- Streamable HTTP: `https://fieldrobin.com/api/v1/mcp`
- Standard alias: `https://fieldrobin.com/.well-known/mcp`
- Server card: `https://fieldrobin.com/.well-known/mcp/server-card.json`
- Auth guide: `https://fieldrobin.com/auth.md`

## Connect

- Claude Code: `claude mcp add --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- Gemini CLI: `gemini mcp add --scope user --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- ChatGPT / Codex: add the Streamable HTTP URL as a remote MCP server, then complete OAuth.

New OAuth registrations request `mcp:read mcp:customers:write mcp:jobs:write`.
The consent page lets the user grant read-only access, customer writes, job
writes, or both.

## Tool policy

- Refresh `tools/list` in a new session. Catalog revision/hash metadata tells you
  whether the contract changed.
- Read tools advertise `readOnlyHint: true`.
- `create-customer` and `create-job` persist only when the matching write scope
  is granted. A missing scope returns `MCP_WRITE_SCOPE_REQUIRED`.
- Do not send tenant data to public discovery endpoints. This skill is for the
  authenticated MCP transport only.
