import { useCallback, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { useRouter } from 'expo-router';

import { restaurantsMocks } from '@/lib/mocks/restaurants-mock';

export const useFavoritesModel = () => {
  const [searchValue, setSearchValue] = useState('');
  const [favoriteList, setFavoriteList] = useState<string[]>(['1', '3', '4']);
  const router = useRouter();

  const scaleAnims = useRef<Record<string, Animated.Value>>(
    restaurantsMocks.reduce(
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
    (id: string) => {
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

  return {
    searchValue,
    setSearchValue,
    handleClearSearch,
    restaurantsMocks,
    favoriteList,
    handleFavorite,
    scaleAnims,
    router,
  };
};
