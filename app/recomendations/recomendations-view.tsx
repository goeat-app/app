import { useRef } from 'react';
import { View, StatusBar, FlatList, ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { FilterIcon } from '@/assets/icons/filter-icon';
import { Button } from '@/components/button';
import { Chips } from '@/components/chips/chips';
import { Header } from '@/components/header/header';
import { Input } from '@/components/input';
import { RestaurantCard } from '@/components/recomendation-card/recomendation-card';
import { TabBar } from '@/components/tabBar/tabBar';
import { Typography } from '@/components/typography/typography';

import { useRecomendationsModel } from './recomendations.model';
import { TabBarRef } from '@/components/tabBar/tabBar.model';

export default function Recomendations() {
  const {
    favoriteList,
    setSearchValue,
    searchValue,
    scaleAnims,
    router,
    handleClearSearch,
    handleFavorite,
    restaurants,
  } = useRecomendationsModel();

  const handleViewDetails = (itemId: string) => {
    // router.push(`/restaurant/${itemId}`);
  };

  const tabBarRef = useRef<TabBarRef>(null);

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <View className="px-4">
        <Header />
      </View>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingVertical: 14,
          alignItems: 'center',
          gap: 8,
        }}
        style={{ flexGrow: 0 }}
      >
        <Button className="flex flex-row gap-2 w-[80px] h-[25px] bg-[#FF6B35] rounded-tl-xs rounded-tr-md rounded-bl-md rounded-br-xs items-center justify-center">
          <FilterIcon />
          <Typography
            text="Filtrar"
            type="span"
            className="font-poppins-medium text-white"
          />
        </Button>
        <Chips />
      </ScrollView>

      <View className="flex-1 items-center ">
        <FlatList
          data={restaurants}
          keyExtractor={item => item.id}
          onScrollBeginDrag={() => tabBarRef.current?.hide()}
          onScrollEndDrag={() => tabBarRef.current?.show()}
          onMomentumScrollEnd={() => tabBarRef.current?.show()}
          renderItem={({ item }) => (
            <RestaurantCard
              key={item.id}
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
