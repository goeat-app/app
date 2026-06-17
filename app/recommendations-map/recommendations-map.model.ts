import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-maps';

import { router } from 'expo-router';
import { mapRestaurantsService } from 'services/map-restaurants-service';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { loadingWrapper } from '@/hooks/loading-wrapper';
import { useUserStore } from '@/store/user';

import { getUserLocation } from '../signup/signup.model';

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

function toCoordinate(
  restaurant: Pick<RecommendedRestaurant, 'latitude' | 'longitude'>,
): MapCoordinate | null {
  const latitude = Number(restaurant.latitude);
  const longitude = Number(restaurant.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude === 0 ||
    longitude === 0
  ) {
    return null;
  }

  return { latitude, longitude };
}

function getRegionForCoordinates(coords: MapCoordinate[]) {
  if (coords.length === 0) return null;

  const lats = coords.map(c => c.latitude);
  const lngs = coords.map(c => c.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max((maxLat - minLat) * 1.5, 0.04),
    longitudeDelta: Math.max((maxLng - minLng) * 1.5, 0.04),
  };
}

export function useRecommendationsMapModel() {
  const mapRef = useRef<MapView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const [restaurants, setRestaurants] = useState<RecommendedRestaurant[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);

  const userLocation = useUserStore(state => state.userLocation);
  const setUserLocation = useUserStore(state => state.setUserLocation);

  const loadMapRestaurants = useCallback(
    async (latitude?: number, longitude?: number) => {
      const hasLocation =
        latitude !== undefined &&
        longitude !== undefined &&
        (latitude !== 0 || longitude !== 0);

      const data = await loadingWrapper(() =>
        mapRestaurantsService.getRestaurantsForMap(
          hasLocation ? { latitude, longitude } : undefined,
        ),
      );
      setRestaurants(data);
    },
    [],
  );

  useEffect(() => {
    async function init() {
      const location = await getUserLocation();

      if (location.latitude !== 0 || location.longitude !== 0) {
        setUserLocation(location);
      }

      await loadMapRestaurants(location.latitude, location.longitude);
      setIsLoading(false);
    }

    init();
  }, [loadMapRestaurants, setUserLocation]);

  const restaurantCoordinates = useMemo(
    () =>
      restaurants
        .map(toCoordinate)
        .filter((coord): coord is MapCoordinate => coord !== null),
    [restaurants],
  );

  const mapRegion = useMemo(() => {
    const coords: MapCoordinate[] = [...restaurantCoordinates];

    if (userLocation.latitude !== 0 || userLocation.longitude !== 0) {
      coords.push({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
    }

    return getRegionForCoordinates(coords);
  }, [restaurantCoordinates, userLocation]);

  const navigateToRestaurantDetails = useCallback(() => {
    router.push('/restaurant-details/restaurant-details');
  }, []);

  const fitMapToMarkers = useCallback(() => {
    if (!mapRef.current || restaurantCoordinates.length === 0) return;

    const coords: MapCoordinate[] = [...restaurantCoordinates];

    if (userLocation.latitude !== 0 || userLocation.longitude !== 0) {
      coords.push({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
    }

    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 80, right: 40, bottom: 280, left: 40 },
      animated: true,
    });
  }, [restaurantCoordinates, userLocation]);

  useEffect(() => {
    if (isMapReady) {
      fitMapToMarkers();
    }
  }, [fitMapToMarkers, isMapReady]);

  return {
    mapRef,
    restaurants,
    isLoading,
    isMapReady,
    setIsMapReady,
    mapRegion,
    toCoordinate,
    fitMapToMarkers,
    selectedRestaurantId,
    setSelectedRestaurantId,
    navigateToRestaurantDetails,
  };
}
