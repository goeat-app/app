import { authService } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';

import { LoginResult } from './signin.types';

export async function googleSignInUseCase(): Promise<LoginResult> {
  try {
    await authService.signInWithGoogle();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao entrar com Google. Por favor, tente novamente.',
      ),
    };
  }
}
