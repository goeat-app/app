import { router } from 'expo-router';
import { logoutUseCase } from 'use-cases/logout/logout.use-case';

import { loadingWrapper } from '@/hooks/loading-wrapper';

export function useProfilePageModel() {
  const headerHeight = 150;
  const avatarSize = 128;
  const avatarHalfSize = avatarSize / 2;

  const navigateEditProfile = () => {
    router.push('/edit-profile/edit-profile');
  };
  const navigatePreferences = () =>
    router.push('/profile-mapping/step-one/step-one-view');
  const navigatePlaces = () => router.push('/home/home');
  const navigateFeedback = () => router.push('/home/home');
  const navigateFaq = () => router.push('/home/home');

  const logout = async () => {
    const result = await loadingWrapper(() => logoutUseCase());

    if (result.success) {
      router.replace('/signin/signin-view');
    }
  };

  return {
    headerHeight,
    avatarSize,
    avatarHalfSize,
    navigateEditProfile,
    navigatePreferences,
    navigatePlaces,
    navigateFeedback,
    navigateFaq,
    logout,
  };
}
