---
name: fieldrobin-operations
description: Use when home-service businesses need an agent to review customers, leads, jobs, invoices, schedules, and reports, or create a customer or job in a connected FieldRobin workspace.
---

# Work in FieldRobin

Use this skill for a user's request about their connected FieldRobin workspace.
Start with the narrowest tool that answers the request, then summarize only
relevant results.

## Find information

- Workspace overview: `get-workspace-summary`.
- Today's schedule: `jobs-today`.
- Customers, jobs, leads, quotes, invoices, reviews, and service requests:
  use the matching `search-*` tool, then a matching `get-*` tool when details
  are needed.
- Payment status: use `search-invoices` and `get-invoice-payment-status`.
- Scheduling: use `schedule-availability` for available times and `search-jobs`
  or `get-job` for existing work.
- Pipeline priorities: use `pipeline-next-actions` or
  `pipeline-recommendations` when the user asks what needs attention.
- Reports: use the matching `reports-*` tool and preserve its date range and
  totals.

Do not invent a customer, job, payment, schedule, or report value when FieldRobin
returns no matching data. Say when no records match.

## Create records

FieldRobin supports direct creation of customers and jobs. Use
`create-customer` or `create-job` only after the user clearly asks to create the
record. Ask for required details when the request is incomplete. Create one
record per request unless the user asks for more. Report success only after the
tool returns a verified result.

Customer creation requires `mcp:customers:write`. Job creation requires
`mcp:jobs:write`. If the matching scope is missing, explain the permission and
ask the user to reconnect through the plugin's settings. Do not retry a denied
write as another operation.

The plugin does not update or delete existing records, send messages, send
invoices, or process payments. Use read-only preview tools for those workflows
where available; never imply that a preview changed FieldRobin.

## Protect workspace data

- Use only records returned for the connected FieldRobin workspace.
- Do not claim access to another workspace or account.
- Include customer details only when they help answer the user's request.
- Do not send workspace data to FieldRobin public discovery endpoints.
