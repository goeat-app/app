import { FoodType } from 'use-cases/profile-mapping/food-types/food-types.types';

import { api } from '@/lib/api/api';

const BASE_URL = '/food';

export const foodTypeService = {
  async getCategories(): Promise<FoodType[]> {
    const response = await api.get(`${BASE_URL}/categories`);
    return response.data;
  },
};
