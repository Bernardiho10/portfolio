import { db } from "@/db";
import { articles, upvotes, comments } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    // Get article
    const articleResult = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (articleResult.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const article = articleResult[0];

    // Increment views (using cookie to avoid bot inflation)
    const cookieStore = await cookies();
    const viewedCookie = `viewed_${article.id}`;
    if (!cookieStore.get(viewedCookie)) {
      await db
        .update(articles)
        .set({ views: sql`${articles.views} + 1` })
        .where(eq(articles.id, article.id));
      cookieStore.set(viewedCookie, "true", { maxAge: 60 * 60 * 24 }); // 24 hours
    }

    // Get upvote count
    const upvoteResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(upvotes)
      .where(eq(upvotes.articleId, article.id));
    const upvoteCount = upvoteResult[0]?.count || 0;

    // Get comment count
    const commentResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(comments)
      .where(eq(comments.articleId, article.id));
    const commentCount = commentResult[0]?.count || 0;

    return NextResponse.json({
      ...article,
      upvoteCount,
      commentCount,
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

