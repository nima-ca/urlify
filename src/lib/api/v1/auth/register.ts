import { apiRouteV1 } from "@src/lib/utils/axios";
import {
  IRegisterPayload,
  IRegisterResponse,
} from "@src/types/api/auth/register";

export const registerWithCredentials = async (
  credentials: IRegisterPayload
): Promise<IRegisterResponse> => {
  const response = await apiRouteV1.post<IRegisterResponse>("/auth/register", {
    ...credentials,
  });

  return response.data;
};
