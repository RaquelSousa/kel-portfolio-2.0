---
name: new-component
description: Scaffold a new React component following this project's conventions (kel-ui-components first, data-driven content, co-located tests, accessibility by default). Use when asked to create a new component or homepage section.
---

# new-component

Scaffold a component that matches this codebase's conventions. If the name or purpose isn't given, ask first.

## Conventions to follow
1. **Reuse first**: if a primitive exists in `kel-ui-components`, import it (`import { Button } from "kel-ui-components"`) instead of building one or editing `src/components/ui/*` (that dir is mostly legacy). Create local UI only as a last resort.
2. **Path alias**: import internal modules via `@/...` (e.g. `@/lib/animations`, `@/data/constants`).
3. **Data-driven content**: static copy/lists (tech, projects, etc.) go in `src/data/constants.ts`, typed against `src/types/index.ts` — not hard-coded in JSX.
4. **Accessibility (lint errors here)**: semantic elements, labelled controls, valid ARIA, keyboard operable, `alt` text. A section component should expose a landmark with an accessible name.
5. **Animation**: if animated, use framer-motion with variants from `@/lib/animations`; honor `prefers-reduced-motion`.
6. **Dark mode is forced** — design against the dark theme tokens in `src/index.css`.
7. **Homepage sections are lazy**: if this is a homepage section, add a `Suspended*` wrapper in `src/components/LazyComponents.tsx` and compose it in `src/pages/Index.tsx`. Pick the error-boundary tier (`ComponentErrorBoundary` for granular) that matches blast radius.
8. **Co-locate a test**: add `__tests__/<Name>.test.tsx` next to the component (Vitest + Testing Library, jsdom, `globals: true`). Cover render + at least one a11y query (`getByRole`).

## Steps
1. Confirm the name (PascalCase) and whether it's a homepage section.
2. Create `src/components/<Name>.tsx` with a typed props interface.
3. Add any static content/types to `src/data/constants.ts` / `src/types/index.ts`.
4. If a section: wire the lazy `Suspended*` wrapper and compose it in `Index.tsx`.
5. Add the co-located test.
6. Verify: `bun run lint` and `bunx vitest run src/components/__tests__/<Name>.test.tsx`.
