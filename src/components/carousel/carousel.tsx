import { View, FlatList, Pressable } from 'react-native';

import { router } from 'expo-router';

import { Typography } from '@/components/typography/typography';

import { RestaurantCard } from './restaurantCard';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

interface CarouselProps {
  restaurants: RecommendedRestaurant[];
}

export const Carousel = ({ restaurants }: CarouselProps) => {
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
        renderItem={({ item }) => <RestaurantCard item={item} />}
        keyExtractor={item => String(item.id)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
