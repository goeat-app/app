import { router } from 'expo-router';

export function useProfilePageModel() {
  const headerHeight = 150;
  const avatarSize = 128;
  const avatarHalfSize = avatarSize / 2;

  const navigateEditProfile = () => {
    router.push('/edit-profile/edit-profile');
  };
  const navigatePreferences = () =>
    router.push('/profile-mapping/step-one/step-one');
  const navigatePlaces = () => router.push('/home/home');
  const navigateFeedback = () => router.push('/home/home');
  const navigateFaq = () => router.push('/home/home');

  return {
    headerHeight,
    avatarSize,
    avatarHalfSize,
    navigateEditProfile,
    navigatePreferences,
    navigatePlaces,
    navigateFeedback,
    navigateFaq,
  };
}
