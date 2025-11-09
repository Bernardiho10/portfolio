"use client";

import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/ui/marquee-related";
import { ReviewCard } from "@/components/ui/marquee-related";

interface RelatedPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string | null;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  currentSlug: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const reviews = posts.slice(0, 6).map((post) => ({
    name: post.title,
    username: `@${post.slug}`,
    body: post.excerpt,
    img: post.heroImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&h=100&fit=crop",
  }));

  return (
    <div className="mt-8 md:mt-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Related Posts</h2>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <div className="hidden md:block">
          <Marquee pauseOnHover className="[--duration:20s]">
            {reviews.map((review, index) => (
              <Link key={`${review.username}-${index}`} href={`/blog/${posts[index].slug}`}>
                <ReviewCard {...review} />
              </Link>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {reviews.map((review, index) => (
              <Link key={`${review.username}-reverse-${index}`} href={`/blog/${posts[index].slug}`}>
                <ReviewCard {...review} />
              </Link>
            ))}
          </Marquee>
        </div>
        {/* Mobile: Stack cards vertically */}
        <div className="md:hidden space-y-4 p-4">
          {posts.slice(0, 3).map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <ReviewCard {...reviews[index]} />
            </Link>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background hidden md:block"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background hidden md:block"></div>
      </div>
    </div>
  );
}

