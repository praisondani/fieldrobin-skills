import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const plugin = JSON.parse(readFileSync(new URL("../plugin.json", import.meta.url), "utf8"));
const mcp = JSON.parse(readFileSync(new URL("../mcp.json", import.meta.url), "utf8"));
const skillsManifest = JSON.parse(readFileSync(new URL("../skills.sh.json", import.meta.url), "utf8"));
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const mcpSkill = readFileSync(new URL("../skills/fieldrobin-mcp/SKILL.md", import.meta.url), "utf8");
const openai = plugin.extensions?.["com.openai"];

test("packages FieldRobin as a portable ChatGPT and Codex plugin", () => {
  assert.equal(plugin.$schema, "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json");
  assert.equal(plugin.name, "fieldrobin");
  assert.equal(plugin.version, "1.0.0");
  assert.equal(openai?.interface?.displayName, "FieldRobin");
  assert.equal(openai?.interface?.websiteURL, "https://fieldrobin.com/chatgpt");
  assert.equal(openai?.interface?.category, "Business & Operations");
  assert.ok(openai?.interface?.privacyPolicyURL?.startsWith("https://fieldrobin.com/"));
  assert.ok(openai?.interface?.supportURL?.startsWith("https://fieldrobin.com/"));
  assert.equal(openai?.interface?.defaultPrompt?.length, 3);
  assert.equal(openai?.onboardingSkill, "./skills/fieldrobin-setup/SKILL.md");
});

test("uses a Codex-compatible portable server entry and discovers OAuth from FieldRobin", () => {
  const server = mcp.mcpServers?.fieldrobin;

  assert.equal(mcp.$schema, "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json");
  assert.equal(server?.type, "streamable-http");
  assert.equal(server?.url, "https://fieldrobin.com/api/v1/mcp");
  assert.deepEqual(Object.keys(server ?? {}).sort(), ["type", "url"]);
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
  assert.match(readme, /Add custom MCP server/);
  assert.match(readme, /public ChatGPT and Codex plugin directory/i);
  assert.match(mcpSkill, /Create as a plugin/);
  assert.match(mcpSkill, /type `@` and select FieldRobin/);
  assert.doesNotMatch(mcpSkill, /add the Streamable HTTP URL as a remote MCP server, then complete OAuth/i);
});
