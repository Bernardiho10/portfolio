import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Force dynamic rendering for migration route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to execute raw SQL string
// Neon serverless requires tagged template literals
// We construct a template literal from the SQL string
async function executeSQL(sqlClient: any, query: string) {
  // Escape backticks and $ in the SQL string to use in template literal
  const escapedQuery = query.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
  // Use Function constructor to safely create a template literal call
  const fn = new Function('sql', `return sql\`${escapedQuery}\`;`);
  return await fn(sqlClient);
}

export async function POST() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL environment variable is not set" },
        { status: 500 }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    // Create tables one by one to handle dependencies
    const migrations = [
      // Create users table
      `CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar(255),
        "email" varchar(255) NOT NULL UNIQUE,
        "email_verified" timestamp,
        "image" varchar(512),
        "provider" varchar(50),
        "created_at" timestamp NOT NULL DEFAULT now()
      )`,

      // Create accounts table
      `CREATE TABLE IF NOT EXISTS "accounts" (
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "type" varchar(255) NOT NULL,
        "provider" varchar(255) NOT NULL,
        "provider_account_id" varchar(255) NOT NULL,
        "refresh_token" text,
        "access_token" text,
        "expires_at" integer,
        "token_type" varchar(255),
        "scope" varchar(255),
        "id_token" text,
        "session_state" varchar(255),
        PRIMARY KEY ("provider", "provider_account_id")
      )`,

      // Create sessions table
      `CREATE TABLE IF NOT EXISTS "sessions" (
        "session_token" varchar(255) PRIMARY KEY NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "expires" timestamp NOT NULL
      )`,

      // Create verification_tokens table
      `CREATE TABLE IF NOT EXISTS "verification_tokens" (
        "identifier" varchar(255) NOT NULL,
        "token" varchar(255) NOT NULL,
        "expires" timestamp NOT NULL,
        PRIMARY KEY ("identifier", "token")
      )`,

      // Create articles table
      `CREATE TABLE IF NOT EXISTS "articles" (
        "id" serial PRIMARY KEY,
        "title" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "excerpt" text NOT NULL,
        "body" text NOT NULL,
        "hero_image" varchar(512),
        "publish_date" timestamp NOT NULL DEFAULT now(),
        "tags" text[],
        "views" integer NOT NULL DEFAULT 0,
        "reading_time" integer NOT NULL DEFAULT 0,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      )`,

      // Create indexes for articles
      `CREATE INDEX IF NOT EXISTS "slug_idx" ON "articles"("slug")`,
      `CREATE INDEX IF NOT EXISTS "publish_date_idx" ON "articles"("publish_date")`,

      // Create upvotes table
      `CREATE TABLE IF NOT EXISTS "upvotes" (
        "id" serial PRIMARY KEY,
        "article_id" integer NOT NULL REFERENCES "articles"("id") ON DELETE CASCADE,
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "created_at" timestamp NOT NULL DEFAULT now()
      )`,

      // Create index for upvotes
      `CREATE INDEX IF NOT EXISTS "unique_upvote_idx" ON "upvotes"("article_id", "user_id")`,

      // Create comments table
      `CREATE TABLE IF NOT EXISTS "comments" (
        "id" serial PRIMARY KEY,
        "article_id" integer NOT NULL REFERENCES "articles"("id") ON DELETE CASCADE,
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "body" text NOT NULL,
        "parent_id" integer REFERENCES "comments"("id"),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      )`,

      // Create indexes for comments
      `CREATE INDEX IF NOT EXISTS "article_comments_idx" ON "comments"("article_id")`,
      `CREATE INDEX IF NOT EXISTS "parent_comment_idx" ON "comments"("parent_id")`,

      // Create user_themes table
      `CREATE TABLE IF NOT EXISTS "user_themes" (
        "id" serial PRIMARY KEY,
        "user_id" uuid NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
        "theme_data" jsonb NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now()
      )`,
    ];

    // Execute migrations sequentially
    for (const migration of migrations) {
      // Execute raw SQL using query method
      await executeSQL(sql, migration);
    }

    return NextResponse.json(
      { message: "Database migration completed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error running migration:", error);
    return NextResponse.json(
      {
        error: "Failed to run migration",
        details: error.message || "Unknown error",
        code: error.code,
      },
      { status: 500 }
    );
  }
}

