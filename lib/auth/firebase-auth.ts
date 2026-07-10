import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  signOut,
  getReactNativePersistence,
} from 'firebase/auth';

import { getFirebaseApp } from './firebase-config';

let authInstance: Auth | null = null;
let emulatorConnected = false;

function isEmulatorEnabled() {
  return process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST !== undefined;
}

function resolveEmulatorHost(rawHost: string): string {
  if (Platform.OS === 'android' && rawHost.startsWith('localhost:')) {
    return rawHost.replace('localhost', '10.0.2.2');
  }

  return rawHost;
}

export function getFirebaseAuth(): Auth {
  if (authInstance) {
    return authInstance;
  }

  const firebaseApp = getFirebaseApp();

  try {
    authInstance = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (_error) {
    authInstance = getAuth(firebaseApp);
  }

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

export async function getFirebaseIdToken(forceRefresh = false) {
  const user = getFirebaseAuth().currentUser;
  if (!user) {
    return null;
  }

  return user.getIdToken(forceRefresh);
}

export function getFirebaseRefreshToken() {
  const user = getFirebaseAuth().currentUser;
  return user?.refreshToken || null;
}

export async function signOutFromFirebase() {
  await signOut(getFirebaseAuth());
}

export async function waitForAuthReady(): Promise<void> {
  await getFirebaseAuth().authStateReady();
}

export async function signInWithEmail(
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
