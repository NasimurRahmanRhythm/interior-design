import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import SplitTitle from "../SplitTitle";
import type { Copy, Post } from "@/lib/db/types";

const date = (d: string) => new Date(d).toLocaleDateString("en-GB", { dateStyle: "long", timeZone: "Asia/Dhaka" });

export function PostCard({ post, copy }: { post: Post; copy: Copy }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="fit relative aspect-[4/3] bg-stone">
        {post.image && (
          <Image src={post.image} alt="" fill sizes="(min-width:1024px) 31vw, 92vw" className="object-cover transition-transform duration-1000 ease-cubic group-hover:scale-105" />
        )}
      </div>
      <p className="t-label mt-4 opacity-55">{date(post.date)}</p>
      <h3 className="t-h5 mt-1">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-70">{post.excerpt}</p>
      <span className="t-label link-u mt-3 inline-block">{copy.read} →</span>
    </Link>
  );
}

// The latest posts on the landing page.
export default function BlogPosts({ posts, copy }: { posts: Post[]; copy: Copy }) {
  return (
    <section id="blog" data-theme="light" className="bg-bone py-24 text-ink lg:py-36">
      <div className="grid-w items-end gap-y-6">
        <div className="col-span-6 lg:col-span-9">
          <p className="t-eyebrow mb-4 opacity-60">{copy.eyebrow}</p>
          <h2 className="t-h1">
            <SplitTitle text={copy.title[0]} />
            <SplitTitle text={copy.title[1]} className="text-umber" delay={0.1} />
          </h2>
        </div>
        <div className="col-span-6 lg:col-span-3 lg:justify-self-end">
          <Button href="/blog">{copy.all}</Button>
        </div>
      </div>
      <div className="grid-w mt-12 gap-y-12 lg:mt-16">
        {posts.slice(0, 3).map((p) => (
          <div key={p.slug} className="col-span-6 sm:col-span-3 lg:col-span-4">
            <PostCard post={p} copy={copy} />
          </div>
        ))}
      </div>
    </section>
  );
}
