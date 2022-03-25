export interface ResponseSuccess<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  total: number;
}
