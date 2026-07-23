/// <reference types="google.maps" />

import { googleMapsConfig } from '@/lib/maps/google-maps-config.web';

let resolveApiReady: (() => void) | undefined;
let rejectApiReady: ((reason: unknown) => void) | undefined;

const apiReady = new Promise<void>((resolve, reject) => {
  resolveApiReady = resolve;
  rejectApiReady = reject;
});
apiReady.catch(() => undefined);

export function markGoogleMapsApiReady(): void {
  resolveApiReady?.();
}

export function markGoogleMapsApiFailed(error: unknown): void {
  rejectApiReady?.(error);
}

export async function importGoogleMapsGeocodingLibrary() {
  if (!googleMapsConfig.apiKey) {
    throw new Error('Missing EXPO_PUBLIC_GOOGLE_MAPS_API_KEY.');
  }

  await apiReady;
  return google.maps.importLibrary('geocoding');
}
