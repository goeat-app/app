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
} from 'firebase/auth';

import { AuthService } from './auth.types';
import { getFirebaseApp } from './firebase-config';

let authInstance: Auth | null = null;
let emulatorConnected = false;
const warningKeys = new Set<string>();

function isEmulatorEnabled() {
  return process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST !== undefined;
}

function resolveEmulatorHost(rawHost: string): string {
  if (Platform.OS === 'android' && rawHost.startsWith('localhost:')) {
    return rawHost.replace('localhost', '10.0.2.2');
  }

  return rawHost;
}

function warnOnce(key: string, message: string) {
  if (process.env.NODE_ENV === 'production' || warningKeys.has(key)) {
    return;
  }

  warningKeys.add(key);
  console.warn(message);
}

function getFirebaseAuth(): Auth {
  if (authInstance) {
    return authInstance;
  }

  const firebaseApp = getFirebaseApp();
  authInstance = getAuth(firebaseApp);

  void setPersistence(authInstance, browserLocalPersistence).catch(() => {
    warnOnce(
      'firebase-auth-persistence-failed',
      'Firebase Auth persistence setup failed. The browser default persistence will be used.',
    );
  });

  if (isEmulatorEnabled() && !emulatorConnected) {
    const emulatorHost = resolveEmulatorHost(
      process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099',
    );

    connectAuthEmulator(authInstance, `http://${emulatorHost}`, {
      disableWarnings: true,
    });

    emulatorConnected = true;
  }

  return authInstance;
}

async function getFirebaseIdToken(forceRefresh = false) {
  await waitForAuthReady();
  const user = getFirebaseAuth().currentUser;
  if (!user) {
    return null;
  }

  return user.getIdToken(forceRefresh);
}

async function signOutFromFirebase() {
  await signOut(getFirebaseAuth());
}

async function waitForAuthReady(): Promise<void> {
  await getFirebaseAuth().authStateReady();
}

async function signInWithEmail(
  email: string,
  password: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const userCredential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password,
  );
  const accessToken = await userCredential.user.getIdToken(true);
  const refreshToken = userCredential.user.refreshToken || '';

  return { accessToken, refreshToken };
}

async function signInWithGoogleCredential() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const userCredential = await signInWithPopup(getFirebaseAuth(), provider);
  const accessToken = await userCredential.user.getIdToken(true);
  const refreshToken = userCredential.user.refreshToken || '';

  return { accessToken, refreshToken };
}

async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const userCredential = await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password,
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });
  const accessToken = await userCredential.user.getIdToken(true);
  const refreshToken = userCredential.user.refreshToken || '';

  return { accessToken, refreshToken };
}

export const authService: AuthService = {
  getCurrentUser: () => getFirebaseAuth().currentUser,
  getIdToken: (forceRefresh = false) => getFirebaseIdToken(forceRefresh),
  signOut: () => signOutFromFirebase(),
  signInWithEmailPassword: signInWithEmail,
  signUpWithEmailPassword: signUpWithEmail,
  signInWithGoogle: signInWithGoogleCredential,
  onAuthStateChanged: callback => {
    const unsubscribe = getFirebaseAuth().onAuthStateChanged(callback);
    return unsubscribe;
  },
};
