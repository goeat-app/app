import { FormDataLogin } from '@/app/signin/signin.types';
import { authService } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';

import { LoginResult } from './signin.types';

export async function signInUseCase(
  payload: FormDataLogin,
): Promise<LoginResult> {
  try {
    await authService.signInWithEmailPassword(payload.email, payload.password);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao fazer login. Por favor, tente novamente',
      ),
    };
  }
}
