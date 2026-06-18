import { locationService } from 'services/location-service';

import { buildLocationLabel } from './build-location-label';
import { LOCATION_LABELS } from './user-location.constants';
import { UserCoordinates, UserLocation } from './user-location.types';

export function hasValidCoordinates({
  latitude,
  longitude,
}: UserCoordinates): boolean {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    (latitude !== 0 || longitude !== 0)
  );
}

export async function resolveUserLocationUseCase(): Promise<UserLocation> {
  const coordinates = await locationService.getCoordinates();

  if (!hasValidCoordinates(coordinates)) {
    return { ...coordinates, label: LOCATION_LABELS.permissionDenied };
  }

  try {
    const places = await locationService.reverseGeocode(coordinates);

    return {
      ...coordinates,
      label: buildLocationLabel(places[0]),
    };
  } catch {
    return { ...coordinates, label: LOCATION_LABELS.nearby };
  }
}
