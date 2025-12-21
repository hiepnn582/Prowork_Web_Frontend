import { defineStore } from 'pinia';
import { ElLoading, type LoadingInstance } from 'element-plus';

export const useLoadingStore = defineStore('loading', () => {
  let loadingInstance: LoadingInstance;

  const start = () => {
    loadingInstance = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0.4)' });
  };

  const stop = () => {
    if (loadingInstance) {
      loadingInstance.close();
    }
  };

  return { start, stop };
});
