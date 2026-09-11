---
name: fieldrobin-oauth
description: Register an OAuth client for the FieldRobin MCP server, request granular scopes, and complete Authorization Code with PKCE.
---

# FieldRobin OAuth

Use this skill to register and authorize an MCP or API client against FieldRobin.

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
Registration creates an OAuth client; it does not create a FieldRobin user or
business. If a tool returns `MCP_WRITE_SCOPE_REQUIRED`, run the client's
step-up authorization flow instead of retrying with the same token.
