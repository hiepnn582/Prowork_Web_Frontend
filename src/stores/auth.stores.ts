import { ref } from 'vue';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';
import type { TUserModel } from '@/features/auth/register/types/index.types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<TUserModel>();
  const accessToken = ref(localStorage.getItem('token'));

  const setUser = (newUserData: TUserModel) => {
    user.value = cloneDeep(newUserData);
  };

  const setAccessToken = (newAccessToken: string) => {
    accessToken.value = newAccessToken;
    localStorage.setItem('token', newAccessToken);
  };

  const logout = () => {
    accessToken.value = '';
    user.value = undefined;
    localStorage.removeItem('token');
  };

  return { user, accessToken, setUser, setAccessToken, logout };
});
