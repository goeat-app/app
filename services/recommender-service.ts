import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { defaultMinPrice, defaultMaxPrice } from '@/constants/filterConstants';
import { api } from '@/lib/api/api';
import { RestaurantFilters } from '@/store/restaurant-filter-store';

export const recommenderService = {
  async getRecommendations(
    filters: RestaurantFilters | undefined,
  ): Promise<RecommendedRestaurant[]> {
    const params: Record<string, string> = {};

    if (filters) {
      if (filters.minRating > 0) params.minRating = String(filters.minRating);
      if (filters.foodTypes.length > 0)
        params.foodTypes = filters.foodTypes.join(',');
      if (filters.restaurantStyles.length > 0)
        params.restaurantStyles = filters.restaurantStyles.join(',');
      if (filters.minPrice !== defaultMinPrice)
        params.minPrice = String(filters.minPrice);
      if (filters.maxPrice !== defaultMaxPrice)
        params.maxPrice = String(filters.maxPrice);
    }

    const response = await api.get('/recommender/onboarding', { params });
    return response.data;
  },
};
