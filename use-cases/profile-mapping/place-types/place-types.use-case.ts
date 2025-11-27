import { placeTypesService } from 'services/place-types-service';

import { handleError } from '@/lib/utils/error-mapper';

import { PlaceTypesResult } from './place-types.types';

export async function getPlaceTypesUseCase(): Promise<PlaceTypesResult> {
  try {
    const data = await placeTypesService.getCategories();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao obter lista de ambientes. Tente novamente.',
      ),
    };
  }
}
