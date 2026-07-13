/// <reference types="google.maps" />

let resolveApiReady: (() => void) | undefined;
let rejectApiReady: ((reason: unknown) => void) | undefined;

const apiReady = new Promise<void>((resolve, reject) => {
  resolveApiReady = resolve;
  rejectApiReady = reject;
});

export function markGoogleMapsApiReady(): void {
  resolveApiReady?.();
}

export function markGoogleMapsApiFailed(error: unknown): void {
  rejectApiReady?.(error);
}

export async function importGoogleMapsGeocodingLibrary() {
  if (!process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()) {
    throw new Error('Missing EXPO_PUBLIC_GOOGLE_MAPS_API_KEY.');
  }

  await apiReady;
  return google.maps.importLibrary('geocoding');
}
