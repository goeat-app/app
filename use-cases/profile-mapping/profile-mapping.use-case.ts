import axios from 'axios';
import { profileMappingService } from 'services/profile-mapping-service';

import { authService } from '@/lib/auth/firebase-auth';
import { handleError } from '@/lib/utils/error-mapper';
import { useProfileMappingStore } from '@/store/profile-mapping';

import {
  GetProfileMappingResult,
  PriceRangeParams,
  ProfileMappingResult,
} from './profile-mapping.types';

export async function getProfileMapping(): Promise<GetProfileMappingResult> {
  try {
    const profileMapping = await profileMappingService.getProfile();

    return { success: true, profileMapping };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { success: true, profileMapping: null };
    }

    return {
      success: false,
      error: handleError(error, 'Erro ao carregar o mapeamento do perfil.'),
    };
  }
}

export async function createProfileMapping(
  priceRange: PriceRangeParams,
): Promise<ProfileMappingResult> {
  const selectedPlaceTypes =
    useProfileMappingStore.getState().selectedPlaceTypes;
  const selectedFoodCategories =
    useProfileMappingStore.getState().selectedFoodCategories;

  try {
    const user = authService.getCurrentUser();

    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    const payload = {
      userId: user.uid,
      foodTypes: selectedFoodCategories,
      placeTypes: selectedPlaceTypes,
      priceRange: {
        minValue: priceRange.minValue,
        maxValue: priceRange.maxValue,
      },
    };

    await profileMappingService.createProfile(payload);
    useProfileMappingStore.getState().setHasCreatedProfileMapping(true);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao mapear perfil. Tente novamente.'),
    };
  }
}
