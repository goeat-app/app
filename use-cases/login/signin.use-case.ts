import { authService } from 'services/auth-service';

import { FormDataLogin } from '@/app/signin/signin.types';
import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';

import { LoginResult } from './signin.types';

export async function signInUseCase(
  payload: FormDataLogin,
): Promise<LoginResult> {
  try {
    const response = await authService.login(payload);

    const { accessToken, refreshToken } = response.data;

    await useAuthStore.getState().setTokens({
      access: accessToken,
      refresh: refreshToken,
    });

    const userResponse = await authService.getMe();
    useAuthStore.getState().setUser(userResponse);

    return {
      success: true,
      data: response.data,
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
