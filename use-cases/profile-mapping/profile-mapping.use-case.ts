import { profileMappingService } from 'services/profile-mapping-service';

import { handleError } from '@/lib/utils/error-mapper';
import { useAuthStore } from '@/store/auth-store';
import { useProfileMappingStore } from '@/store/profile-mapping';

import {
  PriceRangeParams,
  ProfileMappingResult,
} from './profile-mapping.types';

export async function createProfileMapping(
  priceRange: PriceRangeParams,
): Promise<ProfileMappingResult> {
  const selectedPlaceTypes =
    useProfileMappingStore.getState().selectedPlaceTypes;
  const selectedFoodCategories =
    useProfileMappingStore.getState().selectedFoodCategories;

  try {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    const payload = {
      userId: user.id,
      foodTypes: selectedFoodCategories,
      placeTypes: selectedPlaceTypes,
      priceRange: {
        minValue: priceRange.minValue,
        maxValue: priceRange.maxValue,
      },
    };

    await profileMappingService.createProfile(payload);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao mapear perfil. Tente novamente.'),
    };
  }
}
