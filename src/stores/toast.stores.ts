import { defineStore } from 'pinia';
import { ElNotification } from 'element-plus';
import type { TToastOptions } from '@/types/index.types';
import { ToastType } from '@/constants/index.constants';

export const useToastStore = defineStore('toast', () => {
  interface IDefaultTitleMapper {
    [key: string]: string;
  }

  const defaultTitleMapper: IDefaultTitleMapper = {
    [ToastType.Error]: 'Error',
    [ToastType.Info]: 'Info',
    [ToastType.Primary]: 'Primary',
    [ToastType.Success]: 'Success',
    [ToastType.Warning]: 'Warning',
  };

  const show = (toastOptions: TToastOptions, useHTMLString: boolean = false) => {
    ElNotification({
      ...toastOptions,
      title: toastOptions.title || defaultTitleMapper[toastOptions.type],
      dangerouslyUseHTMLString: useHTMLString,
    });
  };

  return { show };
});
