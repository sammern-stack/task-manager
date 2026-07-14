import type { AxiosError, AxiosResponse } from "axios";

type SuccessResponse<D> = {
  ok: true;
  message: string;
  data: D;
  meta?: Record<string, unknown>;
};

type BaseRequest<D, P = void> = (
  params?: P,
) => Promise<AxiosResponse<SuccessResponse<D>>>;

export const requestHandler =
  <D, P = void>(request: BaseRequest<D, P>) =>
  async (params?: P): Promise<SuccessResponse<D>> => {
    try {
      const res = await request(params);
      return res.data;
    } catch (err) {
      throw (err as AxiosError).response?.data;
    }
  };
