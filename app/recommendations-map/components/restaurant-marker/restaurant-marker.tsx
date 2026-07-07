import { Image, Platform, View } from 'react-native';

import { RestaurantMarkerProps } from './restaurant-marker.types';
import { lazy } from 'react';

const MARKER_SIZE = 32;

export function RestaurantMarker({
  coordinate,
  title,
  onPress,
}: RestaurantMarkerProps) {
  return (
    <>
      {Platform.OS !== 'web' ? (
        (async () => {
          const Marker = lazy(() =>
            import('react-native-maps').then(module => ({
              default: module.Marker,
            })),
          );

          return (
            <Marker coordinate={coordinate} title={title} onPress={onPress}>
              <View collapsable={false}>
                <View
                  style={{
                    width: MARKER_SIZE,
                    height: MARKER_SIZE,
                    borderColor: '#E86D17',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require('@/assets/images/goat-logo.png')}
                    style={{
                      width: MARKER_SIZE - 4,
                      height: MARKER_SIZE - 4,
                      borderRadius: (MARKER_SIZE - 4) / 2,
                    }}
                  />
                </View>
              </View>
            </Marker>
          );
        })()
      ) : (
        <></>
      )}
    </>
  );
}
