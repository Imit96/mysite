# Setup Guide

## Prerequisites
- Node.js 20+ / pnpm 9+

## Install & Run
```bash
# git clone [repo-url] && cd ojo-portfolio
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
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/ojo-oluwatimileyin/discovery-call
# RESEND_API_KEY=re_xxxx
```
