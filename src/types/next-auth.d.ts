import NextAuth from "next-auth";
import { IAuthTokenPayload } from "./api/api";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token?: string;
    image: string | null;
    email: string | null;
    name: string | null;
    provider: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: IAuthTokenPayload & {
      provider: string;
      token?: string;
    };
  }
}
