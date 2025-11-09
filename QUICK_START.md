# Quick Start Guide - Database Setup

## Step 1: Get Your Neon Database URL

1. Go to https://neon.tech
2. Sign in or create an account
3. Create a new project (or use an existing one)
4. Copy your connection string from the dashboard
   - It should look like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

## Step 2: Create .env.local File

Create a `.env.local` file in the root directory with:

```env
DATABASE_URL="your-neon-connection-string-here"

# Optional: For authentication
AUTH_SECRET="generate-with: openssl rand -base64 32"
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

## Step 3: Run Migration

### Option A: Using the setup script (Recommended)
```bash
pnpm db:setup
```

### Option B: Manual migration
```bash
pnpm db:migrate:run
```

## Step 4: Seed Articles

After migration completes successfully:

```bash
pnpm db:seed
```

Or visit `/blog` in your browser and click the "Seed Database" button.

## Step 5: Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000/blog` to see your articles!

## Troubleshooting

### Error: DATABASE_URL not set
- Make sure `.env.local` exists in the root directory
- Verify the file contains `DATABASE_URL="your-connection-string"`
- Restart your dev server after creating/modifying `.env.local`

### Error: Connection failed
- Verify your Neon database is active
- Check that the connection string is correct
- Ensure SSL mode is set to `require`

### Error: Tables already exist
- This is normal if you've run migration before
- You can still seed articles
- To reset, drop tables manually in Neon dashboard

## What Gets Created

The migration creates these tables:
- `users` - User accounts for authentication
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verification_tokens` - Email verification tokens
- `articles` - Blog articles
- `upvotes` - Article upvotes
- `comments` - Article comments (with threading support)
- `user_themes` - User theme customizations

## Next Steps

1. ✅ Database is set up
2. ✅ Articles are seeded
3. 🔄 Configure OAuth (optional) for user authentication
4. 🎨 Customize blog theme
5. 🚀 Deploy to Vercel

