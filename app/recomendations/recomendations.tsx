import { useState, useRef, useCallback } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Animated,
  FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

import { EnvironmentIcon } from '@/assets/icons/environment-icon';
import { FavoriteIcon } from '@/assets/icons/favorite-icon';
import { FilterIcon } from '@/assets/icons/filter-icon';
import { LocationIcon } from '@/assets/icons/location-icon';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { MoneyIcon } from '@/components/money-icon/money-icon';
import { Typography } from '@/components/typography/typography';
import { useRecomendationsModel } from './recomendations.model';
import { recomendationsListMock } from '@/lib/mocks/recomendations-list-mock';

export default function Recomendations() {
  const {
    favoriteList,
    setSearchValue,
    searchValue,
    scaleAnims,
    router,
    handleClearSearch,
    handleFavorite,
  } = useRecomendationsModel();

  return (
    <View className="flex-1 bg-[#FDF6F5]">
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

      <View className="w-full p-4">
        <Button className="flex flex-row gap-2 w-[80px] h-[25px] bg-[#FF6B35] rounded-md items-center justify-center">
          <FilterIcon />
          <Typography
            text="Filtrar"
            type="span"
            className="font-poppins-medium text-white"
          />
        </Button>
      </View>

      <View className="flex-1 items-center ">
        <FlatList
          data={recomendationsListMock}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              key={item.id}
              className="w-[335px] h-[225px] rounded-s-2xl my-6"
            >
              <View className="w-full h-[150px] ">
                <ImageBackground
                  className="w-full h-full flex items-end p-2"
                  resizeMode="cover"
                  source={item.image}
                >
                  <Button onPress={() => handleFavorite(item.id)}>
                    <Animated.View
                      style={{
                        transform: [{ scale: scaleAnims[item.id] }],
                      }}
                    >
                      <View className="flex w-[32px] h-[32px] bg-[#FF6B35] opacity-85 rounded-full items-center justify-center">
                        <FavoriteIcon
                          fill={
                            favoriteList.includes(item.id) ? '#fff' : 'none'
                          }
                        />
                      </View>
                    </Animated.View>
                  </Button>
                </ImageBackground>

                <View className="flex flex-row items-center justify-between w-full h-[25px] ">
                  <View className="w-[40%]">
                    <Typography
                      type="h3"
                      text={item.name}
                      className="font-poppins-semi-bold"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    />
                  </View>
                  <View>
                    <MoneyIcon scale={item.mediumPrice} />
                  </View>

                  <Button className="flex w-[70px] h-[25px] bg-[#003247] rounded-[4px] items-center justify-center">
                    <Typography
                      text="Ver mais"
                      type="h4"
                      className="font-poppins-medium text-xs text-white"
                    />
                  </Button>
                </View>
                <View className="gap-2">
                  <View className="flex flex-row gap-2">
                    <EnvironmentIcon width={24} height={24} />
                    <Typography
                      text={item.description}
                      type="span"
                      className="text-[#5F6368] text-base"
                    />
                  </View>
                  <View className="flex flex-row gap-2">
                    <LocationIcon width={10} height={13} />
                    <Typography
                      text={item.location}
                      type="span"
                      className="text-[#5F6368] text-base"
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
