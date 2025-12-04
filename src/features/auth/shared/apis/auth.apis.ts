import { apiClient } from '@/configs/index.configs';
import type { TRegisterPayload, TRegisterResponse } from '../../register/types/index.types';
import type { TServiceResponse } from '@/types/index.types';

export const AuthService = {
  async register(payload: TRegisterPayload): Promise<TServiceResponse<TRegisterResponse>> {
    return apiClient
      .post<TServiceResponse<TRegisterResponse>>('/auth/register', payload)
      .then((response) => response.data);
  },
};
