import { IAuthTokenPayload } from "@src/types/api/api";
import * as jwt from "jsonwebtoken";
import { db } from "@/lib/db/db";

interface IAuthenticateUser {
  isAuthenticated: boolean;
  error?: string;
  payload?: IAuthTokenPayload;
}

export const authenticateUser = async (
  token: string | undefined
): Promise<IAuthenticateUser> => {
  // check if the token exists
  if (!token) return { isAuthenticated: false, error: "Invalid Token!" };

  // check if the token is valid
  let payload: IAuthTokenPayload | undefined = undefined;
  try {
    payload = jwt.verify(
      token as string,
      process.env.NEXTAUTH_SECRET as string
    ) as IAuthTokenPayload;
  } catch (error) {
    return { isAuthenticated: false, error: "Invalid Token!" };
  }

  // check if the user exists
  const user = await db.user.findFirst({ where: { id: payload.id } });
  if (!user) return { isAuthenticated: false, error: "Unauthenticated user!" };

  return {
    isAuthenticated: true,
    payload,
  };
};
