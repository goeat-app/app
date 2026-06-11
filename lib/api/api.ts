import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

import { resolveApiBaseUrl } from '@/lib/api/resolve-api-base-url';
import { getFirebaseIdToken } from '@/lib/auth/firebase-auth';

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 10000,
});

const PUBLIC_ROUTES = ['/auth/login', '/auth/register', '/auth/refresh'];

api.interceptors.request.use(
  async config => {
    const firebaseToken = await getFirebaseIdToken();
    const token = firebaseToken || (await AsyncStorage.getItem('accessToken'));

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

    const isPublicRoute = PUBLIC_ROUTES.some(route =>
      originalRequest.url?.includes(route),
    );

    if (isPublicRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const firebaseToken = await getFirebaseIdToken(true);
        if (firebaseToken) {
          await AsyncStorage.setItem('accessToken', firebaseToken);
          originalRequest.headers.Authorization = `Bearer ${firebaseToken}`;
          return api(originalRequest);
        }

        router.replace('/signin/signin-view');
      } catch (refreshError) {
        router.replace('/signin/signin-view');

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
