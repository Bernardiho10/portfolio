import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { PointerProvider } from "@/components/magicui/pointer";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { personalInfo } from "@/data/personal-info";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bernardarikuoko.com.ng'),
  title: {
    default: `${personalInfo.name} - ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.tagline,
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: personalInfo.name,
    description: personalInfo.tagline,
    url: 'https://bernardarikuoko.com.ng',
    siteName: personalInfo.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: personalInfo.name,
    card: "summary_large_image",
    creator: personalInfo.twitter,
  },
  keywords: [
    'Bernard Ariku Oko',
    'Software Engineer Nigeria',
    'Database Architect',
    'Healthcare SaaS',
    'Next.js Developer',
    'PostgreSQL Expert',
    'Nigerian Tech',
    'Full Stack Developer'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased cursor-none",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionProvider>
            <PointerProvider>
          <Navbar />
            {children}
          <Footer />
              <Toaster />
            </PointerProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
