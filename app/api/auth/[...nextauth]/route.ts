import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Static admin user
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email || "";
        const password = credentials?.password || "";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          return {
            id: "admin-id",
            name: "Admin",
            email: ADMIN_EMAIL,
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id ?? "admin-id",
          email: user.email!,
          name: user.name!,
          role: user.role ?? "admin",
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as {
          id: string;
          role: string;
          name: string;
          email: string;
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
