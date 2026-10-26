import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PostCard } from "@/components/sections/BlogPosts";
import { COPY } from "@/lib/copy";
import { fill } from "@/lib/db/fill";
import { getPosts } from "@/lib/db/queries";
import { paginate, withQuery } from "@/lib/paginate";

export const metadata: Metadata = { title: COPY.blog.meta.title, description: COPY.blog.meta.description };

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const copy = COPY.blog;
  const posts = await getPosts();
  const paging = paginate(posts.length, (await searchParams).page);
  const href = (n: number) => withQuery("/blog", { page: n > 1 ? n : null });

  return (
    <>
      <PageHero title={copy.hero.title} accent={copy.hero.accent} label={fill(copy.hero.label, { count: posts.length })} text={copy.hero.text} />
      <section data-theme="light" className="bg-bone pb-28 pt-16 text-ink lg:pb-40 lg:pt-24">
        {posts.length === 0 && <p className="px-[var(--margin)] text-sm opacity-60">{copy.empty}</p>}
        <div className="grid-w gap-y-14">
          {posts.slice(paging.from, paging.to).map((p) => (
            <div key={p.slug} className="col-span-6 sm:col-span-3 lg:col-span-4">
              <PostCard post={p} copy={COPY.home.blog} />
            </div>
          ))}
        </div>
        {paging.pages > 1 && (
          <nav className="mt-16 flex justify-center gap-2" aria-label="Pages">
            {Array.from({ length: paging.pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={href(n)}
                aria-current={n === paging.page ? "page" : undefined}
                className={`t-label flex h-11 min-w-11 items-center justify-center border px-3 ${n === paging.page ? "border-ink bg-ink text-bone" : "border-ink/25 hover:border-ink/70"}`}
              >
                {n}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </>
  );
}
