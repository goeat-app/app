import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';

export function useProtectedRoute() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin/signin-view');
    }
  }, [isAuthenticated]);

  return { isAuthenticated };
}
