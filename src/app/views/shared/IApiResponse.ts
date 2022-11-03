export interface IApiResponse<T> {
  result: T;
  message: string;
  isSuccess: boolean;
  errors?: string[],
}