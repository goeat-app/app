import { PlaceTypes } from 'use-cases/profile-mapping/place-types/place-types.types';

import { api } from '@/lib/api/api';

const BASE_URL = '/places';

export const placeTypesService = {
  async getCategories(): Promise<PlaceTypes[]> {
    const response = await api.get(`${BASE_URL}/types`);
    return response.data;
  },
};
