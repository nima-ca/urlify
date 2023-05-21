export interface IApiError {
  error: {
    message: string | string[];
  } | null;
}

export interface ICoreResponse extends IApiError {
  success: boolean;
}
