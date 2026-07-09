import { View } from 'react-native';

import type { RecommendationsMapModel } from '@/app/recommendations-map/recommendations-map.model';

export default function RecommendationMapView(
  _: RecommendationsMapModel & {
    mapRegion: NonNullable<RecommendationsMapModel['mapRegion']>;
  },
) {
  return <View>Restaurant Map</View>;
}
