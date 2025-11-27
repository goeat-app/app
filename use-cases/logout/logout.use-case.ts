import { authService } from 'services/auth-service';

import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';

import { LogoutResult } from './logout.types';

export async function logoutUseCase(): Promise<LogoutResult> {
  try {
    await authService.logout();

    await useAuthStore.getState().clearAuth();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao fazer logout. Tente novamente.'),
    };
  }
}
