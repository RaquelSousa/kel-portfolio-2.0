---
name: seo-check
description: Run an SEO + structured-data audit of the site (wraps `bun run seo:audit`) and verify per-page SEO wiring and JSON-LD. Use before pushing, or when asked to check SEO.
---

# seo-check

Audit the site's SEO and structured data, then report. Read-only unless the user asks you to fix findings.

## Steps
1. **Run the project audit** and report its output:
   ```bash
   bun run seo:audit
   ```
2. **Per-page `<SEO/>` wiring**: confirm `src/pages/Index.tsx`, `src/pages/Blog.tsx`, and the `*` (404) route each render `<SEO/>` with a **unique** `title`, `description`, and structured data, and that a `<link rel="canonical">` is produced (via `src/hooks/useSEO.ts`).
3. **JSON-LD validity**: schemas come from `src/utils/structuredData.ts` (typed `StructuredData`). Check required schema.org fields per type (e.g. Person / WebSite / BreadcrumbList) are present and non-empty.
4. **Sitemap/robots**: confirm `public/sitemap.xml` (and `public/robots.txt` if present) match the current routes.
5. **Headings**: one `<h1>` per page, logical order, no skipped levels.

## Report
Summarize pass/fail per check with `file:line` references and concrete fixes. Don't change files unless asked.
