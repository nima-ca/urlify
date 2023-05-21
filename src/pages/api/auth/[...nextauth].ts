import { authOptions } from "@/lib/api/authOptions";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions);
