import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// "מוחקים" את המאפיין 'id' מהטיפוס User ומוסיפים אותו מחדש כאופציונלי
interface CustomUser extends Omit<User, 'id'> {
  id?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any): Promise<boolean> {
      console.log("🔎 [SIGN IN CALLBACK]", user, account, profile);
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      console.log("🔎 [SESSION CALLBACK]", session, token);
      if (session.user) {
        // המרה לטיפוס CustomUser כדי להוסיף את id כמאפיין אופציונלי
        (session.user as CustomUser).id = token.sub ?? "";
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: CustomUser }): Promise<JWT> {
      console.log("🔎 [JWT CALLBACK]", token, user);
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
