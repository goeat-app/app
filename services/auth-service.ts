import { api } from '@/lib/api/api';
import { FormDataRegister } from '@/app/signup/signup.types';

const BASE_URL = '/auth';

export const authService = {
  register(payload: FormDataRegister) {
    return api.post(`${BASE_URL}/register`, payload);
  },
};
