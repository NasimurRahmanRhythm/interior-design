-- Integrity 360 Degree — database schema.
--
-- Everything the public site shows lives here; files (photos, later videos and
-- .glb models) live in the "media" storage bucket and tables store their path
-- inside it, e.g. 'projects/yolo-fest/1.jpg'.
--
-- Access: anyone may read published content and send a quote request; only
-- users listed in public.admins may change anything. The project is created
-- with "automatically expose new tables" off, so every grant is explicit.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Admins (one role: a user is either an admin or not)
-- ---------------------------------------------------------------------------

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

comment on table public.admins is 'Users who can edit the site. Add a row to make someone an admin.';

-- Runs as the table owner so policies can call it without RLS recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- ---------------------------------------------------------------------------
-- Site-wide settings and page copy
-- ---------------------------------------------------------------------------

create table public.site_settings (
  id smallint primary key default 1 check (id = 1),
  brand jsonb not null default '{}',          -- name, lines, tagline, belief
  contact jsonb not null default '{}',        -- address, phones, whatsapp, emails, hours, response, landmarks, map
  socials jsonb not null default '[]',        -- [{label, href}]
  nav jsonb not null default '[]',            -- [{label, href}]
  trust_stats jsonb not null default '[]',    -- landing page figures [{value, suffix, label}]
  hero_panels jsonb not null default '[]',    -- landing hero photos [{image, alt}]
  reach jsonb not null default '{}',          -- {figures, pins, cities} for the Bangladesh map
  quote_options jsonb not null default '{}',  -- {divisions, budgets, timelines} for the quote form
  updated_at timestamptz not null default now()
);

comment on table public.site_settings is 'Single row (id = 1) of settings used across the site.';

