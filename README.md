# FieldRobin agent skills

Official public skills for FieldRobin MCP, REST API, OAuth, and product discovery.

FieldRobin is field service software for home-service businesses: customers,
jobs, scheduling, estimates, invoices, payments, and review follow-up. These
skills help an agent or developer connect to a FieldRobin workspace or read
public product facts. They do not replace a FieldRobin account.

The FieldRobin product repository is private. This repository is the public
skills.sh package.

## Install

```sh
npx skills add praisondani/fieldrobin-skills
```

Install one skill from the website:

```sh
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-mcp/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-api/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-oauth/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-public-discovery/SKILL.md
```

## Skills

| Skill | Use when |
| --- | --- |
| `fieldrobin-public-discovery` | You need what FieldRobin is, public docs, or product search |
| `fieldrobin-mcp` | You want Claude, ChatGPT, Cursor, or Gemini to use a FieldRobin workspace |
| `fieldrobin-api` | You are integrating the REST API or `@fieldrobin/sdk` |
| `fieldrobin-oauth` | You need to register an OAuth client or complete PKCE |

| You say | Skill |
| --- | --- |
| "What is FieldRobin?" | `fieldrobin-public-discovery` |
| "Connect Claude to my FieldRobin jobs" | `fieldrobin-mcp` |
| "Register an OAuth client for FieldRobin" | `fieldrobin-oauth` |
| "Use the FieldRobin REST API" | `fieldrobin-api` |

Website index: https://fieldrobin.com/.well-known/agent-skills/index.json

## Safety

These skills describe public FieldRobin endpoints and the authenticated MCP
OAuth flow. They do not include tenant data, API tokens, or private workspace
routes. Read a skill before installing it.
