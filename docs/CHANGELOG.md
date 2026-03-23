# Changelog

All meaningful changes documented in reverse chronological order (newest first).

**Format:** `- **[DATE] — [CATEGORY]:** Description`

**Categories:** INIT, FEATURE, COMPONENT, PAGE, FIX, REFACTOR, STYLE, CONTENT, SEO, PERF, A11Y, DOCS

---

## Log

- **2026-03-24 — FIX:** Fixed Embla carousel manual skip arrows by correctly stopping and resuming the AutoScroll plugin during manual scroll events.
- **2026-03-24 — FIX:** Stabilized Embla carousel AutoScroll plugin in `TestimonialCarousel` to prevent recreation and freezing in Vercel production builds.
- **2026-03-23 — FEATURE:** Upgraded the Admin Area (Phase 15) with an integrated Unified Inbox, Draft States & Advanced SEO controls for content, a visual Supabase Media Picker modal across all forms, and a live side-by-side MDX previewer.
- **2026-03-23 — FIX:** Resolved React hydration errors caused by Base UI DialogTrigger nesting buttons and fixed routing structures within the admin panel.
- **2026-03-20 — CONTENT:** Seeded the Supabase `journal` table with 4 high-quality initial MDX entries.
- **2026-03-20 — FEATURE:** Upgraded the Admin Dashboard (`/admin`) with dynamic recent projects, recent journals, and quick action shortcuts, migrating away from the placeholder stats view.
- **2026-03-20 — FEATURE:** Designed and deployed `ProjectGallery` multi-image masonry component for dynamic media expansion. Modified Supabase schema with `gallery` column integrations inside `/admin` CMS and Next.js routing.
- **2026-03-20 — INIT:** Project initialized with Next.js 15, TypeScript, Tailwind v4, pnpm. Created `/docs/` structure based on rules.
