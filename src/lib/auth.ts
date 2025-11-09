import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  trustHost: true, // Required for NextAuth v5 in Next.js app router
  callbacks: {
    async session({ session, user }) {
      // Safely add user ID to session if both session.user and user exist
      // In NextAuth v5 with database sessions, user should always exist when session exists
      // but we add a safety check to prevent undefined errors
      if (session?.user && user?.id) {
        (session.user as any).id = user.id;
      }
      // Always return the session object (it should always exist in the callback)
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Handle callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      // Default to base URL
      return baseUrl;
    },
  },
  session: {
    strategy: "database",
  },
});


