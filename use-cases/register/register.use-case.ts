import { updateUserProfileUseCase } from 'use-cases/profile/update-user-profile.use-case';

import { FormDataRegister } from '@/app/signup/signup.types';
import { authService } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';

import { RegisterUserResult } from './register.types';

export async function registerUserUseCase(
  payload: FormDataRegister,
): Promise<RegisterUserResult> {
  try {
    await authService.signUpWithEmailPassword(
      payload.email,
      payload.password,
      payload.name,
    );

    // Update user profile with name and phone after successful Firebase registration
    const profileUpdateResult = await updateUserProfileUseCase({
      name: payload.name,
      phone: payload.phone,
    });

    if (!profileUpdateResult.success) {
      // Log the error but don't fail the registration
      console.warn('Failed to update user profile:', profileUpdateResult.error);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao cadastrar usuário. Tente novamente.'),
    };
  }
}
