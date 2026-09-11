---
name: fieldrobin-oauth
description: Register an OAuth client for FieldRobin, field service software for home-service businesses. Use when connecting Claude, ChatGPT, Cursor, or an API client to a FieldRobin workspace, or when the user mentions FieldRobin OAuth, PKCE, MCP scopes, or client registration.
---

# FieldRobin OAuth

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices). This skill registers an OAuth client so an
agent or app can access one business workspace.

Use when connecting Claude, ChatGPT, Cursor, or another MCP/API client to
FieldRobin. Use `fieldrobin-mcp` after auth to call tools. Product facts:
`fieldrobin-public-discovery` or https://fieldrobin.com/api/ai?section=product

A FieldRobin business must already exist. Registration creates an OAuth client;
it does not create a user or business.

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

New registrations default to `mcp:read mcp:customers:write mcp:jobs:write`.
The consent page lets the user choose read-only, customer-write, job-write, or
both. Existing read-only clients keep their grant until they reconnect.

## Flow

Use Authorization Code with PKCE (`S256`) and a registered redirect URI.
If a tool returns `MCP_WRITE_SCOPE_REQUIRED`, run the client's step-up
authorization flow instead of retrying with the same token.
