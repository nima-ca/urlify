import NextAuth from "next-auth";
import { IAuthTokenPayload } from "./api/api";

declare module "next-auth" {
  interface Session extends IAuthTokenPayload {
    token: string;
  }
}
