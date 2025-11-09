import { useState, useRef, useCallback } from 'react';
import {
  View,
  Platform,
  StatusBar,
  ImageBackground,
  Animated,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function Recomendations() {
  const [searchValue, setSearchValue] = useState('');
  const [favoriteList, setFavoriteList] = useState<number[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const recomendationsListMock = [
    {
      id: 1,
      name: 'Sunshine',
      image: require('@/assets/images/photo-restaurant/restaurant-mock-1.png'),
      description: 'Comemorações, animado, divertido.',
      location: '2.1 km - Jardim Horta, Campinas',
      mediumPrice: 3,
    },
    {
      id: 2,
      name: 'French Toast',
      image: require('@/assets/images/photo-restaurant/restaurant-mock-2.png'),
      description: 'Comemorações, animado, divertido.',
      location: '2.1 km - Jardim Horta, Campinas',
      mediumPrice: 3,
    },
    {
      id: 3,
      name: 'French Toast',
      image: require('@/assets/images/photo-restaurant/restaurant-mock-2.png'),
      description: 'Comemorações, animado, divertido.',
      location: '2.1 km - Jardim Horta, Campinas',
      mediumPrice: 3,
    },
  ];

  const scaleAnims = useRef<Record<number, Animated.Value>>(
    recomendationsListMock.reduce(
      (acc, item) => {
        acc[item.id] = new Animated.Value(1);
        return acc;
      },
      {} as Record<number, Animated.Value>,
    ),
  ).current;

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleFavorite = useCallback(
    (id: number) => {
      const isFavorited = favoriteList.includes(id);

      setFavoriteList(prev =>
        isFavorited ? prev.filter(itemId => itemId !== id) : [...prev, id],
      );

      Animated.spring(scaleAnims[id], {
        toValue: isFavorited ? 1 : 1.3,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }).start();
    },
    [favoriteList, scaleAnims],
  );

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F5" />
      <View
        className="flex-row items-center justify-between px-4 bg-[#FDF6F5]"
        style={{
          paddingTop: Platform.OS === 'ios' ? insets.top + 10 : 16,
          paddingBottom: 12,
          minHeight: Platform.OS === 'ios' ? 70 : 60,
        }}
      >
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

      <View className="flex-1 items-center gap-12">
        <ScrollView
          contentContainerStyle={{ gap: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {recomendationsListMock?.map(item => (
            <View key={item.id} className="w-[335px] h-[225px] rounded-s-2xl">
              <View className="w-full h-[153px] gap-2">
                <ImageBackground
                  className="w-full h-full flex items-end p-2"
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
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
