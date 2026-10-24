import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const packageManifest = JSON.parse(readFileSync(new URL("../plugin.json", import.meta.url), "utf8"));
const mcpConfig = JSON.parse(readFileSync(new URL("../mcp.json", import.meta.url), "utf8"));
const endpoint = mcpConfig.mcpServers?.fieldrobin?.url;

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function getJson(url) {
  const response = await fetch(url, { headers: { accept: "application/json" } });
  const body = await response.text();
  requireCondition(response.ok, `GET ${url} returned HTTP ${response.status}: ${body.slice(0, 300)}`);
  try {
    return JSON.parse(body);
  } catch {
    throw new Error(`GET ${url} did not return JSON.`);
  }
}

async function callMcp(id, method, params = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
  });
  const body = await response.text();
  requireCondition(response.ok, `${method} returned HTTP ${response.status}: ${body.slice(0, 300)}`);

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error(`${method} did not return a JSON response.`);
  }
  requireCondition(payload.id === id, `${method} returned an unexpected JSON-RPC id.`);
  requireCondition(!payload.error, `${method} failed: ${JSON.stringify(payload.error)}`);
  return payload.result;
}

async function main() {
  requireCondition(typeof endpoint === "string", "mcp.json is missing mcpServers.fieldrobin.url.");
  const parsedEndpoint = new URL(endpoint);
  requireCondition(parsedEndpoint.protocol === "https:", "The public MCP endpoint must use HTTPS.");

  const origin = parsedEndpoint.origin;
  const [authorizationServer, protectedResource, serverCard] = await Promise.all([
    getJson(`${origin}/.well-known/oauth-authorization-server`),
    getJson(`${origin}/.well-known/oauth-protected-resource/api/v1/mcp`),
    getJson(`${origin}/.well-known/mcp/server-card.json`),
  ]);
  requireCondition(serverCard.serverUrl === endpoint, "The server card URL does not match mcp.json.");
  const server = mcpConfig.mcpServers.fieldrobin;
  requireCondition(
    Object.keys(server).sort().join(",") === "extensions,type,url",
    "The portable MCP server entry must configure its transport, URL, and host extensions.",
  );
  requireCondition(
    server.extensions?.["com.openai"]?.auth?.type === "oauth" &&
      server.extensions["com.openai"].auth.client?.mode === "dcr" &&
      server.extensions["com.openai"].auth.baseScopes?.includes("mcp:read"),
    "The portable MCP server entry must use OAuth DCR and request mcp:read.",
  );
  requireCondition(
    authorizationServer.registration_endpoint === `${origin}/api/oauth/register`,
    "OAuth discovery does not expose the expected dynamic registration endpoint.",
  );
  requireCondition(
    authorizationServer.code_challenge_methods_supported?.includes("S256"),
    "OAuth discovery does not support PKCE with S256.",
  );
  requireCondition(
    protectedResource.resource === endpoint &&
      protectedResource.authorization_servers?.includes(authorizationServer.issuer),
    "Protected-resource metadata does not point to the configured endpoint and issuer.",
  );

  const supportedScopes = new Set(authorizationServer.scopes_supported ?? []);
  for (const scope of ["mcp:read", "mcp:customers:write", "mcp:jobs:write"]) {
    requireCondition(supportedScopes.has(scope), `OAuth discovery does not support required scope ${scope}.`);
  }

  await callMcp(1, "initialize", {
    protocolVersion: serverCard.protocolVersion,
    capabilities: {},
    clientInfo: { name: packageManifest.name, version: packageManifest.version },
  });
  const tools = await callMcp(2, "tools/list");
  const toolNames = new Set((tools?.tools ?? []).map((tool) => tool.name));
  requireCondition(toolNames.size > 0, "The public MCP catalog returned no tools.");

  const challengeResponse = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "get-workspace-summary", arguments: {} },
    }),
  });
  const authChallenge = challengeResponse.headers.get("www-authenticate") ?? "";
  requireCondition(challengeResponse.status === 401, "The protected read tool did not request OAuth.");
  requireCondition(
    authChallenge.includes("Bearer") && authChallenge.includes("resource_metadata="),
    "The protected read tool returned no OAuth resource-metadata challenge.",
  );

  const positiveCases = packageManifest.extensions?.["com.openai"]?.review?.test_cases?.positive ?? [];
  const reviewedTools = new Set(
    positiveCases.flatMap((scenario) =>
      String(scenario.tools_triggered ?? "")
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean),
    ),
  );
  for (const name of reviewedTools) {
    requireCondition(toolNames.has(name), `Review case references MCP tool ${name}, which is not in the live catalog.`);
  }

  process.stdout.write(
    `Verified ${endpoint}: discovered OAuth DCR, PKCE S256, a bearer challenge, ${toolNames.size} public tool schemas, and ${reviewedTools.size} reviewed tools.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
