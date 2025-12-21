import type { APP_CODE } from '@/constants/index.constants';

export type TServiceResponse<T> = {
  code: APP_CODE;
  data: T;
  message?: string;
};

export type TErrorResponse = {
  [key: string]: string;
};
