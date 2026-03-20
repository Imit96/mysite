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

### AD-001: Pivot to Supabase CMS
- **Decision:** Shift backend from MDX to Supabase with Next.js Admin Panel
- **Context:** Wanted ability to manage digital products (sales) and write posts from a visual dashboard without touching code.
- **Options:** Local MDX, Sanity.io, Supabase
- **Chosen:** Supabase since it handles Auth, Database, and Storage securely within the Next.js app ecosystem itself.
- **Date:** 2026-03-20
