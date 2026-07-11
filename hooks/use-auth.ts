import { useEffect, useState } from 'react';

import { AppUser } from '@/lib/auth/auth.types';
import { authService } from '@/lib/auth/firebase-auth';

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAuthenticated, isLoading };
}
