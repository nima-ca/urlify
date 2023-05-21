import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db/db";
import { SignInWithCredentials } from "@/lib/api/auth/signIn";
import { ILoginPayload } from "@src/types/api/auth/login";
import { NextAuthOptions } from "next-auth";

const getProviderConfig = () => {
  const GithubClientId = process.env.GITHUB_ID;
  const GithubClientSecret = process.env.GITHUB_SECRET;
  const GoogleClientId = process.env.GOOGLE_ID;
  const GoogleClientSecret = process.env.GOOGLE_SECRET;

  if (typeof GithubClientId === "undefined" || GithubClientId === "") {
    throw new Error("Github ClientId is not provided in env file!");
  }

  if (typeof GithubClientSecret === "undefined" || GithubClientSecret === "") {
    throw new Error("Github Client Secret is not provided in env file!");
  }

  if (typeof GoogleClientId === "undefined" || GoogleClientId === "") {
    throw new Error("Google ClientId Secret is not provided in env file!");
  }

  if (typeof GoogleClientSecret === "undefined" || GoogleClientSecret === "") {
    throw new Error("Google Client Secret is not provided in env file!");
  }

  return {
    GithubClientId,
    GithubClientSecret,
    GoogleClientId,
    GoogleClientSecret,
  };
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GitHub({
      clientId: getProviderConfig().GithubClientId,
      clientSecret: getProviderConfig().GithubClientSecret,
    }),
    Google({
      clientId: getProviderConfig().GoogleClientId,
      clientSecret: getProviderConfig().GoogleClientSecret,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as ILoginPayload;

        const { success, user, token } = await SignInWithCredentials({
          email,
          password,
        });

        if (success === true && user !== undefined) {
          return { token, ...user };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};