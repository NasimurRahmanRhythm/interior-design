import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import SplitTitle from "@/components/SplitTitle";
import { COPY } from "@/lib/copy";
import { getPost } from "@/lib/db/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} | Integrity 360 Degree`, description: post.excerpt, openGraph: post.image ? { images: [post.image] } : undefined };
}

export default async function PostPage({ params }: Params) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <section data-theme="dark" className="bg-ink pb-14 pt-40 text-bone lg:pb-20 lg:pt-52">
        <div className="grid-w">
          <div className="col-span-6 lg:col-span-9">
            <p className="t-label mb-4 opacity-60">
              {new Date(post.date).toLocaleDateString("en-GB", { dateStyle: "long", timeZone: "Asia/Dhaka" })}
            </p>
            <h1 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.035em]">
              <SplitTitle text={post.title} when="ready" />
            </h1>
          </div>
        </div>
      </section>
      <article data-theme="light" className="bg-bone pb-24 text-ink lg:pb-36">
        {post.image && (
          <div className="relative mx-auto aspect-[16/9] max-w-6xl">
            <Image src={post.image} alt="" fill priority sizes="(min-width:1152px) 1152px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="mx-auto max-w-2xl px-[var(--margin)] pt-14 lg:pt-20">
          <div className="rich-text text-[1.05rem]" dangerouslySetInnerHTML={{ __html: post.body }} />
          <div className="mt-14">
            <Button href="/blog">← {COPY.blog.back}</Button>
          </div>
        </div>
      </article>
    </>
  );
}
