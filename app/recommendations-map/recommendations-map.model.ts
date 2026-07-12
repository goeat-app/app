import { useCallback, useEffect, useMemo, useState } from 'react';

import { mapRestaurantsService } from 'services/map-restaurants-service';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';
import { ensureUserLocationUseCase } from 'use-cases/user-location/ensure-user-location.use-case';

import { loadingWrapper } from '@/hooks/loading-wrapper';
import { useUserStore } from '@/store/user';

import {
  getRegionForCoordinates,
  getUserCoordinate,
  toCoordinate,
} from './recommendations-map.utils';
import type { MapCoordinate } from './recommendations-map.utils';

export type RecommendationsMapModel = ReturnType<
  typeof useRecommendationsMapModel
>;

export function useRecommendationsMapModel() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [restaurants, setRestaurants] = useState<RecommendedRestaurant[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);

  const userLocation = useUserStore(state => state.userLocation);

  const loadMapRestaurants = useCallback(
    async (latitude?: number, longitude?: number) => {
      setHasLoadError(false);

      const hasLocation =
        latitude !== undefined &&
        longitude !== undefined &&
        (latitude !== 0 || longitude !== 0);

      try {
        const data = await loadingWrapper(() =>
          mapRestaurantsService.getRestaurantsForMap(
            hasLocation ? { latitude, longitude } : undefined,
          ),
        );
        setRestaurants(data);
      } catch (error) {
        setHasLoadError(true);
        console.error('Error loading map restaurants:', error);
      }
    },
    [],
  );

  useEffect(() => {
    async function init() {
      try {
        await ensureUserLocationUseCase();
      } catch (error) {
        console.error('Error resolving user location:', error);
      } finally {
        const { userLocation: location } = useUserStore.getState();
        await loadMapRestaurants(location.latitude, location.longitude);
        setIsLoading(false);
      }
    }

    init();
  }, [loadMapRestaurants]);

  const restaurantCoordinates = useMemo(
    () =>
      restaurants
        .map(toCoordinate)
        .filter((coord): coord is MapCoordinate => coord !== null),
    [restaurants],
  );

  const userCoordinate = useMemo(
    () => getUserCoordinate(userLocation),
    [userLocation],
  );

  const mapRegion = useMemo(() => {
    const coords: MapCoordinate[] = [...restaurantCoordinates];

    if (userCoordinate) coords.push(userCoordinate);

    return getRegionForCoordinates(coords);
  }, [restaurantCoordinates, userCoordinate]);

  return {
    restaurants,
    isLoading,
    hasLoadError,
    mapRegion,
    toCoordinate,
    restaurantCoordinates,
    userCoordinate,
    selectedRestaurantId,
    setSelectedRestaurantId,
  };
}
