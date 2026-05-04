import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';

import { favoriteSavingsService } from 'services/favorite-savings-service';
import { restaurantService } from 'services/restaurant-service';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import {
  FavoriteIdsResult,
  FavoriteRestaurantsResult,
  ToggleFavoriteResult,
} from './favorite-savings.types';

export async function getFavoriteRestaurantIdsUseCase(): Promise<FavoriteIdsResult> {
  try {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const dto = await favoriteSavingsService.getByUserId(user.id);

    return { success: true, data: dto.restaurantIds };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao carregar favoritos. Tente novamente.'),
    };
  }
}

export async function loadFavoriteRestaurantsUseCase(): Promise<FavoriteRestaurantsResult> {
  try {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const dto = await favoriteSavingsService.getByUserId(user.id);

    if (dto.restaurantIds.length === 0) {
      return { success: true, data: [] };
    }

    const fromApi = dto.restaurants?.filter(Boolean) ?? [];
    if (fromApi.length > 0) {
      const byId = new Map(fromApi.map(r => [r.id, r]));
      const ordered = dto.restaurantIds
        .map(id => byId.get(id))
        .filter((r): r is RecommendedRestaurant => r !== undefined);
      return {
        success: true,
        data: ordered.length > 0 ? ordered : fromApi,
      };
    }

    const results = await Promise.allSettled(
      dto.restaurantIds.map(id => restaurantService.getById(id)),
    );

    const restaurants: RecommendedRestaurant[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') {
        restaurants.push(r.value);
      }
    }

    return { success: true, data: restaurants };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao carregar restaurantes favoritos. Tente novamente.',
      ),
    };
  }
}

export async function saveFavoriteUseCase(
  restaurantId: string,
): Promise<ToggleFavoriteResult> {
  try {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const current = await favoriteSavingsService.getByUserId(user.id);
    if (current.restaurantIds.includes(restaurantId)) {
      return { success: true };
    }

    await favoriteSavingsService.save({
      userId: user.id,
      restaurantIds: [...current.restaurantIds, restaurantId],
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao salvar favorito. Tente novamente.'),
    };
  }
}

export async function removeFavoriteUseCase(
  restaurantId: string,
): Promise<ToggleFavoriteResult> {
  try {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    await favoriteSavingsService.removeRestaurant(user.id, restaurantId);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao remover favorito. Tente novamente.'),
    };
  }
}
