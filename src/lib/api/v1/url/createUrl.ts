import { BASE_URL } from "@/lib/api/constants";
import { ICreateUrlResponse } from "@src/types/api/v1/url/createUrl";

export const createUrl = async (
  userUrl: string
): Promise<ICreateUrlResponse> => {
  const res = await fetch(`${BASE_URL}/api/v1/url/createUrl`, {
    body: JSON.stringify({ userUrl }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  return (await res.json()) as ICreateUrlResponse;
};
