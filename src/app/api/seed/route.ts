import { db } from "@/db";
import { articles } from "@/db/schema";
import { seedArticles } from "@/lib/seed-data";
import { NextResponse } from "next/server";

// Helper function to check if error is "table doesn't exist"
function isTableMissingError(error: any): boolean {
  // Check error code (PostgreSQL error code 42P01 = relation does not exist)
  const errorCode = error?.cause?.code || error?.code;
  if (errorCode === "42P01") {
    return true;
  }
  
  // Check error message
  const errorMessage = String(error?.cause?.message || error?.message || "").toLowerCase();
  if (errorMessage.includes("does not exist") || errorMessage.includes("relation") && errorMessage.includes("does not exist")) {
    return true;
  }
  
  // Check stringified error
  try {
    const errorString = JSON.stringify(error).toLowerCase();
    if (errorString.includes("42p01") || (errorString.includes("does not exist") && errorString.includes("relation"))) {
      return true;
    }
  } catch {
    // Ignore JSON stringify errors
  }
  
  return false;
}

export async function POST() {
  try {
    // Check if articles table exists and if articles already exist
    let existingArticles: any[] = [];
    try {
      existingArticles = await db.select().from(articles).limit(1);
    } catch (error: any) {
      // Check if this is a "table doesn't exist" error
      if (isTableMissingError(error)) {
        // Return 200 with needsMigration flag so the client can handle it gracefully
        return NextResponse.json(
          {
            error: "Database tables do not exist",
            message: "Please run migrations first. Use POST /api/migrate to create tables.",
            needsMigration: true,
          },
          { status: 200 }
        );
      }
      // Re-throw other errors - they're unexpected
      console.error("Unexpected error when checking for existing articles:", error);
      throw error;
    }

    if (existingArticles.length > 0) {
      return NextResponse.json(
        { message: "Articles already seeded", count: existingArticles.length },
        { status: 200 }
      );
    }

    // Insert seed articles
    await db.insert(articles).values(seedArticles);

    return NextResponse.json(
      { message: `Successfully seeded ${seedArticles.length} articles` },
      { status: 200 }
    );
  } catch (error: any) {
    // Check if this is a "table doesn't exist" error that wasn't caught earlier
    if (isTableMissingError(error)) {
      // Return 200 with needsMigration flag so the client can handle it gracefully
      return NextResponse.json(
        {
          error: "Database tables do not exist",
          message: "Please run migrations first. Use POST /api/migrate to create tables.",
          needsMigration: true,
        },
        { status: 200 }
      );
    }
    
    // Only log actual errors (not expected table missing errors)
    const errorCode = error?.cause?.code || error?.code;
    const errorMessage = error?.cause?.message || error?.message || "Unknown error";
    console.error("Unexpected error seeding articles:", {
      code: errorCode,
      message: errorMessage,
    });
    
    return NextResponse.json(
      {
        error: "Failed to seed articles",
        details: errorMessage,
        code: errorCode,
      },
      { status: 500 }
    );
  }
}

