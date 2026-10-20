-- Run BEFORE deploying the matching code. Safe for the current site: it only adds.
--
-- Services can be shown on the landing page ring (up to five, in this order),
-- and services added from the admin panel have no 3D scene: their page shows
-- the cover photo instead.
alter table public.divisions add column featured_order int;
update public.divisions set featured_order = sort_order + 1;
alter table public.divisions alter column scene drop not null;

-- The landing page now shows at most seven projects; the last two of the nine
-- drop off (they stay on the projects page).
update public.projects set featured_order = null where featured_order > 7;

-- New projects and services only need a title, so these get defaults.
alter table public.projects alter column category set default '';
alter table public.divisions alter column tagline set default '';
