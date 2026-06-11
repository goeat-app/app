import { api } from '@/lib/api/api';
import { UserInfo } from '@/store/types/auth.types';

const BASE_URL = '/auth';

export const authService = {
  async getMe(): Promise<UserInfo> {
    const response = await api.get(`${BASE_URL}/me`);
    return response.data;
  },
};
