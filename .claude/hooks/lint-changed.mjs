// PostToolUse(Edit|Write|MultiEdit) hook.
// Lints the .ts/.tsx file Claude just changed. In this project jsx-a11y rules
// are ERRORS, so this surfaces accessibility regressions the moment they happen
// instead of waiting for `bun run lint`. Auto-fixes what it can; reports the rest.
import { spawnSync } from "node:child_process";
import { basename } from "node:path";

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let data = {};
try {
  data = JSON.parse(raw || "{}");
} catch {
  process.exit(0); // malformed input — never block the workflow
}

const fp = data?.tool_input?.file_path || "";
const norm = fp.replace(/\\/g, "/");

// Only lint TS/TSX under src/ — eslint.config.js targets **/*.{ts,tsx}.
if (!/\.(ts|tsx)$/.test(norm)) process.exit(0);
if (!/(^|\/)src\//.test(norm)) process.exit(0);

const res = spawnSync(`bunx eslint --fix "${fp}"`, {
  shell: true,
  encoding: "utf8",
});

// spawn failed (e.g. bun not on PATH): warn but don't block edits.
if (res.error) process.exit(0);

// ESLint exits non-zero only on errors (warnings don't), so this fires only on
// real problems — a11y violations, unused vars, etc.
if (res.status && res.status !== 0) {
  const out = `${res.stdout || ""}${res.stderr || ""}`.trim();
  process.stderr.write(
    `[lint hook] ESLint errors in ${basename(fp)} (a11y rules are errors here — please fix):\n${out}\n`
  );
  process.exit(2); // exit 2 => stderr is fed back to Claude as actionable feedback
}

process.exit(0);
