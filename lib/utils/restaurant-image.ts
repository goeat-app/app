import { ImageSourcePropType } from 'react-native';

import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { getImageSource } from '@/lib/utils/image-mapper';

export function getRestaurantImageSource(
  restaurant: Pick<RecommendedRestaurant, 'imageUrl' | 'slug'>,
): ImageSourcePropType {
  if (restaurant.imageUrl) {
    return { uri: restaurant.imageUrl };
  }

  return getImageSource(restaurant.slug);
}
