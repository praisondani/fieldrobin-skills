---
name: fieldrobin-mcp
description: Connect an OAuth-capable MCP client to one FieldRobin workspace over Streamable HTTP. Use when calling authenticated customer, job, invoice, schedule, or other workspace tools.
---

# FieldRobin MCP server

What it is: a guide to connecting an MCP client to one authenticated FieldRobin workspace and calling its tools.

What it does: provides the Streamable HTTP endpoint and server card, explains OAuth setup and scopes, and describes client-specific setup limits. Use `fieldrobin-oauth` for registration details and `fieldrobin-operations` for workspace tasks.

FieldRobin is field service software for home-service businesses, including customers, jobs, scheduling, and invoices.

## Endpoints

- Streamable HTTP: `https://fieldrobin.com/api/v1/mcp`
- Standard alias: `https://fieldrobin.com/.well-known/mcp`
- Server card: `https://fieldrobin.com/.well-known/mcp/server-card.json`
- Auth guide: `https://fieldrobin.com/auth.md`

## Connect

- Claude Code: `claude mcp add --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- Gemini CLI: `gemini mcp add --scope user --transport http fieldrobin https://fieldrobin.com/api/v1/mcp`
- ChatGPT: open Plugins, select `+` > `Add custom MCP server`, enter the endpoint, and complete OAuth. Review the scopes, select `Create as a plugin`, and install it. In a chat, type `@` and select FieldRobin.
- Codex CLI: run `codex mcp add fieldrobin --url https://fieldrobin.com/api/v1/mcp`, then `codex mcp login fieldrobin --scopes mcp:read`.
- Other MCP clients: add the endpoint as a remote Streamable HTTP server, then complete OAuth if the client supports it.

Gemini CLI authentication depends on the signed-in account tier. A tested individual account returned `UNSUPPORTED_CLIENT`; do not promise that tier can connect.

Codex CLI logout may clear local credentials without revoking the FieldRobin connection. Revoke the connection from FieldRobin Settings when disconnecting.

When direct writes are enabled, new OAuth registrations request `mcp:read mcp:customers:write mcp:jobs:write`. The consent page lets users grant read-only access, customer writes, job writes, or both when available. Ask for only the scopes needed for the user's task.

## Tool policy

- Refresh `tools/list` in a new session. Catalog revision and hash metadata identify contract changes.
- Read tools advertise `readOnlyHint: true`.
- `create-customer` and `create-job` persist only when the matching write scope is granted. A missing scope returns `MCP_WRITE_SCOPE_REQUIRED`.
- Do not send workspace data to public discovery endpoints. Use the authenticated MCP transport for workspace data.
- Do not claim a write succeeded until FieldRobin returns a verified result.

## Developer clients

The current npm SDK and CLI releases do not include MCP clients. Use a native MCP client with the endpoint above for workspace tools until the next package versions are published. OAuth scopes remain the server's authorization boundary.
