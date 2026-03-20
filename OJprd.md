# Product Requirements Document (PRD)
# Portfolio Website — OJO OLUWATIMILEYIN

**Document Version:** 1.0
**Date:** March 2026
**Status:** Ready for Development
**Target:** AI-powered IDE execution (Cursor, Windsurf, Claude Code, etc.)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Design System & Theming](#3-design-system--theming)
4. [Site Architecture & Routing](#4-site-architecture--routing)
5. [Global Layout & Components](#5-global-layout--components)
6. [Page-by-Page Specifications](#6-page-by-page-specifications)
7. [Custom Audio Player System](#7-custom-audio-player-system)
8. [Blog System (MDX)](#8-blog-system-mdx)
9. [Animation & Interaction Specs](#9-animation--interaction-specs)
10. [SEO & Metadata](#10-seo--metadata)
11. [Performance Requirements](#11-performance-requirements)
12. [Seed Content & Placeholder Data](#12-seed-content--placeholder-data)
13. [File & Folder Structure](#13-file--folder-structure)
14. [Deployment & Configuration](#14-deployment--configuration)

---

## 1. Project Overview

### 1.1 What This Is
A premium, globally competitive personal portfolio website for **OJO OLUWATIMILEYIN** — a multidisciplinary creative professional who works across full-stack web development, UI/UX design, brand strategy, photography, videography, and music production.

### 1.2 Primary Goal
Attract high-value freelance clients across four audience segments: startup founders, creative agencies, artists/musicians, and enterprise/corporate organizations.

### 1.3 Positioning
The site positions Ojo not as someone who "does many things," but as a **Creative Director & Developer** who designs, builds, and produces digital experiences across every medium — from code to camera to sound.

### 1.4 Design Reference
**Primary reference:** [eloqwnt.com](https://www.eloqwnt.com/) — Study the following elements from this site:
- Numbered services list with hover-expand interactions
- Featured project cards with discipline tags and project numbers
- Horizontal marquee text strips between sections
- Showreel video integration in the hero/about area
- Testimonials carousel with client photos and company info
- Clean, spacious layout with strong typographic hierarchy
- Contact section with structured intake form
- Mega-menu navigation with icon-labeled dropdown items

**Adapt, do not copy.** The Eloqwnt site is a studio; this is a personal brand. The tone should be warmer, more personal, and showcase the full breadth of disciplines (including music and photography) that Eloqwnt doesn't cover.

### 1.5 Visual Mood
**Hybrid dark/light mode with smooth toggle.** Default to user's system preference. The dark mode should feel cinematic and immersive (think deep charcoal, not pure black). The light mode should feel clean, airy, and editorial. Both modes must feel equally premium — not a lazy inversion.

---

## 2. Tech Stack & Dependencies

### 2.1 Core Framework
```
Framework:        Next.js 15 (App Router)
Language:         TypeScript (strict mode)
Styling:          Tailwind CSS v4
Components:       shadcn/ui (latest)
Animations:       Framer Motion
Content/DB:       Supabase (PostgreSQL, Auth, Storage) + Next.js Admin Panel
Package Manager:  pnpm
```

### 2.2 Required Dependencies
```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "framer-motion": "latest",
    "@supabase/supabase-js": "latest",
    "@supabase/ssr": "latest",
    "next-themes": "latest",
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "class-variance-authority": "latest",
    "gray-matter": "latest",
    "react-hook-form": "latest",
    "zod": "latest",
    "@hookform/resolvers": "latest",
    "embla-carousel-react": "latest",
    "vaul": "latest",
    "sonner": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "@types/react": "latest",
    "@types/node": "latest",
    "tailwindcss": "latest",
    "@tailwindcss/typography": "latest"
  }
}
```

### 2.3 shadcn/ui Components to Install
Install the following shadcn/ui components during project setup:
```
button, card, badge, dialog, drawer, dropdown-menu, form, input,
label, navigation-menu, select, separator, sheet, skeleton,
tabs, textarea, toggle, tooltip, carousel, accordion, avatar,
switch, sonner
```

### 2.4 Additional Premium UI Libraries (optional, pick as needed)
These are suggestions for enhancing premium feel. Use where appropriate:
- `@studio-freight/lenis` — smooth scroll (buttery smooth page scrolling)
- `react-wrap-balancer` — balanced text wrapping for headings
- `sharp` — image optimization (built into Next.js)
- `rehype-pretty-code` / `shiki` — syntax highlighting for blog code blocks
- `@radix-ui/react-visually-hidden` — accessibility helper

---

## 3. Design System & Theming

### 3.1 Color Palette

Define these as CSS custom properties in `globals.css` using HSL format (for shadcn/ui compatibility). Both themes must feel premium.

#### Light Mode
```css
--background:         0 0% 98%;          /* #FAFAFA — warm off-white, not sterile pure white */
--foreground:         240 10% 8%;        /* #131318 — near-black with a cool tint */
--card:               0 0% 100%;         /* #FFFFFF */
--card-foreground:    240 10% 8%;
--popover:            0 0% 100%;
--popover-foreground: 240 10% 8%;
--primary:            252 85% 60%;       /* #7C5CFC — rich violet-indigo, the brand accent */
--primary-foreground: 0 0% 100%;
--secondary:          240 5% 93%;        /* #EDEDF0 — subtle cool gray */
--secondary-foreground: 240 6% 25%;
--muted:              240 5% 96%;        /* #F4F4F6 */
--muted-foreground:   240 4% 46%;        /* #71717A */
--accent:             252 85% 60%;       /* Same as primary */
--accent-foreground:  0 0% 100%;
--destructive:        0 84% 60%;
--destructive-foreground: 0 0% 100%;
--border:             240 6% 90%;        /* #E4E4E7 */
--input:              240 6% 90%;
--ring:               252 85% 60%;
--radius:             0.75rem;
```

#### Dark Mode
```css
--background:         240 10% 6%;        /* #0E0E13 — deep charcoal with blue tint, NOT pure black */
--foreground:         0 0% 95%;          /* #F2F2F2 — soft white */
--card:               240 8% 9%;         /* #141419 */
--card-foreground:    0 0% 95%;
--popover:            240 8% 9%;
--popover-foreground: 0 0% 95%;
--primary:            252 85% 65%;       /* #8F73FF — slightly lighter violet for dark bg contrast */
--primary-foreground: 0 0% 100%;
--secondary:          240 6% 14%;        /* #212127 */
--secondary-foreground: 0 0% 80%;
--muted:              240 5% 12%;        /* #1C1C21 */
--muted-foreground:   240 4% 55%;        /* #8A8A95 */
--accent:             252 85% 65%;
--accent-foreground:  0 0% 100%;
--destructive:        0 70% 50%;
--destructive-foreground: 0 0% 100%;
--border:             240 6% 16%;        /* #262630 */
--input:              240 6% 16%;
--ring:               252 85% 65%;
--radius:             0.75rem;
```

#### Semantic Accent Colors (for discipline tags)
```css
--tag-development:    198 93% 60%;       /* Cyan-blue */
--tag-design:         252 85% 65%;       /* Violet (primary) */
--tag-brand:          340 82% 62%;       /* Rose-pink */
--tag-photo:          45 93% 58%;        /* Amber-gold */
--tag-video:          160 84% 44%;       /* Emerald-green */
--tag-music:          25 95% 60%;        /* Warm orange */
```

### 3.2 Typography

Use Google Fonts. Load via `next/font/google` for optimal performance.

```
Display / Headings:   "Sora"          — weights: 600, 700
Body / UI:            "Inter"          — weights: 400, 500, 600
Monospace (code):     "JetBrains Mono" — weight: 400
```

**Type Scale (desktop):**
```
Hero heading:         clamp(3rem, 6vw, 5.5rem)    — Sora 700, letter-spacing: -0.03em, line-height: 1.05
Section heading (h2): clamp(2rem, 4vw, 3.5rem)    — Sora 700, letter-spacing: -0.02em, line-height: 1.15
Subsection (h3):      clamp(1.25rem, 2vw, 1.75rem)— Sora 600, line-height: 1.3
Body large:           1.125rem (18px)              — Inter 400, line-height: 1.7
Body default:         1rem (16px)                  — Inter 400, line-height: 1.7
Body small / caption: 0.875rem (14px)              — Inter 500, letter-spacing: 0.02em
Overline / label:     0.75rem (12px)               — Inter 600, letter-spacing: 0.1em, uppercase
```

### 3.3 Spacing System
Use Tailwind's default spacing scale. Key conventions:
- Section vertical padding: `py-24 md:py-32 lg:py-40`
- Section horizontal padding: `px-6 md:px-12 lg:px-20`
- Max content width: `max-w-7xl mx-auto` (1280px)
- Card gap: `gap-6 md:gap-8`
- Component internal padding: `p-6 md:p-8`

### 3.4 Border Radius
```
Cards / large containers:  rounded-2xl (1rem)
Buttons / inputs:          rounded-xl (0.75rem)
Tags / badges:             rounded-full
Images in cards:           rounded-xl
```

### 3.5 Shadows (Light Mode Only — minimal/no shadows in dark)
```css
--shadow-sm:   0 1px 2px rgba(0,0,0,0.04);
--shadow-md:   0 4px 12px rgba(0,0,0,0.06);
--shadow-lg:   0 12px 40px rgba(0,0,0,0.08);
--shadow-glow: 0 0 40px rgba(124,92,252,0.15);  /* Violet glow for accent elements */
```

---

## 4. Site Architecture & Routing

### 4.1 Route Map
```
/                         → Home page
/work                     → Portfolio grid (all projects)
/work/[slug]              → Individual case study page
/services                 → Services overview
/about                    → About page
/journal                  → Blog listing page
/journal/[slug]           → Individual blog post
/contact                  → Contact page with form + Calendly embed
```

### 4.2 Dynamic Routes
- `/work/[slug]` — Generated from MDX files in `/content/projects/`
- `/journal/[slug]` — Generated from MDX files in `/content/journal/`

### 4.3 Sitemap & robots.txt
Auto-generate `sitemap.xml` using Next.js `sitemap.ts` in the app directory. Include all static routes and all dynamic project/journal slugs. Generate `robots.txt` allowing all crawlers.

---

## 5. Global Layout & Components

### 5.1 Navbar

**Structure:** Fixed/sticky top navbar with blur backdrop. Appears on all pages.

**Desktop layout (left to right):**
- **Logo/Wordmark:** "OJO." in Sora 700, clickable → home. The period is colored with `--primary`.
- **Nav links (center):** Home, Work, Services, About, Journal, Contact — styled as Inter 500, 14px, uppercase, letter-spacing 0.05em. Active page has a small dot indicator below the text (primary color, 4px circle).
- **Right side:** Theme toggle (sun/moon icon with smooth rotation animation) + CTA button: "Let's Talk" with a small waving hand emoji (👋), styled as primary-colored pill button.

**Mobile layout:**
- Logo left, hamburger icon right.
- Full-screen overlay menu with large stacked links (Sora 600, ~2rem), staggered fade-in animation from bottom. Social links at the bottom of the overlay. Theme toggle visible.

**Behavior:**
- On scroll down: navbar shrinks slightly in height and increases backdrop blur.
- On scroll up: navbar returns to full height.
- Transitions: `transition-all duration-300 ease-out`.

### 5.2 Footer

**Structure:** Full-width section with dark background (in light mode use `--foreground` as bg, in dark mode use slightly lighter than `--background`).

**Content (top to bottom):**
1. **CTA strip:** Large text: "Have a project in mind?" with a "Let's work together →" link/button. This should feel like a final conversion prompt.
2. **Main footer grid (4 columns on desktop, stacking on mobile):**
   - **Column 1:** Logo "OJO." + one-line descriptor: "Creative Director & Developer" + brief tagline.
   - **Column 2:** "Navigation" — Home, Work, Services, About, Journal, Contact links.
   - **Column 3:** "Services" — Digital Products, Brand & Identity, Visual Content, Audio & Music links.
   - **Column 4:** "Connect" — Email (mailto link), LinkedIn, GitHub, Dribbble, Instagram, Twitter/X, SoundCloud icon links.
3. **Bottom bar:** "© 2026 Ojo Oluwatimileyin. All rights reserved." left, "Designed & built by me." right.

### 5.3 Theme Toggle
Use `next-themes` with `attribute="class"` and `defaultTheme="system"`. The toggle component should:
- Show a sun icon in dark mode, moon icon in light mode.
- Animate with a smooth 180° rotation on toggle (Framer Motion `rotate`).
- Be accessible (proper aria-label: "Toggle dark mode" / "Toggle light mode").

### 5.4 Smooth Scroll
Implement Lenis smooth scroll globally. Wrap the application in a Lenis provider. Ensure it does not break anchor links or browser back/forward behavior.

### 5.5 Page Transition
Use Framer Motion `AnimatePresence` with a subtle fade + slight upward translate on page enter, and fade out on exit:
```
initial:  { opacity: 0, y: 12 }
animate:  { opacity: 1, y: 0 }
exit:     { opacity: 0, y: -8 }
transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
```

### 5.6 Scroll-to-Top Button
Appears after scrolling 500px. Fixed bottom-right. Circular, primary-colored, with an up-arrow icon. Fade in/out with Framer Motion.

### 5.7 Reusable Components

Build these as reusable components in `/components/ui/` or `/components/shared/`:

| Component | Description |
|-----------|-------------|
| `SectionHeading` | Overline label (uppercase, muted, small) + large heading (Sora) + optional body paragraph. Reused on every page. |
| `ProjectCard` | Thumbnail image, project title, short description, discipline tags as colored badges, hover: image scales up slightly + overlay appears. |
| `DisciplineTag` | Small badge/pill with colored dot + label. Colors from `--tag-*` variables. Used on project cards and case studies. |
| `MarqueeStrip` | Infinite horizontal scrolling text strip (like Eloqwnt's). CSS animation, no JS. Accepts array of strings. Separator character between items (e.g., " / " or " • "). |
| `TestimonialCard` | Quote text, client avatar, name, role, company. Used in a carousel. |
| `ServiceCard` | Numbered item (01, 02, etc.), service name, short description, hover-expand or hover-highlight effect. |
| `CTABanner` | Fullwidth or contained banner with heading + button. Used at bottom of pages before footer. |
| `AudioPlayerBar` | Custom audio player (see Section 7). |
| `VideoShowreel` | Video player component with custom play button overlay, poster image, and inline playback. |
| `ContactForm` | Form with fields: name, email, project type (select), budget range (select), message (textarea). Uses react-hook-form + zod validation. |

---

## 6. Page-by-Page Specifications

### 6.1 HOME PAGE (`/`)

This is the most important page. It must answer three questions in under 10 seconds: **Who is this person? What do they do? Is the work good?**

#### Section 1: Hero
- **Layout:** Full viewport height (`h-screen`), centered content.
- **Background:** Subtle animated gradient mesh or grain texture. In dark mode, a very subtle moving gradient (dark violet to dark blue, low opacity). In light mode, clean with a subtle dot grid or noise texture.
- **Content (centered vertically and horizontally):**
  - Overline: "CREATIVE DIRECTOR & DEVELOPER" — uppercase, letter-spaced, muted color, small font.
  - Main heading: "OJO OLUWATIMILEYIN" — hero font size, Sora 700. Consider a text reveal animation (clip-path or character-by-character stagger).
  - Subheading: "I design, build, and produce digital experiences — from code to camera to sound." — body large, max-width 600px, muted-foreground.
  - CTA buttons: Two buttons side by side — "View My Work" (primary filled) and "Watch Showreel" (outline/ghost, with a small play icon). The "Watch Showreel" button opens an inline video modal or scrolls to the showreel section.
  - Scroll indicator: A small animated down-arrow or "scroll" text at the very bottom of the hero with a bounce animation.
- **Animation:** Staggered entrance — overline first (fade up), then heading (fade up with slight delay), then subheading, then buttons. Total stagger ~0.8s.

#### Section 2: Marquee Strip
- Infinite scrolling horizontal text: "/ Full-Stack Development / UI/UX Design / Brand Strategy / Photography / Videography / Music Production /" repeated.
- Style: Sora 600, ~1.25rem, muted-foreground color (50% opacity). Thin top and bottom borders. Padding `py-4`.
- Direction: scrolling left, speed: ~40px/s. CSS `@keyframes` only, no JS.

#### Section 3: Showreel / Introduction
- **Layout:** Two-column on desktop (video left, text right), stacked on mobile.
- **Left column:** Video showreel component. Poster image visible by default. Large circular "Play" button overlay centered on the poster. On click, video plays inline (not fullscreen). Use HTML5 `<video>` with poster attribute. Rounded corners (`rounded-2xl`). Video file path: `/videos/showreel.mp4` (placeholder — user will replace).
- **Right column:**
  - Overline: "WHO I AM"
  - Heading: "A multidisciplinary creative who sees the whole picture."
  - Body text (2 paragraphs):
    - "Most creatives specialize in one thing. I chose to master several — because the best digital experiences aren't built in silos. They're designed, developed, branded, photographed, filmed, and scored by someone who understands how all the pieces connect."
    - "I work with startups, agencies, artists, and enterprises who want a creative partner, not just a service provider."
  - Button: "More About Me →" linking to `/about`.

#### Section 4: Selected Work
- **Heading area:**
  - Overline: "FEATURED WORK"
  - Heading: "Projects that span every medium."
  - Subtitle (muted): "Each project showcases the full scope of my contribution — from strategy to execution."
- **Project grid:**
  - Display 4 featured projects (the first 4 from the seed data in Section 12).
  - Layout: 2-column grid on desktop, 1-column on mobile. Alternating large/small cards or uniform large cards (your call based on what looks best).
  - Each `ProjectCard` shows: hero image (`rounded-xl`, aspect-ratio 16/10), project title (Sora 600), short excerpt, discipline tags as `DisciplineTag` components, and a "View Project →" link.
  - Hover effect: Image scales to 1.03 over 500ms with ease-out. A subtle overlay gradient appears from the bottom.
- **Bottom:** Centered "View All Projects →" button linking to `/work`.

#### Section 5: Services Overview
- **Heading area:**
  - Overline: "WHAT I OFFER"
  - Heading: "Solutions designed, built, and produced under one roof."
- **Layout:** Vertical accordion or numbered list (inspired by Eloqwnt's numbered services list). Each service is a row.
- **Each row:**
  - Left: number (01, 02, 03...) in Sora 700, muted color, large size.
  - Center: Service name (Sora 600, ~1.5rem) + short one-line description that appears on hover/expand.
  - Right: arrow icon that rotates on expand.
  - Separator line between each row.
  - On hover (desktop) or click (mobile): the row expands to show the full description + a "Learn More →" link to `/services`.
- **Services to list:**
  1. Digital Products — "End-to-end UI/UX design and full-stack development for web applications."
  2. Brand & Identity — "Strategic brand development from naming and positioning to complete visual identity systems."
  3. Visual Content — "Photography and videography that tells your brand's story with cinematic quality."
  4. Audio & Music — "Original music production, sound design, and audio branding for any medium."
  5. Creative Direction — "Full-spectrum creative leadership — I connect strategy, design, code, and content into one cohesive vision."

#### Section 6: Testimonials
- **Heading area:**
  - Overline: "KIND WORDS"
  - Heading: "What clients and collaborators say."
- **Layout:** Horizontal carousel using `embla-carousel-react`. Auto-play every 5 seconds, pause on hover. Dots or progress bar indicator below.
- **Each `TestimonialCard`:**
  - Large quote text (Inter 400, ~1.125rem, italic).
  - Client avatar (circular, 48px), name (bold), role + company.
  - Subtle quotation mark icon (decorative, large, muted, positioned top-left of card).
- **Seed 4 testimonials** (placeholder — user will replace):
  1. "Ojo delivered beyond expectations — the website, brand identity, and product photography were all handled seamlessly. Working with one creative partner instead of three separate freelancers was a game-changer." — **Adeyemi Bakare**, Founder, NovaTech Labs
  2. "His ability to think strategically about brand while also writing production-level code is genuinely rare. The product he built for us is still our best-performing asset." — **Sarah Mitchell**, Head of Product, BrightFrame Studio
  3. "The music he produced for our campaign elevated the entire project. It's one thing to find a great developer-designer, but finding one who also produces at this level? That's a unicorn." — **David Chen**, Creative Director, Pulse Agency
  4. "Professional, fast, and the quality speaks for itself. The UI/UX redesign increased our conversion rate by 40% in the first quarter." — **Amara Osei**, CEO, SwiftPay

#### Section 7: CTA / Contact Teaser
- Full-width section with a distinct background (subtle gradient or the inverse theme — if in light mode, make this section dark, and vice versa).
- Large heading: "Ready to create something extraordinary?"
- Subtext: "Let's talk about your next project."
- Two buttons: "Start a Project" (primary) → `/contact` and "Book a Call" (outline) → Calendly link.

---

### 6.2 WORK PAGE (`/work`)

#### Hero Section
- Heading: "Work"
- Subtitle: "A curated collection of projects across design, development, brand, photography, video, and music."

#### Filter Bar
- Horizontal row of filter tags, styled as pills/buttons:
  - "All" (default active), "Design & Dev", "Brand Strategy", "Photography", "Video", "Music"
- Active filter: filled primary background. Inactive: ghost/outline style.
- Filtering should be instant (client-side, no page reload). Use React state. Animate cards in/out with Framer Motion `AnimatePresence` + `layout` prop for smooth reflow.

#### Project Grid
- Layout: Masonry-style or 2-column grid. Each card is a `ProjectCard`.
- Display ALL seed projects (12 total from Section 12).
- Clicking a card navigates to `/work/[slug]`.

---

### 6.3 CASE STUDY PAGE (`/work/[slug]`)

Each case study is an MDX file. The page template renders the following structure:

#### Header
- Full-width hero image (aspect-ratio 16/9, `rounded-2xl` on desktop, full-bleed on mobile).
- Below image: Project title (h1, Sora 700), one-line description, discipline tags, and metadata row: "Client: [name] • Year: [year] • Role: [disciplines]".

#### Content Sections (rendered from MDX)
The MDX file should support these custom components:
- `<ProjectSection title="The Challenge">` — renders a labeled content block.
- `<ImageGrid columns={2}>` — renders images in a responsive grid.
- `<FullWidthImage src="..." alt="..." />` — full-bleed image.
- `<VideoEmbed src="..." />` — inline video player.
- `<AudioEmbed src="..." title="..." />` — inline audio player for music projects.
- `<MetricCard label="Conversion Rate" value="+40%" />` — stats callout.
- `<TechStack tags={["Next.js", "Tailwind", "Figma"]} />` — tech/tools used.

#### Sidebar (desktop only, sticky)
- Table of contents generated from MDX headings.
- "Start a similar project →" CTA button.

#### Bottom
- "Next Project" / "Previous Project" navigation with large preview cards.

---

### 6.4 SERVICES PAGE (`/services`)

#### Hero
- Heading: "Services"
- Subtitle: "I offer end-to-end creative and technical solutions — individually or as integrated packages."

#### Service Blocks
For each of the 5 services, create a dedicated section with:

**Service 1: Digital Products**
- Icon or illustration (use a Lucide icon as placeholder: `<Monitor />`)
- Heading: "Digital Products"
- Description: "From concept to deployed product — I design the interface, architect the backend, and ship production-ready web applications. Startups and SaaS companies hire me to turn ideas into polished digital products without the overhead of coordinating separate designers and developers."
- What's included (list): UI/UX Design, Frontend Development (React/Next.js), Backend Development (Node.js/Python), Responsive & Accessible Implementation, Performance Optimization, Deployment & Launch Support
- Ideal for: "Startups, SaaS companies, tech businesses"

**Service 2: Brand & Identity**
- Icon: `<Palette />`
- Heading: "Brand & Identity"
- Description: "I build brands from the ground up — from strategic positioning and naming to complete visual identity systems including logo, typography, color, and brand guidelines. Every brand I create is designed to work across digital and physical touchpoints."
- What's included: Brand Strategy & Positioning, Logo & Visual Identity Design, Typography & Color Systems, Brand Guidelines Documentation, Brand Collateral Design, Website Design Integration
- Ideal for: "New businesses, rebrands, creative ventures"

**Service 3: Visual Content**
- Icon: `<Camera />`
- Heading: "Visual Content"
- Description: "I shoot photography and video that tells your brand's story. Whether it's product photography, campaign visuals, behind-the-scenes content, or cinematic brand films — I handle art direction, shooting, and post-production."
- What's included: Product & Lifestyle Photography, Brand & Campaign Videography, Art Direction, Photo & Video Editing, Color Grading, Asset Delivery (web, social, print)
- Ideal for: "Brands needing campaign imagery, artists, agencies"

**Service 4: Audio & Music**
- Icon: `<Music />`
- Heading: "Audio & Music"
- Description: "I produce original music, sound design, and audio branding. From scoring brand films to producing full tracks for artists — I bring the same level of craft to audio as I do to visual and technical work."
- What's included: Music Production & Composition, Sound Design, Audio Branding & Sonic Identity, Mixing & Mastering, Podcast / Voiceover Editing, Sync Licensing
- Ideal for: "Artists, filmmakers, brands needing audio identity"

**Service 5: Creative Direction**
- Icon: `<Compass />`
- Heading: "Creative Direction"
- Description: "For clients who want a single creative leader to own the entire vision. I connect strategy, design, code, imagery, and sound into one cohesive experience — and manage the process from brief to delivery."
- What's included: End-to-End Project Leadership, Multi-Discipline Integration, Creative Strategy & Concepting, Quality Assurance Across Deliverables, Stakeholder Communication, Post-Launch Support
- Ideal for: "High-value clients wanting one creative partner"

#### Layout for each service block:
- Alternating layout: odd services have icon/image left + text right; even services reverse. Full-width on mobile.
- Each block separated by a subtle divider or generous spacing.
- CTA at the bottom of each: "Start a [Service Name] Project →" → links to `/contact?service=[slug]`.

#### Bottom CTA
- "Not sure what you need?" heading + "Book a free discovery call and I'll help you figure it out." + Calendly button.

---

### 6.5 ABOUT PAGE (`/about`)

#### Hero
- Two-column layout: professional portrait photo (left, `rounded-2xl`, placeholder: `/images/portrait.jpg`) + text content (right).
- Heading: "I'm Ojo Oluwatimileyin."
- Body (3 paragraphs):
  - "I'm a Creative Director & Developer based in Lagos, Nigeria. I design, build, and produce digital experiences across every medium — from code to camera to sound."
  - "My journey started with curiosity. I picked up a camera before I wrote my first line of code. I was producing beats before I knew what brand strategy meant. Over time, these disciplines didn't just coexist — they started reinforcing each other. Photography taught me composition in UI design. Music production taught me rhythm in interaction design. Code gave me the power to bring every creative idea to life without depending on anyone else."
  - "Today, I work with startups, creative agencies, artists, and enterprises who want a creative partner — not just a specialist in one thing. I see the whole picture, and I build accordingly."

#### Philosophy Section
- Heading: "What I Believe"
- Three principles displayed as cards or a 3-column grid:
  1. **"Integration Over Isolation"** — "The best work happens when strategy, design, code, and content are shaped by the same mind. Handoffs create gaps. Unified vision creates coherence."
  2. **"Craft Over Speed"** — "I'd rather deliver something exceptional on a thoughtful timeline than something average on a rushed one. Quality compounds."
  3. **"Partnership Over Transactions"** — "I invest in understanding your business, your audience, and your goals. The projects that work best are the ones where I'm treated as a creative partner, not a vendor."

#### Skills / Tools Section
- Heading: "Tools & Technologies"
- Grid of skill areas, each with a heading and list of tools:
  - **Development:** React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB, REST APIs, GraphQL, Git, Vercel, AWS
  - **Design:** Figma, Adobe Creative Suite, Framer, Prototyping, Design Systems, Responsive Design
  - **Brand:** Brand Strategy, Visual Identity, Naming, Positioning, Brand Guidelines, Market Research
  - **Photography & Video:** Canon/Sony, Lightroom, Premiere Pro, After Effects, DaVinci Resolve, Drone Operation
  - **Music:** Ableton Live, Logic Pro, FL Studio, Sound Design, Mixing, Mastering, MIDI, Synthesis

#### CTA
- "Want to work together?" + button to `/contact`.

---

### 6.6 JOURNAL PAGE (`/journal`)

#### Hero
- Heading: "Journal"
- Subtitle: "Thoughts on design, development, creativity, and building things that matter."

#### Post Grid
- List/grid of blog posts from MDX files.
- Each post card: featured image (optional), title, publish date, reading time (calculated from word count), excerpt, category tag.
- Sort: newest first.
- **Launch with 0 posts.** Show an empty state: "New articles coming soon. In the meantime, check out my work →" with link to `/work`.

---

### 6.7 CONTACT PAGE (`/contact`)

#### Hero
- Heading: "Let's Create Something."
- Subtitle: "Have a project in mind? Fill out the form below or book a discovery call."

#### Two-Column Layout (desktop)

**Left column: Contact Form** (use `ContactForm` component)
Fields:
1. **Name** — text input, required
2. **Email** — email input, required, validated
3. **Project Type** — select dropdown. Options: "Digital Product (Design + Dev)", "Brand & Identity", "Visual Content (Photo/Video)", "Audio & Music Production", "Creative Direction (Full Scope)", "Other"
4. **Budget Range** — select dropdown. Options: "Under ₦500K", "₦500K – ₦2M", "₦2M – ₦5M", "₦5M+", "Let's discuss"
5. **Message** — textarea, required, min 20 characters
6. **Submit button:** "Send Message" with loading state.

Form submission: For now, use a server action that logs the data to console and shows a success toast (Sonner). Add a `// TODO: Connect to email service (Resend)` comment. Pre-fill project type from URL query param if present (`?service=digital-products`).

Validation: Zod schema. Show inline error messages below each field. Disable submit until valid.

**Right column: Calendly Embed + Info**
- Heading: "Prefer to talk?"
- Subtext: "Book a free 30-minute discovery call."
- Calendly embed iframe (placeholder URL: `https://calendly.com/ojo-oluwatimileyin/discovery-call` — user will replace). Give it `rounded-xl` styling with a border.
- Below the embed: Direct email link: "Or email me directly at hello@ojotimileyin.com" (placeholder).
- Social links row: LinkedIn, GitHub, Dribbble, Instagram, Twitter/X, SoundCloud — icon buttons.

---

## 7. Custom Audio Player System

### 7.1 Overview
Build a custom audio player for music production showcases. This should NOT use Spotify or SoundCloud embeds — it must be a fully custom-built component.

### 7.2 Inline Track Player (`AudioTrackPlayer`)
Used within case study pages and the work grid for music projects.

**UI Elements:**
- Album art / cover image (square, `rounded-lg`, 48px on compact, 64px on expanded)
- Track title (Inter 500)
- Artist / project name (muted, smaller)
- Play/Pause button (circular, primary-colored, with icon swap animation)
- Progress bar (thin, clickable/scrubbable, primary-colored fill with muted track)
- Current time / Duration display (monospace font, small)
- Volume slider (horizontal, appears on hover or always visible based on context)

**Behavior:**
- Clicking play on one track stops any other playing track (global audio state).
- Progress bar is click-to-seek and drag-to-scrub.
- Smooth progress bar animation (not stepped — use `requestAnimationFrame` or CSS transitions).
- On track end: stop (do not auto-advance).

### 7.3 Global Mini Player (`AudioMiniPlayer`)
When a track is playing and the user scrolls away from the inline player, a sticky mini player appears at the bottom of the viewport (above the scroll-to-top button if both are visible).

**UI Elements:**
- Cover art thumbnail (36px, circular)
- Track name (truncated with ellipsis if too long)
- Play/Pause toggle
- Progress bar (thin line, full-width at the very bottom of the mini player)
- Close button (X icon) to dismiss the mini player and stop playback.

**Behavior:**
- Appears with a slide-up animation (Framer Motion) when the inline player scrolls out of view.
- Disappears (slide down) when the inline player scrolls back into view or when closed.
- Uses Intersection Observer on the inline player to toggle visibility.

### 7.4 Audio State Management
Use React Context (`AudioPlayerContext`) to manage global audio state:
```typescript
interface AudioPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  stop: () => void;
}
```

Use a single `<audio>` element managed by the context provider, rendered once in the root layout.

### 7.5 Audio File Convention
Audio files are stored in `/public/audio/[project-slug]/[track-name].mp3`. Metadata (title, artist, cover art path, duration) is defined in the project's MDX frontmatter.

---

## 8. Custom Admin Panel & CMS (Supabase)

### 8.1 Architecture Overview
Instead of local MDX files, the site leverages a custom-built Next.js Admin Panel located at the `/admin` route. This panel is protected via **Supabase Auth**. All data (Case Studies, Blog Posts, Services) is stored in a **Supabase PostgreSQL** database, and assets (images, LUTs, video) are uploaded to **Supabase Storage**. This makes it easy to integrate digital products sales directly via an eCommerce widget later.

### 8.2 Database Schema (High-Level)
- `projects`: id, title, slug, content (rich text/JSON), tags, cover_image, is_published, created_at.
- `posts`: id, title, slug, content (rich text/JSON), category, cover_image, is_published, created_at.
- `digital_products`: Optional schema for selling items later (LUTs, presets).

### 8.3 Admin Panel Features
- **Authentication**: Secure login screen (`/admin/login`). Only authorized users (the site owner) can access the dashboard.
- **Content Editor**: A rich-text visual editor designed to seamlessly compile and lay out case studies and journal posts without needing to touch markdown.
- **Media Library**: Upload and manage assets directly to Supabase storage.
- **Publishing Controls**: Draft vs. Published toggles for seamless content staging.

### 8.4 Journal Listing & Work Grids
- The frontend dynamically fetches `projects` and `posts` from Supabase on render.
- Leverages Next.js server components and incremental static regeneration (ISR) to keep the frontend blazing fast while fetching realtime database content.
- Display as a list or grid of cards. Empty state (for launch): "New articles coming soon."

---

## 9. Animation & Interaction Specs

### 9.1 Philosophy
Polished but restrained. Every animation must serve a purpose — revealing content, providing feedback, or guiding attention. No animation for animation's sake.

### 9.2 Scroll-Triggered Reveals
Use Framer Motion `useInView` (or `whileInView`). Apply to:
- Section headings: fade up + translate Y (from 20px to 0)
- Cards and grid items: staggered fade up (stagger: 0.1s per item)
- Images: fade in + slight scale (from 0.97 to 1)
- Text blocks: fade up

**Default reveal animation:**
```typescript
const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

**Stagger container:**
```typescript
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};
```

### 9.3 Hover Effects
- **Project cards:** Image scales to 1.03, subtle shadow increase, slight Y translate (-4px). Duration 400ms, ease-out.
- **Nav links:** Underline grows from center on hover (CSS `::after` pseudo-element with `scaleX` transition).
- **Buttons (primary):** Slight brightness increase + subtle Y translate (-1px). No dramatic effects.
- **Service rows:** Background highlight (subtle primary tint) + arrow rotation.
- **Footer links:** Color transition to primary on hover.

### 9.4 Loading States
- Use shadcn `Skeleton` components for any async-loaded content.
- Page transitions: subtle fade (see Section 5.5).
- Image loading: Use Next.js `<Image>` with `placeholder="blur"` where possible. For dynamic images, use skeleton → fade-in.

### 9.5 Cursor
Default system cursor. Do NOT implement a custom cursor — keep it accessible.

---

## 10. SEO & Metadata

### 10.1 Global Metadata (layout.tsx)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://ojotimileyin.com"), // placeholder
  title: {
    default: "Ojo Oluwatimileyin — Creative Director & Developer",
    template: "%s | Ojo Oluwatimileyin"
  },
  description: "I design, build, and produce digital experiences — from code to camera to sound. Full-stack developer, UI/UX designer, brand strategist, photographer, videographer, and music producer.",
  keywords: ["creative director", "full-stack developer", "UI/UX designer", "brand strategist", "photographer", "videographer", "music producer", "portfolio", "Lagos", "Nigeria"],
  authors: [{ name: "Ojo Oluwatimileyin" }],
  creator: "Ojo Oluwatimileyin",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ojo Oluwatimileyin",
    title: "Ojo Oluwatimileyin — Creative Director & Developer",
    description: "I design, build, and produce digital experiences — from code to camera to sound.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojo Oluwatimileyin — Creative Director & Developer",
    description: "I design, build, and produce digital experiences — from code to camera to sound.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};
```

### 10.2 Per-Page Metadata
Each page should export its own `metadata` object with specific title and description. Case study and journal pages generate metadata dynamically from MDX frontmatter.

### 10.3 Structured Data (JSON-LD)
Add to root layout:
- `Person` schema with name, jobTitle, url, sameAs (social links), knowsAbout.
- `WebSite` schema.

Add to each case study page:
- `CreativeWork` schema.

Add to services page:
- `Service` schema for each service.

### 10.4 Sitemap
Auto-generated from `app/sitemap.ts`. Include all static routes and dynamically list all project and journal slugs.

### 10.5 Open Graph Images
Create a static OG image at `/public/og-image.jpg` (1200x630). Placeholder: a branded graphic with name + title + violet accent. Can be enhanced later with `next/og` for dynamic per-page OG images.

---

## 11. Performance Requirements

### 11.1 Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance (mobile) | 90+ |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |
| Total page weight (home, initial) | < 2MB |
| Time to Interactive | < 3.5s |

### 11.2 Implementation Requirements
- Use Next.js `<Image>` for ALL images (automatic optimization, WebP/AVIF, responsive srcsets).
- Lazy load all images below the fold.
- Lazy load Framer Motion animations (don't animate offscreen elements).
- Use `next/font` for font loading (automatic font optimization, no FOUT).
- Use `next/dynamic` for heavy components that aren't needed on initial render (e.g., Calendly embed, audio player).
- Minimize client-side JavaScript: prefer server components by default, only use `"use client"` where interactivity is required.
- Implement responsive images with proper `sizes` attribute.

---

## 12. Seed Content & Placeholder Data

### 12.1 Project Seed Data

Create these 12 MDX files in `/content/projects/`. Each gets a placeholder hero image (use a solid gradient or placeholder service like `placehold.co`). The user will replace all content later — these exist so the site is functional and visually complete on first build.

#### Design & Development Projects (2)

**Project 1: `nova-saas-platform.mdx`**
```yaml
title: "Nova SaaS Platform"
description: "End-to-end design and development of a B2B analytics platform."
client: "NovaTech Labs"
year: "2025"
disciplines: ["Design", "Development"]
tags: ["UI/UX", "Full-Stack", "React", "Node.js"]
featured: true
coverImage: "/images/projects/nova-saas/cover.jpg"
```
Body content: Include sections for The Challenge, The Approach, The Process (wireframes, design system, development), The Result (screenshots, metrics), and Scope.

**Project 2: `greenshift-ecommerce.mdx`**
```yaml
title: "GreenShift E-Commerce"
description: "A sustainable fashion marketplace designed and built from scratch."
client: "GreenShift Collective"
year: "2025"
disciplines: ["Design", "Development"]
tags: ["E-Commerce", "Next.js", "UI/UX", "Stripe"]
featured: false
coverImage: "/images/projects/greenshift/cover.jpg"
```

#### Brand Strategy Projects (2)

**Project 3: `pulse-rebrand.mdx`**
```yaml
title: "Pulse Agency Rebrand"
description: "Complete brand overhaul for a creative agency — from strategy to visual identity."
client: "Pulse Agency"
year: "2025"
disciplines: ["Brand"]
tags: ["Brand Strategy", "Visual Identity", "Logo Design", "Guidelines"]
featured: true
coverImage: "/images/projects/pulse-rebrand/cover.jpg"
```

**Project 4: `terraverde-identity.mdx`**
```yaml
title: "TerraVerde Identity"
description: "Brand identity for an agritech startup connecting farmers to premium markets."
client: "TerraVerde"
year: "2024"
disciplines: ["Brand"]
tags: ["Brand Strategy", "Naming", "Visual Identity"]
featured: false
coverImage: "/images/projects/terraverde/cover.jpg"
```

#### Photography Projects (2)

**Project 5: `urban-light-series.mdx`**
```yaml
title: "Urban Light Series"
description: "A photography series exploring light, shadow, and architecture in Lagos."
client: "Personal Project"
year: "2025"
disciplines: ["Photography"]
tags: ["Architecture", "Street", "Light Study"]
featured: true
coverImage: "/images/projects/urban-light/cover.jpg"
```

**Project 6: `swiftpay-product-shoot.mdx`**
```yaml
title: "SwiftPay Product Shoot"
description: "Product and lifestyle photography for a fintech brand launch."
client: "SwiftPay"
year: "2025"
disciplines: ["Photography"]
tags: ["Product Photography", "Lifestyle", "Brand Campaign"]
featured: false
coverImage: "/images/projects/swiftpay-shoot/cover.jpg"
```

#### Videography Projects (2)

**Project 7: `brightframe-brand-film.mdx`**
```yaml
title: "BrightFrame Brand Film"
description: "A cinematic brand film capturing the studio's creative philosophy."
client: "BrightFrame Studio"
year: "2025"
disciplines: ["Video"]
tags: ["Brand Film", "Cinematography", "Editing", "Color Grading"]
featured: false
coverImage: "/images/projects/brightframe-film/cover.jpg"
```

**Project 8: `afrobeats-live-visuals.mdx`**
```yaml
title: "Afrobeats Live Visuals"
description: "Concert visuals and recap video for a major Afrobeats showcase event."
client: "Groove Nation Events"
year: "2024"
disciplines: ["Video"]
tags: ["Event Coverage", "Live Visuals", "Music Video"]
featured: false
coverImage: "/images/projects/afrobeats-live/cover.jpg"
```

#### Music Production Projects (2)

**Project 9: `midnight-frequencies-ep.mdx`**
```yaml
title: "Midnight Frequencies EP"
description: "A 5-track EP blending Afro-electronic and ambient textures."
client: "Personal Release"
year: "2025"
disciplines: ["Music"]
tags: ["Music Production", "Afro-Electronic", "Mixing", "Mastering"]
featured: true
coverImage: "/images/projects/midnight-frequencies/cover.jpg"
audioTracks:
  - title: "Signal / Noise"
    file: "/audio/midnight-frequencies/signal-noise.mp3"
    duration: "3:42"
  - title: "Lagos at 3AM"
    file: "/audio/midnight-frequencies/lagos-3am.mp3"
    duration: "4:15"
```

**Project 10: `pulse-sonic-branding.mdx`**
```yaml
title: "Pulse Sonic Branding"
description: "Audio identity suite — logo sound, hold music, podcast intro, and notification tones."
client: "Pulse Agency"
year: "2025"
disciplines: ["Music"]
tags: ["Sonic Branding", "Sound Design", "Audio Identity"]
featured: false
coverImage: "/images/projects/pulse-sonic/cover.jpg"
audioTracks:
  - title: "Brand Anthem (30s)"
    file: "/audio/pulse-sonic/brand-anthem.mp3"
    duration: "0:30"
  - title: "Podcast Intro"
    file: "/audio/pulse-sonic/podcast-intro.mp3"
    duration: "0:15"
```

#### Multi-Discipline Projects (2)

**Project 11: `terraverde-full-launch.mdx`**
```yaml
title: "TerraVerde Full Launch"
description: "Brand identity, website, product photography, and launch video — all under one creative vision."
client: "TerraVerde"
year: "2025"
disciplines: ["Brand", "Design", "Development", "Photography", "Video"]
tags: ["Full-Scope", "Brand Launch", "Website", "Photography", "Video"]
featured: true
coverImage: "/images/projects/terraverde-launch/cover.jpg"
```

**Project 12: `groove-nation-360.mdx`**
```yaml
title: "Groove Nation 360"
description: "Event branding, website, promotional photography, recap video, and original event soundtrack."
client: "Groove Nation Events"
year: "2024"
disciplines: ["Brand", "Design", "Development", "Photography", "Video", "Music"]
tags: ["Full-Scope", "Event Branding", "Website", "Photography", "Video", "Music Production"]
featured: false
coverImage: "/images/projects/groove-nation-360/cover.jpg"
```

### 12.2 Placeholder Images
For all project cover images, generate simple gradient placeholder images or use a `placeholder.tsx` component that renders a colored `div` with the project title overlaid. Each discipline should use its tag color as the gradient accent:
- Design/Dev: cyan-blue gradient
- Brand: rose-pink gradient
- Photography: amber-gold gradient
- Video: emerald-green gradient
- Music: warm orange gradient
- Multi: violet (primary) gradient

### 12.3 Placeholder Audio
For music projects, create silent or very short placeholder `.mp3` files (even 1-second silent files) so the audio player components render correctly. Place them at the paths specified in the seed data. The user will replace them.

---

## 13. File & Folder Structure

```
/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, providers, navbar, footer)
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # CSS variables, Tailwind imports, custom styles
│   ├── sitemap.ts                  # Auto-generated sitemap
│   ├── robots.ts                   # robots.txt
│   ├── work/
│   │   ├── page.tsx                # Portfolio grid
│   │   └── [slug]/
│   │       └── page.tsx            # Case study template
│   ├── services/
│   │   └── page.tsx                # Services page
│   ├── about/
│   │   └── page.tsx                # About page
│   ├── journal/
│   │   ├── page.tsx                # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post template
│   └── contact/
│       └── page.tsx                # Contact page
│
├── components/
│   ├── ui/                         # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── ... (all installed shadcn components)
│   │
│   ├── layout/                     # Global layout components
│   │   ├── navbar.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── footer.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── scroll-to-top.tsx
│   │   └── page-transition.tsx
│   │
│   ├── shared/                     # Reusable domain components
│   │   ├── section-heading.tsx
│   │   ├── project-card.tsx
│   │   ├── discipline-tag.tsx
│   │   ├── marquee-strip.tsx
│   │   ├── testimonial-card.tsx
│   │   ├── service-card.tsx
│   │   ├── cta-banner.tsx
│   │   ├── video-showreel.tsx
│   │   └── contact-form.tsx
│   │
│   ├── audio/                      # Audio player system
│   │   ├── audio-provider.tsx      # React Context provider
│   │   ├── audio-track-player.tsx  # Inline track player
│   │   ├── audio-mini-player.tsx   # Sticky bottom mini player
│   │   └── audio-progress-bar.tsx  # Shared progress bar component
│   │
│   ├── mdx/                        # MDX custom components
│   │   ├── mdx-components.tsx      # Component map for MDX rendering
│   │   ├── project-section.tsx
│   │   ├── image-grid.tsx
│   │   ├── full-width-image.tsx
│   │   ├── video-embed.tsx
│   │   ├── audio-embed.tsx
│   │   ├── metric-card.tsx
│   │   ├── tech-stack.tsx
│   │   ├── callout.tsx
│   │   ├── code-block.tsx
│   │   └── image-caption.tsx
│   │
│   └── sections/                   # Page-specific section components
│       ├── home/
│       │   ├── hero.tsx
│       │   ├── showreel-section.tsx
│       │   ├── selected-work.tsx
│       │   ├── services-overview.tsx
│       │   ├── testimonials.tsx
│       │   └── home-cta.tsx
│       ├── work/
│       │   ├── work-hero.tsx
│       │   ├── filter-bar.tsx
│       │   └── project-grid.tsx
│       ├── services/
│       │   ├── services-hero.tsx
│       │   └── service-block.tsx
│       ├── about/
│       │   ├── about-hero.tsx
│       │   ├── philosophy.tsx
│       │   └── skills-tools.tsx
│       └── contact/
│           ├── contact-hero.tsx
│           └── calendly-embed.tsx
│
├── content/
│   ├── projects/                   # Project MDX files
│   │   ├── nova-saas-platform.mdx
│   │   ├── greenshift-ecommerce.mdx
│   │   ├── pulse-rebrand.mdx
│   │   ├── terraverde-identity.mdx
│   │   ├── urban-light-series.mdx
│   │   ├── swiftpay-product-shoot.mdx
│   │   ├── brightframe-brand-film.mdx
│   │   ├── afrobeats-live-visuals.mdx
│   │   ├── midnight-frequencies-ep.mdx
│   │   ├── pulse-sonic-branding.mdx
│   │   ├── terraverde-full-launch.mdx
│   │   └── groove-nation-360.mdx
│   │
│   └── journal/                    # Blog MDX files (empty at launch)
│       └── .gitkeep
│
├── lib/
│   ├── utils.ts                    # cn() helper, formatDate, etc.
│   ├── mdx.ts                      # MDX parsing, frontmatter extraction, sorting
│   ├── constants.ts                # Site-wide constants (name, links, services data)
│   └── schemas.ts                  # Zod schemas (contact form, frontmatter validation)
│
├── public/
│   ├── images/
│   │   ├── portrait.jpg            # About page portrait (placeholder)
│   │   ├── og-image.jpg            # Open Graph image (placeholder)
│   │   └── projects/               # Project images (organized by slug)
│   │       ├── nova-saas/
│   │       │   └── cover.jpg
│   │       ├── ... (one folder per project)
│   │
│   ├── videos/
│   │   └── showreel.mp4            # Placeholder showreel video
│   │
│   ├── audio/
│   │   ├── midnight-frequencies/
│   │   │   ├── signal-noise.mp3    # Placeholder audio files
│   │   │   └── lagos-3am.mp3
│   │   └── pulse-sonic/
│   │       ├── brand-anthem.mp3
│   │       └── podcast-intro.mp3
│   │
│   ├── favicon.ico
│   └── fonts/                      # If self-hosting fonts (optional, next/font preferred)
│
├── styles/
│   └── (empty — all styles in globals.css and Tailwind utilities)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .env.local                      # Environment variables (Calendly URL, etc.)
├── .gitignore
└── README.md
```

---

## 14. Deployment & Configuration

### 14.1 Environment Variables
```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://ojotimileyin.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/ojo-oluwatimileyin/discovery-call
# RESEND_API_KEY=re_xxxx  # Uncomment when email is set up
```

### 14.2 Deployment Target
**Vercel** (recommended). The project should work with `vercel deploy` out of the box. Ensure:
- `output: "standalone"` is NOT set (Vercel handles this).
- Images are configured for Vercel's image optimization.

### 14.3 Domain
The user has not yet registered a domain. Recommended options (user to choose):
- `ojotimileyin.com`
- `ojocreative.com`
- `timileyin.dev`
- `ojo.studio`

### 14.4 Git Setup
Initialize with Git. Add a `.gitignore` for Next.js (node_modules, .next, out, .env*.local). Include a `README.md` with project setup instructions.

---

## Summary of Key Implementation Notes for the AI IDE

1. **Start by initializing the Next.js project with TypeScript, Tailwind, App Router, and pnpm.** Then install all dependencies and shadcn/ui components.
2. **Build the design system first** — globals.css with all CSS variables, fonts loaded via next/font, and the Tailwind config.
3. **Build global layout components** — navbar, footer, theme toggle, page transitions, smooth scroll.
4. **Build shared components** — section heading, project card, discipline tag, marquee strip, etc.
5. **Build the audio player system** — context provider, inline player, mini player.
6. **Build pages in this order:** Home → Work → Case Study → Services → About → Contact → Journal.
7. **Create all 12 seed project MDX files** with realistic placeholder content. Each project should have 300-500 words of body content with the case study structure (Challenge, Approach, Process, Result, Scope).
8. **Generate placeholder images** — use gradient backgrounds with project titles as placeholder cover images.
9. **Test dark/light mode thoroughly** — both modes must look equally premium, not like one is an afterthought.
10. **Ensure every page is responsive** — test at 375px (mobile), 768px (tablet), 1024px (small desktop), 1440px (desktop), and 1920px (large desktop).
11. **Accessibility:** All interactive elements must be keyboard-navigable. Use semantic HTML. All images must have alt text. Color contrast must meet WCAG AA standards in both themes.
12. **The site must be fully functional and visually complete on first build.** The user will replace placeholder content later, but the structure, styling, interactions, and navigation must all work perfectly.

---

*End of PRD — Version 1.0*