import { signInWithEmailAndPassword } from 'firebase/auth';

import { FormDataLogin } from '@/app/signin/signin.types';
import { getFirebaseAuth } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';

import { LoginResult } from './signin.types';

export async function signInUseCase(
  payload: FormDataLogin,
): Promise<LoginResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getFirebaseAuth(),
      payload.email,
      payload.password,
    );

    const accessToken = await userCredential.user.getIdToken(true);
    const refreshToken = userCredential.user.refreshToken;

    return {
      success: true,
      data: { accessToken, refreshToken },
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
