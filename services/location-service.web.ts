/// <reference types="google.maps" />

import { LocationGeocodedAddress } from 'expo-location';
import { UserCoordinates } from 'use-cases/user-location/user-location.types';

import { importGoogleMapsGeocodingLibrary } from './google-maps-api.web';

const EMPTY_COORDINATES: UserCoordinates = { latitude: 0, longitude: 0 };

function getAddressComponent(
  components: google.maps.GeocoderAddressComponent[],
  type: string,
): string | null {
  return (
    components.find(component => component.types.includes(type))?.long_name ??
    null
  );
}

function toLocationAddress(
  result: google.maps.GeocoderResult,
): LocationGeocodedAddress {
  const components = result.address_components;

  return {
    city:
      getAddressComponent(components, 'locality') ??
      getAddressComponent(components, 'administrative_area_level_2'),
    country: getAddressComponent(components, 'country'),
    district:
      getAddressComponent(components, 'sublocality_level_1') ??
      getAddressComponent(components, 'neighborhood'),
    formattedAddress: result.formatted_address,
    isoCountryCode:
      components.find(component => component.types.includes('country'))
        ?.short_name ?? null,
    name: null,
    postalCode: getAddressComponent(components, 'postal_code'),
    region:
      components.find(component =>
        component.types.includes('administrative_area_level_1'),
      )?.short_name ?? null,
    street: getAddressComponent(components, 'route'),
    streetNumber: getAddressComponent(components, 'street_number'),
    subregion: getAddressComponent(components, 'administrative_area_level_2'),
    timezone: null,
  };
}

export const locationService = {
  async getCoordinates(): Promise<UserCoordinates> {
    if (!navigator.geolocation) return EMPTY_COORDINATES;

    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () => resolve(EMPTY_COORDINATES),
        { enableHighAccuracy: false },
      );
    });
  },

  async reverseGeocode({ latitude, longitude }: UserCoordinates) {
    const { Geocoder } = await importGoogleMapsGeocodingLibrary();
    const response = await new Geocoder().geocode({
      location: { lat: latitude, lng: longitude },
    });

    return response.results.map(toLocationAddress);
  },
};
