# FieldRobin agent skills

Official public skills for FieldRobin MCP, REST API, OAuth, and product discovery.

FieldRobin is field service software for home-service businesses: customers,
jobs, scheduling, estimates, invoices, payments, and review follow-up. These
skills help an agent or developer connect to a FieldRobin workspace or read
public product facts. They do not replace a FieldRobin account.

The FieldRobin product repository is private. This repository is the public
skills.sh package and source for the portable ChatGPT and Codex plugin.

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
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-operations/SKILL.md
npx skills add https://fieldrobin.com/agent-skills/fieldrobin-setup/SKILL.md
```

## Skills

| Skill | Use when |
| --- | --- |
| `fieldrobin-public-discovery` | You need what FieldRobin is, public docs, or product search |
| `fieldrobin-mcp` | You want Claude, ChatGPT, Cursor, or Gemini to use a FieldRobin workspace |
| `fieldrobin-api` | You are integrating the REST API or `@fieldrobin/sdk` |
| `fieldrobin-oauth` | You need to register an OAuth client or complete PKCE |
| `fieldrobin-operations` | You want an agent to review records or create a customer or job in your connected workspace |
| `fieldrobin-setup` | You need help connecting the plugin or choosing workspace permissions |

| You say | Skill |
| --- | --- |
| "What is FieldRobin?" | `fieldrobin-public-discovery` |
| "Connect Claude to my FieldRobin jobs" | `fieldrobin-mcp` |
| "Register an OAuth client for FieldRobin" | `fieldrobin-oauth` |
| "Use the FieldRobin REST API" | `fieldrobin-api` |
| "Review today's FieldRobin jobs or unpaid invoices" | `fieldrobin-operations` |
| "Connect the FieldRobin plugin" | `fieldrobin-setup` |

Website index: https://fieldrobin.com/.well-known/agent-skills/index.json

## Safety

These skills describe public FieldRobin endpoints and the authenticated MCP
OAuth flow. They do not include tenant data, API tokens, or private workspace
routes. Read a skill before installing it.

## ChatGPT and Codex plugin

This repository root contains a portable Agent Plugins package: `plugin.json`,
`mcp.json`, bundled skills, and the FieldRobin icon. It connects to the live
FieldRobin MCP server with OAuth. The plugin can search workspace records and
create customers or jobs when you explicitly ask and grant the matching write
permission. It cannot update or delete records, send messages, or process
payments.

FieldRobin is not listed in the public ChatGPT and Codex plugin directory yet.
To connect it in ChatGPT now:

1. Open Plugins and select `+` > `Add custom MCP server`.
2. Enter `https://fieldrobin.com/api/v1/mcp` and complete FieldRobin OAuth.
3. Review permissions. Grant `mcp:read` for lookups. Grant `mcp:customers:write`
   or `mcp:jobs:write` only if you want the plugin to create those records.
4. Review the risk notice and select `Create as a plugin`.
5. Install the plugin. In a chat, type `@` and select FieldRobin.

Codex CLI can connect with:

```sh
codex mcp add fieldrobin --url https://fieldrobin.com/api/v1/mcp
codex mcp login fieldrobin --scopes mcp:read
```

Add a write scope only when you need that action. The plugin ZIP has five
positive and three negative review cases. Public directory submission still
needs a synthetic demo workspace, reviewer credentials entered in OpenAI's
secure portal, and a reviewer-accessible demo recording.

## Check and package

```sh
node --test tests/plugin-package.test.mjs
node scripts/verify-live-mcp.mjs
node scripts/package-plugin.mjs
```

The live check verifies OAuth discovery and the public MCP tool catalog without
connecting to a workspace or reading customer data. The package command creates
a ZIP with plugin files at its root. Keep demo credentials and OAuth client
secrets out of this repository and ZIP.
