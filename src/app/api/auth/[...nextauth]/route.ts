import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/loginn", // עמוד התחברות מותאם אישית
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      console.log("Session:", session);
      console.log("Token:", token);
  
      // דוגמה להוספת מידע נוסף ל-session
      session.user.id = token.id || session.user.id;
      return session;
    },
  }
  
  

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
