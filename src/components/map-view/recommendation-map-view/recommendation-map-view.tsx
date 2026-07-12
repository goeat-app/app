import { useCallback, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';

import { RestaurantMarker } from '../restaurant-marker/restaurant-marker';
import type { RecommendationMapViewProps } from './recommendation-map-view.types';

export default function RecommendationMapView({
  mapRegion,
  restaurants,
  restaurantCoordinates,
  userCoordinate,
  toCoordinate,
  setSelectedRestaurantId,
}: RecommendationMapViewProps) {
  const mapRef = useRef<MapView>(null);

  const fitMapToMarkers = useCallback(() => {
    const coordinates = userCoordinate
      ? [...restaurantCoordinates, userCoordinate]
      : restaurantCoordinates;

    if (!mapRef.current || coordinates.length === 0) return;

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 80, right: 40, bottom: 280, left: 40 },
      animated: true,
    });
  }, [restaurantCoordinates, userCoordinate]);

  useEffect(() => {
    fitMapToMarkers();
  }, [fitMapToMarkers]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      initialRegion={mapRegion}
      onMapReady={() => {
        fitMapToMarkers();
      }}
    >
      {restaurants.map(restaurant => {
        const coordinate = toCoordinate(restaurant);
        if (!coordinate) return null;

        return (
          <RestaurantMarker
            key={restaurant.id}
            coordinate={coordinate}
            title={restaurant.name}
            onPress={() => setSelectedRestaurantId(restaurant.id)}
          />
        );
      })}
    </MapView>
  );
}
