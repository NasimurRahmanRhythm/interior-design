-- Points on the landing page map of Bangladesh, managed from the admin "Map"
-- section: a title (shown on hover) and a Google Maps link, from which the
-- admin panel reads the latitude and longitude.
create table public.map_points (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(title) between 1 and 200),
  link text not null check (length(link) <= 2000),
  lat double precision not null check (lat between 20 and 27),
  lon double precision not null check (lon between 87.5 and 93),
  created_at timestamptz not null default now()
);

alter table public.map_points enable row level security;
create policy "Anyone can read" on public.map_points for select to anon, authenticated using (true);
create policy "Admins can write" on public.map_points for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

grant select on public.map_points to anon, authenticated;
grant insert, update, delete on public.map_points to authenticated;
grant all on public.map_points to service_role;

-- The three pins the map showed until now.
insert into public.map_points (title, link, lat, lon, created_at)
select
  p->>'name' || ' — ' || (p->>'note'),
  'https://www.google.com/maps?q=' || (p->>'lat') || ',' || (p->>'lon'),
  (p->>'lat')::double precision,
  (p->>'lon')::double precision,
  now() + (ord * interval '1 second')
from public.site_settings, jsonb_array_elements(reach->'pins') with ordinality as t(p, ord)
where id = 1;

-- The figures beside the map become part of the landing page copy.
update public.page_content
set content = content || jsonb_build_object('figures', (select reach->'figures' from public.site_settings where id = 1))
where key = 'home.reach';
