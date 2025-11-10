import { recomendationsListMock } from '@/lib/mocks/recomendations-list-mock';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useRecomendationsModel = () => {
  const [searchValue, setSearchValue] = useState('');
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const router = useRouter();

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
    recomendationsListMock,
    favoriteList,
    handleFavorite,
    scaleAnims,
    router,
  };
};
