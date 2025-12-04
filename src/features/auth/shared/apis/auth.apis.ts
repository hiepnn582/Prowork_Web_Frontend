import { apiClient } from '@/configs/index.configs';
import type { TRegisterPayload } from '../../register/types/index.types';
import type { TServiceResponse } from '@/types/index.types';

export const AuthService = {
  async register(payload: TRegisterPayload): Promise<TServiceResponse<string>> {
    return apiClient
      .post<TServiceResponse<string>>('/register', payload)
      .then((response) => response.data);
  },
};
