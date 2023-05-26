import { apiRouteV1 } from "@src/lib/utils/axios";
import { ILoginPayload, ILoginResponse } from "@src/types/api/auth/login";

export const loginWithCredentials = async (
  credentials: ILoginPayload
): Promise<ILoginResponse> => {
  const response = await apiRouteV1.post<ILoginResponse>("/auth/login", {
    ...credentials,
  });

  return response.data;
};
