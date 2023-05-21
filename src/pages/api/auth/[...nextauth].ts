import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db/db";

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

export default NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});
