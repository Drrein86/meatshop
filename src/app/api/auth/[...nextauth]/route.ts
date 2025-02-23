import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User, Account, Profile } from "next-auth";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // עמוד התחברות מותאם אישית
  },
  callbacks: {
    // Callback for JWT
    async jwt({ token, user }: { token: any; user?: User }) {
      console.log('JWT Callback:', token, user);
      return token;
    },
    // Callback for Session
    async session({ session, token }: { session: any; token: any }) {
      console.log('Session Callback:', session, token);
      return session;
    },
    // Callback for SignIn
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User; // השתמש רק ב־User כאן
      account: Account | null;
      profile?: Profile; // Profile אופציונלי
    }) {
      console.log('Google Profile:', profile);
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
