import { recommenderService } from 'services/recommender-service';

import { getFirebaseAuth } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';
import { RestaurantFilters } from '@/store/restaurant-filter-store';

import { RecommenderResult } from './recommender.types';

export async function getRecommendationsUseCase(
  filters?: RestaurantFilters,
): Promise<RecommenderResult> {
  try {
    const user = getFirebaseAuth().currentUser;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const result = await recommenderService.getRecommendations(
      user.uid,
      filters,
    );

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao obter restaurantes recomendados. Tente novamente.',
      ),
    };
  }
}
