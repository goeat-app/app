import { Platform } from 'react-native';

import {
  Auth,
  browserLocalPersistence,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';

import { AppUser, AuthResult, AuthService } from './auth.types';
import { getFirebaseApp } from './firebase-config';

class WebAuthServiceImpl implements AuthService {
  private authInstance: Auth | null = null;
  private emulatorConnected = false;
  private warningKeys = new Set<string>();

  private getFirebaseAuth(): Auth {
    if (this.authInstance) {
      return this.authInstance;
    }

    const firebaseApp = getFirebaseApp();
    this.authInstance = getAuth(firebaseApp);

    void setPersistence(this.authInstance, browserLocalPersistence).catch(
      () => {
        this.warnOnce(
          'firebase-auth-persistence-failed',
          'Firebase Auth persistence setup failed. The browser default persistence will be used.',
        );
      },
    );

    if (this.isEmulatorEnabled() && !this.emulatorConnected) {
      const emulatorHost = this.resolveEmulatorHost(
        process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099',
      );

      connectAuthEmulator(this.authInstance, `http://${emulatorHost}`, {
        disableWarnings: true,
      });

      this.emulatorConnected = true;
    }

    return this.authInstance;
  }

  getCurrentUser(): AppUser | null {
    const user = this.getFirebaseAuth().currentUser;
    return user ? this.userToAppUser(user) : null;
  }

  async getIdToken(forceRefresh = false) {
    await this.waitForAuthReady();
    const user = this.getFirebaseAuth().currentUser;
    if (!user) {
      return null;
    }

    return user.getIdToken(forceRefresh);
  }

  async signOut() {
    await signOut(this.getFirebaseAuth());
  }

  async waitForAuthReady(): Promise<void> {
    await this.getFirebaseAuth().authStateReady();
  }

  async signInWithEmailPassword(
    email: string,
    password: string,
  ): Promise<AuthResult> {
    const userCredential = await signInWithEmailAndPassword(
      this.getFirebaseAuth(),
      email,
      password,
    );
    const accessToken = await userCredential.user.getIdToken(true);

    return {
      user: this.userToAppUser(userCredential.user)!,
      idToken: accessToken,
    };
  }

  async signInWithGoogle(): Promise<AuthResult> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const userCredential = await signInWithPopup(
      this.getFirebaseAuth(),
      provider,
    );
    const accessToken = await userCredential.user.getIdToken(true);

    return {
      user: this.userToAppUser(userCredential.user)!,
      idToken: accessToken,
    };
  }

  async signUpWithEmailPassword(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthResult> {
    const userCredential = await createUserWithEmailAndPassword(
      this.getFirebaseAuth(),
      email,
      password,
    );

    await updateProfile(userCredential.user, {
      displayName: name,
    });
    const accessToken = await userCredential.user.getIdToken(true);

    return {
      user: this.userToAppUser(userCredential.user)!,
      idToken: accessToken,
    };
  }

  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    const unsubscribe = this.getFirebaseAuth().onAuthStateChanged(callback);
    return unsubscribe;
  }

  private userToAppUser(user: User | null): AppUser | null {
    if (!user) {
      return null;
    }
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  private isEmulatorEnabled() {
    return process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST !== undefined;
  }

  private resolveEmulatorHost(rawHost: string): string {
    if (Platform.OS === 'android' && rawHost.startsWith('localhost:')) {
      return rawHost.replace('localhost', '10.0.2.2');
    }

    return rawHost;
  }

  private warnOnce(key: string, message: string) {
    if (process.env.NODE_ENV === 'production' || this.warningKeys.has(key)) {
      return;
    }

    this.warningKeys.add(key);
    console.warn(message);
  }
}

export const authService: AuthService = new WebAuthServiceImpl();
