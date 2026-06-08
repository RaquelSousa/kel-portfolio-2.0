# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio SPA — React 19 + TypeScript + Vite. Single-author site (Raquel Sousa) deployed as a static `dist/` build. Heavy emphasis on accessibility (a11y), SEO, and custom client-side analytics.

## Commands

The package manager and task runner is **Bun**.

- `bun run dev` — dev server on **port 8080** (not 5173)
- `bun run build` — production build (`build:dev` builds in dev mode; `build:analyze` / `bundle:analyze` for bundle inspection)
- `bun run lint` — ESLint (flat config in `eslint.config.js`); a11y rules are errors, not warnings
- `bun run test` — Vitest watch mode; `bun run test:run` runs once, `bun run test:coverage` for coverage
- Single test file: `bunx vitest run src/components/__tests__/SEO.test.tsx`
- Single test by name: `bunx vitest run -t "renders meta tags"`
- `bun run test:e2e` — Cypress headless; `bun run test:e2e:open` opens the runner
- `bun run seo:audit` — runs `scripts/seo-audit.js`
- `bun run audit:lighthouse` / `audit:a11y` — Lighthouse and axe-core CLI audits against the **running** dev server (`http://localhost:8080`), so start `bun run dev` first. Lighthouse writes `lighthouse-report.html` (gitignored).
- `bun run audit:deadcode` / `audit:health` — **Fallow** codebase intelligence (unused files/exports/deps, duplication, complexity); static, no server needed. `bunx fallow audit` gates changed code.

There is no separate typecheck script; type errors surface through the build (`tsc` is configured `noEmit`).

## Architecture

### Build & styling are config-light by design
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin. There is **no `tailwind.config.ts` and no `postcss.config.js`** (both were intentionally removed). The theme — colors, radii, fonts, keyframes/animations — lives in `src/index.css` inside the `@theme` block. Edit that file to change design tokens, not a JS config.
- Path alias `@/*` → `./src/*` is defined in both `tsconfig.app.json` and `vite.config.ts`. Keep them in sync.
- Vite manually splits vendor chunks (react, router, ui, form, query, utils) in `vite.config.ts` `build.rollupOptions.output.manualChunks`. Add heavy new deps there.

### UI components live in an external package
Most UI primitives are imported from **`kel-ui-components`** (the author's own published shadcn/Radix-based library, e.g. `import { Skeleton, TooltipProvider, SonnerToaster } from "kel-ui-components"`). Its styles are pulled in via `@import "kel-ui-components/styles.css"` at the top of `src/index.css`.

A local `src/components/ui/` directory still exists but is mostly legacy/superseded. Only a few are still imported locally (`form.tsx`, `label.tsx`, `section-header.tsx`). Toast was removed (`toast.tsx`/`toaster.tsx`/`use-toast.ts` deleted) in favor of **Sonner** (`SonnerToaster`). **When adding UI, prefer importing from `kel-ui-components`** over creating/editing files in `src/components/ui/`.

### Routing, code splitting, and error boundaries
`src/App.tsx` is the composition root and wires the provider stack: `ErrorBoundary` → `QueryClientProvider` → `TooltipProvider` → `AnalyticsProvider` → `BrowserRouter`.
- Routes (`/`, `/blog`, `*`) are `React.lazy` + `Suspense`, each wrapped in a `PageErrorBoundary` and a framer-motion page transition (`pageVariants` from `@/lib/animations`).
- Homepage sections (About/Experience/Projects/Skills/Contact) are *additionally* lazy-loaded via the `Suspended*` wrappers in `src/components/LazyComponents.tsx`. The homepage (`src/pages/Index.tsx`) composes these.
- **Three-tier error boundaries**: `ErrorBoundary` (app root, reports to analytics), `PageErrorBoundary` (per route), `ComponentErrorBoundary` (granular). Pick the level that matches blast radius.
- `RouteTracker` (rendered inside `BrowserRouter`) moves focus to `#main-content` on navigation for screen-reader announcements.

### Analytics (custom, client-only)
`src/lib/analytics.ts` is a singleton `AnalyticsService` (`analytics` export). Note: `flush()` currently only **console-logs** events — the `apiEndpoint: "/api/analytics"` is defined but nothing is sent to a backend yet. Don't assume events reach a server.

Consume analytics through the hooks in `src/hooks/useAnalytics.ts` (`usePageView`, `useComponentTracking`, `useFormTracking`, `useScrollTracking`, `useFeatureTracking`, etc.) rather than calling the singleton directly. `useAnalytics()` is invoked exactly once at the app root via `AnalyticsProvider`; calling `analytics.init()` again elsewhere will double-initialize.

### SEO (imperative head management — no react-helmet)
The `useSEO` hook (`src/hooks/useSEO.ts`) and `SEO` component imperatively create/update `<meta>`, `<link rel="canonical">`, and JSON-LD `<script>` tags directly on `document.head`. JSON-LD payloads are built by the schema generators in `src/utils/structuredData.ts` (typed via the `StructuredData` interface). Per-page SEO is configured by rendering `<SEO .../>` with structured data, as in `Index.tsx`.

### Forms & contact
react-hook-form + Zod. Schemas live in `src/lib/validations.ts`; form field wrappers in `src/components/ui/form.tsx`. The contact form sends through **EmailJS** (`src/lib/email.ts`), configured by `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (copy `env.template` → `.env`). `initializeEmailJS()` is called once in `src/main.tsx`. Without these env vars, sending throws a configuration error.

### Conventions worth matching
- Dark mode is **forced** — `Index.tsx` adds the `dark` class to `documentElement`. There is no theme toggle wired up despite `next-themes` being present.
- Static content (tech stack, projects) is data-driven from `src/data/constants.ts`, typed against `src/types/`. Update content there, not in JSX.
- Tests are co-located in `__tests__/` folders next to source. Vitest config lives inside `vite.config.ts` (`test` block: jsdom, `globals: true`, setup file `src/test/setup.ts` which loads jest-dom).
- In dev, `@axe-core/react` runs accessibility checks against the live DOM (wired in `main.tsx`) — a11y violations show in the console.

## Claude Code tooling in this repo

These ship **in the repo** (`.claude/`, `.mcp.json`) and load on session start — they are not global/user-level, so they travel with a clone:

- **Hooks** (`.claude/settings.json` → `.claude/hooks/*.mjs`, run via `bun`, cross-platform):
  - *PostToolUse lint* — runs `eslint --fix` on each edited `src/**/*.{ts,tsx}` and feeds remaining errors back (a11y rules are errors, so they surface immediately).
  - *PreToolUse guard* — blocks edits to `.env*` (holds the `VITE_EMAILJS_*` secrets) and `bun.lock` (change deps via `bun add`/`remove`).
- **Subagent** `a11y-seo-reviewer` (`.claude/agents/`) — reviews changed components for accessibility (ARIA/jsx-a11y/focus) and SEO (meta, canonical, JSON-LD). Use for an a11y/SEO pass.
- **Skills** (`.claude/skills/`): `/new-component` (scaffold a component per the conventions above), `/seo-check` (wraps `seo:audit` + JSON-LD validation), `/fallow` (vendored from the `fallow` dep — re-copy from `node_modules/fallow/skills/fallow/` when the dep is bumped to stay version-matched).
- **MCP servers** (`.mcp.json`, approved on first use): `playwright` (drive the live site on :8080), `context7` (live docs for React 19 / Tailwind v4 / Radix / Zod), `fallow` (`fallow-mcp` codebase intelligence).
