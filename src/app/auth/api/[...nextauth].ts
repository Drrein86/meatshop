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
    async session({ session, token }: { session: any; token: any }) {
      try {
        // מבצע פעולות עם session ו-token
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return null; // במקרה של שגיאה מחזירים null או פעולה אחרת
      }
    },
  }
 
};

export default NextAuth(authOptions);
