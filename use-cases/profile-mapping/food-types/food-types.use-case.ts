import { foodTypeService } from 'services/food-types-service';

import { handleError } from '@/lib/utils/error-mapper';

import { FoodTypesResult } from './food-types.types';

export async function getFoodTypesUseCase(): Promise<FoodTypesResult> {
  try {
    const data = await foodTypeService.getCategories();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: handleError(
        error,
        'Erro ao obter lista de categorias. Tente novamente.',
      ),
    };
  }
}
