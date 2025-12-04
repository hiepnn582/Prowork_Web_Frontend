import type { ToastType } from '@/constants/index.constants';

export type TToastOptions = {
  type: ToastType;
  message: string;
  title?: string;
};
