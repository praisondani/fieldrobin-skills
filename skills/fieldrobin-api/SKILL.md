---
name: fieldrobin-api
description: Integrate with FieldRobin’s public REST API and the official @fieldrobin/sdk typed client (discovery, OpenAPI, A2A, UCP). FieldRobin is field service software for home-service businesses. Use when building HTTP clients, installing @fieldrobin/sdk, or working with /api/v1, OpenAPI, A2A, or UCP. Prefer @fieldrobin/cli for one-off terminal checks.
---

# FieldRobin REST API

## What this skill is

Guidance for calling FieldRobin’s **public** HTTP API and installing the
official JavaScript/TypeScript SDK. FieldRobin is field service software for
home-service businesses (customers, jobs, scheduling, invoices).

## What it does

- Point you at OpenAPI, versioning, and the developer portal
- Explain public client rules (JSON errors, rate limits, idempotency keys)
- Show when to install `@fieldrobin/sdk` vs use `@fieldrobin/cli`
- Keep you off authenticated workspace, webhook, and admin routes unless you
  intentionally add OAuth (`fieldrobin-oauth`) or MCP (`fieldrobin-mcp`)

Use `fieldrobin-public-discovery` for product facts. Product overview:
https://fieldrobin.com/api/ai?section=product

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
