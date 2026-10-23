---
name: fieldrobin-oauth
description: Register an OAuth client with Authorization Code + PKCE for FieldRobin MCP workspace tools. Lists MCP scopes, consent, and step-up. Use when connecting an OAuth-capable MCP client, SDK, or CLI to a FieldRobin business.
---

# FieldRobin OAuth

What it is: how to register an OAuth client and complete Authorization Code
with PKCE for FieldRobin’s MCP server.

What it does: points you at OAuth discovery URLs; lists MCP scopes; explains
consent and step-up when a tool returns `MCP_WRITE_SCOPE_REQUIRED`; clarifies
that registration creates a client only, not a user or business. The resulting
token grants access only to the MCP tools and business selected during consent.

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices). A FieldRobin business must already exist. After
auth, use `fieldrobin-mcp`, `FieldRobinMcpClient`, or the CLI to call workspace
tools. Product facts:
`fieldrobin-public-discovery`.

## Discovery

- Protected resource: `https://fieldrobin.com/.well-known/oauth-protected-resource`
- Authorization server: `https://fieldrobin.com/.well-known/oauth-authorization-server`
- JWKS: `https://fieldrobin.com/api/v1/oauth/jwks`
- Auth docs: `https://fieldrobin.com/auth.md`
- Register: `POST https://fieldrobin.com/api/oauth/register`

## Scopes

- `mcp:read` — authenticated MCP read tools
- `mcp:customers:write` — `create-customer` in addition to read
- `mcp:jobs:write` — `create-job` in addition to read
- `mcp:write` — broad compatibility write scope; prefer granular scopes
- `mcp:use` — legacy read-only compatibility

Write-enabled deployments default to `mcp:read mcp:customers:write mcp:jobs:write`;
read-only deployments default to `mcp:read`. The consent page lets the user
choose read-only, customer-write, job-write, or both when those scopes are
available. Existing read-only clients keep their grant until they reconnect.

## Flow

Use Authorization Code with PKCE (`S256`) and a registered redirect URI.
If a tool returns `MCP_WRITE_SCOPE_REQUIRED`, run the client's step-up
authorization flow instead of retrying with the same token.

For the SDK, pass the access token to `FieldRobinMcpClient`. For the CLI, set
`FIELDROBIN_MCP_TOKEN` in the process environment; do not put tokens in command
arguments or source control. The CLI requires `--approve` before a write tool.
