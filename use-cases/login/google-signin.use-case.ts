import { signInWithGoogleCredential } from '@/lib/auth/google-signin';
import { handleError } from '@/lib/utils/error-mapper';

import { LoginResult } from './signin.types';

export async function googleSignInUseCase(): Promise<LoginResult> {
  try {
    const { accessToken, refreshToken } = await signInWithGoogleCredential();

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao autenticar com Google. Tente novamente.',
      ),
    };
  }
}
