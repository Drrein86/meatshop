import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

export const authOptions = {
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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl; // מונע הפניות לא תקינות
    },
    async session({ session, token }: { session: Session; token: any }) {
      return session; // מונע בעיות עם הנתונים שמוחזרים
    },
  },
};

export default NextAuth(authOptions);
