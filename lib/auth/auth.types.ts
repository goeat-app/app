import { User } from 'firebase/auth';

export type AuthResult = {
  user: User;
  idToken: string;
};

export type AuthService = {
  getCurrentUser(): User | null;
  getIdToken(): Promise<string | null>;

  signInWithGoogle(): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  signInWithEmailPassword(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  signUpWithEmailPassword(
    email: string,
    password: string,
    name: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;

  signOut(): Promise<void>;

  onAuthStateChanged(callback: (user: User | null) => void): () => void;
};
