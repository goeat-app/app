import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { authService } from '@/lib/auth/firebase-auth';

import { googleSignInUseCase } from './google-signin.use-case';

jest.mock('@/lib/auth/firebase-auth', () => ({
  authService: {
    signInWithGoogle: jest.fn(),
  },
}));

const signInWithGoogleMock = jest.mocked(authService.signInWithGoogle);

describe('googleSignInUseCase', () => {
  beforeEach(() => {
    signInWithGoogleMock.mockReset();
  });

  it('returns success after Google authentication', async () => {
    signInWithGoogleMock.mockResolvedValue({
      idToken: 'token',
      user: {
        displayName: 'Go Eat',
        email: 'user@example.com',
        photoURL: null,
        uid: 'user-id',
      },
    });

    await expect(googleSignInUseCase()).resolves.toEqual({ success: true });
  });

  it('returns a user-facing error when Google authentication fails', async () => {
    signInWithGoogleMock.mockRejectedValue(new Error('cancelled'));

    await expect(googleSignInUseCase()).resolves.toEqual({
      success: false,
      error: 'Erro inesperado. Tente novamente.',
    });
  });
});
