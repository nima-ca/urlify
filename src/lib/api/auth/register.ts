import { authApi } from "@src/lib/utils/axios";
import {
  IRegisterPayload,
  IRegisterResponse,
} from "@src/types/api/auth/register";

export const registerWithCredentials = async (
  credentials: IRegisterPayload
): Promise<IRegisterResponse> => {
  const response = await authApi.post<IRegisterResponse>("/register", {
    ...credentials,
  });

  return response.data;
};
