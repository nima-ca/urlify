import { apiRouteV1 } from "@src/lib/utils/axios";
import { IGetUrlResponse } from "@src/types/api/v1/url/getUrl";

export const getUrl = async (link: string): Promise<IGetUrlResponse> => {
  const res = await apiRouteV1.get<IGetUrlResponse>("/url/getUrl", {
    params: { link },
  });
  return res.data;
};
