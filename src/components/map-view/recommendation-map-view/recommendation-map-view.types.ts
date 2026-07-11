import type { RecommendationsMapModel } from '@/app/recommendations-map/recommendations-map.model';

export type RecommendationMapViewProps = Pick<
  RecommendationsMapModel,
  | 'restaurants'
  | 'restaurantCoordinates'
  | 'userCoordinate'
  | 'toCoordinate'
  | 'selectedRestaurantId'
  | 'setSelectedRestaurantId'
> & {
  mapRegion: NonNullable<RecommendationsMapModel['mapRegion']>;
};
