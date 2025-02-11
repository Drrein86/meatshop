import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // ודא שהוספת NEXTAUTH_SECRET
  pages: {
    signIn: "/login", // הדף שלך להתחברות
  },
};
console.log(process.env.GOOGLE_CLIENT_ID);

export default NextAuth(authOptions);
