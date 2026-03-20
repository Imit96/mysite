# Document Templates — Project Management

Use these templates to create the `/docs/` directory during project initialization. Create each file exactly as templated below. These are living documents — update them throughout development per the workflow rules in CLAUDE-RULES.md.

---

## `docs/PROJECT_STATUS.md`

```markdown
# Project Status

**Last Updated:** [DATE]
**Overall Progress:** 0% complete
**Current Phase:** Phase 1 — Project Initialization
**Next Priority:** Initialize Next.js project and install dependencies

---

## Status Legend
- ✅ Complete — Built, tested in both themes, responsive, accessible
- 🔄 In Progress — Currently being built
- ⏳ Pending — Not yet started
- ⚠️ Blocked — Cannot proceed (document reason)
- 🐛 Has Issues — Built but has known problems (see KNOWN_ISSUES.md)

---

## Phase 1: Project Initialization
| Task | Status | Notes |
|------|--------|-------|
| Next.js project setup | ⏳ | |
| TypeScript configuration | ⏳ | |
| Tailwind CSS v4 setup | ⏳ | |
| pnpm + dependency installation | ⏳ | |
| ESLint configuration | ⏳ | |
| shadcn/ui initialization | ⏳ | |
| All shadcn components installed | ⏳ | |
| Project docs created | ⏳ | |

## Phase 2: Design System
| Task | Status | Notes |
|------|--------|-------|
| globals.css (CSS variables, both themes) | ⏳ | |
| Font loading (Sora + Inter via next/font) | ⏳ | |
| Tailwind config customization | ⏳ | |
| Theme toggle functional (next-themes) | ⏳ | |

## Phase 3: Global Layout
| Task | Status | Notes |
|------|--------|-------|
| Root layout.tsx (providers, structure) | ⏳ | |
| Navbar (desktop) | ⏳ | |
| Navbar (mobile + overlay menu) | ⏳ | |
| Footer | ⏳ | |
| Theme toggle component | ⏳ | |
| Scroll-to-top button | ⏳ | |
| Page transition (AnimatePresence) | ⏳ | |
| Lenis smooth scroll setup | ⏳ | |

## Phase 4: Shared Components
| Task | Status | Notes |
|------|--------|-------|
| SectionHeading | ⏳ | |
| ProjectCard | ⏳ | |
| DisciplineTag | ⏳ | |
| MarqueeStrip | ⏳ | |
| TestimonialCard | ⏳ | |
| ServiceCard | ⏳ | |
| CTABanner | ⏳ | |
| VideoShowreel | ⏳ | |
| ContactForm | ⏳ | |

## Phase 5: Audio Player System
| Task | Status | Notes |
|------|--------|-------|
| AudioPlayerContext (provider) | ⏳ | |
| AudioTrackPlayer (inline) | ⏳ | |
| AudioMiniPlayer (sticky bottom) | ⏳ | |
| AudioProgressBar (shared) | ⏳ | |
| Global audio element in layout | ⏳ | |

## Phase 6: MDX Infrastructure
| Task | Status | Notes |
|------|--------|-------|
| lib/mdx.ts (parsing utilities) | ⏳ | |
| lib/schemas.ts (Zod frontmatter schemas) | ⏳ | |
| MDX custom components (all) | ⏳ | |
| mdx-components.tsx (component map) | ⏳ | |

## Phase 7: Pages
| Task | Status | Notes |
|------|--------|-------|
| Home — Hero section | ⏳ | |
| Home — Marquee strip | ⏳ | |
| Home — Showreel/intro section | ⏳ | |
| Home — Selected work section | ⏳ | |
| Home — Services overview section | ⏳ | |
| Home — Testimonials section | ⏳ | |
| Home — CTA section | ⏳ | |
| Work — Grid page with filters | ⏳ | |
| Work — [slug] case study template | ⏳ | |
| Services — Full page | ⏳ | |
| About — Full page | ⏳ | |
| Contact — Form + Calendly | ⏳ | |
| Journal — Listing page (empty state) | ⏳ | |
| Journal — [slug] post template | ⏳ | |

## Phase 8: Seed Content
| Task | Status | Notes |
|------|--------|-------|
| 12 project MDX files created | ⏳ | |
| Placeholder images generated | ⏳ | |
| Placeholder audio files created | ⏳ | |
| Testimonial seed data | ⏳ | |

## Phase 9: SEO & Meta
| Task | Status | Notes |
|------|--------|-------|
| Global metadata (layout.tsx) | ⏳ | |
| Per-page metadata | ⏳ | |
| JSON-LD structured data | ⏳ | |
| sitemap.ts | ⏳ | |
| robots.ts | ⏳ | |
| OG image placeholder | ⏳ | |

## Phase 10: Polish & QA
| Task | Status | Notes |
|------|--------|-------|
| Responsive testing (375–1920px) | ⏳ | |
| Dark/light mode testing (all pages) | ⏳ | |
| Animation refinement | ⏳ | |
| Performance audit (Lighthouse 90+) | ⏳ | |
| Accessibility audit (WCAG AA) | ⏳ | |
| 404 page | ⏳ | |
| Loading/error states | ⏳ | |
```

