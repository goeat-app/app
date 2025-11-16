import { forwardRef, useRef, useImperativeHandle } from 'react';
import { Animated, View } from 'react-native';

import { router, usePathname } from 'expo-router';

import { FavoriteIcon } from '@/assets/icons/favorites-icon';
import { HomeIcon } from '@/assets/icons/home-icon';
import { RestaurantsIcon } from '@/assets/icons/restaurants-icon';
import { UserIcon } from '@/assets/icons/user-icon';

import { TabItem } from './tabItem';

export interface TabBarRef {
  hide: () => void;
  show: () => void;
}

type TabBarProps = {
  hideValue?: number;
};

export const TabBar = forwardRef<TabBarRef, TabBarProps>(
  ({ hideValue = 150 }, ref) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const pathname = usePathname();

    const navigateHome = () => router.replace('/home/home');
    const navigateFavorites = () => router.replace('/favorites/favorites');
    const navigateRestaurants = () =>
      router.replace('/recomendations/recomendations');
    const navigateProfile = () => router.replace('/home/home');

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

    return (
      <Animated.View
        className="absolute bottom-4 left-4 right-4"
        style={{ transform: [{ translateY: translateY }] }}
      >
        <View
          className="bg-[#ED6C1C] rounded-2xl flex-row justify-around h-34"
          style={{ elevation: 10 }}
        >
          <TabItem
            label="Home"
            icon={<HomeIcon width={24} height={24} />}
            onPress={navigateHome}
            isActive={pathname === '/home/home'}
          />
          <TabItem
            label="Favorites"
            icon={<FavoriteIcon width={24} height={24} />}
            onPress={navigateFavorites}
            isActive={pathname === '/favorites/favorites'}
          />
          <TabItem
            label="Restaurants"
            icon={<RestaurantsIcon width={24} height={24} />}
            onPress={navigateRestaurants}
            isActive={pathname === '/recomendations/recomendations'}
          />
          <TabItem
            label="Profile"
            icon={<UserIcon width={24} height={24} />}
            onPress={navigateProfile}
            isActive={pathname === '/profile/profile'}
          />
        </View>
      </Animated.View>
    );
  },
);

TabBar.displayName = 'TabBar';
