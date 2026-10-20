# Database (Supabase)

Three migrations build the database and fill it with everything the site shows today:

| File | What it does |
|---|---|
| `migrations/20261019120000_schema.sql` | Tables, the `admins` list and `is_admin()`, row level security, grants, and the public `media` storage bucket with its policies. |
| `migrations/20261019120100_seed_content.sql` | All site content: settings, contact details, page copy, divisions, 123 projects and their 160 photos, 83 clients, the journey, process steps, 3D build steps and finishes. |
| `migrations/20261019130000_quote_form_copy.sql` | Confirmation copy for the quote form, which now saves requests to `quote_requests`. |

Photos are files, so SQL cannot carry them: `scripts/upload-media.mjs` copies `public/images/**` into the
`media` bucket under the same paths the seed points to (e.g. `projects/yolo-fest/1.jpg`).

## Run it once, in this order

1. **Apply the migrations** — either
   - Supabase dashboard → **SQL Editor** → paste `20261019120000_schema.sql`, Run; then the same for `20261019120100_seed_content.sql`; or
   - with the CLI: `npx supabase login`, `npx supabase link --project-ref <your-ref>`, `npx supabase db push`.

   Each migration runs once; running the seed again fails on duplicate rows by design.

2. **Upload the photos** — put the keys in `.env.local` (never commit it):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
   SUPABASE_SECRET_KEY=sb_secret_...
   ```

   then `npm run upload-media` (or `npm run upload-media -- --dry-run` to see the list first).
   Running it again replaces files, so it is safe to repeat.

3. **Admin panel** — it is open at `/admin` for now, without a sign-in. It saves with the secret key, so set
   `SUPABASE_SECRET_KEY` in Vercel (Production and Preview; not `NEXT_PUBLIC_`) as well as `.env.local`.

## Who can do what

- Anyone: read settings, page copy, divisions, clients, journey, team, published projects and their photos, approved testimonials; send a quote request (but not read requests back).
- Admins (rows in `public.admins`): read and change everything, including drafts and quote requests, and upload or delete files in `media`.
- The admin panel uses the secret key on the server, which bypasses these rules; while it has no sign-in, anyone who opens `/admin` can use it.
