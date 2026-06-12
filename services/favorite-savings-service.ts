import {
  FavoriteSavingsResponseDto,
  SaveFavoriteSavingsDto,
} from 'use-cases/favorite-savings/favorite-savings.types';

import { api } from '@/lib/api/api';

const BASE = '/favorite-savings';

export const favoriteSavingsService = {
  async getUserFavorites(): Promise<FavoriteSavingsResponseDto> {
    const response = await api.get<FavoriteSavingsResponseDto | string[]>(
      `${BASE}`,
    );
    const data = response.data;
    if (Array.isArray(data)) {
      return { restaurantIds: data, restaurants: [] };
    }

    return {
      restaurantIds: data.restaurantIds ?? [],
      restaurants: data.restaurants ?? [],
    };
  },

  async save(dto: SaveFavoriteSavingsDto): Promise<FavoriteSavingsResponseDto> {
    const response = await api.post<FavoriteSavingsResponseDto>(`${BASE}`, dto);
    return response.data;
  },

  async removeRestaurant(
    userId: string,
    restaurantId: string,
  ): Promise<FavoriteSavingsResponseDto> {
    const response = await api.delete<FavoriteSavingsResponseDto>(
      `${BASE}/${userId}/restaurants/${restaurantId}`,
    );
    return response.data;
  },
};
