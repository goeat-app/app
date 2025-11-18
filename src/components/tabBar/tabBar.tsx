import { forwardRef } from 'react';
import { Animated, View } from 'react-native';

import { usePathname } from 'expo-router';

import { FavoriteIcon } from '@/assets/icons/favorites-icon';
import { HomeIcon } from '@/assets/icons/home-icon';
import { RestaurantsIcon } from '@/assets/icons/restaurants-icon';
import { UserIcon } from '@/assets/icons/user-icon';

import { TabBarRef, useTabBarModel } from './tabBar.model';
import { TabItem } from './tabItem';

type TabBarProps = {
  hideValue?: number;
};

export const TabBar = forwardRef<TabBarRef, TabBarProps>(
  ({ hideValue = 150 }, ref) => {
    const {
      translateY,
      navigateHome,
      navigateFavorites,
      navigateRestaurants,
      navigateProfile,
    } = useTabBarModel({ hideValue, ref });

    const pathname = usePathname();
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
            isActive={pathname === '/profile-page/profile-page'}
          />
        </View>
      </Animated.View>
    );
  },
);

TabBar.displayName = 'TabBar';
