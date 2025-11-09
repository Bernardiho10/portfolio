# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Bernard Ariku Oko Portfolio"
git branch -M main
git remote add origin https://github.com/Bernardiho10/portfolio.git
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

3. **Add Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add `bernardarikuoko.com.ng`
   - Follow DNS configuration instructions

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Netlify

1. **Build the project**
```bash
pnpm build
```

2. **Deploy via Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

3. **Or use Netlify UI**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Configure build settings:
     - Build command: `pnpm build`
     - Publish directory: `.next`

## Environment Variables

No environment variables required for the current build. If you add features like:
- Contact form backend
- Analytics
- CMS integration

Add them in your deployment platform's environment variables section.

## Performance Optimization Checklist

- ✅ Images optimized (using Next.js Image component)
- ✅ Code splitting enabled (Next.js default)
- ✅ CSS purged (Tailwind default)
- ✅ Animations optimized (GSAP with ScrollTrigger)
- ✅ Lazy loading implemented
- ✅ SEO meta tags added

## Post-Deployment Steps

1. **Test on Multiple Devices**
   - Mobile (iOS/Android)
   - Tablet
   - Desktop (Chrome, Firefox, Safari, Edge)

2. **Verify Animations**
   - Scroll through all sections
   - Test Dock navigation
   - Check theme toggle

3. **SEO Verification**
   - Use Google PageSpeed Insights
   - Check meta tags with Facebook Debugger
   - Verify Twitter Card preview

4. **Analytics Setup** (Optional)
   ```bash
   pnpm add @vercel/analytics
   ```
   Add to `layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   // In return statement
   <Analytics />
   ```

5. **Setup Custom Domain**
   - Point DNS to Vercel/Netlify
   - Enable HTTPS (automatic on Vercel)
   - Add www redirect

## Monitoring

### Vercel Analytics (Free)
- Automatically enabled on Vercel
- View in Vercel dashboard

### Google Analytics (Optional)
```bash
pnpm add @next/third-parties
```

Add to `layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

## Troubleshooting

### Build Errors

**Issue**: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

**Issue**: GSAP not working
- Ensure `gsap` is installed: `pnpm add gsap`
- Check imports in component files

**Issue**: Framer Motion errors
- Ensure `framer-motion` is installed: `pnpm add framer-motion`
- Check Dock component imports

### Runtime Errors

**Issue**: Hydration errors
- Check for client-side only code
- Ensure `'use client'` directive is present in interactive components

**Issue**: Theme not persisting
- Check `next-themes` configuration in `layout.tsx`
- Verify `suppressHydrationWarning` on `<html>` tag

## Continuous Deployment

### Vercel (Automatic)
- Every push to `main` branch triggers deployment
- Pull requests get preview deployments

### GitHub Actions (Manual Setup)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

## Backup & Version Control

```bash
# Create backup branch
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)

# Tag releases
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

## Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## Security

- ✅ HTTPS enabled (automatic on Vercel)
- ✅ No sensitive data in client code
- ✅ Dependencies regularly updated
- ✅ No exposed API keys

## Support & Maintenance

### Regular Updates
```bash
# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated

# Update specific package
pnpm update gsap
```

### Content Updates
- Edit files in `src/data/` directory
- Commit and push to trigger redeployment

---

**Need Help?**  
Contact: bernardarikuoko@gmail.com  
GitHub: @Bernardiho10



