import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Redirect } from 'expo-router';

import { hasCompletedOnboarding } from '@/lib/storage/onboarding-storage';

export default function Index() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    let isMounted = true;

    const loadOnboardingStatus = async () => {
      const completed = await hasCompletedOnboarding();
      if (isMounted) {
        setIsOnboardingCompleted(completed);
      }
    };

    void loadOnboardingStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isOnboardingCompleted === null) {
    return <View className="flex-1 bg-[--primary-bg]" />;
  }

  if (isOnboardingCompleted) {
    return <Redirect href="/signin/signin-view" />;
  }

  console.log(
    'Onboarding not completed, redirecting to first onboarding screen',
  );
  return <Redirect href="/onboarding/first-onboarding" />;
}
