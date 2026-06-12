import { useEffect, useState } from 'react';

import { User, onAuthStateChanged } from 'firebase/auth';

import { getFirebaseAuth } from '@/lib/auth/firebase-auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), firebaseUser => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAuthenticated, isLoading };
}
