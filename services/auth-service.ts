import { LoginResult } from 'use-cases/login/signin.types';

import { FormDataLogin } from '@/app/signin/signin.types';
import { FormDataRegister } from '@/app/signup/signup.types';
import { api } from '@/lib/api/api';
import { UserInfo } from '@/store/types/auth.types';

const BASE_URL = '/auth';

export const authService = {
  register(payload: FormDataRegister): Promise<LoginResult> {
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

  async getMe(): Promise<UserInfo> {
    const response = await api.get(`${BASE_URL}/me`);
    return response.data;
  },
};