-- Headings, paragraphs and labels for each section of each page.
create table public.page_content (
  key text primary key,                       -- e.g. 'home.hero', 'about.belief'
  page text not null,                         -- e.g. 'home', 'about'
  content jsonb not null default '{}',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Short reusable lists that belong to no single record: about pillars, values,
-- the 360° wheel, process steps, 3D build steps, 3D finishes.
create table public.content_blocks (
  key text primary key,                       -- e.g. 'about', 'process', 'builds', 'finishes'
  content jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Divisions
-- ---------------------------------------------------------------------------

create table public.divisions (
  id text primary key check (id ~ '^[a-z0-9-]+$'),  -- used in URLs: /services/<id>
  number text not null,                       -- '01'
  name text not null,                         -- 'Events, Fairs & Activations'
  title_line1 text not null,                  -- hero, first line
  title_line2 text not null,                  -- hero, second (italic) line
  tagline text not null,
  intro text not null,
  card_title text not null,                   -- short name on the 360° ring
  card_short text not null,                   -- one line on the ring card
  card_services text[] not null default '{}', -- list under the ring
  cover_image text,                           -- storage path
  scene text not null check (scene in ('stage', 'stall', 'room', 'brand')),
  extra_title text,                           -- optional extra list, e.g. expos
  extra_items text[] not null default '{}',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.division_service_groups (
  id uuid primary key default gen_random_uuid(),
  division_id text not null references public.divisions (id) on delete cascade,
  title text not null,
  items text[] not null default '{}',
  sort_order int not null default 0
);

create table public.division_figures (
  id uuid primary key default gen_random_uuid(),
  division_id text not null references public.divisions (id) on delete cascade,
  value text not null,                        -- text: '≈65', '20+'
  label text not null,
  sort_order int not null default 0
);

create index on public.division_service_groups (division_id, sort_order);
create index on public.division_figures (division_id, sort_order);

-- ---------------------------------------------------------------------------
-- Clients
-- ---------------------------------------------------------------------------

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  industry text,                              -- group on /clients
  logo_path text,                             -- storage path, shown only when approved
  logo_approved boolean not null default false,
  show_in_marquee boolean not null default false,
  marquee_row smallint check (marquee_row in (1, 2)),
  marquee_order int,                          -- position within its marquee row
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on public.clients (industry, sort_order);

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  division_id text not null references public.divisions (id),
  category text not null,
  client_id uuid references public.clients (id) on delete set null,
  client_label text,                          -- free text when there are several clients
  venue text,
  year text,                                  -- text: '2019–2020'
  summary text not null default '',
  is_featured boolean not null default false, -- shown first on its division page
  featured_order int,                         -- position in the landing "Selected Work"; null = not shown
  status text not null default 'published' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on public.projects (division_id, sort_order);
create index on public.projects (featured_order) where featured_order is not null;

create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  path text not null,                         -- storage path
  width int not null check (width > 0),
  height int not null check (height > 0),
  alt text not null default '',
  sort_order int not null default 0           -- the first image is the cover
);

create index on public.project_images (project_id, sort_order);

-- ---------------------------------------------------------------------------
-- Company story
-- ---------------------------------------------------------------------------

create table public.journey_milestones (
  id uuid primary key default gen_random_uuid(),
  year text not null,                         -- '2010', 'Today'
  title text not null,
  detail text not null default '',
  image_path text,
  sort_order int not null default 0
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  person_name text not null,
  person_role text,
  client_id uuid references public.clients (id) on delete set null,
  project_id uuid references public.projects (id) on delete set null,
  is_approved boolean not null default false, -- hidden until the client confirms it
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_path text,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Quote / contact requests from the site
-- ---------------------------------------------------------------------------

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  division text,
  budget text,
  timeline text,
  name text not null check (length(name) between 1 and 200),
  phone text check (length(phone) <= 50),
  email text check (length(email) <= 320),
  message text check (length(message) <= 5000),
  source_page text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create index on public.quote_requests (status, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

create trigger set_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.page_content for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.content_blocks for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.divisions for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.projects for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.admins enable row level security;
alter table public.site_settings enable row level security;
alter table public.page_content enable row level security;
alter table public.content_blocks enable row level security;
alter table public.divisions enable row level security;
alter table public.division_service_groups enable row level security;
alter table public.division_figures enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.journey_milestones enable row level security;
alter table public.testimonials enable row level security;
alter table public.team_members enable row level security;
alter table public.quote_requests enable row level security;

-- Admins: an admin can see who the admins are; rows are added from the dashboard.
create policy "Admins can read admins" on public.admins
  for select to authenticated using ((select public.is_admin()));

-- Public content: everyone reads, admins write.
create policy "Anyone can read" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins can write" on public.site_settings for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.page_content for select to anon, authenticated using (true);
create policy "Admins can write" on public.page_content for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.content_blocks for select to anon, authenticated using (true);
create policy "Admins can write" on public.content_blocks for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.divisions for select to anon, authenticated using (true);
create policy "Admins can write" on public.divisions for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.division_service_groups for select to anon, authenticated using (true);
create policy "Admins can write" on public.division_service_groups for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.division_figures for select to anon, authenticated using (true);
create policy "Admins can write" on public.division_figures for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.clients for select to anon, authenticated using (true);
create policy "Admins can write" on public.clients for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.journey_milestones for select to anon, authenticated using (true);
create policy "Admins can write" on public.journey_milestones for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read" on public.team_members for select to anon, authenticated using (true);
create policy "Admins can write" on public.team_members for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- Projects and their images: the public sees published ones, admins see all.
create policy "Anyone can read published" on public.projects
  for select to anon, authenticated using (status = 'published' or (select public.is_admin()));
create policy "Admins can write" on public.projects for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "Anyone can read images of published projects" on public.project_images
  for select to anon, authenticated using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and (p.status = 'published' or (select public.is_admin()))
    )
  );
create policy "Admins can write" on public.project_images for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- Testimonials: only approved ones are public.
create policy "Anyone can read approved" on public.testimonials
  for select to anon, authenticated using (is_approved or (select public.is_admin()));
create policy "Admins can write" on public.testimonials for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- Quote requests: anyone can send a new one; only admins read or manage them.
create policy "Anyone can send a request" on public.quote_requests
  for insert to anon, authenticated with check (status = 'new');
create policy "Admins can read requests" on public.quote_requests
  for select to authenticated using ((select public.is_admin()));
create policy "Admins can update requests" on public.quote_requests
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins can delete requests" on public.quote_requests
  for delete to authenticated using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Grants (new tables are not exposed automatically). RLS above narrows them.
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;

grant select on
  public.site_settings, public.page_content, public.content_blocks,
  public.divisions, public.division_service_groups, public.division_figures,
  public.clients, public.projects, public.project_images,
  public.journey_milestones, public.testimonials, public.team_members
to anon, authenticated;

grant insert, update, delete on
  public.site_settings, public.page_content, public.content_blocks,
  public.divisions, public.division_service_groups, public.division_figures,
  public.clients, public.projects, public.project_images,
  public.journey_milestones, public.testimonials, public.team_members
to authenticated;

grant insert on public.quote_requests to anon, authenticated;
grant select, update, delete on public.quote_requests to authenticated;
grant select on public.admins to authenticated;

grant execute on function public.is_admin() to anon, authenticated;

grant all on all tables in schema public to service_role;

-- ---------------------------------------------------------------------------
-- Storage: one public bucket for site media
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  52428800, -- 50 MB, the free-plan maximum per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm', 'model/gltf-binary']
)
on conflict (id) do nothing;

-- Files in a public bucket are served by URL without a policy; these policies
-- cover listing and changes through the API.
create policy "Anyone can read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');
create policy "Admins can upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and (select public.is_admin()));
create policy "Admins can update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and (select public.is_admin())) with check (bucket_id = 'media' and (select public.is_admin()));
create policy "Admins can delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and (select public.is_admin()));
