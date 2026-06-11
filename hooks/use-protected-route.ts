import { useEffect } from 'react';

import { router } from 'expo-router';

import { useAuth } from './use-auth';

export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/signin/signin-view');
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated };
}
