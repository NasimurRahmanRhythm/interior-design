-- Run BEFORE deploying the matching code. Safe for the current site: it only adds.
--
-- Blog posts and client appreciation (title, rich text, one image), and
-- subsections (title, description, image) for projects and services.

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (length(title) between 1 and 200),
  body text not null default '',              -- sanitised HTML from the admin editor
  image_path text,                            -- storage path
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.appreciations (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(title) between 1 and 200),
  body text not null default '',              -- sanitised HTML from the admin editor
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null check (length(title) between 1 and 200),
  description text not null default '',
  image_path text,
  sort_order int not null default 0
);
create index on public.project_sections (project_id, sort_order);

create table public.division_sections (
  id uuid primary key default gen_random_uuid(),
  division_id text not null references public.divisions (id) on update cascade on delete cascade,
  title text not null check (length(title) between 1 and 200),
  description text not null default '',
  image_path text,
  sort_order int not null default 0
);
create index on public.division_sections (division_id, sort_order);

create trigger set_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.appreciations for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.appreciations enable row level security;
alter table public.project_sections enable row level security;
alter table public.division_sections enable row level security;

create policy "Anyone can read" on public.blog_posts for select to anon, authenticated using (true);
create policy "Admins can write" on public.blog_posts for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Anyone can read" on public.appreciations for select to anon, authenticated using (true);
create policy "Admins can write" on public.appreciations for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Anyone can read" on public.division_sections for select to anon, authenticated using (true);
create policy "Admins can write" on public.division_sections for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
-- A project's subsections are public when the project is.
create policy "Anyone can read published" on public.project_sections
  for select to anon, authenticated using (
    exists (select 1 from public.projects p where p.id = project_id and (p.status = 'published' or (select public.is_admin())))
  );
create policy "Admins can write" on public.project_sections for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

grant select on public.blog_posts, public.appreciations, public.project_sections, public.division_sections to anon, authenticated;
grant insert, update, delete on public.blog_posts, public.appreciations, public.project_sections, public.division_sections to authenticated;
grant all on public.blog_posts, public.appreciations, public.project_sections, public.division_sections to service_role;
