import axios from 'axios';
import { router } from 'expo-router';

import { resolveApiBaseUrl } from '@/lib/api/resolve-api-base-url';
import { authService } from '@/lib/auth/firebase-auth';

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    const token = await authService.getIdToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await authService.getIdToken();

        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          const retryResponse = await api(originalRequest);
          return retryResponse;
        }
      } catch {
        //token refresh failed
      }

      await authService.signOut();
      router.replace('/signin/signin-view');
    }

    return Promise.reject(error);
  },
);
