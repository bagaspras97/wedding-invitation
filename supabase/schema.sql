create extension if not exists "pgcrypto";

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  guests integer not null check (guests between 1 and 4),
  attendance text not null check (attendance in ('attending', 'declined')),
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

drop policy if exists "Anyone can submit RSVP" on public.rsvps;
create policy "Anyone can submit RSVP"
on public.rsvps
for insert
to anon
with check (true);

drop policy if exists "Anyone can submit wishes" on public.wishes;
create policy "Anyone can submit wishes"
on public.wishes
for insert
to anon
with check (true);

drop policy if exists "Anyone can read wishes" on public.wishes;
create policy "Anyone can read wishes"
on public.wishes
for select
to anon
using (true);

-- RSVP rows are intentionally not readable through the public anon key.
-- The admin dashboard reads them through SUPABASE_SERVICE_ROLE_KEY on the server.
