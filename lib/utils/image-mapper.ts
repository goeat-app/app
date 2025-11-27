import { ImageSourcePropType } from 'react-native';

const IMAGE_MAP: Record<string, ImageSourcePropType> = {
  'arabian-food': require('@/assets/images/items-restaurant/arabian-food.png'),
  'asian-food': require('@/assets/images/items-restaurant/asian-food.png'),
  'brazilian-food': require('@/assets/images/items-restaurant/brazilian-food.png'),
  'italian-food': require('@/assets/images/items-restaurant/italian-food.png'),
  'mexican-food': require('@/assets/images/items-restaurant/mexican-food.png'),
  healthy: require('@/assets/images/items-restaurant/healthy.png'),
  sandwiches: require('@/assets/images/items-restaurant/sandwiches.png'),
  seafood: require('@/assets/images/items-restaurant/seafood.png'),
  vegetarian: require('@/assets/images/items-restaurant/vegetarian.png'),

  'romantic-env': require('@/assets/images/environments/romantic-env.png'),
  'excited-env': require('@/assets/images/environments/excited-env.png'),
  'thematic-env': require('@/assets/images/environments/thematic-env.png'),
  'fun-env': require('@/assets/images/environments/fun-env.png'),
  'bistro-env': require('@/assets/images/environments/bistro-env.png'),
  'fast-food-env': require('@/assets/images/environments/fast-food-env.png'),
  'cafe-env': require('@/assets/images/environments/cafe-env.png'),
  'rodizio-env': require('@/assets/images/environments/rodizio-env.png'),
  
  'goat-eating': require('@/assets/images/goat-eating.png'),
};

export const getImageSource = (tag: string): ImageSourcePropType => {
  const normalizedTag = tag ? tag : 'goat-eating';

  return IMAGE_MAP[normalizedTag];
};
