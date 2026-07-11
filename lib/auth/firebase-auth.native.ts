import { Platform } from 'react-native';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { AuthResult, AuthService } from './auth.types';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  offlineAccess: false,
});

async function toAuthResult(user: FirebaseAuthTypes.User): Promise<AuthResult> {
  return {
    user: {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    },
    idToken: await user.getIdToken(),
  };
}

class NativeAuthServiceImpl implements AuthService {
  public getCurrentUser() {
    const user = auth().currentUser;
    return user
      ? {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }
      : null;
  }

  async getIdToken() {
    const user = auth().currentUser;
    return user ? user.getIdToken() : null;
  }

  async signInWithGoogle() {
    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      await GoogleSignin.signIn();
      const { idToken, accessToken } = await GoogleSignin.getTokens();
      if (!idToken) {
        throw new Error('Google sign-in did not return an idToken.');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      const credential = await auth().signInWithCredential(googleCredential);

      return toAuthResult(credential.user);
    } catch (error: unknown) {
      if ((error as { code?: string }).code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google sign-in was cancelled.');
      }

      if ((error as { code?: string }).code === statusCodes.IN_PROGRESS) {
        throw new Error('Google sign-in is already in progress.');
      }

      if (
        (error as { code?: string }).code ===
        statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        throw new Error('Google Play Services are not available or outdated.');
      }

      throw error;
    }
  }

  async signInWithEmailPassword(email: string, password: string) {
    const credential = await auth().signInWithEmailAndPassword(email, password);

    return toAuthResult(credential.user);
  }

  async signUpWithEmailPassword(email: string, password: string, name: string) {
    const credential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    await credential.user.updateProfile({ displayName: name });

    return toAuthResult(credential.user);
  }

  async signOut() {
    await Promise.allSettled([auth().signOut(), GoogleSignin.signOut()]);
  }

  onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void) {
    const unsubscribe = auth().onAuthStateChanged(callback);
    return unsubscribe;
  }
}

export const authService: AuthService = new NativeAuthServiceImpl();
