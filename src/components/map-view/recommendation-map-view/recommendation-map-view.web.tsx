import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import type { MapCoordinate } from '@/app/recommendations-map/recommendations-map.utils';

import { RestaurantMarker } from '../restaurant-marker/restaurant-marker';
import type { RecommendationMapViewProps } from './recommendation-map-view.types';

const MAP_PADDING = { top: 80, right: 40, bottom: 280, left: 40 };

function toGoogleCoordinate(coordinate: MapCoordinate) {
  return { lat: coordinate.latitude, lng: coordinate.longitude };
}

function MapContent({
  mapRegion,
  restaurants,
  restaurantCoordinates,
  userCoordinate,
  toCoordinate,
  selectedRestaurantId,
  setSelectedRestaurantId,
}: RecommendationMapViewProps) {
  const map = useMap();
  const coreLibrary = useMapsLibrary('core');
  const coordinates = useMemo(
    () =>
      userCoordinate
        ? [...restaurantCoordinates, userCoordinate]
        : restaurantCoordinates,
    [restaurantCoordinates, userCoordinate],
  );

  const fitMapToMarkers = useCallback(() => {
    if (!map || coordinates.length === 0) return;

    if (coordinates.length === 1) {
      map.setCenter(toGoogleCoordinate(coordinates[0]));
      map.setZoom(15);
      return;
    }

    if (!coreLibrary) return;

    const bounds = new coreLibrary.LatLngBounds();
    coordinates.forEach(coordinate => {
      bounds.extend(toGoogleCoordinate(coordinate));
    });
    map.fitBounds(bounds, MAP_PADDING);
  }, [coordinates, coreLibrary, map]);

  useEffect(() => {
    fitMapToMarkers();
  }, [fitMapToMarkers]);

  return (
    <Map
      defaultCenter={{ lat: mapRegion.latitude, lng: mapRegion.longitude }}
      defaultZoom={13}
      mapId={process.env.EXPO_PUBLIC_GOOGLE_MAPS_MAP_ID}
      mapTypeControl={false}
      streetViewControl={false}
      style={{ width: '100%', height: '100%' }}
    >
      {restaurants.map(restaurant => {
        const coordinate = toCoordinate(restaurant);
        if (!coordinate) return null;

        return (
          <RestaurantMarker
            key={restaurant.id}
            coordinate={coordinate}
            title={restaurant.name}
            selected={selectedRestaurantId === restaurant.id}
            onPress={() => setSelectedRestaurantId(restaurant.id)}
          />
        );
      })}

      {userCoordinate ? (
        <AdvancedMarker
          position={toGoogleCoordinate(userCoordinate)}
          title="Sua localização"
          zIndex={2}
        >
          <View
            accessibilityLabel="Sua localização"
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: '#FFFFFF',
              backgroundColor: '#4285F4',
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.45)',
            }}
          />
        </AdvancedMarker>
      ) : null}

      <MapControl position={ControlPosition.RIGHT_TOP}>
        <button
          type="button"
          aria-label={
            userCoordinate
              ? 'Centralizar na sua localização'
              : 'Mostrar todos os restaurantes'
          }
          onClick={() => {
            if (map && userCoordinate) {
              map.setCenter(toGoogleCoordinate(userCoordinate));
              map.setZoom(15);
              return;
            }
            fitMapToMarkers();
          }}
          style={{
            width: 40,
            height: 40,
            margin: 10,
            border: 0,
            borderRadius: 4,
            background: '#FFFFFF',
            color: '#003247',
            cursor: 'pointer',
            fontSize: 22,
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          ◎
        </button>
      </MapControl>
    </Map>
  );
}

function MapFallback({ message }: { message: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-[#F1F0F5] px-6">
      <Text className="text-center text-[#474747]">{message}</Text>
    </View>
  );
}

export default function RecommendationMapView(
  props: RecommendationMapViewProps,
) {
  const [loadError, setLoadError] = useState(false);
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.EXPO_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();

  if (!apiKey || !mapId) {
    return (
      <MapFallback message="Mapa indisponível. Configure a chave e o Map ID do Google Maps para a versão web." />
    );
  }

  if (loadError) {
    return (
      <MapFallback message="Não foi possível carregar o Google Maps. Tente novamente mais tarde." />
    );
  }

  return (
    <View className="flex-1">
      <APIProvider apiKey={apiKey} onError={() => setLoadError(true)}>
        <MapContent {...props} />
      </APIProvider>
    </View>
  );
}
