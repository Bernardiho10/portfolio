import { db } from "@/db";
import { articles, upvotes, comments, users } from "@/db/schema";
import { eq, and, isNull, desc, sql, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UpvoteButton } from "@/components/blog/UpvoteButton";
import { CommentSection } from "@/components/blog/CommentSection";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { ArticleProgress } from "@/components/blog/ArticleProgress";
import { ArticleBody } from "@/components/blog/ArticleBody";
import dynamic from "next/dynamic";

const ThemeCustomizer = dynamic(
  () => import("@/components/blog/ThemeCustomizer").then((mod) => mod.ThemeCustomizer),
  { 
    ssr: false,
    loading: () => null,
  }
);
import { markdownToHTML } from "@/data/blog";
import { personalInfo } from "@/data/personal-info";

export async function generateStaticParams() {
  const allArticles = await db.select({ slug: articles.slug }).from(articles);
  return allArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const articleResult = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, params.slug))
    .limit(1);

  if (articleResult.length === 0) {
    return undefined;
  }

  const article = articleResult[0];
  const ogImage = article.heroImage || `${process.env.NEXT_PUBLIC_APP_URL || 'https://bernardarikuoko.com.ng'}/og?title=${encodeURIComponent(article.title)}`;

  return {
    title: `${article.title} | Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishDate.toISOString(),
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bernardarikuoko.com.ng'}/blog/${article.slug}`,
      images: [{ url: ogImage }],
      authors: [personalInfo.name],
      tags: article.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Get article
  const articleResult = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, params.slug))
    .limit(1);

  if (articleResult.length === 0) {
    notFound();
  }

  const article = articleResult[0];

  // Get upvote count
  const upvoteResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(upvotes)
    .where(eq(upvotes.articleId, article.id));
  
  const upvoteCount = Number(upvoteResult[0]?.count || 0);
  
  // Get comments
  const topLevelComments = await db
    .select({
      id: comments.id,
      body: comments.body,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
      parentId: comments.parentId,
      user: {
        id: users.id,
        name: users.name,
        image: users.image,
        email: users.email,
      },
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(
      and(
        eq(comments.articleId, article.id),
        isNull(comments.parentId)
      )
    )
    .orderBy(desc(comments.createdAt));

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    topLevelComments.map(async (comment) => {
      const replies = await db
        .select({
          id: comments.id,
          body: comments.body,
          createdAt: comments.createdAt,
          updatedAt: comments.updatedAt,
          parentId: comments.parentId,
          user: {
            id: users.id,
            name: users.name,
            image: users.image,
            email: users.email,
          },
        })
        .from(comments)
        .innerJoin(users, eq(comments.userId, users.id))
        .where(eq(comments.parentId, comment.id))
        .orderBy(desc(comments.createdAt));

      return {
        ...comment,
        replies,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
      };
    })
  );

  // Get related posts (by shared tags, exclude current)
  let relatedArticles = [];
  if (article.tags && article.tags.length > 0) {
    try {
      relatedArticles = await db
        .select({
          id: articles.id,
          title: articles.title,
          slug: articles.slug,
          excerpt: articles.excerpt,
          heroImage: articles.heroImage,
        })
        .from(articles)
        .where(ne(articles.id, article.id))
        .limit(6);
      
      // Filter by shared tags in application code
      relatedArticles = relatedArticles.filter((a) => 
        a.tags && a.tags.some((tag) => article.tags?.includes(tag))
      ).slice(0, 6);
      
      // If no related by tags, get popular articles
      if (relatedArticles.length === 0) {
        relatedArticles = await db
          .select({
            id: articles.id,
            title: articles.title,
            slug: articles.slug,
            excerpt: articles.excerpt,
            heroImage: articles.heroImage,
          })
          .from(articles)
          .where(ne(articles.id, article.id))
          .orderBy(desc(articles.views))
          .limit(6);
      }
    } catch (error) {
      console.error("Error fetching related articles:", error);
      // Fallback to empty array
      relatedArticles = [];
    }
  }

  // Convert article body to HTML
  const articleHTML = await markdownToHTML(article.body);

  return (
    <>
      <ThemeCustomizer />
      <ArticleProgress />
      
      {/* Hero Section */}
      <ArticleHero
        title={article.title}
        excerpt={article.excerpt || undefined}
        heroImage={article.heroImage}
        tags={article.tags || undefined}
        readingTime={article.readingTime}
        views={article.views}
        publishDate={article.publishDate}
        author={personalInfo.name}
      />

      {/* Article Body with Sidebar */}
      <ArticleBody
        content={articleHTML}
        tags={article.tags || undefined}
        relatedArticles={relatedArticles.map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt || '',
          heroImage: a.heroImage || null,
        }))}
        currentSlug={article.slug}
      />

      {/* Upvote Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex justify-center">
            <UpvoteButton
              articleSlug={article.slug}
              initialCount={upvoteCount}
              initialHasUpvoted={false}
            />
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <CommentSection
            articleSlug={article.slug}
            initialComments={commentsWithReplies}
          />
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            datePublished: article.publishDate.toISOString(),
            dateModified: article.updatedAt.toISOString(),
            description: article.excerpt,
            image: article.heroImage,
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bernardarikuoko.com.ng'}/blog/${article.slug}`,
            author: {
              "@type": "Person",
              name: personalInfo.name,
            },
          }),
        }}
      />
    </>
  );
}
