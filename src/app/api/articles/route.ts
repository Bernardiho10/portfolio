import { db } from "@/db";
import { articles, upvotes } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Get articles with upvote counts
    const articlesWithUpvotes = await db
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
        upvoteCount: sql<number>`count(${upvotes.id})::int`,
      })
      .from(articles)
      .leftJoin(upvotes, eq(articles.id, upvotes.articleId))
      .groupBy(articles.id)
      .orderBy(desc(articles.publishDate))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(articles);
    const total = totalResult[0]?.count || 0;

    return NextResponse.json({
      articles: articlesWithUpvotes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

