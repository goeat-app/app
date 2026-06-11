import { Platform } from 'react-native';

import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from 'firebase/auth';

import { getFirebaseAuth } from './firebase-auth';

let isConfigured = false;

function configureGoogleSignIn() {
  if (isConfigured) {
    return;
  }

  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  if (!webClientId) {
    throw new Error(
      'Missing EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID for Google Sign-In.',
    );
  }

  GoogleSignin.configure({
    webClientId,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  isConfigured = true;
}

export async function signInWithGoogleCredential() {
  if (Platform.OS === 'web') {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const userCredential = await signInWithPopup(getFirebaseAuth(), provider);
    const accessToken = await userCredential.user.getIdToken(true);
    const refreshToken = userCredential.user.refreshToken || '';

    return { accessToken, refreshToken };
  }

  configureGoogleSignIn();

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
  }

  console.log('Initiating Google Sign-In...');

  const response = await GoogleSignin.signIn();

  if (!isSuccessResponse(response)) {
    throw new Error('Login com Google cancelado pelo usuario.');
  }

  const idToken = response.data.idToken;
  if (!idToken) {
    throw new Error('Google nao retornou idToken para autenticacao.');
  }

  const credential = GoogleAuthProvider.credential(idToken);
  const userCredential = await signInWithCredential(
    getFirebaseAuth(),
    credential,
  );

  const accessToken = await userCredential.user.getIdToken(true);
  const refreshToken = userCredential.user.refreshToken || '';

  return { accessToken, refreshToken };
}
