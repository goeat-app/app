import { useRef, useImperativeHandle } from 'react';
import { Animated } from 'react-native';

import { router } from 'expo-router';

export interface TabBarModel {
  translateY: Animated.Value;
  navigateHome: () => void;
  navigateFavorites: () => void;
  navigateRestaurants: () => void;
  navigateProfile: () => void;
}

export interface TabBarRef {
  hide: () => void;
  show: () => void;
}

type TabBarModelProps = {
  hideValue: number;
  ref: React.Ref<TabBarRef>;
};

export function useTabBarModel({
  hideValue,
  ref,
}: TabBarModelProps): TabBarModel {
  const translateY = useRef(new Animated.Value(0)).current;

  const navigateHome = () => router.push('/home/home');
  const navigateFavorites = () => router.push('/favorites/favorites');
  const navigateRestaurants = () =>
    router.push('/recomendations/recomendations-view');
  const navigateProfile = () => router.push('/profile-page/profile-page');

  useImperativeHandle(ref, () => ({
    hide: () => {
      Animated.timing(translateY, {
        toValue: hideValue,
        duration: 250,
        useNativeDriver: true,
      }).start();
    },
    show: () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    },
  }));

  return {
    translateY,
    navigateHome,
    navigateFavorites,
    navigateRestaurants,
    navigateProfile,
  };
}
