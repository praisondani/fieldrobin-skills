# FieldRobin agent skills

Official skills for FieldRobin field service software for home-service businesses. They guide users through workspace setup and help developers use FieldRobin's public API and OAuth.

The product monorepo is private. This public repository contains six skills and the portable ChatGPT and Codex plugin package. The `skills/` files are synchronized with the monorepo and the website copies in `frontend/public/agent-skills/`. The `skills.sh.json` grouping manifest stays at this repository root; the website copy does not include it.

Browse on [skills.sh](https://www.skills.sh/praisondani/fieldrobin-skills).

## Who these help

- **FieldRobin users:** connect an OAuth-capable agent, review customers, leads, jobs, schedules, invoices, and reports, and create customers or jobs when requested and authorized.
- **Developers:** use the REST API, OpenAPI, OAuth, JavaScript/TypeScript SDK, CLI, and MCP tools to build or troubleshoot an integration.

The current npm SDK and CLI releases cover public discovery and API tools. The public SDK `0.2.0` tag and CLI `main` branch include authenticated MCP clients before their npm releases. CLI source `0.2.0` also adds `fieldrobin doctor` for public endpoint checks.

```sh
npm install github:praisondani/fieldrobin-sdk#v0.2.0
npm install github:praisondani/fieldrobin-sdk#v0.2.0 github:praisondani/fieldrobin-cli#main
npx fieldrobin doctor
```

`fieldrobin doctor` checks API health, OAuth metadata, and the unauthenticated MCP tool catalog. It works without sending an OAuth token or reading workspace data. If a check fails, stop before OAuth registration or connection setup. A passing result confirms public endpoint availability only; workspace calls still require OAuth and the granted scopes.

Use a native OAuth-capable MCP client if you do not want to install packages from GitHub.

If a native MCP host cannot discover OAuth metadata or list MCP tools, stop. Do not retry registration or claim that the workspace is connected.

## Install

Install all skills:

```sh
npx skills add praisondani/fieldrobin-skills
```

List the skills currently published on the website, then install a name from that list:

```sh
npx skills add https://fieldrobin.com --list
```

Installing a skill provides instructions; it does not grant workspace access. Before using workspace tools, verify the health and discovery endpoints above, then connect to `https://fieldrobin.com/api/v1/mcp` and complete OAuth. Stop if OAuth metadata or MCP tool discovery fails.

## Skills

| Skill | Use it for |
| --- | --- |
| `fieldrobin-public-discovery` | Public product facts, pricing, docs, OpenAPI, and discovery URLs |
| `fieldrobin-api` | REST API, OpenAPI, SDK, CLI, and integration guidance |
| `fieldrobin-mcp` | Connecting an MCP client to one authenticated workspace |
| `fieldrobin-oauth` | OAuth client registration, PKCE, scopes, and step-up consent |
| `fieldrobin-operations` | Reviewing workspace records or creating a customer or job |
| `fieldrobin-setup` | Connecting the plugin and choosing workspace permissions |

| You say | Skill |
| --- | --- |
| "What is FieldRobin?" | `fieldrobin-public-discovery` |
| "Build a FieldRobin integration with the REST API, SDK, or CLI" | `fieldrobin-api` |
| "Connect Claude to my FieldRobin jobs" | `fieldrobin-mcp` |
| "Register an OAuth client for FieldRobin" | `fieldrobin-oauth` |
| "Review today's jobs or unpaid invoices" | `fieldrobin-operations` |
| "Connect the FieldRobin plugin" | `fieldrobin-setup` |

## Public packages

These packages are separate from the private product monorepo:

- [`@fieldrobin/sdk`](https://www.npmjs.com/package/@fieldrobin/sdk) — [source](https://github.com/praisondani/fieldrobin-sdk)
- [`@fieldrobin/cli`](https://www.npmjs.com/package/@fieldrobin/cli) — [source](https://github.com/praisondani/fieldrobin-cli)

## Install the ChatGPT and Codex plugin

The repository root contains a portable plugin package: `plugin.json`, `mcp.json`, six bundled skills, and the FieldRobin icon. It targets the FieldRobin MCP service and supports workspace reads plus customer and job creation with the matching write permission when the production MCP/OAuth smoke passes. It does not update or delete records, send messages, or process payments.

The [last released plugin bundle, v1.0.0](https://github.com/praisondani/fieldrobin-skills/releases/download/v1.0.0/fieldrobin-1.0.0.zip) remains available for plugin hosts that import portable ZIP files. The Codex marketplace path below installs the current repository version.

### Codex

Add the public repository as a plugin marketplace, then install FieldRobin:

```sh
codex plugin marketplace add praisondani/fieldrobin-skills
codex plugin add fieldrobin@fieldrobin-skills
```

The install adds the plugin and its skills. Connect your FieldRobin workspace when the production MCP/OAuth smoke passes. You can also open the Plugins directory in Codex and install FieldRobin from the `fieldrobin-skills` marketplace.

If you only need an MCP connection, use the native server commands:

```sh
codex mcp add fieldrobin --url https://fieldrobin.com/api/v1/mcp
codex mcp login fieldrobin --scopes mcp:read
```

The portable MCP entry configures OAuth Dynamic Client Registration (DCR) and requests `mcp:read` as its base scope. Grant `mcp:customers:write` or `mcp:jobs:write` only if you want the plugin to create those records. FieldRobin enforces the scopes granted to each connection.

### ChatGPT

ChatGPT custom MCP connections are web-only. Full read and write support is available for Business and Enterprise/Edu workspaces; Pro connections support read-only tools under current account and developer-mode requirements. Workspace admins or owners control app creation and publishing.

1. Open Plugins and select `+` > `Add custom MCP server`.
2. Enter `https://fieldrobin.com/api/v1/mcp` and complete OAuth.
3. Grant `mcp:read` for lookups. Grant `mcp:customers:write` or `mcp:jobs:write` only if you want the plugin to create those records.
4. Review the risk notice, select `Create as a plugin`, then install it.
5. In a new chat, type `@` and select FieldRobin.

FieldRobin is not listed in the universal public plugin directory yet. The Codex marketplace and direct ChatGPT setup paths do not require that listing; workspace connections still depend on the production MCP/OAuth smoke passing. Public submission still needs a reviewer-accessible recording and synthetic demo workspace. Keep reviewer credentials and client secrets out of this repository and the plugin ZIP.

## Verify and package

```sh
node --test tests/plugin-package.test.mjs
node scripts/verify-live-mcp.mjs
node scripts/package-plugin.mjs
```

The live check verifies OAuth discovery and the public tool catalog without connecting to a workspace or reading customer data. The package script creates a ZIP with its files at the archive root.
