import type { RecommendationsMapModel } from '@/app/recommendations-map/recommendations-map.model';
import { View } from 'react-native';

export default function RecommendationMapView(
  _: RecommendationsMapModel & {
    mapRegion: NonNullable<RecommendationsMapModel['mapRegion']>;
  },
) {
  return <View>text</View>;
}
