-- ASCEND initial Supabase schema. Apply in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'ASCEND member',
  units text not null default 'lb' check (units in ('lb','kg')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  performed_at timestamptz not null default now(),
  duration_minutes integer not null default 0 check (duration_minutes between 0 and 1440),
  sets jsonb not null default '[]'::jsonb,
  notes text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists public.meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  meal_type text not null default 'Snack',
  logged_on date not null default current_date,
  protein_grams numeric(7,2) not null default 0 check (protein_grams between 0 and 10000),
  notes text not null default '',
  created_at timestamptz not null default now()
);
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  archived_at timestamptz
);
create table if not exists public.habit_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  habit_id uuid not null references public.habits(id) on delete cascade,
  checked_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique(habit_id, checked_on)
);

alter table public.profiles enable row level security;
alter table public.workouts enable row level security;
alter table public.meals enable row level security;
alter table public.habits enable row level security;
alter table public.habit_checkins enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "workouts_own" on public.workouts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "meals_own" on public.meals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "habits_own" on public.habits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "habit_checkins_own" on public.habit_checkins for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists workouts_user_time on public.workouts(user_id, performed_at desc);
create index if not exists meals_user_day on public.meals(user_id, logged_on desc);
create index if not exists habits_user on public.habits(user_id);
