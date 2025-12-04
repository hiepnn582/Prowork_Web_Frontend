import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('token'));

  const setAccessToken = (newAccessToken: string) => {
    accessToken.value = newAccessToken;
    localStorage.setItem('token', newAccessToken);
  };

  const logout = () => {
    accessToken.value = '';
    localStorage.removeItem('token');
  };

  return { accessToken, setAccessToken, logout };
});
