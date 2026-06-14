import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { api } from '@/lib/api/api';

export const restaurantService = {
  async getById(restaurantId: string): Promise<RecommendedRestaurant> {
    const response = await api.get<RecommendedRestaurant>(
      `/restaurants/${restaurantId}`,
    );
    return response.data;
  },
};
