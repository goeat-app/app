interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RestaurantMarkerProps {
  coordinate: Coordinate;
  title: string;
  onPress: () => void;
  selected?: boolean;
}
