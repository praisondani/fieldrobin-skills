import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const plugin = JSON.parse(readFileSync(new URL("../plugin.json", import.meta.url), "utf8"));
const mcp = JSON.parse(readFileSync(new URL("../mcp.json", import.meta.url), "utf8"));
const skillsManifest = JSON.parse(readFileSync(new URL("../skills.sh.json", import.meta.url), "utf8"));
const marketplace = JSON.parse(readFileSync(new URL("../.agents/plugins/marketplace.json", import.meta.url), "utf8"));
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const repoRoot = resolve(fileURLToPath(new URL("../", import.meta.url)));
const mcpSkill = readFileSync(new URL("../skills/fieldrobin-mcp/SKILL.md", import.meta.url), "utf8");
const apiSkill = readFileSync(new URL("../skills/fieldrobin-api/SKILL.md", import.meta.url), "utf8");
const oauthSkill = readFileSync(new URL("../skills/fieldrobin-oauth/SKILL.md", import.meta.url), "utf8");
const setupSkill = readFileSync(new URL("../skills/fieldrobin-setup/SKILL.md", import.meta.url), "utf8");
const openai = plugin.extensions?.["com.openai"];

test("packages FieldRobin as a portable ChatGPT and Codex plugin", () => {
  assert.equal(plugin.$schema, "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json");
  assert.equal(plugin.name, "fieldrobin");
  assert.equal(plugin.version, "1.0.1");
  assert.equal(openai?.interface?.displayName, "FieldRobin");
  assert.equal(openai?.interface?.websiteURL, "https://fieldrobin.com/chatgpt");
  assert.equal(openai?.interface?.category, "Business & Operations");
  assert.ok(openai?.interface?.privacyPolicyURL?.startsWith("https://fieldrobin.com/"));
  assert.ok(openai?.interface?.supportURL?.startsWith("https://fieldrobin.com/"));
  assert.equal(openai?.interface?.defaultPrompt?.length, 3);
  assert.equal(openai?.onboardingSkill, "./skills/fieldrobin-setup/SKILL.md");
  assert.match(openai?.publication?.release_notes ?? "", /fieldrobin doctor/i);
  assert.doesNotMatch(openai?.publication?.release_notes ?? "", /check production health/i);
});

test("configures the portable MCP server for OAuth DCR with least-privilege read access", () => {
  const server = mcp.mcpServers?.fieldrobin;

  assert.equal(mcp.$schema, "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json");
  assert.equal(server?.type, "streamable-http");
  assert.equal(server?.url, "https://fieldrobin.com/api/v1/mcp");
  assert.deepEqual(server?.extensions?.["com.openai"]?.auth, {
    type: "oauth",
    client: { mode: "dcr" },
    baseScopes: ["mcp:read"],
  });
  assert.deepEqual(Object.keys(server ?? {}).sort(), ["extensions", "type", "url"]);
});

test("offers FieldRobin through a Codex plugin marketplace install path", () => {
  const entry = marketplace.plugins?.find((pluginEntry) => pluginEntry.name === "fieldrobin");

  assert.equal(marketplace.name, "fieldrobin-skills");
  assert.equal(entry?.source?.source, "local");
  assert.equal(entry?.source?.path, "./");
  assert.equal(entry?.policy?.installation, "AVAILABLE");
  assert.equal(entry?.policy?.authentication, "ON_INSTALL");
  assert.equal(resolve(repoRoot, entry.source.path), repoRoot);
  assert.equal(JSON.parse(readFileSync(resolve(repoRoot, entry.source.path, "plugin.json"), "utf8")).name, "fieldrobin");
  assert.match(readme, /codex plugin marketplace add praisondani\/fieldrobin-skills/);
  assert.match(readme, /codex plugin add fieldrobin@fieldrobin-skills/);
  assert.match(readme, /Business and Enterprise\/Edu/i);
});

