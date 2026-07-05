-- ============================================================
--  Corea 2026 · Setup de Supabase (idempotente / re-ejecutable)
--  Pegá TODO esto en el SQL Editor de Supabase y ejecutá.
--  Crea tablas + bucket de storage + políticas RLS abiertas.
--  RLS abierto = suficiente para un link privado entre 2 personas.
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- Tablas ----------

create table if not exists public.events (
  id         uuid primary key default gen_random_uuid(),
  day        int not null default 1,
  time_sort  numeric not null default 0,
  time       text,
  title      text not null,
  type       text,
  place      text,
  duration   text,
  tip        text,
  highlight  boolean not null default false,
  lat        double precision,
  lng        double precision,
  created_at timestamptz not null default now()
);

create table if not exists public.spot_ratings (
  id         uuid primary key default gen_random_uuid(),
  spot_id    uuid references public.events(id) on delete cascade,
  spot_name  text,
  rating     int not null check (rating between 1 and 5),
  comment    text,
  author     text not null,
  created_at timestamptz not null default now(),
  unique (spot_id, author)
);

create table if not exists public.photos (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid references public.events(id) on delete set null,
  lat        double precision,
  lng        double precision,
  caption    text,
  path       text not null,
  created_at timestamptz not null default now()
);

create index if not exists photos_event_idx  on public.photos (event_id);
create index if not exists ratings_spot_idx   on public.spot_ratings (spot_id);
create index if not exists events_day_idx      on public.events (day, time_sort);

-- ---------- RLS ----------

alter table public.events       enable row level security;
alter table public.spot_ratings enable row level security;
alter table public.photos       enable row level security;

drop policy if exists events_all       on public.events;
drop policy if exists spot_ratings_all  on public.spot_ratings;
drop policy if exists photos_all        on public.photos;

create policy events_all on public.events
  for all to anon, authenticated using (true) with check (true);

create policy spot_ratings_all on public.spot_ratings
  for all to anon, authenticated using (true) with check (true);

create policy photos_all on public.photos
  for all to anon, authenticated using (true) with check (true);

-- ---------- Storage (bucket público "fotos") ----------

insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do update set public = true;

drop policy if exists fotos_read   on storage.objects;
drop policy if exists fotos_write  on storage.objects;
drop policy if exists fotos_delete on storage.objects;

create policy fotos_read on storage.objects
  for select to anon, authenticated using (bucket_id = 'fotos');

create policy fotos_write on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'fotos');

create policy fotos_delete on storage.objects
  for delete to anon, authenticated using (bucket_id = 'fotos');

-- Listo. La app auto-siembra los eventos de ejemplo la primera vez
-- que abra con la tabla "events" vacía.
