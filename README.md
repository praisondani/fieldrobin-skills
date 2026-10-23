# FieldRobin agent skills

Official skills for FieldRobin field service software for home-service businesses. They help users connect an agent to a workspace and help developers use FieldRobin's public API and OAuth.

The product monorepo is private. This public repository contains six skills and the portable ChatGPT and Codex plugin package. The `skills/` files are synchronized with the monorepo and the website copies in `frontend/public/agent-skills/`. The `skills.sh.json` grouping manifest stays at this repository root; the website copy does not include it.

Browse on [skills.sh](https://www.skills.sh/praisondani/fieldrobin-skills).

## Who these help

- **FieldRobin users:** connect an OAuth-capable agent, review customers, leads, jobs, schedules, invoices, and reports, and create customers or jobs when requested and authorized.
- **Developers:** use the REST API, OpenAPI, OAuth, JavaScript/TypeScript SDK, CLI, and MCP tools to build or troubleshoot an integration.

The current npm SDK and CLI releases cover public discovery and API tools. The next SDK and CLI versions add authenticated MCP clients. Until those versions are published, use a native OAuth-capable MCP client for workspace tools.

## Install

Install all skills:

```sh
npx skills add praisondani/fieldrobin-skills
```

List the website's published skills and install one by name:

```sh
npx skills add https://fieldrobin.com --list
npx skills add https://fieldrobin.com --skill fieldrobin-mcp
npx skills add https://fieldrobin.com --skill fieldrobin-operations
```

Installing a skill provides instructions; it does not grant workspace access. Connect to `https://fieldrobin.com/api/v1/mcp` and complete OAuth to use workspace tools.

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

## ChatGPT and Codex plugin

The repository root contains a portable plugin package: `plugin.json`, `mcp.json`, six bundled skills, and the FieldRobin icon. It connects to the live MCP service and supports workspace reads plus customer and job creation with the matching write permission. It does not update or delete records, send messages, or process payments.

The MCP entry contains only `type` and `url`. Codex currently drops packaged servers with an `extensions` field; see [issue #53658](https://github.com/openai/codex/issues/53658). FieldRobin publishes OAuth DCR and PKCE metadata, and protected tools return a bearer challenge so clients can discover sign-in.

FieldRobin is not listed in the public ChatGPT and Codex plugin directory yet. To use the live server in ChatGPT:

1. Open Plugins and select `+` > `Add custom MCP server`.
2. Enter `https://fieldrobin.com/api/v1/mcp` and complete FieldRobin OAuth.
3. Grant `mcp:read` for lookups. Grant `mcp:customers:write` or `mcp:jobs:write` only if you want the plugin to create those records.
4. Review the risk notice, select `Create as a plugin`, and install it.
5. In a chat, type `@` and select FieldRobin.

To connect Codex CLI, run:

```sh
codex mcp add fieldrobin --url https://fieldrobin.com/api/v1/mcp
codex mcp login fieldrobin --scopes mcp:read
```

The OpenAI public directory submission still needs a synthetic demo workspace, reviewer credentials entered through OpenAI's secure portal, and a reviewer-accessible recording. Keep those credentials and client secrets out of this repository and the plugin ZIP.

## Verify and package

```sh
node --test tests/plugin-package.test.mjs
node scripts/verify-live-mcp.mjs
node scripts/package-plugin.mjs
```

The live check verifies OAuth discovery and the public tool catalog without connecting to a workspace or reading customer data. The package script creates a ZIP with its files at the archive root.
