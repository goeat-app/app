import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateUserProfileUseCase } from 'use-cases/profile/update-user-profile.use-case';

import { FormDataRegister } from '@/features/auth/signup.types';
import { getFirebaseAuth } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';

import { RegisterUserResult } from './register.types';

export async function registerUserUseCase(
  payload: FormDataRegister,
): Promise<RegisterUserResult> {
  try {
    await createUserWithEmailAndPassword(
      getFirebaseAuth(),
      payload.email,
      payload.password,
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
