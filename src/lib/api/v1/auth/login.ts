import { ILoginPayload, ILoginResponse } from "@src/types/api/auth/login";
import { BASE_URL } from "@/lib/api/constants";

export const loginWithCredentials = async (
  credentials: ILoginPayload
): Promise<ILoginResponse> => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    body: JSON.stringify(credentials),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  return (await res.json()) as ILoginResponse;
};
