import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';
import { useAuthStore, useLoadingStore, useToastStore } from '@/stores/index.stores';
import { APP_CODE, ToastType } from '@/constants/index.constants';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore();
    loadingStore.start();

    const authStore = useAuthStore();
    const token = authStore.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // TODO: Xử lý lỗi request (Lỗi mạng, Lỗi cấu hình)

    const loadingStore = useLoadingStore();
    loadingStore.stop();

    const toastStore = useToastStore();
    toastStore.show({
      title: 'Error',
      type: ToastType.Error,
      message: error,
    });

    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === APP_CODE.UNAUTHORIZED) {
      // TODO: Xử lý chuyển hướng đến màn login + Lỗi quyền 401
      const authStore = useAuthStore();
      authStore.logout();
    } else if (status === APP_CODE.FORBIDDEN) {
      // TODO: Xử lý lỗi quyền 403
    }

    const loadingStore = useLoadingStore();
    loadingStore.stop();

    const toastStore = useToastStore();
    toastStore.show({
      title: 'Error',
      type: ToastType.Error,
      message: error.message,
    });

    return Promise.reject(error);
  },
);
