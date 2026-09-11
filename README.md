# FieldRobin agent skills

Official public skills for FieldRobin MCP, REST API, OAuth, and product discovery.

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

| Skill | Use |
| --- | --- |
| `fieldrobin-public-discovery` | Public product facts, docs, and search |
| `fieldrobin-mcp` | Connect the Streamable HTTP MCP server |
| `fieldrobin-api` | REST API, OpenAPI, and SDK |
| `fieldrobin-oauth` | OAuth client registration and scopes |

Website index: https://fieldrobin.com/.well-known/agent-skills/index.json

## Safety

These skills describe public FieldRobin endpoints and the authenticated MCP
OAuth flow. They do not include tenant data, API tokens, or private workspace
routes. Read a skill before installing it.
