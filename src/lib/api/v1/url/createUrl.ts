import { apiRouteV1 } from "@src/lib/utils/axios";
import { ICreateUrlResponse } from "@src/types/api/v1/url/createUrl";

export const createUrl = async (
  userUrl: string
): Promise<ICreateUrlResponse> => {
  const res = await apiRouteV1.post<ICreateUrlResponse>("/url/createUrl", {
    userUrl,
  });
  return res.data;
};
