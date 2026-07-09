import { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';

import {
  getFavoriteRestaurantIdsUseCase,
  removeFavoriteUseCase,
  saveFavoriteUseCase,
} from 'use-cases/favorite-savings/favorite-savings.use-case';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';
import { getRecommendationsUseCase } from 'use-cases/recommender/recommender.use-case';

import { toast } from '@/components/toast/toast';
import { loadingWrapper } from '@/hooks/loading-wrapper';
import { useFilterStore } from '@/store/restaurant-filter-store';

export const useHomeModel = () => {
  const filters = useFilterStore(state => state.filters);

  const [restaurants, setRestaurants] = useState<RecommendedRestaurant[]>([]);
  const [favoriteList, setFavoriteList] = useState<string[]>([]);

  async function loadRecommendations(currentFilters?: typeof filters) {
    const result = await loadingWrapper(() =>
      getRecommendationsUseCase(currentFilters),
    );

    if (result.success === true) {
      setRestaurants(result.data.slice(0, 3));
    }
  }

  useEffect(() => {
    loadRecommendations();
  }, []);

  useEffect(() => {
    loadRecommendations(filters);
  }, [filters]);

  useEffect(() => {
    async function loadFavoriteIds() {
      const result = await getFavoriteRestaurantIdsUseCase();
      if (result.success === true) {
        setFavoriteList(result.data);
      }
    }
    loadFavoriteIds();
  }, []);

  const scaleAnims = useMemo(
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

  const handleFavorite = useCallback(
    async (id: string) => {
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

      const result = isFavorited
        ? await removeFavoriteUseCase(id)
        : await saveFavoriteUseCase(id);

      if (result.success === false) {
        setFavoriteList(prev =>
          isFavorited ? [...prev, id] : prev.filter(itemId => itemId !== id),
        );
        toast({ type: 'error', text1: result.error });
      }
    },
    [favoriteList, scaleAnims],
  );

  return {
    restaurants,
    favoriteList,
    handleFavorite,
    scaleAnims,
  };
};
