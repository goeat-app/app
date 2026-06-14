import { userProfileService } from 'services/user-profile-service';

import { handleError } from '@/lib/utils/error-mapper';

import {
  UpdateUserProfilePayload,
  UpdateUserProfileResult,
} from './update-user-profile.types';

export async function updateUserProfileUseCase(
  payload: UpdateUserProfilePayload,
): Promise<UpdateUserProfileResult> {
  try {
    await userProfileService.updateUserProfile({
      name: payload.name,
      phone: payload.phone,
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: handleError(error, 'Erro ao atualizar perfil. Tente novamente.'),
    };
  }
}
