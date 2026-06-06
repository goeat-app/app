import { authService } from 'services/auth-service';

import { signOutFromFirebase } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';
import { useRecomendationsStore } from '@/store/recommender-store';

import { LogoutResult } from './logout.types';

export async function logoutUseCase(): Promise<LogoutResult> {
  let backendError: unknown;

  try {
    await authService.logout();
  } catch (error) {
    backendError = error;
  }

  try {
    await signOutFromFirebase();
    await useAuthStore.getState().clearAuth();

    useRecomendationsStore.getState().setRestaurants([]);

    if (backendError) {
      return { success: true };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao fazer logout. Tente novamente.'),
    };
  }
}
