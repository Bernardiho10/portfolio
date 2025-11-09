import BlurFade from "@/components/magicui/blur-fade";
import { SeedButton } from "@/components/blog/SeedButton";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { db } from "@/db";
import { articles, upvotes } from "@/db/schema";
import { desc, sql, eq } from "drizzle-orm";

export const metadata = {
  title: "Blog | Bernard Ariku Oko",
  description: "Journey through my career from University of Calabar to SaaS entrepreneurship in Nigerian healthcare tech.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  // Fetch initial articles server-side
  let initialArticles = [];
  let needsMigration = false;
  let allCategories: string[] = [];
  
  try {
    const articlesData = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        excerpt: articles.excerpt,
        heroImage: articles.heroImage,
        publishDate: articles.publishDate,
        tags: articles.tags,
        views: articles.views,
        readingTime: articles.readingTime,
      })
      .from(articles)
      .orderBy(desc(articles.publishDate))
      .limit(100); // Get more articles to extract all categories

    // Get upvote counts for each article
    initialArticles = await Promise.all(
      articlesData.map(async (article) => {
        try {
          const upvoteResult = await db
            .select({ count: sql<number>`count(*)::int` })
            .from(upvotes)
            .where(eq(upvotes.articleId, article.id));
          
          return {
            ...article,
            upvoteCount: Number(upvoteResult[0]?.count || 0),
          };
        } catch {
          // If upvotes table doesn't exist, just return 0
          return {
            ...article,
            upvoteCount: 0,
          };
        }
      })
    );

    // Extract all unique categories from articles
    const categorySet = new Set<string>();
    articlesData.forEach((article) => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach((tag) => {
          if (tag && typeof tag === 'string') {
            categorySet.add(tag);
          }
        });
      }
    });
    allCategories = Array.from(categorySet).sort();

    // Limit to first 10 articles for initial load
    initialArticles = initialArticles.slice(0, 10);
  } catch (error: any) {
    // Check if it's a "table doesn't exist" error
    if (error?.code === "42P01" || error?.message?.includes("does not exist") || error?.cause?.code === "42P01") {
      needsMigration = true;
      // Don't log this as an error - it's expected on first setup
      console.info("Database tables do not exist. Migration needed. This is normal for first-time setup.");
    } else {
      // Only log unexpected errors
      console.error("Error fetching articles:", error);
      if (error.message) {
        console.error("Error message:", error.message);
      }
    }
    
    // Return empty array on error
    initialArticles = [];
  }

  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl" aria-label="Blog posts">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8 md:mb-12">
          <h1 className="font-medium text-3xl md:text-4xl mb-4 tracking-tighter">Blog</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Journey through my career from University of Calabar to SaaS
            entrepreneurship in Nigerian healthcare tech. Stories, lessons, and
            insights from 7+ years in software engineering.
          </p>
        </div>
      </BlurFade>
      {initialArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {needsMigration
              ? "Database tables do not exist. Click the button below to create tables and seed articles."
              : "No articles found. Please seed the database first."}
                </p>
          <SeedButton />
              </div>
      ) : (
        <BlogPageClient
          initialArticles={initialArticles.map((a) => ({
            ...a,
            publishDate: a.publishDate.toISOString(),
            upvoteCount: a.upvoteCount || 0,
          }))}
          categories={allCategories}
        />
      )}
    </section>
  );
}

function ArticleFeedSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-64 bg-muted animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}
