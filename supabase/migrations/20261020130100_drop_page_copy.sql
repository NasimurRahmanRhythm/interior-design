-- Run AFTER the matching code is deployed: page copy and the shared content
-- blocks now live in the code (src/lib/copy.ts and src/lib/content.ts).
drop table public.page_content;
drop table public.content_blocks;
