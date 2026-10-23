---
name: fieldrobin-setup
description: Help home-service businesses connect or reconnect the FieldRobin plugin and choose workspace permissions. Use when a user asks to set up FieldRobin or troubleshoot a missing connection.
---

# Set up FieldRobin

Use this skill to help the user connect one FieldRobin workspace to the installed
plugin.

1. Ask the user to connect through FieldRobin's OAuth sign-in. Never ask for a
   password, access token, refresh token, or client secret in chat.
2. Explain that `mcp:read` enables workspace lookups. The optional
   `mcp:customers:write` and `mcp:jobs:write` scopes let the plugin create those
   records when the user requests it.
3. Ask the user to grant only the permissions needed for their tasks. The OAuth
   consent page controls the final grant.
4. After connection, use the available FieldRobin tools to answer a simple
   read-only question, such as the jobs scheduled today.
5. If the needed tool or permission is missing, explain which FieldRobin
   permission is required and ask the user to reconnect through the plugin's
   connection settings. Do not claim an action succeeded until FieldRobin
   returns a verified result.

FieldRobin data belongs to the connected workspace. Do not claim access to
another workspace or send workspace data to public discovery endpoints.
