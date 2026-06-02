import { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';

import { useRouter } from 'expo-router';
import {
  loadFavoriteRestaurantsUseCase,
  removeFavoriteUseCase,
  saveFavoriteUseCase,
} from 'use-cases/favorite-savings/favorite-savings.use-case';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { toast } from '@/components/toast/toast';
import { loadingWrapper } from '@/hooks/loading-wrapper';

export const useFavoritesModel = () => {
  const [searchValue, setSearchValue] = useState('');
  const [restaurants, setRestaurants] = useState<RecommendedRestaurant[]>([]);
  const router = useRouter();

  const favoriteList = useMemo(() => restaurants.map(r => r.id), [restaurants]);

  async function loadFavorites() {
    const result = await loadingWrapper(() => loadFavoriteRestaurantsUseCase());

    if (result.success === true) {
      setRestaurants(result.data);
    } else {
      toast({ type: 'error', text1: result.error });
    }
  }

  useEffect(() => {
    loadFavorites();
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

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleFavorite = useCallback(
    async (id: string) => {
      const isFavorited = favoriteList.includes(id);
      const prevRestaurants = restaurants;

      if (isFavorited) {
        setRestaurants(prev => prev.filter(r => r.id !== id));
      }

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
        setRestaurants(prevRestaurants);
        toast({ type: 'error', text1: result.error });
      }
    },
    [favoriteList, restaurants, scaleAnims],
  );

  const displayedRestaurants = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) {
      return restaurants;
    }
    return restaurants.filter(
      r =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.foodType.toLowerCase().includes(q) ||
        r.placeType.toLowerCase().includes(q),
    );
  }, [restaurants, searchValue]);

  return {
    searchValue,
    setSearchValue,
    handleClearSearch,
    restaurants: displayedRestaurants,
    favoriteList,
    handleFavorite,
    scaleAnims,
    router,
  };
};
