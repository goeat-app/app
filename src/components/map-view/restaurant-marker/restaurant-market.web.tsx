import { Image, Platform, View } from 'react-native';

import { RestaurantMarkerProps } from './restaurant-marker.types';
import { lazy } from 'react';

const MARKER_SIZE = 32;

export function RestaurantMarker({
  coordinate,
  title,
  onPress,
}: RestaurantMarkerProps) {
  return <>restaurant</>;
}
