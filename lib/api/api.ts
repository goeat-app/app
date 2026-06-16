import axios from 'axios';
import { router } from 'expo-router';

import { resolveApiBaseUrl } from '@/lib/api/resolve-api-base-url';
import {
  getFirebaseIdToken,
  signOutFromFirebase,
  waitForAuthReady,
} from '@/lib/auth/firebase-auth';

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 10000,
});

let authReady: Promise<void> | null = null;

api.interceptors.request.use(
  async config => {
    if (!authReady) {
      authReady = waitForAuthReady();
    }
    await authReady;

    const token = await getFirebaseIdToken();

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
        const token = await getFirebaseIdToken(true);

        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          const retryResponse = await api(originalRequest);
          return retryResponse;
        }
      } catch {
        //token refresh failed
      }

      await signOutFromFirebase();
      router.replace('/signin/signin-view');
    }

    return Promise.reject(error);
  },
);
