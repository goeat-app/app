import { FavoriteIcon } from '@/assets/icons/favorites-icon';
import { HomeIcon } from '@/assets/icons/home-icon';
import { RestaurantsIcon } from '@/assets/icons/restaurants-icon';
import { UserIcon } from '@/assets/icons/user-icon';
import { Animated, View } from 'react-native';
import { TabItem } from './tabItem';
import { router } from 'expo-router';

type TabBarProps = {
  translateY?: Animated.Value;
};
export const TabBar = ({ translateY }: TabBarProps) => {
  const navigateHome = () => router.replace('/home/home');
  const navigateFavorites = () => router.replace('/home/home');
  const navigateRestaurants = () =>
    router.replace('/recomendations/recomendations');
  const navigateProfile = () => router.replace('/home/home');

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
        />
        <TabItem
          label="Favorites"
          icon={<FavoriteIcon width={24} height={24} />}
          onPress={navigateFavorites}
        />
        <TabItem
          label="Restaurants"
          icon={<RestaurantsIcon width={24} height={24} />}
          onPress={navigateRestaurants}
        />
        <TabItem
          label="Profile"
          icon={<UserIcon width={24} height={24} />}
          onPress={navigateProfile}
        />
      </View>
    </Animated.View>
  );
};
