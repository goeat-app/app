import { useEffect } from 'react';

import { ensureUserLocationUseCase } from 'use-cases/user-location/ensure-user-location.use-case';
import { LOCATION_LABELS } from 'use-cases/user-location/user-location.constants';

import { useUserStore } from '@/store/user';

export function useUserLocation() {
  const userLocation = useUserStore(state => state.userLocation);
  const locationLabel = useUserStore(state => state.locationLabel);
  const isLocationLoading = useUserStore(state => state.isLocationLoading);

  useEffect(() => {
    void ensureUserLocationUseCase();
  }, []);

  const label = isLocationLoading
    ? LOCATION_LABELS.loading
    : locationLabel || LOCATION_LABELS.nearby;

  return {
    userLocation,
    locationLabel: label,
    isLocationLoading,
  };
}
