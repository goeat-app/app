import {
  UpdateUserProfilePayload,
  UserProfileUpdateData,
} from 'use-cases/profile/update-user-profile.types';

import { api } from '@/lib/api/api';

const BASE_URL = '/profile';

export const userProfileService = {
  async updateUserProfile(
    payload: UpdateUserProfilePayload,
  ): Promise<UserProfileUpdateData> {
    const response = await api.put<UserProfileUpdateData>(
      `${BASE_URL}`,
      payload,
    );

    return response.data;
  },
};
