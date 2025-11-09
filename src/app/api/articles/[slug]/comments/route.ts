import { db } from "@/db";
import { articles, comments, users } from "@/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

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

    // Get top-level comments (no parent)
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
        };
      })
    );

    return NextResponse.json({ comments: commentsWithReplies });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

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
    const body = await request.json();
    const { commentBody, parentId } = body;

    if (!commentBody || typeof commentBody !== "string") {
      return NextResponse.json(
        { error: "Comment body is required" },
        { status: 400 }
      );
    }

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

    // Validate parent comment if provided
    if (parentId) {
      const parentComment = await db
        .select()
        .from(comments)
        .where(
          and(
            eq(comments.id, parentId),
            eq(comments.articleId, article.id)
          )
        )
        .limit(1);

      if (parentComment.length === 0) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }
    }

    // Insert comment
    const newComment = await db
      .insert(comments)
      .values({
        articleId: article.id,
        userId: userId,
        body: commentBody,
        parentId: parentId || null,
      })
      .returning();

    // Get comment with user info
    const commentWithUser = await db
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
      .where(eq(comments.id, newComment[0].id))
      .limit(1);

    return NextResponse.json({ comment: commentWithUser[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

