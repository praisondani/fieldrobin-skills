---
name: fieldrobin-mcp
description: Connect an OAuth-capable MCP client, SDK, or CLI to one FieldRobin workspace over Streamable HTTP. Use when calling authenticated customer, job, invoice, or other workspace tools.
---

# FieldRobin MCP server

What it is: how to attach an MCP client to **one authenticated FieldRobin
workspace** and call tools.

What it does: gives the Streamable HTTP endpoint and server card; explains
OAuth setup, read/write scopes, and approvals. MCP client OAuth support varies.
Use a client that supports Authorization Code with PKCE and dynamic client
registration; check `https://fieldrobin.com/auth.md` for current connection
guidance. Use `fieldrobin-oauth` for registration details.

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices).

## Endpoints

- Streamable HTTP: `https://fieldrobin.com/api/v1/mcp`
- Standard alias: `https://fieldrobin.com/.well-known/mcp`
- Server card: `https://fieldrobin.com/.well-known/mcp/server-card.json`
- Auth guide: `https://fieldrobin.com/auth.md`

## Connect

- Claude Code: `claude mcp add --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- Other MCP clients: add `https://fieldrobin.com/api/v1/mcp` as a remote
  Streamable HTTP server, then complete OAuth if that client supports it.

Gemini CLI authentication depends on the signed-in account tier. The tested
individual account returned `UNSUPPORTED_CLIENT`; do not promise that tier can
connect. Codex CLI logout may clear local credentials without revoking the
FieldRobin connection, so revoke it from FieldRobin Settings when disconnecting.

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

## Developer clients

The current npm SDK and CLI releases do not include MCP client support yet. Use
a native MCP client with the endpoint above for workspace tools. The upcoming
npm `0.2.0` packages will add `FieldRobinMcpClient` and `fieldrobin mcp` commands.

After those package versions are published, set `FIELDROBIN_MCP_TOKEN` in a
protected process environment. The CLI will require `--approve` for tools that
may change workspace data. OAuth scopes remain the server’s authorization
boundary.
