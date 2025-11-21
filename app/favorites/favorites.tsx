import { useRef } from 'react';
import { FlatList, StatusBar, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Button } from '@/components/button';
import { Header } from '@/components/header/header';
import { Input } from '@/components/input';
import { RestaurantCard } from '@/components/recomendation-card/recomendation-card';
import { TabBar, TabBarRef } from '@/components/tabBar/tabBar';
import { restaurantsMocks } from '@/lib/mocks/restaurants-mock';

import { useRecomendationsModel } from './favorites.model';

export default function Favorites() {
  const {
    favoriteList,
    setSearchValue,
    searchValue,
    scaleAnims,
    router,
    handleClearSearch,
    handleFavorite,
  } = useRecomendationsModel();

  const handleViewDetails = (itemId: number) => {
    // router.push(`/restaurant/${itemId}`);
  };

  const favoritedRestaurants = restaurantsMocks.filter(restaurant =>
    favoriteList.includes(restaurant.id),
  );

  const tabBarRef = useRef<TabBarRef>(null);

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <Header />
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F5" />
      <View className="flex-row items-center justify-between px-4 bg-[#FDF6F5]">
        <Button onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={32} color="#000000" />
        </Button>

        <Input.Root className="flex items-center justify-center">
          <Input.Field
            value={searchValue}
            onChangeText={setSearchValue}
            className="flex w-[260px] h-[45px] border border-[#AAAAAA] bg-white rounded-full text-[#AAAAAA]"
            placeholder="Pesquisar restaurantes..."
          >
            <Input.ContentLeft>
              <Button onPress={handleClearSearch}>
                <MaterialCommunityIcons
                  name="store-search"
                  size={22}
                  color="#AAAAAA"
                />
              </Button>
            </Input.ContentLeft>
            <Input.ContentRight className="flex flex-row gap-1 ">
              {searchValue.length > 0 && (
                <Button onPress={handleClearSearch}>
                  <Ionicons name="close-circle" size={22} color="#003247" />
                </Button>
              )}
            </Input.ContentRight>
          </Input.Field>
        </Input.Root>
      </View>
      <View className="flex-1 items-center ">
        <FlatList
          data={favoritedRestaurants}
          keyExtractor={item => item.id.toString()}
          onScrollBeginDrag={() => tabBarRef.current?.hide()}
          onScrollEndDrag={() => tabBarRef.current?.show()}
          onMomentumScrollEnd={() => tabBarRef.current?.show()}
          renderItem={({ item }) => (
            <RestaurantCard
              item={item}
              isFavorite={favoriteList.includes(item.id)}
              scaleAnim={scaleAnims[item.id]}
              onFavoritePress={() => handleFavorite(item.id)}
              onPress={() => handleViewDetails(item.id)}
            />
          )}
        />
      </View>
      <TabBar ref={tabBarRef} />
    </View>
  );
}
