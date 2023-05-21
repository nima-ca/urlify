import { User } from "@prisma/client";

export interface IApiError {
  error: {
    message: string | string[];
  } | null;
}

export interface ICoreResponse extends IApiError {
  success: boolean;
}

export interface IAuthTokenPayload
  extends Pick<User, "email" | "id" | "image" | "name"> {}
