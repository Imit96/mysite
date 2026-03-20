# Claude Rules — OJO OLUWATIMILEYIN Portfolio

You are an expert senior full-stack developer building a premium personal portfolio website for Ojo Oluwatimileyin — a multidisciplinary creative (developer, designer, brand strategist, photographer, videographer, music producer).

**Reference:** [eloqwnt.com](https://www.eloqwnt.com/) — adapt the vibe (layout pacing, type hierarchy, numbered services, marquee strips, premium spacing), never copy.

**Source of truth:** `PRD-Portfolio-OJO-OLUWATIMILEYIN.md` in project root. Consult it for all specs, content, and structure. Do not guess when the PRD provides direction.

---

## Tech Stack (Do Not Deviate)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router only — NO pages router) |
| Language | TypeScript strict (no `any`) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (check before building custom) |
| Animations | Framer Motion (restrained, purposeful) |
| Content & DB | Supabase (PostgreSQL, Auth, Storage) + Next.js Admin Panel |
| Theme | next-themes (system default, class strategy) |
| Smooth Scroll | @studio-freight/lenis |
| Forms | react-hook-form + zod |
| Package Manager | pnpm |

---

## Project Management — Mandatory Workflow

### Required Documents in `/docs/`
These MUST exist. Create from `DOCUMENT-TEMPLATES.md` during project init if missing.
- `PROJECT_STATUS.md` — Phase-by-phase feature status with emoji indicators
- `CHANGELOG.md` — Reverse-chronological log of every change
- `TASKS.md` — Prioritized task backlog with completion tracking
- `ARCHITECTURE_DECISIONS.md` — Key technical decisions with reasoning
- `KNOWN_ISSUES.md` — Active bugs and incomplete work
- `SETUP_GUIDE.md` — Install, run, and develop instructions

### Before ANY Work Session
1. Read `docs/PROJECT_STATUS.md` — know what's built, in progress, and pending
2. Read `docs/TASKS.md` — work on highest-priority incomplete task unless user says otherwise
3. Read `docs/KNOWN_ISSUES.md` — avoid conflicts with existing problems
4. Scan `docs/CHANGELOG.md` — understand recent changes for continuity
5. Run `pnpm dev` — confirm project compiles before making changes

### After ANY Meaningful Change
1. Update `docs/CHANGELOG.md` — log what you did
2. Update `docs/PROJECT_STATUS.md` — change affected feature statuses
3. Update `docs/TASKS.md` — mark done, add any discovered tasks
4. Update `docs/KNOWN_ISSUES.md` — add new issues, remove fixed ones
5. Run `pnpm dev` — confirm zero errors

### Workflow Rules
- **Atomic progress** — each increment builds one thing, leaves project runnable, gets documented
- **Never leave project broken** — revert/comment incomplete code if interrupted, document in KNOWN_ISSUES
- **Document decisions** — technical choices not in the PRD go in ARCHITECTURE_DECISIONS.md
- **Log discovered work** — don't context-switch; add new findings to TASKS.md, continue current work
- **Never skip doc updates** — every change gets logged, no exceptions

---

## Component Architecture

- **Server Components by default.** `"use client"` only for interactivity (state, effects, event handlers, browser APIs, Framer Motion).
- Keep `"use client"` components small and leaf-level. Never on page/layout components — extract interactive parts.
- One component per file. Kebab-case filenames (`project-card.tsx` → `ProjectCard`).
- Named exports always, except `page.tsx` / `layout.tsx` (Next.js requires default).
- Accept and forward `className` prop on every component.
- Keep under ~150 lines — split if larger.

---

## File Organization

```
docs/              → Project management docs (read + update every session)
components/
  ui/              → shadcn/ui only (don't manually edit)
  layout/          → Navbar, Footer, ThemeToggle, ScrollToTop, PageTransition
  shared/          → Reusable: ProjectCard, SectionHeading, MarqueeStrip, etc.
  audio/           → AudioProvider, AudioTrackPlayer, AudioMiniPlayer
  admin/           → Custom Next.js Admin Panel (Dashboard, Auth, Editors)
  sections/        → Page-specific sections organized by route (home/, work/, etc.)
lib/
  utils.ts         → cn(), formatDate, calculateReadingTime
  supabase/        → Supabase client setup (browser, server) and DB hooks
  constants.ts     → Site config, nav links, services data, social links
  schemas.ts       → Zod schemas (forms, frontmatter)
  types.ts         → Shared TypeScript interfaces
```

---

## Styling

- Tailwind utilities first. No custom CSS unless unavoidable (keyframes, CSS-only marquee).
- Use `cn()` (clsx + tailwind-merge) for conditional classes.
- All colors via CSS custom properties in `globals.css` — never hardcode hex/rgb.
- Use semantic tokens (`--primary`, `--muted-foreground`, `--border`) for auto dark/light.
- Discipline tag colors via `--tag-*` variables from the PRD.
- Mobile-first responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- Sections: `py-24 md:py-32 lg:py-40` vertically, `px-6 md:px-12 lg:px-20` horizontally.
- Content max-width: `max-w-7xl mx-auto`.

---

## Dark/Light Mode

- `next-themes` with `attribute="class"`, `defaultTheme="system"`.
- Both modes must look equally premium — dark mode has its own distinct palette (PRD Section 3.1), not a lazy inversion.
- Test both modes on every component immediately after building.
- Shadows: visible in light, minimal/absent in dark.

---

## Animations (Framer Motion)

- Every animation must serve a purpose: reveal content, provide feedback, or guide attention.
- Standard reveal: `{ opacity: 0, y: 20 }` → `{ opacity: 1, y: 0 }`, `duration: 0.6`, `ease: [0.25, 0.1, 0.25, 1]`.
- Stagger: `staggerChildren: 0.1`.
- `whileInView` with `viewport={{ once: true, amount: 0.2 }}` — reveal once only.
- Hover effects: 300-400ms, subtle. Never jarring.
- Never use Framer Motion in Server Components.

---

## Images

- Always `next/image` — never raw `<img>`.
- Always provide `width`, `height`, `alt`.
- `placeholder="blur"` where possible.
- Project images in `/public/images/projects/[slug]/`.
- Descriptive alt text, never empty strings.

---

## Supabase CMS Architecture

- **PostgreSQL Database:** All content managed dynamically.
- **Supabase Auth:** Securing the `/admin` path for the site owner only.
- **Storage Buckets:** Assets managed in Supabase Cloud.
- **SSR Fetching:** Case studies and blogs fetched via Server Components for native speeds.

---

## Audio Player

- Single `<audio>` element in root layout, managed by `AudioPlayerContext`.
- One track at a time — playing new track stops previous.
- Inline player (`AudioTrackPlayer`): cover art, progress bar, volume, play/pause.
- Mini player (`AudioMiniPlayer`): sticky bottom, appears via Intersection Observer when inline player scrolls away.
- Progress bar: smooth (requestAnimationFrame or CSS transitions), click-to-seek, drag-to-scrub.
- No autoplay. Audio only on explicit user interaction.

---

## TypeScript

- Never `any`. Use proper types, generics, or `unknown` + type guards.
- Export explicit types/interfaces for all props and data structures.
- `satisfies` operator for type-safe object literals.
- Shared types in `/lib/types.ts`.

---

## Accessibility (Non-Negotiable)

- Keyboard-navigable interactive elements.
- Semantic HTML (`nav`, `main`, `article`, `section`, `header`, `footer`).
- One `h1` per page, proper heading hierarchy.
- All images: descriptive `alt`. All icon buttons: `aria-label`.
- Visible focus indicators. WCAG AA color contrast in both themes.
- Mobile menu traps focus when open.

---

## Performance

- Server Components by default.
- Lazy load heavy components (`next/dynamic`): Calendly, audio player, video.
- Fonts via `next/font/google` only.
- Lighthouse 90+ mobile.
- Tree-shake imports.

---

## Code Conventions

**Naming:** Files kebab-case, Components PascalCase, functions camelCase, constants UPPER_SNAKE_CASE, types PascalCase.

**Import order:** React/Next → third-party → shadcn/ui → custom components → utils/types.

**shadcn/ui:** Always check if a component exists before building custom. Extend with CVA variants in wrapper components, never modify base files.

**Error handling:** Zod + react-hook-form for forms (inline errors, never `alert()`). Skeleton loading states. Error boundaries with fallback UI. Custom 404. Meaningful empty states.

---

## What NOT to Do

- No Pages Router. App Router only.
- No `any` type.
- No raw `<img>` tags.
- No hardcoded colors.
- No `localStorage`/`sessionStorage` for theme.
- No purposeless animations.
- No default exports (except page/layout).
- No `useEffect` for data fetching.
- No unlisted dependencies without documenting in ARCHITECTURE_DECISIONS.md.
- No `@apply` in CSS.
- No missing alt text.
- No `console.log` in production.
- No single-theme-only components.
- No inline styles.
- No `"use client"` on page/layout components.
- No generic font stacks (use Sora + Inter via next/font).
- No skipping doc updates.
- No coding without reading docs first.

---

## Build Order

Update TASKS.md and PROJECT_STATUS.md as each step completes.

1. Init project + create `/docs/` from templates
2. Install all PRD dependencies
3. shadcn/ui setup + all components
4. Design system (globals.css, fonts, Tailwind config)
5. Global layout (root layout, navbar, footer, theme toggle, smooth scroll)
6. Shared components (all reusable UI)
7. Audio player system
8. MDX infrastructure (parsing, schemas, custom components)
9. Pages: Home → Work → Work/[slug] → Services → About → Contact → Journal → Journal/[slug]
10. Seed content (12 projects, placeholder images/audio)
11. SEO (metadata, JSON-LD, sitemap, robots, OG images)
12. Polish (responsive, themes, animations, Lighthouse, accessibility, cross-browser)

---

## When in Doubt

1. Check project docs (PROJECT_STATUS, TASKS)
2. Check the PRD
3. Check shadcn/ui docs
4. Prefer simplicity
5. Document decisions in ARCHITECTURE_DECISIONS.md
6. Ask rather than guess