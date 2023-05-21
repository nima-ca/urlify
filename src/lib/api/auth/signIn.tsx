import { authApi } from "@src/lib/utils/axios";
import { ILoginPayload, ILoginResponse } from "@src/types/api/auth/login";

export const SignInWithCredentials = async (
  credentials: ILoginPayload
): Promise<ILoginResponse> => {
  const response = await authApi.post<ILoginResponse>("/login", {
    ...credentials,
  });

  return response.data;
};
