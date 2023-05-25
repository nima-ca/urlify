import { ICoreResponse } from "@src/types/api/api";

export interface IGetUrlResponse extends ICoreResponse {
  userUrl?: string;
}
