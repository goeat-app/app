import { authService } from 'services/auth-service';

import { FormDataRegister } from '@/app/signup/signup.types';
import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';

import { RegisterUserResult } from './register.types';

export async function registerUserUseCase(
  payload: FormDataRegister,
): Promise<RegisterUserResult> {
  try {
    const response = await authService.register(payload);

    await useAuthStore.getState().setTokens({
      access: response.data.accessToken,
      refresh: response.data.refreshToken,
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
      error: handleError(error, 'Erro ao cadastrar usuário. Tente novamente.'),
    };
  }
}
