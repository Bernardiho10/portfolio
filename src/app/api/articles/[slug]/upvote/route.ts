import { db } from "@/db";
import { articles, upvotes } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering since we use auth and dynamic params
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const slug = params.slug;
    const userId = session.user.id as string;

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

    // Check if upvote exists
    const existingUpvote = await db
      .select()
      .from(upvotes)
      .where(
        and(
          eq(upvotes.articleId, article.id),
          eq(upvotes.userId, userId)
        )
      )
      .limit(1);

    if (existingUpvote.length > 0) {
      // Remove upvote
      await db
        .delete(upvotes)
        .where(
          and(
            eq(upvotes.articleId, article.id),
            eq(upvotes.userId, userId)
          )
        );

      return NextResponse.json({ upvoted: false });
    } else {
      // Add upvote
      await db.insert(upvotes).values({
        articleId: article.id,
        userId: userId,
      });

      return NextResponse.json({ upvoted: true });
    }
  } catch (error) {
    console.error("Error toggling upvote:", error);
    return NextResponse.json(
      { error: "Failed to toggle upvote" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string | undefined;

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

    // Get upvote count
    const upvoteResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(upvotes)
      .where(eq(upvotes.articleId, article.id));
    const upvoteCount = upvoteResult[0]?.count || 0;

    // Check if user has upvoted
    let hasUpvoted = false;
    if (userId) {
      const userUpvote = await db
        .select()
        .from(upvotes)
        .where(
          and(
            eq(upvotes.articleId, article.id),
            eq(upvotes.userId, userId)
          )
        )
        .limit(1);
      hasUpvoted = userUpvote.length > 0;
    }

    return NextResponse.json({
      upvoteCount,
      hasUpvoted,
    });
  } catch (error) {
    console.error("Error fetching upvote status:", error);
    return NextResponse.json(
      { error: "Failed to fetch upvote status" },
      { status: 500 }
    );
  }
}

