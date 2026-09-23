# FieldRobin agent skills

Official FieldRobin skills for MCP, REST API, OAuth, and public product discovery.

FieldRobin is field service software for home-service businesses: customers,
jobs, scheduling, estimates, invoices, payments, and review follow-up. These
skills help an agent or developer connect to a FieldRobin workspace or read
public product facts. They do not replace a FieldRobin account.

The FieldRobin product repository is private. **This repository**
([`praisondani/fieldrobin-skills`](https://github.com/praisondani/fieldrobin-skills))
is the public skills.sh package. Keep `skills/` in the product monorepo identical
to this repo and to `frontend/public/agent-skills/`.

## Install

```sh
npx skills add praisondani/fieldrobin-skills
```

Install one skill from the public website:

```sh
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-mcp/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-api/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-oauth/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-public-discovery/SKILL.md
```

## Skills

| Skill | What it is | What it does |
| --- | --- | --- |
| `fieldrobin-public-discovery` | Public product / docs map | Reads approved product facts, docs, pricing, and discovery URLs; links `@fieldrobin/sdk` and `@fieldrobin/cli`; never touches a workspace |
| `fieldrobin-mcp` | Authenticated MCP guide | Connects Claude, ChatGPT, Cursor, or Gemini to one workspace over Streamable HTTP and calls job/customer tools |
| `fieldrobin-api` | Public REST + SDK guide | Uses OpenAPI `/api/v1` and `@fieldrobin/sdk` (typed client); points to `@fieldrobin/cli` for terminal checks |
| `fieldrobin-oauth` | OAuth registration guide | Registers an Authorization Code + PKCE client and explains MCP scopes / step-up consent |

| You say | Skill |
| --- | --- |
| "What is FieldRobin?" | `fieldrobin-public-discovery` |
| "Connect Claude to my FieldRobin jobs" | `fieldrobin-mcp` |
| "Register an OAuth client for FieldRobin" | `fieldrobin-oauth` |
| "Use the FieldRobin REST API or SDK" | `fieldrobin-api` |
| "Check FieldRobin health from the terminal" | `@fieldrobin/cli` (see `fieldrobin-api` / public discovery) |

Website index: `https://fieldrobin.com/.well-known/agent-skills/index.json`

Related public packages (not the private product monorepo):

- [`@fieldrobin/sdk`](https://www.npmjs.com/package/@fieldrobin/sdk) — source: [`praisondani/fieldrobin-sdk`](https://github.com/praisondani/fieldrobin-sdk)
- [`@fieldrobin/cli`](https://www.npmjs.com/package/@fieldrobin/cli) — source: [`praisondani/fieldrobin-cli`](https://github.com/praisondani/fieldrobin-cli)

## Safety

These skills describe public FieldRobin endpoints and the authenticated MCP
OAuth flow. They do not include tenant data, API tokens, or private workspace
routes. Read a skill before installing it.