---

## `docs/CHANGELOG.md`

```markdown
# Changelog

All meaningful changes documented in reverse chronological order (newest first).

**Format:** `- **[DATE] — [CATEGORY]:** Description`

**Categories:** INIT, FEATURE, COMPONENT, PAGE, FIX, REFACTOR, STYLE, CONTENT, SEO, PERF, A11Y, DOCS

---

## Log

<!-- Example entries:
- **2026-03-20 — INIT:** Project initialized with Next.js 15, TypeScript, Tailwind v4, pnpm.
- **2026-03-20 — COMPONENT:** Built Navbar (desktop + mobile) with theme toggle.
- **2026-03-21 — PAGE:** Built Home page hero section with staggered reveal animation.
- **2026-03-21 — FIX:** Fixed dark mode contrast issue on testimonial cards.
-->
```

---

## `docs/TASKS.md`

```markdown
# Task List

**Last Updated:** [DATE]

## Status: `[ ]` Not started · `[~]` In progress · `[x]` Complete · `[!]` Blocked

---

## Active Tasks
<!-- Move current work here -->

---

## Backlog (work top to bottom)

### P1 — Foundation
- [ ] Initialize Next.js 15 + TypeScript + pnpm
- [ ] Install all PRD dependencies
- [ ] Init shadcn/ui + install all components
- [ ] globals.css with full dual-theme color system
- [ ] Configure fonts (Sora + Inter) via next/font
- [ ] Tailwind config customization

### P2 — Global Layout
- [ ] Root layout.tsx with all providers
- [ ] Navbar (desktop + mobile overlay)
- [ ] Footer (CTA strip + grid + bottom bar)
- [ ] ThemeToggle, ScrollToTop, PageTransition
- [ ] Lenis smooth scroll

### P3 — Shared Components
- [ ] SectionHeading, ProjectCard, DisciplineTag
- [ ] MarqueeStrip, TestimonialCard, ServiceCard
- [ ] CTABanner, VideoShowreel, ContactForm

### P4 — Audio Player
- [ ] AudioPlayerContext + global audio element
- [ ] AudioTrackPlayer (inline), AudioMiniPlayer (sticky)
- [ ] AudioProgressBar (seek + scrub)

### P5 — MDX Infrastructure
- [ ] lib/mdx.ts, lib/schemas.ts, lib/types.ts, lib/constants.ts
- [ ] All MDX custom components + component map

### P6 — Pages
- [ ] Home (7 sections), Work (grid + filters)
- [ ] Work/[slug] (case study), Services, About
- [ ] Contact (form + Calendly), Journal (listing + post)

### P7 — Seed Content
- [ ] 12 project MDX files + placeholder images/audio

### P8 — SEO
- [ ] Metadata, JSON-LD, sitemap, robots, OG image

### P9 — Polish
- [ ] Responsive, theme QA, animations, Lighthouse, a11y, 404, error states

---

## Completed
<!-- Move done tasks here with date -->
```

---

## `docs/ARCHITECTURE_DECISIONS.md`

```markdown
# Architecture Decisions

Key technical decisions with reasoning. Prevents re-debating settled choices across sessions.

**Format:**
### AD-[NNN]: [Title]
- **Decision:** What was decided
- **Context:** Why it was needed
- **Options:** Alternatives considered
- **Chosen:** Selection + reasoning
- **Date:** When decided

---

## Decisions

<!-- Entries added as decisions are made -->
```

---

## `docs/KNOWN_ISSUES.md`

```markdown
# Known Issues

Active bugs, incomplete work, and tech debt. Check before starting to avoid duplicates.

**Format:**
- **KI-[NNN]** — Description
  - **Severity:** Critical / High / Medium / Low
  - **Location:** File or component
  - **Details:** What's wrong + workarounds
  - **Added:** [DATE]

---

## Active Issues

None yet — project not started.

---

## Resolved
<!-- Move fixed issues here with resolution date -->
```

---

## `docs/SETUP_GUIDE.md`

```markdown
# Setup Guide

## Prerequisites
- Node.js 20+ / pnpm 9+

## Install & Run
```bash
git clone [repo-url] && cd ojo-portfolio
pnpm install
pnpm dev        # → http://localhost:3000
```

## Scripts
```bash
pnpm dev         # Dev server
pnpm build       # Production build
pnpm start       # Production server
pnpm lint        # ESLint
pnpm type-check  # tsc --noEmit
```

## Environment
Copy `.env.example` → `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://ojotimileyin.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/ojo-oluwatimileyin/discovery-call
# RESEND_API_KEY=re_xxxx
```

## Content
- Projects: `/content/projects/*.mdx`
- Blog: `/content/journal/*.mdx`
- Images: `/public/images/projects/[slug]/`
- Audio: `/public/audio/[slug]/`

## Deploy
Vercel: `vercel deploy` or connect Git repo.
```
