import { lazy } from 'react';
import { Image, Platform, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { StarIcon } from '@/assets/icons/star-icon';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import BottomSheet from '@/components/ui/bottom-sheet/bottom-sheet';
import { getRestaurantImageSource } from '@/lib/utils/restaurant-image';

import { useRecommendationsMapModel } from './recommendations-map.model';

export default function RecommendationsMap() {
  const {
    mapRef,
    restaurants,
    isLoading,
    setIsMapReady,
    mapRegion,
    toCoordinate,
    fitMapToMarkers,
    selectedRestaurantId,
    setSelectedRestaurantId,
  } = useRecommendationsMapModel();

  if (isLoading || !mapRegion) {
    return (
      <View className="flex-1 items-center justify-center">
        <Typography type="span" text="Carregando mapa..." />
      </View>
    );
  }

  const sortedRestaurants = [...restaurants].sort((a, b) =>
    a.id === selectedRestaurantId ? -1 : b.id === selectedRestaurantId ? 1 : 0,
  );

  return (
    <View className="flex-1">
      {Platform.OS !== 'web' &&
        (() => {
          const MapView = lazy(() =>
            import('react-native-maps').then(module => ({
              default: module.default,
            })),
          );

          const RestaurantMarker = lazy(() =>
            import('./components/restaurant-marker/restaurant-marker').then(
              module => ({
                default: module.RestaurantMarker,
              }),
            ),
          );

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
        })()}

      <BottomSheet>
        <View className="flex gap-4">
          <View className="flex flex-col gap-4">
            <Typography
              type="span"
              text={'Perto de você'.toUpperCase()}
              className="text-sm font-be-vietnam-pro-semi-bold text-[#E86D17]"
            />

            <Typography
              type="h2"
              text="Saboreie o Momento"
              className="font-plus-jakarta-semi-bold"
            />
          </View>
          {restaurants.length === 0 ? (
            <Typography
              type="span"
              text="Nenhum restaurante com localização disponível."
              className="text-[#474747]"
            />
          ) : (
            sortedRestaurants.map(restaurant => (
              <View
                key={restaurant.restaurantSlug || restaurant.id}
                className="flex flex-row p-2 h-30 w-full rounded-2xl gap-4"
                style={{
                  backgroundColor:
                    selectedRestaurantId === restaurant.id
                      ? '#FFE8D6'
                      : '#F1F0F5',
                  borderWidth: selectedRestaurantId === restaurant.id ? 2 : 0,
                  borderColor:
                    selectedRestaurantId === restaurant.id
                      ? '#E86D17'
                      : 'transparent',
                }}
              >
                <View className="flex items-center justify-center">
                  <Image
                    resizeMode="cover"
                    className="rounded-xl w-[80px] h-[80px]"
                    source={getRestaurantImageSource(restaurant)}
                  />
                </View>

                <View className="flex flex-1 items-start gap-1 overflow-hidden">
                  <Typography
                    type="h2"
                    text={restaurant.name}
                    className="font-plus-jakarta-sans text-base"
                  />

                  <View className="flex items-start gap-2">
                    <View className="flex flex-row gap-1 items-center justify-center">
                      <Typography
                        type="span"
                        className="text-sm text-[#E86D17] font-plus-jakarta-sans leading-tight"
                        text={`${restaurant.avgRating}`}
                      />
                      <StarIcon width={14} height={14} color="#E86D17" />
                    </View>

                    <View className="flex items-center justify-center overflow-hidden">
                      <Typography
                        type="span"
                        text={`${restaurant.address}`}
                        className="text-xs text-[#474747] font-be-vietnam-pro-medium"
                        numberOfLines={1}
                      />
                    </View>

                    <Button
                      onPress={() =>
                        router.push({
                          pathname:
                            '/restaurant-details/restaurant-details/[id]',
                          params: { id: restaurant.id },
                        })
                      }
                      className="flex flex-row items-center justify-center"
                    >
                      <Typography
                        type="span"
                        text={'Ver detalhes'.toUpperCase()}
                        className="text-[10px] font-be-vietnam-pro-semi-bold text-[#E86D17]"
                      />
                      <Ionicons
                        name="chevron-forward"
                        size={14}
                        color="#FF7947"
                      />
                    </Button>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </BottomSheet>
    </View>
  );
}
