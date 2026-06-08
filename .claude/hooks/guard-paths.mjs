// PreToolUse(Edit|Write|MultiEdit) hook.
// Blocks edits to protected files:
//   - .env / .env.* (holds EmailJS secrets VITE_EMAILJS_*) — but allows templates/examples
//   - bun.lock (should change via `bun add` / `bun remove`, not by hand)
import { basename } from "node:path";

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let data = {};
try {
  data = JSON.parse(raw || "{}");
} catch {
  process.exit(0);
}

const fp = (data?.tool_input?.file_path || "").replace(/\\/g, "/");
if (!fp) process.exit(0);
const base = basename(fp).toLowerCase();

const isProtectedEnv =
  /^\.env(\..+)?$/.test(base) && // .env, .env.local, .env.production ...
  !base.includes("template") &&
  !base.includes("example") &&
  !base.includes("sample"); // ...but not env templates/examples

const isLock = base === "bun.lock" || base === "bun.lockb";

if (isProtectedEnv || isLock) {
  const reason = isProtectedEnv
    ? "`.env` holds EmailJS secrets (VITE_EMAILJS_*). Edit it by hand, not through Claude."
    : "Lock files should change via `bun add` / `bun remove`, not direct edits.";
  process.stderr.write(`[guard hook] Blocked edit to ${base}. ${reason}\n`);
  process.exit(2); // exit 2 on PreToolUse => blocks the tool call
}

process.exit(0);
