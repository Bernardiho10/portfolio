# Bernard Ariku Oko - Professional Portfolio

A modern, high-performance portfolio website built and designed by Bernard Ariku Oko, showcasing 7+ years of software engineering experience. Built with Next.js 14, TypeScript, GSAP animations, and Tailwind CSS.

## 🚀 Features

- **Immersive Journey Timeline**: GSAP-powered ScrollTrigger animations depicting career progression from bicycle 🚴 to plane ✈️
- **Advanced Animations**: Smooth GSAP transitions, parallax effects, and interactive hover states
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Fully Responsive**: Mobile-first design optimized for all screen sizes
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and Twitter Card support
- **Performance**: Optimized for Core Web Vitals with lazy loading and code splitting
- **Type-Safe**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Icons**: Lucide React
- **Theme**: next-themes
- **Package Manager**: pnpm

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation with theme toggle
│   │   └── Footer.tsx      # Footer with certifications
│   └── sections/
│       ├── Hero.tsx        # Hero section with GSAP animations
│       ├── JourneyTimeline.tsx  # Career journey timeline
│       ├── Skills.tsx      # Skills grid with categories
│       ├── Projects.tsx    # Featured projects showcase
│       ├── Experience.tsx  # Work experience & achievements
│       └── Contact.tsx     # Contact form & social links
├── data/
│   ├── personal-info.ts    # Personal details & education
│   ├── journey.ts          # Career journey stages
│   ├── skills.ts           # Technical skills by category
│   ├── projects.ts         # Portfolio projects
│   └── experience.ts       # Work history & certifications
└── types/
    └── portfolio.ts        # TypeScript interfaces

```

## 🎨 Key Sections

### 1. Hero Section
- Animated introduction with profile image
- Gradient text effects
- Social media links
- Call-to-action buttons

### 2. Journey Timeline
- Interactive career progression visualization
- Vehicle metaphors (bicycle → car → Tesla → plane)
- ScrollTrigger-based animations
- SVG path drawing effects

### 3. Skills
- Categorized skill display (Frontend, Backend, Database, DevOps, AI/ML)
- Proficiency indicators (1-5 stars)
- Animated skill cards on scroll
- Statistics dashboard

### 4. Projects
- Featured project showcase
- Filter by category
- Technology tags
- Live demo & GitHub links
- Pricing information for SaaS projects

### 5. Experience
- Timeline of work history
- Hackathon wins & awards
- Open-source contributions
- Technology stack per role

### 6. Contact
- Contact form with validation
- Multiple contact methods
- Social media integration
- Calendly scheduling link

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

   ```bash
# Clone the repository
git clone https://github.com/Bernardiho10/portfolio.git
   cd portfolio

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the portfolio.

### Build for Production

   ```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## 🎯 Customization

### Update Personal Information

Edit `src/data/personal-info.ts`:
```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  tagline: 'Your Tagline',
  // ... other fields
};
```

### Add Projects

Edit `src/data/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 'project-id',
    title: 'Project Title',
    description: 'Description',
    technologies: ['Next.js', 'TypeScript'],
    // ... other fields
  }
];
```

### Modify Journey Stages

Edit `src/data/journey.ts` to customize your career timeline.

## 🎨 Animations

This portfolio uses GSAP for advanced animations:

- **Hero**: Fade-in sequence with stagger effects
- **Journey Timeline**: ScrollTrigger-based reveals and SVG path drawing
- **Skills**: Staggered card animations with scale transforms
- **Projects**: 3D rotation effects on scroll
- **Experience**: Slide-in animations with opacity transitions

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All sections are fully responsive with mobile-first approach.

## 🔧 Performance Optimization

- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- CSS purging with Tailwind
- Lazy loading for below-the-fold content
- Minimal JavaScript bundle size

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Bernard Ariku Oko**
- Portfolio: [bernardarikuoko.com.ng](https://bernardarikuoko.com.ng)
- Twitter: [@Bernard_iho](https://x.com/Bernard_iho)
- LinkedIn: [bernardiho10](https://www.linkedin.com/in/bernardiho10/)
- GitHub: [@Bernardiho10](https://github.com/Bernardiho10)
- Email: [bernardarikuoko@gmail.com](mailto:bernardarikuoko@gmail.com)

## 🛠️ Built With

This portfolio website was designed and developed by Bernard Ariku Oko using:
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [GSAP](https://greensock.com/gsap/) - Animations
- [Lucide](https://lucide.dev/) - Icons

---

**Building Scalable Futures: From Code to Care in Nigeria's Tech Ecosystem** 🇳🇬
