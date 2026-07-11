import { Platform } from 'react-native';

import * as Location from 'expo-location';
import { UserCoordinates } from 'use-cases/user-location/user-location.types';

const EMPTY_COORDINATES: UserCoordinates = { latitude: 0, longitude: 0 };

async function prepareAndroidLocationServices(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Location.enableNetworkProviderAsync().catch(() => undefined);
}

export const locationService = {
  async getCoordinates(): Promise<UserCoordinates> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return EMPTY_COORDINATES;

      await prepareAndroidLocationServices();

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting user coordinates:', error);
      return EMPTY_COORDINATES;
    }
  },

  async reverseGeocode({ latitude, longitude }: UserCoordinates) {
    await prepareAndroidLocationServices();
    return Location.reverseGeocodeAsync({ latitude, longitude });
  },
};
