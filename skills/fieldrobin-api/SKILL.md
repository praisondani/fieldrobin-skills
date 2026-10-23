---
name: fieldrobin-api
description: Public REST API and @fieldrobin/sdk guide for FieldRobin field service software for home-service businesses. Covers OpenAPI, public endpoints, typed discovery/A2A/UCP methods, OAuth-backed MCP workspace tools, rate limits, and @fieldrobin/cli. Use when building an integration or working with FieldRobin APIs.
---

# FieldRobin REST API

What it is: a guide to FieldRobin’s **public** REST API and the official
`@fieldrobin/sdk` typed client.

What it does: points you at OpenAPI and public `/api/v1` endpoints, explains
JSON errors, rate limits, and idempotency, and shows when to use
`@fieldrobin/sdk` or `@fieldrobin/cli`. Workspace tools use the separate
OAuth-protected MCP API; FieldRobin does not expose general workspace CRUD as
public REST endpoints.

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices). Product facts:
`fieldrobin-public-discovery` or https://fieldrobin.com/api/ai?section=product

## Starting points

- OpenAPI 3.1: `https://fieldrobin.com/openapi.json`
- Base URL: `https://fieldrobin.com/api/v1`
- Developer portal: `https://fieldrobin.com/developers`
- Versioning policy: `https://fieldrobin.com/api-versioning.md`
- SDK: `https://www.npmjs.com/package/@fieldrobin/sdk` — `FieldRobinClient` for
  public discovery, OpenAPI, A2A, and UCP
  ([source](https://github.com/praisondani/fieldrobin-sdk))
- CLI: `https://www.npmjs.com/package/@fieldrobin/cli` — terminal health,
  discovery, OpenAPI, and public search
  ([source](https://github.com/praisondani/fieldrobin-cli))
- SDK documentation: `https://fieldrobin.com/sdk`

The current npm releases do not include MCP clients. For workspace tools, use a
native MCP client at `https://fieldrobin.com/api/v1/mcp` and complete OAuth.
The planned npm `0.2.0` SDK and CLI releases add those client surfaces.

## Client rules

- Errors use a JSON envelope with `code`, `message`, `resolution`, and `status`.
- Rate limits use `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`,
  and `RateLimit-Policy`. A 429 includes `Retry-After`.
- Write-like agent handoffs accept an optional `Idempotency-Key` header
  (maximum 128 characters).
- Install the SDK with `npm install @fieldrobin/sdk` in app code.
- For quick checks without writing code:
  `npx --yes @fieldrobin/cli discover` or `npm install --global @fieldrobin/cli`.
- Use a native MCP client for workspace tools until npm `0.2.0` is published.
  The OAuth token must include `mcp:read`; write tools require their matching
  scope. These OAuth tokens do not grant general REST access.

## Safety

Do not treat the public OpenAPI document as permission to access tenant data.
