import { CreateProfilePayload } from 'use-cases/profile-mapping/profile-mapping.types';

import { api } from '@/lib/api/api';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

export const recommenderService = {
  async getRecommendations(userId: string): Promise<RecommendedRestaurant[]> {
    const response = await api.get('/recommender/onboarding', {
      params: { userId }
    });

    return response.data;
  },
};
