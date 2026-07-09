import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';

export async function hasCompletedOnboarding(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return globalThis.localStorage?.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
  }

  const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
  return value === 'true';
}

export async function setOnboardingCompleted(): Promise<void> {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    return;
  }

  await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
}
