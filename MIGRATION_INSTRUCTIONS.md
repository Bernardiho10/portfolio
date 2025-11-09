# Database Migration Instructions

## Step 1: Set Up Environment Variables

Create a `.env.local` file in the root directory with your Neon database URL:

```env
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### How to Get Your Neon Database URL:

1. Go to https://neon.tech and sign in
2. Create a new project (or use an existing one)
3. Copy the connection string from the dashboard
4. It should look like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

## Step 2: Run Migration

Once you have the DATABASE_URL set, run:

```bash
pnpm db:migrate:run
```

This will create all the necessary tables:
- users
- accounts
- sessions
- verification_tokens
- articles
- upvotes
- comments
- user_themes

## Step 3: Seed Articles

After migration, seed the database with articles:

```bash
pnpm db:seed
```

Or use the UI: Click the "Seed Database" button on the `/blog` page.

## Alternative: Use the UI

You can also use the web interface:

1. Visit `/blog` in your browser
2. Click the "Seed Database" button
3. It will automatically:
   - Detect if tables don't exist
   - Run migration
   - Seed articles
   - Reload the page

## Troubleshooting

### Error: DATABASE_URL not set
- Make sure `.env.local` exists in the root directory
- Check that the file contains `DATABASE_URL=...`
- Restart your dev server after creating/modifying `.env.local`

### Error: Connection failed
- Verify your Neon database is active
- Check that the connection string is correct
- Ensure SSL mode is set to `require`

### Error: Tables already exist
- This is normal if you've run migration before
- You can still seed articles even if tables exist
- To reset, drop tables manually in Neon dashboard or use SQL

## Next Steps

After migration and seeding:
1. Visit `/blog` to see your articles
2. Click on any article to view the full post
3. Sign in to upvote and comment
4. Customize themes using the theme button on blog posts

