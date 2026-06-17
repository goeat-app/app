import { useRef } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { FilterIcon } from '@/assets/icons/filter-icon';
import { Button } from '@/components/button';
import { Chips } from '@/components/chips/chips';
import { Header } from '@/components/header/header';
import { Input } from '@/components/input';
import { RestaurantCard } from '@/components/recomendation-card/recomendation-card';
import { RestaurantFilter } from '@/components/restaurants-filter/restaurant-filter';
import { TabBar } from '@/components/tabBar/tabBar';
import { TabBarRef } from '@/components/tabBar/tabBar.model';
import { Typography } from '@/components/typography/typography';

import { useRecomendationsModel } from './recomendations.model';

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
    openFilter,
    activeFilterCount,
  } = useRecomendationsModel();

  const handleViewDetails = (itemId: string) => {
    router.push({
      pathname: '/restaurant-details/restaurant-details/[id]',
      params: { id: itemId },
    });
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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 8,
          gap: 8,
        }}
      >
        <Button
          className="flex flex-row gap-2 h-[35px] bg-[#FF6B35] rounded-full items-center justify-center px-4"
          onPress={openFilter}
        >
          <FilterIcon />
          <Typography
            text="Filtrar"
            type="span"
            className="font-poppins-medium text-white"
          />
          {activeFilterCount > 0 && (
            <View style={filterStyles.badge}>
              <Text style={filterStyles.badgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </Button>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', gap: 8 }}
          style={{ flex: 1 }}
        >
          <Chips />
        </ScrollView>
      </View>

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
      <RestaurantFilter />
      <TabBar ref={tabBarRef} />
    </View>
  );
}

const filterStyles = StyleSheet.create({
  badge: {
    backgroundColor: 'white',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  badgeText: {
    color: '#FF6B35',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 14,
  },
});
