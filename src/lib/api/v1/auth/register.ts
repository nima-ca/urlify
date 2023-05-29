import { BASE_URL } from "@/lib/api/constants";
import {
  IRegisterPayload,
  IRegisterResponse,
} from "@src/types/api/auth/register";

export const registerWithCredentials = async (
  credentials: IRegisterPayload
): Promise<IRegisterResponse> => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    body: JSON.stringify(credentials),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  return (await res.json()) as IRegisterResponse;
};
