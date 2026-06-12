import AsyncStorage from '@react-native-async-storage/async-storage';

import { signOutFromFirebase } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';
import { useRecomendationsStore } from '@/store/recommender-store';

import { LogoutResult } from './logout.types';

export async function logoutUseCase(): Promise<LogoutResult> {
  try {
    await signOutFromFirebase();
    await AsyncStorage.removeItem('accessToken');

    useRecomendationsStore.getState().setRestaurants([]);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao fazer logout. Tente novamente.'),
    };
  }
}
