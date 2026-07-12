import type { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

function isValidCoordinate({ latitude, longitude }: MapCoordinate) {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180 &&
    (latitude !== 0 || longitude !== 0)
  );
}

export function toCoordinate(
  restaurant: Pick<RecommendedRestaurant, 'latitude' | 'longitude'>,
): MapCoordinate | null {
  const latitude = Number(restaurant.latitude);
  const longitude = Number(restaurant.longitude);

  const coordinate = { latitude, longitude };

  if (!isValidCoordinate(coordinate)) {
    return null;
  }

  return coordinate;
}

export function getRegionForCoordinates(coords: MapCoordinate[]) {
  if (coords.length === 0) return null;

  const lats = coords.map(coordinate => coordinate.latitude);
  const lngs = coords.map(coordinate => coordinate.longitude);
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

export function getUserCoordinate(
  location: MapCoordinate,
): MapCoordinate | null {
  if (!isValidCoordinate(location)) return null;

  return location;
}
