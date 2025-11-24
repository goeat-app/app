import { api } from '@/lib/api/api';
import { FormDataRegister } from '@/app/signup/signup.types';
import { FormDataLogin } from '@/app/signin/signin.types';

const BASE_URL = '/auth';

export const authService = {
  register(payload: FormDataRegister) {
    return api.post(`${BASE_URL}/register`, payload);
  },

  login(payload: FormDataLogin) {
    return api.post(`${BASE_URL}/login`, payload);
  },

  logout() {
    return api.post(`${BASE_URL}/logout`);
  },

  refreshToken(refreshToken: string) {
    return api.post(`${BASE_URL}/refresh`, { refreshToken });
  },
};
