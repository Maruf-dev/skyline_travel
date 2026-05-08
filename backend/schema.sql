-- Run this entire file in Supabase SQL Editor (supabase.com → your project → SQL Editor)

-- ─── Destinations ────────────────────────────────────────────────────────────
create table if not exists destinations (
  id          uuid primary key default gen_random_uuid(),
  city        text not null,
  country     text not null,
  img         text not null,
  img_large   text,
  price       numeric(10,2) not null,
  tag         text not null,
  description text not null,
  highlights  text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- ─── Blogs ───────────────────────────────────────────────────────────────────
create table if not exists blogs (
  id         uuid primary key default gen_random_uuid(),
  cat        text not null,
  title      text not null,
  date       text not null,
  read       text not null,
  img        text not null,
  img_large  text,
  excerpt    text not null,
  body       text not null,
  created_at timestamptz not null default now()
);

-- ─── Deals ───────────────────────────────────────────────────────────────────
create table if not exists deals (
  id         uuid primary key default gen_random_uuid(),
  from_city  text not null,
  to_city    text not null,
  date       text not null,
  price      text not null,
  save       text not null,
  airline    text not null,
  img        text not null,
  created_at timestamptz not null default now()
);

-- ─── Contact submissions ─────────────────────────────────────────────────────
create table if not exists contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

-- ─── Newsletter subscribers ──────────────────────────────────────────────────
create table if not exists newsletter (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- Public tables: anyone can read destinations, blogs, deals
alter table destinations enable row level security;
alter table blogs enable row level security;
alter table deals enable row level security;
alter table contacts enable row level security;
alter table newsletter enable row level security;

create policy "Public read destinations" on destinations for select using (true);
create policy "Public read blogs"        on blogs        for select using (true);
create policy "Public read deals"        on deals        for select using (true);

-- Writes go through the backend (service role key bypasses RLS) so no insert policies needed here.
