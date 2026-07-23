const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? '';
const mapId = process.env.EXPO_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() ?? '';

export const googleMapsConfig = {
  apiKey,
  mapId,
} as const;

export function isGoogleMapsConfigured(): boolean {
  return Boolean(googleMapsConfig.apiKey && googleMapsConfig.mapId);
}
