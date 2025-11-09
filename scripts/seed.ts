import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { articles } from "../src/db/schema";
import { seedArticles } from "../src/lib/seed-data";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL environment variable is not set");
  console.error("Please create a .env.local file with your DATABASE_URL");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seedDatabase() {
  console.log("Starting database seeding...");
  
  try {
    // Check if articles already exist
    const existingArticles = await db.select().from(articles).limit(1);
    
    if (existingArticles.length > 0) {
      console.log(`⚠️  Articles already exist (${existingArticles.length} found). Skipping seed.`);
      console.log("If you want to re-seed, please delete the articles first.");
      return;
    }

    // Insert seed articles
    console.log(`Inserting ${seedArticles.length} articles...`);
    await db.insert(articles).values(seedArticles);

    console.log(`✅ Successfully seeded ${seedArticles.length} articles!`);
    console.log("Articles created:");
    seedArticles.forEach((article, index) => {
      console.log(`  ${index + 1}. ${article.title}`);
    });
  } catch (error: any) {
    console.error("❌ Error seeding database:", error);
    console.error("Error details:", error.message);
    if (error.code === "42P01") {
      console.error("\n💡 Hint: Tables don't exist. Run 'pnpm db:migrate:run' first.");
    }
    process.exit(1);
  }
}

seedDatabase();