test("rebuilds plugin ZIPs without retaining files from an older archive", () => {
  const tempRoot = mkdtempSync(join(tmpdir(), "fieldrobin-plugin-package-"));
  const archivePath = join(tempRoot, "plugin.zip");

  try {
    writeFileSync(join(tempRoot, "stale.txt"), "removed from plugin source");
    execFileSync("zip", ["-q", archivePath, "stale.txt"], { cwd: tempRoot });
    execFileSync(process.execPath, [resolve(repoRoot, "scripts/package-plugin.mjs"), archivePath]);

    const entries = execFileSync("unzip", ["-Z1", archivePath], { encoding: "utf8" }).split("\n");
    assert.ok(entries.includes("plugin.json"));
    assert.ok(!entries.includes("stale.txt"), "rebuilt archives must not retain removed package files");
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("includes review coverage for supported and denied requests", () => {
  const cases = openai?.review?.test_cases;

  assert.equal(cases?.positive?.length, 5);
  assert.equal(cases?.negative?.length, 3);
  for (const scenario of cases?.positive ?? []) {
    assert.ok(scenario.prompt);
    assert.ok(scenario.tools_triggered);
    assert.ok(scenario.expected_behavior);
    assert.match(scenario.description, /Setup:/);
  }
  for (const scenario of cases?.negative ?? []) {
    assert.ok(scenario.prompt);
    assert.match(scenario.description, /Expected behavior:/);
  }
  assert.equal(openai?.review?.commerce, false);
  assert.ok(!openai?.review?.demo_recording_url, "do not package a placeholder review video URL");
});

test("bundles user workflows and all referenced listing assets", () => {
  const interfaceMetadata = openai?.interface ?? {};
  for (const relativePath of [
    openai?.onboardingSkill,
    interfaceMetadata.logo,
    interfaceMetadata.composerIcon,
  ]) {
    assert.ok(relativePath?.startsWith("./"), `expected a package-relative path: ${relativePath}`);
    readFileSync(new URL(`../${relativePath.slice(2)}`, import.meta.url));
  }

  const skill = readFileSync(
    new URL(`../${openai.onboardingSkill.slice(2)}`, import.meta.url),
    "utf8",
  );
  assert.match(skill, /^---\nname: fieldrobin-setup/m);
  assert.match(skill, /mcp:customers:write/);
  assert.match(skill, /mcp:jobs:write/);
});

test("publishes all six bundled skills in the skills.sh grouping manifest", () => {
  const groupedSkills = skillsManifest.groupings.flatMap((group) => group.skills);
  const expectedSkills = [
    "fieldrobin-api",
    "fieldrobin-mcp",
    "fieldrobin-oauth",
    "fieldrobin-operations",
    "fieldrobin-public-discovery",
    "fieldrobin-setup",
  ];

  for (const name of expectedSkills) {
    assert.ok(groupedSkills.includes(name), `${name} must be discoverable from skills.sh`);
    readFileSync(new URL(`../skills/${name}/SKILL.md`, import.meta.url), "utf8");
  }
});

test("documents skill and ChatGPT plugin install paths accurately", () => {
  assert.match(readme, /npx skills add praisondani\/fieldrobin-skills/);
  assert.match(readme, /npx skills add https:\/\/fieldrobin\.com --list/);
  assert.match(readme, /Add custom MCP server/);
  assert.match(readme, /OAuth Dynamic Client Registration \(DCR\)/i);
  assert.match(readme, /mcp:read.*base scope/i);
  assert.match(readme, /universal public plugin directory/i);
  assert.match(readme, /ChatGPT custom MCP connections are web-only/i);
  assert.match(mcpSkill, /Create as a plugin/);
  assert.match(mcpSkill, /type `@` and select FieldRobin/);
  assert.match(mcpSkill, /github:praisondani\/fieldrobin-sdk#v0\.2\.0/);
  assert.doesNotMatch(mcpSkill, /add the Streamable HTTP URL as a remote MCP server, then complete OAuth/i);
});

test("checks public endpoint readiness before directing users to MCP or OAuth setup", () => {
  for (const content of [readme, apiSkill, mcpSkill, oauthSkill, setupSkill]) {
    assert.match(content, /\/api\/health|fieldrobin doctor/);
    assert.match(content, /stop/i);
  }
  for (const content of [readme, apiSkill, mcpSkill]) {
    assert.match(content, /fieldrobin doctor/);
    assert.match(content, /without sending an OAuth token|does not send an OAuth token/i);
    assert.match(content, /read(?:ing)? workspace data/i);
  }
  assert.doesNotMatch(readme, /direct ChatGPT connection work without/i);
  assert.doesNotMatch(readme, /connects to the live MCP service/i);
});

test("pins CLI doctor instructions to the source branch that contains doctor", () => {
  for (const content of [readme, apiSkill, mcpSkill]) {
    assert.match(content, /fieldrobin-cli#codex\/npm-release-status/);
    assert.doesNotMatch(content, /fieldrobin-cli#main/);
  }
});
