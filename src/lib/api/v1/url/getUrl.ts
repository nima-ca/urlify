import { IGetUrlResponse } from "@src/types/api/v1/url/getUrl";
import { BASE_URL } from "@/lib/api/constants";

export const getUrl = async (link: string): Promise<IGetUrlResponse> => {
  const res = await fetch(
    `${BASE_URL}/api/v1/url/getUrl?` + new URLSearchParams({ link }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  return (await res.json()) as IGetUrlResponse;
};
