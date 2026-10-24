---
name: fieldrobin-setup
description: Help home-service businesses connect or reconnect the FieldRobin plugin and choose workspace permissions. Use when a user asks to set up FieldRobin or troubleshoot a missing connection.
---

# Set up FieldRobin

Use this skill to help the user connect one FieldRobin workspace to the installed
plugin.

1. Check `https://fieldrobin.com/api/health` before starting OAuth. HTTP 200
   confirms Laravel routing only; MCP/OAuth availability still
   requires a successful production smoke. If health returns 404 or an
   MCP/OAuth request fails, stop and explain that the service is unavailable.
   Do not retry registration or ask the user to connect yet.
2. Ask the user to connect through FieldRobin's OAuth sign-in. Never ask for a
   password, access token, refresh token, or client secret in chat.
3. Explain that `mcp:read` enables workspace lookups. The optional
   `mcp:customers:write` and `mcp:jobs:write` scopes let the plugin create those
   records when the user requests it.
4. Ask the user to grant only the permissions needed for their tasks. The OAuth
   consent page controls the final grant.
5. After connection, use the available FieldRobin tools to answer a simple
   read-only question, such as the jobs scheduled today.
6. If the needed tool or permission is missing, explain which FieldRobin
   permission is required and ask the user to reconnect through the plugin's
   connection settings. Do not claim an action succeeded until FieldRobin
   returns a verified result.

FieldRobin data belongs to the connected workspace. Do not claim access to
another workspace or send workspace data to public discovery endpoints.
