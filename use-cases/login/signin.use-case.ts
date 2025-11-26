import { AxiosError } from 'axios';
import { authService } from 'services/auth-service';

import { FormDataLogin } from '@/app/signin/signin.types';
import { ERROR_MESSAGES } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';

import { LoginResult } from './signin.types';

export async function signInUseCase(
  payload: FormDataLogin,
): Promise<LoginResult> {
  try {
    const response = await authService.login(payload);

    const { accessToken, refreshToken, user } = response.data;

    await useAuthStore.getState().setTokens({
      access: accessToken,
      refresh: refreshToken,
    });

    if (user) {
      useAuthStore.getState().setUser(user);
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.message ||
      ERROR_MESSAGES[axiosError.code] ||
      'Erro ao fazer login. Por favor, tente novamente.';

    return {
      success: false,
      error: errorMessage,
    };
  }
}
