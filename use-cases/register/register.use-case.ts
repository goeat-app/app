import { FormDataRegister } from '@/app/signup/signup.types';
import { authService } from 'services/auth-service';
import { RegisterUserResult } from './register.types';
import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from '@/lib/utils/error-mapper';

export async function registerUserUseCase(
  payload: FormDataRegister,
): Promise<RegisterUserResult> {
  try {
    const response = await authService.register(payload);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      error?: string;
    }>;

    const backendMessage =
      axiosError.response?.data?.message || axiosError.response?.data?.error;

    if (backendMessage && ERROR_MESSAGES[backendMessage]) {
      return {
        success: false,
        error: ERROR_MESSAGES[backendMessage],
      };
    }

    return {
      success: false,
      error: backendMessage || 'Erro ao cadastrar usuário. Tente novamente.',
    };
  }
}
