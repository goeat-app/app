import { Image, View } from 'react-native';
import { Marker } from 'react-native-maps';

import { RestaurantMarkerProps } from './restaurant-marker.types';

const MARKER_SIZE = 32;

export function RestaurantMarker({
  coordinate,
  title,
  onPress,
}: RestaurantMarkerProps) {
  return (
    <>
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
    </>
  );
}
