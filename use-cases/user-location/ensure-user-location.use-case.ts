import { useUserStore } from '@/store/user';

import { resolveUserLocationUseCase } from './resolve-user-location.use-case';

let locationInitialization: Promise<void> | null = null;

export async function ensureUserLocationUseCase(): Promise<void> {
  if (useUserStore.getState().isLocationResolved) {
    return;
  }

  if (!locationInitialization) {
    locationInitialization = (async () => {
      const store = useUserStore.getState();
      store.setIsLocationLoading(true);

      try {
        const location = await resolveUserLocationUseCase();
        store.setLocationState({
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          label: location.label,
        });
      } finally {
        useUserStore.getState().setIsLocationLoading(false);
        locationInitialization = null;
      }
    })();
  }

  await locationInitialization;
}
