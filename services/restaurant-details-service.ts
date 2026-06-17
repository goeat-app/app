import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { api } from '@/lib/api/api';

const BASE_URL = '/restaurant';

export const restaurantDetailsService = {
  async getById(restaurantId: string): Promise<RecommendedRestaurant> {
    const response = await api.get(`${BASE_URL}/details/`, {
      params: { id: restaurantId },
    });

    return response.data;
  },
};
