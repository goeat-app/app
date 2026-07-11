import { Image, View } from 'react-native';

import { AdvancedMarker } from '@vis.gl/react-google-maps';

import type { RestaurantMarkerProps } from './restaurant-marker.types';

const MARKER_SIZE = 36;

export function RestaurantMarker({
  coordinate,
  title,
  onPress,
  selected = false,
}: RestaurantMarkerProps) {
  return (
    <AdvancedMarker
      position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
      title={title}
      onClick={onPress}
      zIndex={selected ? 3 : 1}
    >
      <View
        accessibilityLabel={title}
        accessibilityRole="button"
        style={{
          width: MARKER_SIZE,
          height: MARKER_SIZE,
          padding: 2,
          borderRadius: MARKER_SIZE / 2,
          borderWidth: selected ? 3 : 2,
          borderColor: '#E86D17',
          backgroundColor: '#FFFFFF',
          boxShadow: selected
            ? '0 2px 8px rgba(232, 109, 23, 0.65)'
            : '0 1px 5px rgba(0, 0, 0, 0.35)',
          transform: [{ scale: selected ? 1.15 : 1 }],
        }}
      >
        <Image
          resizeMode="contain"
          source={require('@/assets/images/goat-logo.png')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: MARKER_SIZE / 2,
          }}
        />
      </View>
    </AdvancedMarker>
  );
}
