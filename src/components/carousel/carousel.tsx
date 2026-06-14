import { Animated, FlatList, Pressable, View } from 'react-native';

import { router } from 'expo-router';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { Typography } from '@/components/typography/typography';

import { RestaurantCard } from './restaurantCard';

interface CarouselProps {
  restaurants: RecommendedRestaurant[];
  favoriteList: string[];
  onFavoritePress: (id: string) => void;
  scaleAnims: Record<string, Animated.Value>;
}

export const Carousel = ({
  restaurants,
  favoriteList,
  onFavoritePress,
  scaleAnims,
}: CarouselProps) => {
  return (
    <View className="w-full flex-col gap-3">
      <View className="flex-row justify-between items-center">
        <Typography
          type="h3"
          className="font-poppins-medium text-[#003247]"
          text="Recomendados"
        />
        <Pressable
          onPress={() => router.push('/recomendations/recomendations-view')}
        >
          <Typography
            type="body"
            className="font-poppins-medium text-[#003247] underline underline-offset-2"
            text="Ver todos"
          />
        </Pressable>
      </View>

      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <RestaurantCard
            item={item}
            isFavorite={favoriteList.includes(item.id)}
            scaleAnim={scaleAnims[item.id]!}
            onFavoritePress={() => onFavoritePress(item.id)}
          />
        )}
        keyExtractor={item => String(item.id)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
