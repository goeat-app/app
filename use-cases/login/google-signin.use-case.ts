import { authService } from 'services/auth-service';

import { handleError } from '@/lib/utils/error-mapper';
import { signInWithGoogleCredential } from '@/lib/auth/google-signin';
import { useAuthStore } from '@/store/auth-store';

import { LoginResult } from './signin.types';

export async function googleSignInUseCase(): Promise<LoginResult> {
  try {
    const { accessToken, refreshToken } = await signInWithGoogleCredential();

    await useAuthStore.getState().setTokens({
      access: accessToken,
      refresh: refreshToken,
    });

    const userResponse = await authService.getMe();
    useAuthStore.getState().setUser(userResponse);

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
