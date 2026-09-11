---
name: fieldrobin-api
description: Integrate with the FieldRobin public REST API using the OpenAPI 3.1 document, versioned /api/v1 routes, and the official JavaScript/TypeScript SDK. FieldRobin is field service software for home-service businesses. Use when building against FieldRobin HTTP APIs, installing @fieldrobin/sdk, or working with public OpenAPI, A2A, or UCP surfaces.
---

# FieldRobin REST API

FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices). This skill integrates with the public REST API
and agent-commerce surfaces.

Use when calling FieldRobin HTTP APIs or installing `@fieldrobin/sdk`. Use
`fieldrobin-oauth` for workspace auth and `fieldrobin-mcp` for authenticated
tools. Product facts: `fieldrobin-public-discovery` or
https://fieldrobin.com/api/ai?section=product

Authenticated workspace, webhook, and admin operations are not public.

## Starting points

- OpenAPI 3.1: `https://fieldrobin.com/openapi.json`
- Base URL: `https://fieldrobin.com/api/v1`
- Developer portal: `https://fieldrobin.com/developers`
- Versioning policy: `https://fieldrobin.com/api-versioning.md`
- SDK: `https://www.npmjs.com/package/@fieldrobin/sdk`
- SDK documentation: `https://fieldrobin.com/sdk`

## Client rules

- Errors use a JSON envelope with `code`, `message`, `resolution`, and `status`.
- Rate limits use `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`,
  and `RateLimit-Policy`. A 429 includes `Retry-After`.
- Write-like agent handoffs accept an optional `Idempotency-Key` header
  (maximum 128 characters).
- Install the SDK with `npm install @fieldrobin/sdk` when you need a typed
  client for public discovery, OpenAPI retrieval, A2A, and UCP checkout.

## Safety

Do not treat the public OpenAPI document as permission to access tenant data.
