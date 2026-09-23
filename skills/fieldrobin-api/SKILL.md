---
name: fieldrobin-api
description: Public REST API and @fieldrobin/sdk guide for FieldRobin (field service software for home-service businesses). Covers OpenAPI /api/v1, typed discovery + A2A + UCP client install, rate limits, and when to use @fieldrobin/cli instead. Use when building HTTP clients, installing @fieldrobin/sdk, or working with OpenAPI, A2A, or UCP.
---

# FieldRobin REST API

What it is: a guide to FieldRobin’s **public** REST API and the official
`@fieldrobin/sdk` typed client.

What it does: points you at OpenAPI and `/api/v1`, explains public client rules
(JSON errors, rate limits, idempotency), shows when to install
`@fieldrobin/sdk` vs run `@fieldrobin/cli`, and keeps you off authenticated
workspace routes unless you add OAuth (`fieldrobin-oauth`) or MCP
(`fieldrobin-mcp`).

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices). Product facts:
`fieldrobin-public-discovery` or https://fieldrobin.com/api/ai?section=product

## Starting points

- OpenAPI 3.1: `https://fieldrobin.com/openapi.json`
- Base URL: `https://fieldrobin.com/api/v1`
- Developer portal: `https://fieldrobin.com/developers`
- Versioning policy: `https://fieldrobin.com/api-versioning.md`
- SDK: `https://www.npmjs.com/package/@fieldrobin/sdk` — typed JS/TS client for
  public discovery, OpenAPI, A2A, and UCP
  ([source](https://github.com/praisondani/fieldrobin-sdk))
- CLI: `https://www.npmjs.com/package/@fieldrobin/cli` — terminal health,
  discovery, OpenAPI, and public search
  ([source](https://github.com/praisondani/fieldrobin-cli))
- SDK documentation: `https://fieldrobin.com/sdk`

## Client rules

- Errors use a JSON envelope with `code`, `message`, `resolution`, and `status`.
- Rate limits use `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`,
  and `RateLimit-Policy`. A 429 includes `Retry-After`.
- Write-like agent handoffs accept an optional `Idempotency-Key` header
  (maximum 128 characters).
- Install the SDK with `npm install @fieldrobin/sdk` in app code.
- For quick checks without writing code:
  `npx --yes @fieldrobin/cli discover` or `npm install --global @fieldrobin/cli`.

## Safety

Do not treat the public OpenAPI document as permission to access tenant data.
