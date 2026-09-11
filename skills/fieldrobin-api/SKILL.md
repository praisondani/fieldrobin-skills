---
name: fieldrobin-api
description: Integrate with the FieldRobin public REST API using the OpenAPI 3.1 document, versioned /api/v1 routes, and the official JavaScript/TypeScript SDK.
---

# FieldRobin REST API

Use this skill to integrate with FieldRobin's public API and agent-commerce
surfaces.

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

Authenticated workspace, webhook, and admin operations are not public. Do not
treat the public OpenAPI document as permission to access tenant data.
