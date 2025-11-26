import { CreateProfilePayload } from 'use-cases/profile-mapping/profile-mapping.types';

import { api } from '@/lib/api/api';

export const profileMappingService = {
  async createProfile(payload: CreateProfilePayload): Promise<void> {
    const response = await api.post('/profile-mapping', payload);
    return response.data;
  },
};
