"use client";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

interface ExtendedUser extends User {
  id: string;
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
    async signIn({
      user,
      account,
      profile,
    }: {
      user: ExtendedUser;
      account: any;
      profile?: any;
    }): Promise<boolean> {
      console.log("🔎 [SIGN IN CALLBACK]", user, account, profile);
      return true;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: JWT;
    }): Promise<any> {
      console.log("🔎 [SESSION CALLBACK]", session, token);
      
      if (session.user) {
        session.user.id = token.sub ?? ""; 
      }
      return session;
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: ExtendedUser;
    }): Promise<JWT> {
      console.log("🔎 [JWT CALLBACK]", token, user);
      if (user) {
        token.sub = user.id; 
      }
      return token;
    },
  },
};

export default authOptions;
