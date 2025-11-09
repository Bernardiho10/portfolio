import { db } from "@/db";
import { userThemes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ theme: null });
    }

    const userId = session.user.id as string;

    const themeResult = await db
      .select()
      .from(userThemes)
      .where(eq(userThemes.userId, userId))
      .limit(1);

    if (themeResult.length === 0) {
      return NextResponse.json({ theme: null });
    }

    return NextResponse.json({ theme: themeResult[0] });
  } catch (error) {
    console.error("Error fetching theme:", error);
    return NextResponse.json(
      { error: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id as string;
    const body = await request.json();
    const { themeData } = body;

    if (!themeData || typeof themeData !== "object") {
      return NextResponse.json(
        { error: "Theme data is required" },
        { status: 400 }
      );
    }

    // Check if theme exists
    const existingTheme = await db
      .select()
      .from(userThemes)
      .where(eq(userThemes.userId, userId))
      .limit(1);

    if (existingTheme.length > 0) {
      // Update existing theme
      const updated = await db
        .update(userThemes)
        .set({
          themeData: themeData,
          updatedAt: new Date(),
        })
        .where(eq(userThemes.userId, userId))
        .returning();

      return NextResponse.json({ theme: updated[0] });
    } else {
      // Create new theme
      const created = await db
        .insert(userThemes)
        .values({
          userId: userId,
          themeData: themeData,
        })
        .returning();

      return NextResponse.json({ theme: created[0] }, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving theme:", error);
    return NextResponse.json(
      { error: "Failed to save theme" },
      { status: 500 }
    );
  }
}

