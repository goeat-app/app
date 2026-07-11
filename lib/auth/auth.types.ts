export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type AuthResult = {
  user: AppUser;
  idToken: string;
};

export interface AuthService {
  getCurrentUser(): AppUser | null;
  getIdToken(): Promise<string | null>;

  signInWithGoogle(): Promise<AuthResult>;
  signInWithEmailPassword(email: string, password: string): Promise<AuthResult>;
  signUpWithEmailPassword(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResult>;

  signOut(): Promise<void>;

  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void;
}
