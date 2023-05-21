import { IAuthTokenPayload, ICoreResponse } from "@src/types/api/api";

export interface ILoginPayload {
  password: string;
  email: string;
}

export interface ILoginResponse extends ICoreResponse {
  token?: string;
  user?: IAuthTokenPayload;
}
