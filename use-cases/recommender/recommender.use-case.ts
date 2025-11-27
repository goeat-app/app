import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';

import { recommenderService } from 'services/recommender-service';
import { RecommenderResult } from './recommender.types';


export async function getRecommendationsUseCase(): Promise<RecommenderResult> {

  try {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const result = await recommenderService.getRecommendations(user.id);

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao obter restaurantes recomendados. Tente novamente.'),
    };
  }
}
