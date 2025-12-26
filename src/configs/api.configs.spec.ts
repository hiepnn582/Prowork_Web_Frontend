import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { AxiosError, AxiosResponse } from 'axios';
import { APP_CODE, ToastType } from '@/constants/index.constants';

type RequestConfig = {
  headers: Record<string, string>;
};

const interceptorStorage = vi.hoisted(() => ({
  requestFulfilled: undefined as ((config: RequestConfig) => RequestConfig) | undefined,
  requestRejected: undefined as ((error: Error) => Promise<never>) | undefined,
  responseFulfilled: undefined as ((response: AxiosResponse) => AxiosResponse) | undefined,
  responseRejected: undefined as ((error: AxiosError) => Promise<never>) | undefined,
}));

const mockAxiosCreate = vi.hoisted(() => vi.fn());

vi.mock('axios', () => {
  const mockAxiosInstance = {
    interceptors: {
      request: {
        use: vi.fn((fulfilled, rejected) => {
          interceptorStorage.requestFulfilled = fulfilled;
          interceptorStorage.requestRejected = rejected;
        }),
      },
      response: {
        use: vi.fn((fulfilled, rejected) => {
          interceptorStorage.responseFulfilled = fulfilled;
          interceptorStorage.responseRejected = rejected;
        }),
      },
    },
  };

  mockAxiosCreate.mockReturnValue(mockAxiosInstance);

  return {
    default: {
      create: mockAxiosCreate,
    },
    AxiosError: class AxiosError extends Error {
      response?: { status?: number };
    },
  };
});

const mockUseAuthStore = vi.hoisted(() => vi.fn());
const mockUseLoadingStore = vi.hoisted(() => vi.fn());
const mockUseToastStore = vi.hoisted(() => vi.fn());

vi.mock('@/stores/index.stores', () => ({
  useAuthStore: () => mockUseAuthStore(),
  useLoadingStore: () => mockUseLoadingStore(),
  useToastStore: () => mockUseToastStore(),
}));

import './api.configs';

const ERROR_INTERCEPTOR_NOT_SET_UP = 'interceptor not set up';

describe('api.configs.ts', () => {
  const mockLoadingStore = {
    start: vi.fn(),
    stop: vi.fn(),
  };

  const mockAuthStore = {
    accessToken: 'test-token',
    logout: vi.fn(),
  };

  const mockToastStore = {
    show: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLoadingStore.mockReturnValue(mockLoadingStore);
    mockUseAuthStore.mockReturnValue(mockAuthStore);
    mockUseToastStore.mockReturnValue(mockToastStore);
  });

  describe('apiClient configuration', () => {
    it('should set up interceptors correctly', () => {
      expect(interceptorStorage.requestFulfilled).toBeDefined();
      expect(interceptorStorage.requestRejected).toBeDefined();
      expect(interceptorStorage.responseFulfilled).toBeDefined();
      expect(interceptorStorage.responseRejected).toBeDefined();
    });
  });

  describe('request interceptor', () => {
    it('should start loading and add Authorization header when token exists', () => {
      if (!interceptorStorage.requestFulfilled) {
        throw new Error(`Request ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const config = {
        headers: {} as Record<string, string>,
      };

      const result = interceptorStorage.requestFulfilled(config);

      expect(mockLoadingStore.start).toHaveBeenCalled();
      expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    it('should start loading but not add Authorization header when token does not exist', () => {
      if (!interceptorStorage.requestFulfilled) {
        throw new Error(`Request ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const authStoreWithoutToken = {
        accessToken: null,
        logout: vi.fn(),
      };
      mockUseAuthStore.mockReturnValueOnce(authStoreWithoutToken);

      const config = {
        headers: {} as Record<string, string>,
      };

      const result = interceptorStorage.requestFulfilled(config);

      expect(mockLoadingStore.start).toHaveBeenCalled();
      expect(result.headers.Authorization).toBeUndefined();
    });

    it('should handle request error', async () => {
      if (!interceptorStorage.requestRejected) {
        throw new Error(`Request error ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const error = new Error('Request error');

      try {
        await interceptorStorage.requestRejected(error);
      } catch (rejectedError) {
        expect(rejectedError).toBe(error);
      }

      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(mockToastStore.show).toHaveBeenCalledWith({
        title: 'Error',
        type: ToastType.Error,
        message: error,
      });
    });
  });

  describe('response interceptor', () => {
    it('should stop loading on successful response', () => {
      if (!interceptorStorage.responseFulfilled) {
        throw new Error(`Response ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const response: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      };

      const result = interceptorStorage.responseFulfilled(response);

      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(result).toBe(response);
    });

    it('should handle 401 unauthorized error', async () => {
      if (!interceptorStorage.responseRejected) {
        throw new Error(`Response error ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const error = {
        response: {
          status: APP_CODE.UNAUTHORIZED,
        },
        message: 'Unauthorized',
      } as AxiosError;

      try {
        await interceptorStorage.responseRejected(error);
      } catch (rejectedError) {
        expect(rejectedError).toBe(error);
      }

      expect(mockAuthStore.logout).toHaveBeenCalled();
      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(mockToastStore.show).toHaveBeenCalledWith({
        title: 'Error',
        type: ToastType.Error,
        message: error.message,
      });
    });

    it('should handle 403 forbidden error', async () => {
      if (!interceptorStorage.responseRejected) {
        throw new Error(`Response error ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const error = {
        response: {
          status: APP_CODE.FORBIDDEN,
        },
        message: 'Forbidden',
      } as AxiosError;

      try {
        await interceptorStorage.responseRejected(error);
      } catch (rejectedError) {
        expect(rejectedError).toBe(error);
      }

      expect(mockAuthStore.logout).not.toHaveBeenCalled();
      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(mockToastStore.show).toHaveBeenCalledWith({
        title: 'Error',
        type: ToastType.Error,
        message: error.message,
      });
    });

    it('should handle 409 conflict error without showing toast', async () => {
      if (!interceptorStorage.responseRejected) {
        throw new Error(`Response error ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const error = {
        response: {
          status: APP_CODE.CONFLICT,
        },
        message: 'Conflict',
      } as AxiosError;

      try {
        await interceptorStorage.responseRejected(error);
      } catch (rejectedError) {
        expect(rejectedError).toBe(error);
      }

      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(mockToastStore.show).not.toHaveBeenCalled();
    });

    it('should handle other error status codes', async () => {
      if (!interceptorStorage.responseRejected) {
        throw new Error(`Response error ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const error = {
        response: {
          status: APP_CODE.INTERNAL_SERVER_ERROR,
        },
        message: 'Internal Server Error',
      } as AxiosError;

      try {
        await interceptorStorage.responseRejected(error);
      } catch (rejectedError) {
        expect(rejectedError).toBe(error);
      }

      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(mockToastStore.show).toHaveBeenCalledWith({
        title: 'Error',
        type: ToastType.Error,
        message: error.message,
      });
    });

    it('should handle error without response', async () => {
      if (!interceptorStorage.responseRejected) {
        throw new Error(`Response error ${ERROR_INTERCEPTOR_NOT_SET_UP}`);
      }

      const error = {
        message: 'Network Error',
      } as AxiosError;

      try {
        await interceptorStorage.responseRejected(error);
      } catch (rejectedError) {
        expect(rejectedError).toBe(error);
      }

      expect(mockLoadingStore.stop).toHaveBeenCalled();
      expect(mockToastStore.show).toHaveBeenCalledWith({
        title: 'Error',
        type: ToastType.Error,
        message: error.message,
      });
    });
  });
});
