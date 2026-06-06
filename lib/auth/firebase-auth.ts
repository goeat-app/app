import { Platform } from 'react-native';

import { Auth, connectAuthEmulator, getAuth, signOut } from 'firebase/auth';

import { getFirebaseApp } from './firebase-config';

let authInstance: Auth | null = null;
let emulatorConnected = false;

function isEmulatorEnabled() {
  return process.env.EXPO_PUBLIC_USE_FIREBASE_AUTH_EMULATOR === 'true';
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
  authInstance = getAuth(firebaseApp);

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
