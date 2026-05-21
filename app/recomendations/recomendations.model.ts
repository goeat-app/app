import { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';

import { useRouter } from 'expo-router';

import { toast } from '@/components/toast/toast';
import { loadingWrapper } from '@/hooks/loading-wrapper';
import {
  getFavoriteRestaurantIdsUseCase,
  removeFavoriteUseCase,
  saveFavoriteUseCase,
} from 'use-cases/favorite-savings/favorite-savings.use-case';
import { getRecommendationsUseCase } from 'use-cases/recommender/recommender.use-case';
import { useRecomendationsStore } from '@/store/recommender-store';
import { useFilterStore } from '@/store/restaurant-filter-store';
import { defaultMinPrice, defaultMaxPrice } from '@/constants/filterConstants';

export const useRecomendationsModel = () => {
  const [searchValue, setSearchValue] = useState('');
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const router = useRouter();

  const setRestaurants = useRecomendationsStore(state => state.setRestaurants);
  const restaurants = useRecomendationsStore(state => state.restaurants);

  const filters = useFilterStore(state => state.filters);
  const openFilter = useFilterStore(state => state.openFilter);

  async function loadRecommendations(currentFilters?: typeof filters) {
    const result = await loadingWrapper(() => getRecommendationsUseCase(currentFilters));

    if (result.success) {
      setRestaurants(result.data);
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
      if (result.success) {
        setFavoriteList(result.data);
      }
    }
    loadFavoriteIds();
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

  const activeFilterCount = useMemo(() => [
    filters.minRating > 0,
    filters.foodTypes.length > 0,
    filters.restaurantStyles.length > 0,
    filters.mealTypes.length > 0,
    filters.paymentMethods.length > 0,
    filters.voucherTypes.length > 0,
    filters.minPrice !== defaultMinPrice || filters.maxPrice !== defaultMaxPrice,
  ].filter(Boolean).length, [filters]);

  return {
    searchValue,
    setSearchValue,
    handleClearSearch,
    favoriteList,
    handleFavorite,
    scaleAnims,
    router,
    restaurants,
    openFilter,
    activeFilterCount,
  };
};
