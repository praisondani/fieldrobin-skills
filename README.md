# FieldRobin agent skills

Official FieldRobin skills for MCP, REST API, OAuth, and public product discovery.

FieldRobin is field service software for home-service businesses: customers,
jobs, scheduling, estimates, invoices, payments, and review follow-up. These
skills help an agent or developer connect to a FieldRobin workspace or read
public product facts. They do not replace a FieldRobin account.

The FieldRobin product repository is private. **This repository**
([`praisondani/fieldrobin-skills`](https://github.com/praisondani/fieldrobin-skills))
is the public skills.sh package. The product monorepo's `skills/` directory is
the source for these four `SKILL.md` files. Keep those files and this README
synced with `frontend/public/agent-skills/`. The `skills.sh.json` grouping
manifest stays at this repository root; the website copy does not include it.
Sync this repository with `scripts/sync-public-package.sh skills --push`.

Browse on skills.sh: https://www.skills.sh/praisondani/fieldrobin-skills

## Who these help

- **FieldRobin users:** connect an OAuth-capable agent to a business workspace
  over MCP. Ask it to look up customers, jobs, and operations. Customer and job
  creation requires the matching OAuth write scope.
- **Developers:** use the API and OAuth skills to build an integration, the SDK
  for typed public API calls, and the CLI for health, discovery, OpenAPI, and
  search. Current npm releases do not include MCP clients. Use a native MCP
  client for authenticated workspace tools.

## Install

```sh
npx skills add praisondani/fieldrobin-skills
```

To connect an agent to a workspace, add the remote MCP server at
`https://fieldrobin.com/api/v1/mcp` and complete OAuth consent. Installing a
skill provides instructions; it does not grant workspace access.

List skills from the website's discovery index:

```sh
npx skills add https://fieldrobin.com --list
```

Install one skill from the website:

```sh
npx skills add https://fieldrobin.com --skill fieldrobin-mcp
```

## Skills

| Skill | What it is | What it does |
| --- | --- | --- |
| `fieldrobin-public-discovery` | Public product / docs map | Reads approved public facts and discovery URLs; links `@fieldrobin/sdk` and `@fieldrobin/cli`; does not access workspace data |
| `fieldrobin-api` | Public REST + SDK guide | Uses OpenAPI and public endpoints; explains OAuth-backed MCP for workspace tools |
| `fieldrobin-mcp` | Authenticated MCP guide | Connects an OAuth-capable MCP client to one workspace over Streamable HTTP |
| `fieldrobin-oauth` | OAuth registration guide | Registers an Authorization Code + PKCE client and explains MCP scopes / step-up consent |

| You say | Skill |
| --- | --- |
| "What is FieldRobin?" | `fieldrobin-public-discovery` |
| "Build a FieldRobin integration with the REST API, SDK, or CLI" | `fieldrobin-api` |
| "Connect Claude to my FieldRobin jobs" | `fieldrobin-mcp` |
| "Register an OAuth client for FieldRobin" | `fieldrobin-oauth` |
| "Check FieldRobin health, discover capabilities, inspect OpenAPI, or search public products from the terminal" | `@fieldrobin/cli` (see `fieldrobin-api`) |

Website index: `https://fieldrobin.com/.well-known/agent-skills/index.json`

Related public packages (not the private product monorepo):

- [`@fieldrobin/sdk`](https://www.npmjs.com/package/@fieldrobin/sdk) — source: [`praisondani/fieldrobin-sdk`](https://github.com/praisondani/fieldrobin-sdk)
- [`@fieldrobin/cli`](https://www.npmjs.com/package/@fieldrobin/cli) — source: [`praisondani/fieldrobin-cli`](https://github.com/praisondani/fieldrobin-cli)

## Safety

These skills describe public FieldRobin endpoints and the authenticated MCP
OAuth flow. They do not include tenant data, API tokens, or private workspace
routes. Read a skill before installing it.
