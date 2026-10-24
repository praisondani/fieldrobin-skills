import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(readFileSync(resolve(root, "plugin.json"), "utf8"));
const archivePath = resolve(root, process.argv[2] ?? `dist/${manifest.name}-${manifest.version}.zip`);
const packageFiles = ["plugin.json", "mcp.json", "skills", "assets"];

for (const path of packageFiles) {
  if (!existsSync(resolve(root, path))) {
    throw new Error(`Plugin package is missing required path: ${path}`);
  }
}

mkdirSync(dirname(archivePath), { recursive: true });
rmSync(archivePath, { force: true });
execFileSync("zip", ["-X", "-r", archivePath, ...packageFiles], { cwd: root, stdio: "inherit" });
process.stdout.write(`Created ${archivePath}\n`);
