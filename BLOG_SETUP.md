# Blog Setup Guide

This guide will help you set up the dynamic blog system for Bernard Ariku Oko's portfolio.

## Prerequisites

- Node.js 18+ and pnpm
- Neon DB account (PostgreSQL serverless)
- GitHub OAuth App
- Google OAuth App

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# OAuth Providers
GITHUB_ID=your-github-oauth-app-id
GITHUB_SECRET=your-github-oauth-app-secret

GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Site URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Database Setup

1. **Create Neon Database**
   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string to `DATABASE_URL`

2. **Run Migrations**
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

3. **Seed Articles**
   ```bash
   # Start the dev server first
   pnpm dev
   
   # In another terminal, seed the database
   curl -X POST http://localhost:3000/api/seed
   ```

## OAuth Setup

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

### Google OAuth

1. Go to Google Cloud Console
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Set Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

## Running the Development Server

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000/blog to see the blog.

## Features

### ✅ Implemented Features

- **Database Schema**: Complete schema with articles, users, upvotes, comments, and user themes
- **Authentication**: NextAuth.js v5 with GitHub and Google OAuth
- **Blog Index**: Infinite scroll feed with article cards
- **Full Post View**: Hero image, reading time, upvotes, comments
- **Upvote System**: Authenticated users can upvote articles
- **Comment System**: Threaded comments with nested replies
- **Related Posts**: Marquee component showing related articles
- **Custom Pointer**: Site-wide custom cursor with heart emoji for interactive elements
- **Theme Customization**: TweakCN-inspired theme customizer (basic implementation)
- **SEO**: OpenGraph meta tags and JSON-LD schema
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Mobile Responsive**: Fully responsive design

## Blog Articles

The seed data includes 8 journey-focused articles:

1. From Calabar Circuits to Code (2005)
2. Pedaling Code in Lagos (2010)
3. Scaling Data Dreams: PostgreSQL (2015)
4. Building Zanda-Like Systems (2018)
5. OCR and Beyond (2021)
6. Remote Freelance to Full SaaS (2022)
7. PostgreSQL & Next.js (2025)
8. AI Ethics in African Tech (2025)

## API Routes

- `GET /api/articles` - Get paginated articles
- `GET /api/articles/[slug]` - Get single article
- `POST /api/articles/[slug]/upvote` - Toggle upvote
- `GET /api/articles/[slug]/upvote` - Get upvote status
- `GET /api/articles/[slug]/comments` - Get comments
- `POST /api/articles/[slug]/comments` - Create comment
- `POST /api/seed` - Seed articles
- `GET /api/themes` - Get user theme
- `POST /api/themes` - Save user theme

## Database Schema

- `articles`: Blog posts with title, slug, body, tags, views, reading time
- `users`: NextAuth user accounts
- `upvotes`: Article upvotes (one per user per article)
- `comments`: Threaded comments with parent_id for replies
- `user_themes`: User theme preferences (JSONB)

## Customization

### Theme Customizer

The theme customizer is accessible via a floating button on blog post pages. Users can:
- Customize primary and secondary colors
- Export theme as CSS
- Save theme (requires authentication)

### Pointer System

The custom pointer system provides:
- Default blue pointer
- Heart emoji on hover for interactive elements
- Loading spinner for async operations
- Automatic fallback to standard cursor on mobile

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Migrations

Run migrations on deployment:
```bash
pnpm db:push
```

### Seed Production Database

After deployment, seed the production database:
```bash
curl -X POST https://your-domain.com/api/seed
```

## Troubleshooting

### Connection Timeout Error

The Next.js connection timeout error is normal during development and doesn't affect functionality. It's caused by Next.js checking for updates.

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Ensure Neon database is active
- Check SSL mode is set to `require`

### OAuth Issues

- Verify callback URLs match exactly
- Check OAuth app credentials
- Ensure redirect URIs are whitelisted

## Next Steps

1. Add more articles via API or admin panel
2. Implement rate limiting for comments
3. Add email notifications for new comments
4. Implement full TweakCN integration
5. Add analytics tracking
6. Implement search functionality
7. Add tag filtering
8. Implement RSS feed

## Support

For issues or questions, please open an issue on GitHub.

