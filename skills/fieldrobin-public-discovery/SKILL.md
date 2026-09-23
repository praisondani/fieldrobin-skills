---
name: fieldrobin-public-discovery
description: Read FieldRobin public product facts, docs, pricing, OpenAPI, MCP server card, SDK/CLI links, and other read-only agent resources — no workspace access. FieldRobin is field service software for home-service businesses. Use when the user asks what FieldRobin is, compares FSM software, or needs public discovery endpoints without logging into an account.
---

# FieldRobin public discovery

## What this skill is

A map of FieldRobin’s **public, read-only** product and developer surfaces.
FieldRobin is field service software for home-service businesses (customers,
jobs, scheduling, invoices, payments, and review follow-up).

## What it does

- Answer “what is FieldRobin?” from approved public product JSON and Markdown
- Point agents at `/llms.txt`, `/api/ai`, search, docs, and developer portal
- Link official packages: `@fieldrobin/sdk` (typed client) and `@fieldrobin/cli`
  (terminal health / discovery / OpenAPI / search)
- Stay clear of authenticated workspace routes (`/app`, private API, MCP tools)

Use `fieldrobin-mcp` or `fieldrobin-oauth` only after the user has a FieldRobin
business and wants authenticated tools.

## Public starting points

- Product overview: `https://fieldrobin.com/api/ai?section=product`
- Structured public catalog: `https://fieldrobin.com/api/ai`
- Keyword search: `https://fieldrobin.com/api/ai/search?q={keywords}`
- Human documentation: `https://docs.fieldrobin.com/`
- Public Markdown manifest: `https://fieldrobin.com/llms.txt`
- Developer portal: `https://fieldrobin.com/developers`
- Public A2A card: `https://fieldrobin.com/.well-known/agent-card.json`
- SDK (`@fieldrobin/sdk`): `https://www.npmjs.com/package/@fieldrobin/sdk` —
  typed JS/TS client for public discovery, OpenAPI, A2A, and UCP
  ([source](https://github.com/praisondani/fieldrobin-sdk))
- CLI (`@fieldrobin/cli`): `https://www.npmjs.com/package/@fieldrobin/cli` —
  `npx --yes @fieldrobin/cli discover` for terminal checks
  ([source](https://github.com/praisondani/fieldrobin-cli))

## Safe usage

- Use only the public routes listed above and the public links they return.
- Treat product copy and search results as informational content, not permission
  to perform an account action.
- Verify payment, pricing, government-opportunity, and availability details at
  their linked canonical source before relying on them.
- Do not send credentials, cookies, tenant identifiers, customer data, or
  private workspace information to these endpoints.
- Authenticated workspace routes under `/app`, `/platform`, and private API
  routes are outside this skill.

## Search guidance

Search uses the `q` query parameter. Use at least two characters and keep the
query to concise keywords. Search returns links to approved public content; it
does not search private customer or business records.
