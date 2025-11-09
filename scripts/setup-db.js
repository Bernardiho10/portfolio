#!/usr/bin/env node

/**
 * Database Setup Helper Script
 * 
 * This script helps you set up your database connection and run migrations.
 * 
 * Usage:
 *   1. Get your Neon database URL from https://neon.tech
 *   2. Add it to .env.local as DATABASE_URL
 *   3. Run: node scripts/setup-db.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Database Setup Helper\n');

const envLocalPath = path.join(process.cwd(), '.env.local');

// Check if .env.local exists
if (!fs.existsSync(envLocalPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Creating template .env.local file...\n');
  
  const template = `# Database Configuration
# Get your DATABASE_URL from https://neon.tech
# Format: postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
DATABASE_URL=""

# NextAuth Configuration
# Generate a random secret: openssl rand -base64 32
AUTH_SECRET=""

# GitHub OAuth (Optional - for blog authentication)
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Google OAuth (Optional - for blog authentication)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
`;
  
  fs.writeFileSync(envLocalPath, template);
  console.log('✅ Created .env.local template');
  console.log('📝 Please fill in your DATABASE_URL and other values\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync(envLocalPath, 'utf-8');
const hasDatabaseUrl = envContent.includes('DATABASE_URL="') && 
  !envContent.match(/DATABASE_URL=""/);

if (!hasDatabaseUrl) {
  console.log('❌ DATABASE_URL is not set in .env.local');
  console.log('\n📋 Next steps:');
  console.log('   1. Go to https://neon.tech and create a new project');
  console.log('   2. Copy your connection string');
  console.log('   3. Add it to .env.local as: DATABASE_URL="your-connection-string"');
  console.log('   4. Run this script again\n');
  process.exit(1);
}

console.log('✅ DATABASE_URL found in .env.local');
console.log('🔄 Running database migration...\n');

try {
  // Run migration
  execSync('npx tsx scripts/migrate.ts', { stdio: 'inherit' });
  
  console.log('\n✅ Migration completed!');
  console.log('🌱 Next: Run the seed script to add initial articles:');
  console.log('   pnpm db:seed\n');
} catch (error) {
  console.error('\n❌ Migration failed. Please check the error above.');
  process.exit(1);
}

