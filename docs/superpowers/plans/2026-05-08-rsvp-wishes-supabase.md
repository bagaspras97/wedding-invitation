# RSVP Wishes Supabase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the RSVP form and wishes section to Supabase while showing every submitted wish publicly.

**Architecture:** Use Next.js API routes as the only browser-facing integration point. Server routes validate input, call Supabase REST with existing environment variables, and return small JSON payloads to client components.

**Tech Stack:** Next.js App Router, TypeScript, Supabase REST API, existing Framer Motion UI.

---

### Task 1: Backend Submission Layer

**Files:**
- Create: `src/lib/submissions/validation.ts`
- Create: `src/lib/submissions/supabase-rest.ts`
- Create: `src/app/api/rsvp/route.ts`
- Create: `src/app/api/wishes/route.ts`
- Create: `supabase/schema.sql`

- [x] **Step 1: Add payload validators**

Create narrow validators for RSVP and wishes so API routes reject missing names, missing attendance, invalid guest counts, and empty wish messages before calling Supabase.

- [x] **Step 2: Add Supabase REST helper**

Read `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` on the server, then send authenticated REST requests with `apikey` and `Authorization` headers.

- [x] **Step 3: Add API routes**

Add `POST /api/rsvp`, `GET /api/wishes`, and `POST /api/wishes`. Wishes use no moderation flag and are returned in newest-first order.

- [x] **Step 4: Add database schema**

Document the exact SQL for `rsvps` and `wishes` tables plus RLS policies: anonymous insert for both, anonymous select for wishes only.

### Task 2: Client Wiring

**Files:**
- Modify: `src/components/Rsvp.tsx`
- Modify: `src/components/Wishes.tsx`

- [x] **Step 1: Wire RSVP submit**

Send validated form data to `/api/rsvp`, show loading state, inline errors, and success toast.

- [x] **Step 2: Wire wishes list**

Fetch all wishes from `/api/wishes`; on submit, post to the route and prepend the new wish without waiting for a reload.

### Task 3: Verification

**Files:**
- Verify: `src/app/api/rsvp/route.ts`
- Verify: `src/app/api/wishes/route.ts`
- Verify: `src/components/Rsvp.tsx`
- Verify: `src/components/Wishes.tsx`

- [x] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`

- [x] **Step 2: Manual API check**

Run the local Next.js server, submit one RSVP, submit one wish, and confirm wishes can be read back through the API.
