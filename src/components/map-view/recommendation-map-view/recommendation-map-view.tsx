import MapView from 'react-native-maps';

import type { RecommendationsMapModel } from '@/app/recommendations-map/recommendations-map.model';

import { RestaurantMarker } from '../restaurant-marker/restaurant-marker';

export default function RecommendationMapView({
  mapRef,
  mapRegion,
  restaurants,
  toCoordinate,
  setIsMapReady,
  fitMapToMarkers,
  setSelectedRestaurantId,
}: RecommendationsMapModel & {
  mapRegion: NonNullable<RecommendationsMapModel['mapRegion']>;
}) {
  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      initialRegion={mapRegion}
      onMapReady={() => {
        setIsMapReady(true);
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
