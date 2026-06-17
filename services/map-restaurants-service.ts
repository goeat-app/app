import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { api } from '@/lib/api/api';

export type MapRestaurantsParams = {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  city?: string;
};

export const mapRestaurantsService = {
  async getRestaurantsForMap(
    params?: MapRestaurantsParams,
  ): Promise<RecommendedRestaurant[]> {
    const response = await api.get<RecommendedRestaurant[]>(
      '/recommender/map',
      {
        params,
      },
    );
    return response.data;
  },
};
