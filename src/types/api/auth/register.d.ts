import { ICoreResponse } from "@src/types/api/api";
import { ILoginPayload } from "@src/types/api/auth/login";

export interface IRegisterPayload extends ILoginPayload {
  name: string;
  confirmPassword: string;
}
export interface IRegisterResponse extends ICoreResponse {}
