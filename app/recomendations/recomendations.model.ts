import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { useRouter } from 'expo-router';

import { loadingWrapper } from '@/hooks/loading-wrapper';
import { getRecommendationsUseCase } from 'use-cases/recommender/recommender.use-case';
import { useRecomendationsStore } from '@/store/recommender-store';

export const useRecomendationsModel = () => {
  const [searchValue, setSearchValue] = useState('');
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const router = useRouter();

  const setRestaurants = useRecomendationsStore(state => state.setRestaurants);
  const restaurants = useRecomendationsStore(state => state.restaurants);

  async function loadRecommendations() {
    const result = await loadingWrapper(() => getRecommendationsUseCase());

    if (result.success) {
      setRestaurants(result.data);
    }
  }

  useEffect(() => {
    loadRecommendations();
  }, []);

  const scaleAnims = useMemo<Record<string, Animated.Value>>(
    () =>
      restaurants.reduce(
        (acc, item) => {
          acc[item.id] = new Animated.Value(1);
          return acc;
        },
        {} as Record<string, Animated.Value>,
      ),
    [restaurants],
  );

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
    favoriteList,
    handleFavorite,
    scaleAnims,
    router,
    restaurants
  };
};
